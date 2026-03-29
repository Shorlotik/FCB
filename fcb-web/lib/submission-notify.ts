/**
 * Опциональная отправка уведомлений на почту (Resend).
 * Задайте в среде деплоя (без коммита секретов):
 *   RESEND_API_KEY
 *   FCB_RESEND_FROM   — верифицированный отправитель, напр. "FCBMINSK <noreply@ваш-домен.by>"
 *   FCB_LEAD_NOTIFY_EMAIL — куда слать заявки «Стать клиентом»
 *   FCB_HR_NOTIFY_EMAIL   — куда слать отклики «Работа у нас»
 *
 * Без ключа заявки только обрабатываются (ответ 200), письма не уходят.
 */

type LeadPayload = {
  fullName: string;
  phone: string;
  email: string;
  company: string;
  taskTypes: string;
  description: string;
  briefUrl: string;
  hasFile: boolean;
  gRecaptchaResponse?: string;
};

type HiringPayload = {
  fullName: string;
  telegram: string;
  city: string;
  phone: string;
  email: string;
  portfolio: string;
  experience: string;
  hasPhoto: boolean;
  gRecaptchaResponse?: string;
};

function formatLeadText(p: LeadPayload): string {
  return [
    `Имя: ${p.fullName}`,
    `Телефон: ${p.phone}`,
    `Email: ${p.email}`,
    `Компания: ${p.company}`,
    `Задачи: ${p.taskTypes}`,
    "",
    p.description,
    "",
    `Ссылка на бриф: ${p.briefUrl || "—"}`,
    `Файл брифа: ${p.hasFile ? "да" : "нет"}`,
    p.gRecaptchaResponse ? "reCAPTCHA: передан" : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function formatHiringText(p: HiringPayload): string {
  return [
    `Имя: ${p.fullName}`,
    `Telegram: ${p.telegram}`,
    `Город: ${p.city}`,
    `Телефон: ${p.phone}`,
    `Email: ${p.email}`,
    `Портфолио: ${p.portfolio || "—"}`,
    "",
    p.experience,
    "",
    `Фото: ${p.hasPhoto ? "да" : "нет"}`,
    p.gRecaptchaResponse ? "reCAPTCHA: передан" : "",
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendResend(params: {
  subject: string;
  text: string;
  to: string;
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FCB_RESEND_FROM;
  if (!apiKey || !from) {
    return { ok: false, error: "missing_resend_config" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [params.to],
        subject: params.subject,
        text: params.text,
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      return { ok: false, error: errText || `http_${res.status}` };
    }
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "network_error",
    };
  }
}

export async function notifyLeadSubmission(p: LeadPayload): Promise<{
  emailed: boolean;
  error?: string;
}> {
  const to = process.env.FCB_LEAD_NOTIFY_EMAIL;
  if (!process.env.RESEND_API_KEY || !to) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[fcb-web] lead (почта отключена, задайте RESEND_API_KEY и FCB_LEAD_NOTIFY_EMAIL)", p);
    }
    return { emailed: false };
  }

  const result = await sendResend({
    to,
    subject: `Сайт FCBMINSK — заявка от ${p.fullName}`,
    text: formatLeadText(p),
  });

  return result.ok ? { emailed: true } : { emailed: false, error: result.error };
}

export async function notifyHiringSubmission(p: HiringPayload): Promise<{
  emailed: boolean;
  error?: string;
}> {
  const to = process.env.FCB_HR_NOTIFY_EMAIL;
  if (!process.env.RESEND_API_KEY || !to) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[fcb-web] hiring (почта отключена, задайте RESEND_API_KEY и FCB_HR_NOTIFY_EMAIL)", p);
    }
    return { emailed: false };
  }

  const result = await sendResend({
    to,
    subject: `Сайт FCBMINSK — отклик: ${p.fullName}`,
    text: formatHiringText(p),
  });

  return result.ok ? { emailed: true } : { emailed: false, error: result.error };
}
