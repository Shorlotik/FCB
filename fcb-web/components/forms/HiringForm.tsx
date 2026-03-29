"use client";

import { FormStepper } from "@/components/forms/FormStepper";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import Link from "next/link";
import { useRef, useState, type RefObject } from "react";

const STEPS = ["Контакты", "Опыт и файлы"];

const MAX_PHOTO = 5 * 1024 * 1024;

export function HiringForm() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle",
  );
  const [err, setErr] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [telegram, setTelegram] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [experience, setExperience] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);

  const refFullName = useRef<HTMLInputElement>(null);
  const refTelegram = useRef<HTMLInputElement>(null);
  const refCity = useRef<HTMLInputElement>(null);
  const refPhone = useRef<HTMLInputElement>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refExperience = useRef<HTMLTextAreaElement>(null);
  const refPhoto = useRef<HTMLInputElement>(null);
  const refConsent = useRef<HTMLInputElement>(null);

  function validate(s: number): boolean {
    setErr(null);
    const focus = (r: RefObject<HTMLElement | null>) =>
      requestAnimationFrame(() => r.current?.focus());

    if (s === 0) {
      if (fullName.trim().length < 2) {
        setErr("Имя и фамилия обязательны.");
        focus(refFullName);
        return false;
      }
      if (!telegram.trim()) {
        setErr("Укажите Telegram.");
        focus(refTelegram);
        return false;
      }
      if (!city.trim()) {
        setErr("Укажите город.");
        focus(refCity);
        return false;
      }
      if (phone.trim().length < 5) {
        setErr("Укажите телефон.");
        focus(refPhone);
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setErr("Укажите корректный E-mail.");
        focus(refEmail);
        return false;
      }
    }
    if (s === 1) {
      if (experience.trim().length < 10) {
        setErr("Расскажите об опыте (минимум 10 символов).");
        focus(refExperience);
        return false;
      }
      if (photo && photo.size > MAX_PHOTO) {
        setErr("Фото не больше 5 МБ.");
        focus(refPhoto);
        return false;
      }
      if (!consent) {
        setErr("Нужно согласие с политикой.");
        focus(refConsent);
        return false;
      }
    }
    return true;
  }

  async function submit() {
    if (!validate(1)) return;
    setStatus("loading");
    setErr(null);
    const fd = new FormData();
    fd.append("fullName", fullName);
    fd.append("telegram", telegram);
    fd.append("city", city);
    fd.append("phone", phone);
    fd.append("email", email);
    fd.append("portfolio", portfolio);
    fd.append("experience", experience);
    fd.append("consent", consent ? "true" : "false");
    if (photo) fd.append("photo", photo);

    try {
      const res = await fetch("/api/hiring", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Ошибка отправки");
      setStatus("ok");
    } catch (e) {
      setStatus("err");
      setErr(e instanceof Error ? e.message : "Ошибка отправки");
    }
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-ink/10 bg-elevated p-6 shadow-soft md:p-8">
      <FormStepper steps={STEPS} current={step} />
      {status === "ok" ? (
        <p className="text-lg font-medium text-ink" role="status">
          Заявка отправлена. HR свяжется с вами.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (step === 0) {
              if (validate(0)) setStep(1);
            } else {
              void submit();
            }
          }}
        >
          {err ? (
            <p
              id="hiring-form-error"
              className="mb-4 text-sm font-medium text-red-600"
              role="alert"
              aria-live="assertive"
            >
              {err}
            </p>
          ) : null}

          {step === 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label htmlFor="h-fullName">Имя и фамилия *</Label>
                <Input
                  id="h-fullName"
                  ref={refFullName}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  aria-invalid={Boolean(err && step === 0)}
                  aria-describedby={err ? "hiring-form-error" : undefined}
                />
              </div>
              <div>
                <Label htmlFor="h-tg">Ваш Telegram *</Label>
                <Input
                  id="h-tg"
                  ref={refTelegram}
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  placeholder="@username"
                  required
                  aria-invalid={Boolean(err && step === 0)}
                  aria-describedby={err ? "hiring-form-error" : undefined}
                />
              </div>
              <div>
                <Label htmlFor="h-city">Город *</Label>
                <Input
                  id="h-city"
                  ref={refCity}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  aria-invalid={Boolean(err && step === 0)}
                  aria-describedby={err ? "hiring-form-error" : undefined}
                />
              </div>
              <div>
                <Label htmlFor="h-phone">Телефон *</Label>
                <Input
                  id="h-phone"
                  ref={refPhone}
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  aria-invalid={Boolean(err && step === 0)}
                  aria-describedby={err ? "hiring-form-error" : undefined}
                />
              </div>
              <div>
                <Label htmlFor="h-email">Ваш E-mail *</Label>
                <Input
                  id="h-email"
                  ref={refEmail}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-invalid={Boolean(err && step === 0)}
                  aria-describedby={err ? "hiring-form-error" : undefined}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="h-portfolio">Ссылка на портфолио</Label>
                <Input
                  id="h-portfolio"
                  type="url"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="https://"
                />
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="grid gap-4">
              <div>
                <Label htmlFor="h-exp">
                  Расскажите о своём опыте, навыках и умениях *
                </Label>
                <Textarea
                  id="h-exp"
                  ref={refExperience}
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  required
                  aria-invalid={Boolean(err && step === 1)}
                  aria-describedby={err ? "hiring-form-error" : undefined}
                />
              </div>
              <div>
                <Label htmlFor="h-photo">Загрузите фотографию</Label>
                <Input
                  id="h-photo"
                  ref={refPhoto}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/heic,.jpg,.jpeg,.png,.webp"
                  className="cursor-pointer border-dashed py-2"
                  onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
                  aria-describedby={
                    err ? "photo-hint hiring-form-error" : "photo-hint"
                  }
                />
                <p id="photo-hint" className="mt-1 text-xs text-sub">
                  До 5 МБ
                </p>
              </div>
              <label className="flex cursor-pointer gap-3 text-sm text-sub">
                <input
                  ref={refConsent}
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-ink/20"
                  aria-invalid={Boolean(err && step === 1)}
                  aria-describedby={err ? "hiring-form-error" : undefined}
                />
                <span>
                  Отправляя форму, вы соглашаетесь с условиями{" "}
                  <Link href="/privacy" className="font-medium text-ink underline">
                    политики обработки персональных данных
                  </Link>
                  . * — обязательные поля
                </span>
              </label>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            {step > 0 ? (
              <button
                type="button"
                className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-muted"
                onClick={() => {
                  setStep(0);
                  setErr(null);
                }}
              >
                Назад
              </button>
            ) : null}
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-elevated shadow-soft disabled:opacity-50"
            >
              {step === 0
                ? "Далее"
                : status === "loading"
                  ? "Отправка…"
                  : "Отправить"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
