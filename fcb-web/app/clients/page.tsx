import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSiteMeta } from "@/lib/content";
import { brandInitials } from "@/lib/brand-initials";

export const metadata: Metadata = {
  title: "Клиенты",
  description:
    "Бренды и компании FCBMINSK: стратегия, креатив, медиа и digital для лидеров рынка.",
};

export default function ClientsPage() {
  const { clients } = getSiteMeta();

  return (
    <div className="mx-auto max-w-content px-4 section-y md:px-8">
      <nav className="text-xs text-sub" aria-label="Хлебные крошки">
        <Link href="/" className="hover:text-ink">
          Главная
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Клиенты</span>
      </nav>
      <h1 className="mt-6 font-display text-display-lg font-extrabold text-ink">
        Клиенты
      </h1>
      <div className="heading-rule mt-5" aria-hidden />
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-sub md:text-lg md:leading-relaxed">
        Мы выстраиваем долгие партнёрства в стратегии, креативе, медиа и digital. Ниже —
        часть брендов, с которыми работаем; фото иллюстрируют сферу и характер задач, а не
        заменяют фирменные логотипы.
      </p>
      <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((c) => {
          const initials = brandInitials(c.name);
          return (
            <li
              key={c.id}
              className="group flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-ink/[0.08] bg-elevated shadow-[0_4px_24px_-8px_rgb(13_13_13/0.1),0_24px_48px_-28px_rgb(0_180_255/0.12)] transition-[transform,box-shadow,border-color] duration-motion hover:-translate-y-1 hover:border-brand-start/25 hover:shadow-[0_20px_50px_-24px_rgb(0_180_255/0.22)]"
            >
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-muted">
                <Image
                  src={c.image}
                  alt={c.imageAlt}
                  fill
                  unoptimized
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent"
                  aria-hidden
                />
                <span className="absolute left-4 top-4 max-w-[calc(100%-2rem)] rounded-full border border-elevated/40 bg-elevated/92 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink shadow-sm backdrop-blur-sm">
                  {c.segment}
                </span>
                <span
                  className="absolute bottom-4 left-4 font-display text-3xl font-extrabold tracking-tight text-elevated drop-shadow-md"
                  aria-hidden
                >
                  {initials}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h2 className="font-display text-xl font-bold text-ink">{c.name}</h2>
                <p className="text-sm leading-relaxed text-sub">{c.summary}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-14 text-center">
        <Link
          href="/cases"
          className="inline-flex items-center gap-2 font-semibold text-brand-start hover:underline"
        >
          Смотреть кейсы →
        </Link>
      </p>
    </div>
  );
}
