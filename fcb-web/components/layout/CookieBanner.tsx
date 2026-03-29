"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "fcb_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(KEY, "accepted");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  function decline() {
    try {
      localStorage.setItem(KEY, "declined");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[150] border-t border-ink/10 bg-elevated/95 p-4 shadow-[0_-12px_40px_-8px_rgb(0_0_0/0.12)] backdrop-blur-xl md:p-5"
      role="dialog"
      aria-label="Файлы cookie"
    >
      <div className="mx-auto flex max-w-content flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
        <p className="text-sm leading-relaxed text-ink md:max-w-3xl">
          Мы используем cookie и локальное хранилище браузера для удобства работы
          с сайтом и (при подключении) аналитики. Подробности и ваши права
          описаны в{" "}
          <Link
            href="/privacy#cookies"
            className="font-semibold text-brand-start underline-offset-2 hover:underline"
          >
            разделе о cookie в политике обработки данных
          </Link>
          .
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={accept}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-elevated shadow-soft transition-[transform,box-shadow] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-start"
          >
            Принять
          </button>
          <button
            type="button"
            onClick={decline}
            className="rounded-full border border-ink/20 bg-transparent px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink/35 hover:bg-muted/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-start"
          >
            Отказаться
          </button>
        </div>
      </div>
    </div>
  );
}
