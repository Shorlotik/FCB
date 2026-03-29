import { z } from "zod";
import { NextResponse } from "next/server";
import { checkRateLimit, clientKeyFromRequest } from "@/lib/rate-limit";
import { notifyHiringSubmission } from "@/lib/submission-notify";

const MAX_BYTES = 5 * 1024 * 1024;

const schema = z.object({
  fullName: z.string().min(2),
  telegram: z.string().min(1),
  city: z.string().min(1),
  phone: z.string().min(5),
  email: z.string().email(),
  portfolio: z.string().max(2000),
  experience: z.string().min(10),
  consent: z.literal("true"),
  gRecaptchaResponse: z.string().max(8000).optional(),
});

export async function POST(request: Request) {
  const ip = clientKeyFromRequest(request);
  if (!checkRateLimit(`hiring:${ip}`).ok) {
    return NextResponse.json(
      { error: "Слишком много запросов. Попробуйте позже." },
      { status: 429 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Некорректные данные" }, { status: 400 });
  }

  const photo = form.get("photo");
  if (photo instanceof File && photo.size > 0) {
    if (photo.size > MAX_BYTES) {
      return NextResponse.json({ error: "Фото больше 5 МБ" }, { status: 400 });
    }
  }

  const recaptchaRaw = form.get("gRecaptchaResponse");
  const raw = {
    fullName: String(form.get("fullName") ?? ""),
    telegram: String(form.get("telegram") ?? ""),
    city: String(form.get("city") ?? ""),
    phone: String(form.get("phone") ?? ""),
    email: String(form.get("email") ?? ""),
    portfolio: String(form.get("portfolio") ?? ""),
    experience: String(form.get("experience") ?? ""),
    consent: String(form.get("consent") ?? ""),
    gRecaptchaResponse:
      typeof recaptchaRaw === "string" && recaptchaRaw.length > 0
        ? recaptchaRaw
        : undefined,
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Проверьте обязательные поля" },
      { status: 422 },
    );
  }

  const hasPhoto = photo instanceof File && photo.size > 0;
  const { emailed, error: emailError } = await notifyHiringSubmission({
    fullName: parsed.data.fullName,
    telegram: parsed.data.telegram,
    city: parsed.data.city,
    phone: parsed.data.phone,
    email: parsed.data.email,
    portfolio: parsed.data.portfolio,
    experience: parsed.data.experience,
    hasPhoto,
    gRecaptchaResponse: parsed.data.gRecaptchaResponse,
  });

  if (emailError && process.env.NODE_ENV === "development") {
    console.warn("[hiring] уведомление на почту:", emailError);
  }

  return NextResponse.json({ ok: true, emailed });
}
