"use client";

import type { SearchEntry } from "@/lib/search-index";
import { filterSearchIndex } from "@/lib/search-index";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Props = {
  entries: SearchEntry[];
};

export function SearchPageClient({ entries }: Props) {
  const searchParams = useSearchParams();
  const initial = searchParams.get("q") ?? "";
  const [q, setQ] = useState(initial);

  useEffect(() => {
    const next = searchParams.get("q") ?? "";
    setQ(next);
  }, [searchParams]);

  const results = useMemo(() => filterSearchIndex(q, entries), [q, entries]);

  return (
    <div className="mx-auto max-w-content px-4 section-y md:px-8">
      <nav className="text-xs text-sub" aria-label="Хлебные крошки">
        <Link href="/" className="hover:text-ink">
          Главная
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Поиск</span>
      </nav>
      <h1 className="mt-6 font-display text-display-lg font-extrabold text-ink">
        Поиск
      </h1>
      <div className="heading-rule mt-5" aria-hidden />
      <label htmlFor="site-search" className="sr-only">
        Запрос
      </label>
      <input
        id="site-search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Страницы, услуги, кейсы…"
        className="mt-8 w-full max-w-xl rounded-[var(--radius-lg)] border border-ink/[0.1] bg-elevated px-4 py-3.5 text-ink shadow-card backdrop-blur-sm transition-shadow focus:border-brand-start focus:outline-none focus:ring-2 focus:ring-brand-start/35 focus:shadow-[0_0_0_4px_rgb(0_180_255/0.12)]"
      />
      <p className="mt-4 text-sm text-sub">
        Найдено: {results.length}
      </p>
      <ul className="mt-8 divide-y divide-ink/10 border-t border-ink/10">
        {results.map((r) => (
          <li key={r.id}>
            <Link
              href={r.href}
              className="flex items-center justify-between py-4 text-sm hover:bg-muted/50"
            >
              <span className="font-medium text-ink">{r.title}</span>
              <span className="text-xs uppercase text-sub">{r.kind}</span>
            </Link>
          </li>
        ))}
      </ul>
      {results.length === 0 ? (
        <p className="mt-8 text-sub">По запросу ничего не найдено.</p>
      ) : null}
    </div>
  );
}
