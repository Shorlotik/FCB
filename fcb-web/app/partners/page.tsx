import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSiteMeta } from "@/lib/content";

export const metadata: Metadata = {
  title: "Партнёры",
  description: "Партнёрская сеть FCBMINSK: медиа, платформы, продакшн.",
};

export default function PartnersPage() {
  const { partners } = getSiteMeta();

  return (
    <div className="mx-auto max-w-content px-4 section-y md:px-8">
      <nav className="text-xs text-sub" aria-label="Хлебные крошки">
        <Link href="/" className="hover:text-ink">
          Главная
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Партнёры</span>
      </nav>
      <h1 className="mt-6 font-display text-display-lg font-extrabold text-ink">
        Партнёры
      </h1>
      <div className="heading-rule mt-5" aria-hidden />
      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {partners.map((p) => (
          <li
            key={p.id}
            className="group flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-ink/[0.08] bg-elevated shadow-card transition-[transform,box-shadow] duration-motion hover:-translate-y-0.5 hover:shadow-soft"
          >
            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted">
              <Image
                src={p.image}
                alt={p.imageAlt}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="px-6 py-6 text-lg font-medium text-ink">{p.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
