import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getServiceBySlug, getServices } from "@/lib/content";
import { getDisplayCases } from "@/lib/cases";
import { CaseCard } from "@/components/cases/CaseCard";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) return { title: "Услуга" };
  return {
    title: s.title,
    description: s.short,
    openGraph: {
      images: [
        {
          url: s.coverImage,
          width: 1600,
          height: 1000,
          alt: s.coverAlt,
        },
      ],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) notFound();

  const related = getDisplayCases()
    .filter((c) => c.services.includes(s.slug))
    .slice(0, 2);

  return (
    <article className="border-b border-ink/[0.06] bg-elevated mesh-hero grain-hero">
      <div className="mx-auto grid max-w-content gap-12 px-4 section-y md:grid-cols-2 md:px-8">
        <div>
          <nav className="text-xs text-sub" aria-label="Хлебные крошки">
            <Link href="/" className="hover:text-ink">
              Главная
            </Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-ink">
              Услуги
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{s.title}</span>
          </nav>
          <h1 className="mt-6 font-display text-display-lg font-extrabold text-ink">
            {s.title}
          </h1>
          <div className="heading-rule mt-5" aria-hidden />
          <p className="mt-6 text-base leading-relaxed text-sub md:text-lg md:leading-relaxed">
            {s.body}
          </p>
        </div>
        <div className="relative min-h-[240px] overflow-hidden rounded-[var(--radius-xl)] shadow-card md:min-h-[320px]">
          <Image
            src={s.coverImage}
            alt={s.coverAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-ink/10"
            aria-hidden
          />
        </div>
      </div>
      <div className="mx-auto max-w-content px-4 section-y md:px-8">
        <div className="grid gap-12 md:grid-cols-2">
          <section>
            <h2 className="font-display text-h3 font-bold text-ink">
              Компетенции
            </h2>
            <div className="heading-rule mt-3" aria-hidden />
            <ul className="mt-5 list-inside list-disc space-y-2 text-sub">
              {s.capabilities.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-display text-h3 font-bold text-ink">
              Что отдаём
            </h2>
            <div className="heading-rule mt-3" aria-hidden />
            <ul className="mt-5 list-inside list-disc space-y-2 text-sub">
              {s.deliverables.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>
        </div>
        {related.length > 0 ? (
          <section className="mt-16">
            <h2 className="font-display text-h3 font-bold text-ink">
              Связанные кейсы
            </h2>
            <div className="heading-rule mt-3" aria-hidden />
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.map((c) => (
                <li key={c.id}>
                  <CaseCard item={c} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        <p className="mt-12">
          <Link
            href="/client"
            className="font-semibold text-brand-start hover:underline"
          >
            Обсудить задачу →
          </Link>
        </p>
      </div>
    </article>
  );
}
