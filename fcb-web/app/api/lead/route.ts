import { z } from "zod";
import { NextResponse } from "next/server";
import { checkRateLimit, clientKeyFromRequest } from "@/lib/rate-limit";
import { notifyLeadSubmission } from "@/lib/submission-notify";

const MAX_BYTES = 5 * 1024 * 1024;

const schema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(5),
  email: z.string().email(),
  company: z.string().min(1),
  taskTypes: z.string().min(1),
  description: z.string().min(10),
  briefUrl: z.string().max(2000),
  consent: z.literal("true"),
  /** Опционально: токен reCAPTCHA после проверки на клиенте; верифицируйте через API Google с секретом из env. */
  gRecaptchaResponse: z.string().max(8000).optional(),
});

export async function POST(request: Request) {
  const ip = clientKeyFromRequest(request);
  if (!checkRateLimit(`lead:${ip}`).ok) {
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

  const brief = form.get("brief");
  if (brief instanceof File && brief.size > 0) {
    if (brief.size > MAX_BYTES) {
      return NextResponse.json({ error: "Файл больше 5 МБ" }, { status: 400 });
    }
  }

  const recaptchaRaw = form.get("gRecaptchaResponse");
  const raw = {
    fullName: String(form.get("fullName") ?? ""),
    phone: String(form.get("phone") ?? ""),
    email: String(form.get("email") ?? ""),
    company: String(form.get("company") ?? ""),
    taskTypes: String(form.get("taskTypes") ?? ""),
    description: String(form.get("description") ?? ""),
    briefUrl: String(form.get("briefUrl") ?? ""),
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

  const hasFile = brief instanceof File && brief.size > 0;
  const { emailed, error: emailError } = await notifyLeadSubmission({
    fullName: parsed.data.fullName,
    phone: parsed.data.phone,
    email: parsed.data.email,
    company: parsed.data.company,
    taskTypes: parsed.data.taskTypes,
    description: parsed.data.description,
    briefUrl: parsed.data.briefUrl,
    hasFile,
    gRecaptchaResponse: parsed.data.gRecaptchaResponse,
  });

  if (emailError && process.env.NODE_ENV === "development") {
    console.warn("[lead] уведомление на почту:", emailError);
  }

  return NextResponse.json({ ok: true, emailed });
}
