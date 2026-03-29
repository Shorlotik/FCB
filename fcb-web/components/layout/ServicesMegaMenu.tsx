"use client";

import { getServices } from "@/lib/content";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function ServicesMegaMenu() {
  const services = getServices();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const updatePosition = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const w = 280;
    let left = r.left;
    const pad = 12;
    if (left + w > window.innerWidth - pad) {
      left = Math.max(pad, window.innerWidth - w - pad);
    }
    setCoords({ top: r.bottom + 6, left });
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    function onPointer(e: MouseEvent | TouchEvent) {
      const t = e.target as Node;
      if (rootRef.current?.contains(t)) return;
      if (panelRef.current?.contains(t)) return;
      close();
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [open, close]);

  const panel = open ? (
    <div
      ref={panelRef}
      id="services-mega-menu"
      role="menu"
      aria-labelledby="services-mega-trigger"
      className="fixed z-[130] w-[min(360px,calc(100vw-1.5rem))] max-w-[360px]"
      style={{ top: coords.top, left: coords.left }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="grid max-h-[min(70vh,520px)] grid-cols-1 gap-1 overflow-y-auto overscroll-contain rounded-[var(--radius-xl)] border border-brand-start/20 bg-elevated p-3 shadow-[0_24px_48px_-18px_rgb(0_0_0/0.35),0_0_0_1px_rgb(255_255_255/0.06)_inset]">
        <Link
          href="/services"
          role="menuitem"
          className="rounded-md px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-brand-start/8 hover:text-brand-start"
          onClick={close}
        >
          Все услуги
        </Link>
        <div className="my-1 border-t border-ink/10" />
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            role="menuitem"
            className="rounded-md px-3 py-2 text-sm text-sub transition-colors hover:bg-brand-start/6 hover:text-ink"
            onClick={close}
          >
            {s.title}
          </Link>
        ))}
      </div>
    </div>
  ) : null;

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        className="flex items-center gap-1 text-sm font-medium text-sub transition-colors duration-motion hover:text-brand-start aria-expanded:text-brand-start"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="services-mega-menu"
        id="services-mega-trigger"
        onClick={() => {
          setOpen((v) => !v);
        }}
      >
        Услуги
        <span className="text-xs" aria-hidden>
          ▾
        </span>
      </button>
      {typeof document !== "undefined" && panel ? createPortal(panel, document.body) : null}
    </div>
  );
}
