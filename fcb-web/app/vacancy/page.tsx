import type { Metadata } from "next";
import Link from "next/link";
import { getVacancies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Вакансии",
  description: "Открытые позиции в FCBMINSK. Отправьте отклик через форму «Работа у нас».",
};

export default function VacancyPage() {
  const list = getVacancies();

  return (
    <div className="mx-auto max-w-content px-4 section-y md:px-8">
      <nav className="text-xs text-sub" aria-label="Хлебные крошки">
        <Link href="/" className="hover:text-ink">
          Главная
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Вакансии</span>
      </nav>
      <h1 className="mt-6 font-display text-display-lg font-extrabold text-ink">
        Вакансии
      </h1>
      <div className="heading-rule mt-5" aria-hidden />
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-sub md:text-lg md:leading-relaxed">
        Хотите в команду? Заполните форму на странице{" "}
        <Link href="/work" className="font-semibold text-brand-start hover:underline">
          Работа у нас
        </Link>
        .
      </p>
      <ul className="mt-12 space-y-4">
        {list.map((v) => (
          <li
            key={v.id}
            className="rounded-[var(--radius-xl)] border border-ink/[0.08] bg-elevated p-6 shadow-card"
          >
            <h2 className="font-display text-h4 font-bold text-ink">{v.title}</h2>
            <p className="mt-2 text-sm text-sub">{v.summary}</p>
            <p className="mt-3 text-sm text-ink">{v.details}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
