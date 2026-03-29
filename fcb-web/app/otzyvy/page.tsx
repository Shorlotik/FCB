import type { Metadata } from "next";
import Link from "next/link";
import { getReviews } from "@/lib/content";

export const metadata: Metadata = {
  title: "Отзывы",
  description: "Отзывы клиентов FCBMINSK о совместной работе.",
};

export default function ReviewsPage() {
  const reviews = getReviews();

  return (
    <div className="mx-auto max-w-content px-4 section-y md:px-8">
      <nav className="text-xs text-sub" aria-label="Хлебные крошки">
        <Link href="/" className="hover:text-ink">
          Главная
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Отзывы</span>
      </nav>
      <h1 className="mt-6 font-display text-display-lg font-extrabold text-ink">
        Отзывы
      </h1>
      <div className="heading-rule mt-5" aria-hidden />
      <ul className="mt-12 space-y-10">
        {reviews.map((r) => (
          <li
            key={r.id}
            className="border-l-4 border-brand-start pl-6 md:pl-10"
          >
            <blockquote className="font-display text-xl font-semibold leading-snug text-ink md:text-2xl">
              «{r.quote}»
            </blockquote>
            <footer className="mt-4 text-sm text-sub">
              <cite className="not-italic font-medium text-ink">{r.author}</cite>
              {r.role ? `, ${r.role}` : null}
              {r.client ? ` · ${r.client}` : null}
            </footer>
          </li>
        ))}
      </ul>
    </div>
  );
}
