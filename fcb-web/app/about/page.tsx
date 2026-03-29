import type { Metadata } from "next";
import Link from "next/link";
import { MotionSection } from "@/components/sections/MotionSection";
import { getSiteMeta } from "@/lib/content";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "FCBMINSK — команда стратегов, креаторов и продюсеров. Три десятилетия опыта в маркетинге и рекламе.",
};

export default function AboutPage() {
  const site = getSiteMeta();

  return (
    <div className="border-b border-ink/[0.06] bg-elevated mesh-hero grain-hero">
      <div className="mx-auto max-w-content px-4 section-y md:px-8">
        <nav className="text-xs text-sub" aria-label="Хлебные крошки">
          <Link href="/" className="hover:text-ink">
            Главная
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">О компании</span>
        </nav>
        <h1 className="mt-6 font-display text-display-lg font-extrabold text-ink">
          О компании
        </h1>
        <div className="heading-rule mt-5" aria-hidden />
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-sub md:text-lg md:leading-relaxed">
          {site.aboutLead}
        </p>
      </div>
      <section className="bg-accent-about px-4 py-16 text-elevated md:px-8 md:py-24">
        <div className="mx-auto max-w-content">
          <h2 className="font-display text-h2 font-bold">FCBMINSK</h2>
          <div
            className="mt-4 h-0.5 w-12 rounded-full bg-white/50"
            aria-hidden
          />
          <p className="mt-6 max-w-3xl text-lg text-white/90">
            Мы создаём и воплощаем идеи, которые меняют поведение потребителя и
            раскрывают потенциал бренда. Предлагаем эффективные комплексные
            решения для продвижения продуктов и услуг клиентов, постоянно
            совершенствуя технологии и процессы.
          </p>
        </div>
      </section>
      <MotionSection className="mx-auto max-w-content px-4 section-y md:px-8">
        <h2 className="font-display text-h2 font-bold text-ink">
          Never finished
        </h2>
        <div className="heading-rule mt-4" aria-hidden />
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-sub md:text-lg md:leading-relaxed">
          {site.neverFinished}
        </p>
        <ul className="mt-12 grid gap-8 sm:grid-cols-3">
          {site.stats.map((s) => (
            <li
              key={s.label}
              className="rounded-[var(--radius-xl)] border border-ink/[0.08] bg-elevated/90 p-6 shadow-card backdrop-blur-sm"
            >
              <p className="font-display text-4xl font-extrabold text-ink md:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm font-medium text-sub">{s.label}</p>
            </li>
          ))}
        </ul>
      </MotionSection>
    </div>
  );
}
