"use client";

import { FormStepper } from "@/components/forms/FormStepper";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { useRef, useState, type RefObject } from "react";

const STEPS = ["Контакты", "Задача", "Бриф и согласие"];

const TASK_KEYS = [
  { key: "strategy", label: "Стратегия" },
  { key: "branding", label: "Брендинг" },
  { key: "creative", label: "Креатив" },
  { key: "mediaInfluencer", label: "Медиа и инфлюенс" },
  { key: "smm", label: "SMM" },
  { key: "production", label: "Продакшн" },
  { key: "web", label: "Web-студия" },
  { key: "other", label: "Другое" },
  { key: "consulting", label: "Консалтинг" },
] as const;

const MAX_BYTES = 5 * 1024 * 1024;

export function LeadForm() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle",
  );
  const [err, setErr] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [tasks, setTasks] = useState<Record<string, boolean>>({});
  const [description, setDescription] = useState("");
  const [briefUrl, setBriefUrl] = useState("");
  const [briefFile, setBriefFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);

  const refFullName = useRef<HTMLInputElement>(null);
  const refPhone = useRef<HTMLInputElement>(null);
  const refEmail = useRef<HTMLInputElement>(null);
  const refCompany = useRef<HTMLInputElement>(null);
  const refDescription = useRef<HTMLTextAreaElement>(null);
  const refBrief = useRef<HTMLInputElement>(null);
  const refConsent = useRef<HTMLInputElement>(null);

  function toggleTask(k: string) {
    setTasks((t) => ({ ...t, [k]: !t[k] }));
  }

  function validateStep(s: number): boolean {
    setErr(null);
    const focus = (r: RefObject<HTMLElement | null>) =>
      requestAnimationFrame(() => r.current?.focus());

    if (s === 0) {
      if (fullName.trim().length < 2) {
        setErr("Укажите имя и фамилию.");
        focus(refFullName);
        return false;
      }
      if (phone.trim().length < 5) {
        setErr("Укажите номер телефона.");
        focus(refPhone);
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setErr("Укажите корректную почту.");
        focus(refEmail);
        return false;
      }
      if (company.trim().length < 1) {
        setErr("Укажите компанию.");
        focus(refCompany);
        return false;
      }
    }
    if (s === 1) {
      const any = Object.values(tasks).some(Boolean);
      if (!any) {
        setErr("Выберите хотя бы одно направление.");
        return false;
      }
      if (description.trim().length < 10) {
        setErr("Опишите задачу подробнее (минимум 10 символов).");
        focus(refDescription);
        return false;
      }
    }
    if (s === 2) {
      if (briefFile && briefFile.size > MAX_BYTES) {
        setErr("Файл брифа не больше 5 МБ.");
        focus(refBrief);
        return false;
      }
      if (!consent) {
        setErr("Нужно согласие с политикой обработки данных.");
        focus(refConsent);
        return false;
      }
    }
    return true;
  }

  async function submit() {
    if (!validateStep(2)) return;
    setStatus("loading");
    setErr(null);
    const fd = new FormData();
    fd.append("fullName", fullName);
    fd.append("phone", phone);
    fd.append("email", email);
    fd.append("company", company);
    fd.append(
      "taskTypes",
      TASK_KEYS.filter((t) => tasks[t.key]).map((t) => t.key).join(","),
    );
    fd.append("description", description);
    fd.append("briefUrl", briefUrl);
    fd.append("consent", consent ? "true" : "false");
    if (briefFile) fd.append("brief", briefFile);

    try {
      const res = await fetch("/api/lead", { method: "POST", body: fd });
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
          Спасибо! Мы свяжемся с вами.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (step < 2) {
              if (validateStep(step)) setStep(step + 1);
            } else {
              void submit();
            }
          }}
        >
          {err ? (
            <p
              id="lead-form-error"
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
                <Label htmlFor="fullName">Имя и фамилия *</Label>
                <Input
                  id="fullName"
                  ref={refFullName}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  autoComplete="name"
                  aria-invalid={Boolean(err && step === 0)}
                  aria-describedby={err ? "lead-form-error" : undefined}
                />
              </div>
              <div>
                <Label htmlFor="phone">Номер телефона *</Label>
                <Input
                  id="phone"
                  ref={refPhone}
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  autoComplete="tel"
                  aria-invalid={Boolean(err && step === 0)}
                  aria-describedby={err ? "lead-form-error" : undefined}
                />
              </div>
              <div>
                <Label htmlFor="email">Почта *</Label>
                <Input
                  id="email"
                  ref={refEmail}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  aria-invalid={Boolean(err && step === 0)}
                  aria-describedby={err ? "lead-form-error" : undefined}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="company">Компания *</Label>
                <Input
                  id="company"
                  ref={refCompany}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  autoComplete="organization"
                  aria-invalid={Boolean(err && step === 0)}
                  aria-describedby={err ? "lead-form-error" : undefined}
                />
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="grid gap-6">
              <fieldset>
                <legend className="mb-2 text-sm font-medium text-ink">
                  Какие задачи перед нами стоят? *
                </legend>
                <div className="flex flex-wrap gap-2">
                  {TASK_KEYS.map((t) => (
                    <label
                      key={t.key}
                      className={cn(
                        "cursor-pointer rounded-full border px-3 py-1.5 text-sm",
                        tasks[t.key]
                          ? "border-brand-start bg-brand-start/10"
                          : "border-ink/15",
                      )}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={!!tasks[t.key]}
                        onChange={() => toggleTask(t.key)}
                      />
                      {t.label}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div>
                <Label htmlFor="description">Опишите задачу подробнее *</Label>
                <Textarea
                  id="description"
                  ref={refDescription}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  aria-invalid={Boolean(err && step === 1)}
                  aria-describedby={err ? "lead-form-error" : undefined}
                />
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-4">
              <div>
                <Label htmlFor="brief">Загрузите бриф (до 5 МБ)</Label>
                <Input
                  id="brief"
                  ref={refBrief}
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="cursor-pointer border-dashed py-2"
                  onChange={(e) =>
                    setBriefFile(e.target.files?.[0] ?? null)
                  }
                  aria-describedby={
                    err ? "brief-hint lead-form-error" : "brief-hint"
                  }
                />
                <p id="brief-hint" className="mt-1 text-xs text-sub">
                  До 5 МБ
                </p>
              </div>
              <div>
                <Label htmlFor="briefUrl">Или ссылка на бриф</Label>
                <Input
                  id="briefUrl"
                  type="url"
                  value={briefUrl}
                  onChange={(e) => setBriefUrl(e.target.value)}
                  placeholder="https://"
                />
              </div>
              <label className="flex cursor-pointer gap-3 text-sm text-sub">
                <input
                  ref={refConsent}
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-ink/20"
                  aria-invalid={Boolean(err && step === 2)}
                  aria-describedby={err ? "lead-form-error" : undefined}
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
                  setStep((s) => Math.max(0, s - 1));
                  setErr(null);
                }}
              >
                Назад
              </button>
            ) : null}
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-elevated shadow-soft hover:-translate-y-0.5 disabled:opacity-50"
            >
              {step < 2 ? "Далее" : status === "loading" ? "Отправка…" : "Отправить"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
