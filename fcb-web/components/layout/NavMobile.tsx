"use client";

import { getServices } from "@/lib/content";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SearchDialog } from "@/components/layout/SearchDialog";
import type { SearchEntry } from "@/lib/search-index";

const LINKS = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "О компании" },
  { href: "/services", label: "Услуги" },
  { href: "/search", label: "Поиск" },
  { href: "/cases", label: "Кейсы" },
  { href: "/clients", label: "Клиенты" },
  { href: "/partners", label: "Партнёры" },
  { href: "/vacancy", label: "Вакансии" },
  { href: "/otzyvy", label: "Отзывы" },
  { href: "/contacts", label: "Контакты" },
];

type Props = {
  searchEntries: SearchEntry[];
};

export function NavMobile({ searchEntries }: Props) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open || !panelRef.current) return;
    const root = panelRef.current;
    const selector =
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const list = () =>
      Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
        (el) => !el.hasAttribute("disabled") && el.offsetParent !== null,
      );

    const focusables = list();
    focusables[0]?.focus();

    function onTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const nodes = list();
      if (nodes.length === 0) return;
      const i = nodes.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey) {
        if (i <= 0) {
          e.preventDefault();
          nodes[nodes.length - 1]?.focus();
        }
      } else if (i === nodes.length - 1 || i === -1) {
        e.preventDefault();
        nodes[0]?.focus();
      }
    }
    document.addEventListener("keydown", onTab);
    return () => document.removeEventListener("keydown", onTab);
  }, [open]);

  const services = getServices();

  return (
    <div className="flex items-center gap-2 xl:hidden">
      <SearchDialog entries={searchEntries} />
      <button
        type="button"
        className="rounded-full border border-ink/12 bg-elevated p-2.5 text-ink shadow-sm"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
      >
        <span className="block h-4 w-5 space-y-1">
          <span className="block h-0.5 w-full bg-ink" />
          <span className="block h-0.5 w-full bg-ink" />
          <span className="block h-0.5 w-full bg-ink" />
        </span>
      </button>

      {open
        ? createPortal(
            <div
              className="fixed inset-0 z-[110] bg-ink/30 backdrop-blur-sm xl:hidden"
              onClick={() => setOpen(false)}
            >
              <div
                ref={panelRef}
                id="mobile-nav"
                className="ml-auto flex h-full w-[min(360px,100%)] max-w-[100vw] flex-col border-l border-brand-start/20 bg-elevated/98 pr-[max(0px,env(safe-area-inset-right))] shadow-[0_0_48px_-12px_rgb(0_180_255/0.2)] backdrop-blur-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between gap-3 border-b border-brand-start/15 p-4">
                  <span className="font-display font-bold text-ink">Меню</span>
                  <button
                    type="button"
                    className="shrink-0 rounded-full p-2 text-sub hover:bg-muted"
                    onClick={() => setOpen(false)}
                    aria-label="Закрыть"
                  >
                    ✕
                  </button>
                </div>
                <nav
                  className="flex-1 overflow-y-auto overscroll-contain p-4"
                  aria-label="Мобильная навигация"
                >
                  <ul className="space-y-1">
                    {LINKS.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-brand-start/8 hover:text-brand-start"
                          onClick={() => setOpen(false)}
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 mb-2 text-xs font-semibold uppercase tracking-wide text-sub">
                    Услуги
                  </p>
                  <ul className="space-y-1">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="block rounded-lg px-3 py-2 text-sm text-sub transition-colors hover:bg-brand-start/6 hover:text-ink"
                          onClick={() => setOpen(false)}
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 border-t border-ink/10 pt-6">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-sub">
                      Заявки
                    </p>
                    <div className="flex flex-col gap-2">
                      <Link
                        href="/client"
                        className="rounded-full bg-ink px-4 py-2.5 text-center text-sm font-semibold text-elevated"
                        onClick={() => setOpen(false)}
                      >
                        Стать клиентом
                      </Link>
                      <Link
                        href="/work"
                        className="rounded-full border border-ink/15 bg-elevated px-4 py-2.5 text-center text-sm font-semibold text-ink"
                        onClick={() => setOpen(false)}
                      >
                        Работа у нас
                      </Link>
                    </div>
                  </div>
                </nav>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
