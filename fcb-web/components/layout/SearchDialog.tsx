"use client";

import type { SearchEntry } from "@/lib/search-index";
import { filterSearchIndex } from "@/lib/search-index";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type Props = {
  entries: SearchEntry[];
};

function useDebouncedValue<T>(value: T, ms: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return debounced;
}

export function SearchDialog({ entries }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const debouncedQ = useDebouncedValue(q, 200);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(-1);

  const results = useMemo(
    () => filterSearchIndex(debouncedQ, entries),
    [debouncedQ, entries],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      setActive(-1);
    } else {
      setQ("");
      setActive(-1);
    }
  }, [open]);

  useEffect(() => {
    setActive(-1);
  }, [debouncedQ]);

  useEffect(() => {
    if (active < 0 || !listRef.current) return;
    const el = listRef.current.querySelector(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const close = useCallback(() => setOpen(false), []);

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!results.length) return;
      setActive((i) => {
        if (i < 0) return 0;
        return Math.min(results.length - 1, i + 1);
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(-1, i - 1));
    } else if (e.key === "Enter" && active >= 0 && results[active]) {
      e.preventDefault();
      router.push(results[active].href);
      close();
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full border border-ink/12 bg-elevated px-3 py-2 text-sm text-sub shadow-sm transition duration-motion hover:border-brand-start/35 hover:text-brand-start"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span aria-hidden>⌕</span>
        <span className="hidden sm:inline">Поиск</span>
        <kbd className="hidden rounded border border-ink/15 bg-muted px-1.5 py-0.5 text-[10px] font-mono sm:inline">
          ⌘K
        </kbd>
      </button>

      {open
        ? createPortal(
            <div
              className="fixed inset-0 z-[120] flex items-start justify-center bg-ink/80 p-4 pt-[max(3rem,12vh)] backdrop-blur-sm"
              style={{
                paddingLeft: "max(1rem, env(safe-area-inset-left))",
                paddingRight: "max(1rem, env(safe-area-inset-right))",
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Поиск по сайту"
              onMouseDown={(e) => {
                if (e.target === e.currentTarget) close();
              }}
            >
              <div className="w-full max-w-lg rounded-[var(--radius-xl)] border border-brand-start/25 bg-elevated shadow-[0_24px_64px_-16px_rgb(0_0_0/0.25)]">
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Страницы, услуги, кейсы…"
                  className="w-full border-b border-brand-start/15 bg-transparent px-4 py-4 text-ink placeholder:text-sub focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-start/20"
                  aria-autocomplete="list"
                  aria-controls="search-results"
                  aria-activedescendant={
                    active >= 0 ? `search-opt-${active}` : undefined
                  }
                />
                <ul
                  ref={listRef}
                  id="search-results"
                  role="listbox"
                  aria-label="Результаты"
                  className="max-h-[50vh] overflow-auto p-2"
                >
                  {results.map((r, idx) => (
                    <li key={r.id} role="presentation">
                      <Link
                        id={`search-opt-${idx}`}
                        role="option"
                        aria-selected={active === idx}
                        data-idx={idx}
                        href={r.href}
                        onClick={close}
                        className={cn(
                          "flex items-center justify-between rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-brand-start/8",
                          active === idx && "bg-brand-start/12",
                        )}
                        onMouseEnter={() => setActive(idx)}
                      >
                        <span className="font-medium text-ink">{r.title}</span>
                        <span className="text-xs uppercase tracking-wide text-sub">
                          {r.kind}
                        </span>
                      </Link>
                    </li>
                  ))}
                  {results.length === 0 ? (
                    <li className="px-3 py-6 text-center text-sm text-sub">
                      Ничего не найдено
                    </li>
                  ) : null}
                </ul>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-ink/10 px-4 py-2 text-xs text-sub">
                  <span>↑↓ · Enter · Esc</span>
                  <Link
                    href={
                      debouncedQ
                        ? `/search?q=${encodeURIComponent(debouncedQ)}`
                        : "/search"
                    }
                    className="font-medium text-brand-start hover:underline"
                    onClick={close}
                  >
                    Страница поиска
                  </Link>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
