import type { Metadata } from "next";
import Link from "next/link";
import { HiringForm } from "@/components/forms/HiringForm";

export const metadata: Metadata = {
  title: "Работа у нас",
  description:
    "Отклик на вакансии FCBMINSK: контакты, опыт, портфолио и фото.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 section-y md:px-8">
      <nav className="text-xs text-sub" aria-label="Хлебные крошки">
        <Link href="/" className="hover:text-ink">
          Главная
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Работа у нас</span>
      </nav>
      <h1 className="mt-6 font-display text-display-lg font-extrabold text-ink">
        Работа у нас
      </h1>
      <div className="heading-rule mt-5" aria-hidden />
      <p className="mt-4 text-base leading-relaxed text-sub md:text-lg md:leading-relaxed">
        Сначала открытые позиции на странице{" "}
        <Link href="/vacancy" className="font-semibold text-brand-start hover:underline">
          Вакансии
        </Link>
        , затем — форма отклика.
      </p>
      <div className="mt-10">
        <HiringForm />
      </div>
    </div>
  );
}
