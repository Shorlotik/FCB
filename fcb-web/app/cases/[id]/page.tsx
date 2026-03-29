import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCaseStaticIds, getCaseForDetail } from "@/lib/cases";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return getAllCaseStaticIds();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const c = getCaseForDetail(id);
  if (!c) return { title: "Кейс" };
  return { title: c.title, description: c.outcome };
}

export default async function CaseDetailPage({ params }: Props) {
  const { id } = await params;
  const c = getCaseForDetail(id);
  if (!c) notFound();

  return (
    <article>
      <div className="relative aspect-[21/9] min-h-[200px] w-full bg-muted">
        {c.heroImage ? (
          <Image
            src={c.heroImage}
            alt={`Кейс FCBMINSK: ${c.title}`}
            fill
            unoptimized
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, rgb(0 180 255 / 0.22) 0%, rgb(255 107 53 / 0.16) 45%, rgb(233 30 140 / 0.14) 100%)`,
            }}
          />
        )}
      </div>
      <div className="mx-auto max-w-content px-4 py-12 md:px-8 md:py-20">
        <nav className="text-xs text-sub" aria-label="Хлебные крошки">
          <Link href="/" className="hover:text-ink">
            Главная
          </Link>
          <span className="mx-2">/</span>
          <Link href="/cases" className="hover:text-ink">
            Кейсы
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{c.title}</span>
        </nav>
        <h1 className="mt-6 font-display text-display-lg font-extrabold text-ink">
          {c.title}
        </h1>
        <div className="heading-rule mt-5" aria-hidden />
        <p className="mt-4 text-lg font-medium text-brand-start">{c.outcome}</p>
        {c.placeholder ? (
          <p className="mt-2 text-sm text-sub">
            Пример формата кейса; контент анонимизирован.
          </p>
        ) : null}

        <div className="prose prose-neutral mt-12 max-w-none">
          <h2>Задача</h2>
          <p>{c.challenge}</p>
          <h2>Подход</h2>
          <p>{c.approach}</p>
          <h2>Результат</h2>
          <p>{c.result}</p>
        </div>

        {c.gallery?.length ? (
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {c.gallery.map((src, i) => (
              <li
                key={src}
                className="relative aspect-video overflow-hidden rounded-[var(--radius-xl)]"
              >
                <Image
                  src={src}
                  alt={`${c.title}, материал ${i + 1}`}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              </li>
            ))}
          </ul>
        ) : null}

        <p className="mt-12">
          <Link href="/cases" className="font-semibold text-brand-start hover:underline">
            ← Все кейсы
          </Link>
        </p>
      </div>
    </article>
  );
}
