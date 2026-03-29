import { getServices } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";

type Props = {
  limit?: number;
  title?: string;
  /** When false, only the grid (and optional «Все услуги») — use when the page already has H1 + intro. */
  showHeading?: boolean;
};

export function ServicesBento({
  limit,
  title = "Услуги",
  showHeading = true,
}: Props) {
  const all = getServices();
  const list = limit ? all.slice(0, limit) : all;

  return (
    <div>
      {showHeading ? (
        <>
          <h2 className="font-display text-h2 font-bold text-ink">{title}</h2>
          <div className="heading-rule mt-4" aria-hidden />
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-sub md:text-lg md:leading-relaxed">
            Полный цикл: от стратегии и айдентики до медиа, событий и digital.
          </p>
        </>
      ) : null}
      <ul
        className={
          showHeading
            ? "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {list.map((s, i) => (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-ink/[0.08] bg-elevated shadow-card transition duration-motion hover:-translate-y-1 hover:border-brand-start/40 hover:shadow-[0_20px_50px_-20px_rgb(0_180_255/0.22)]"
            >
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted">
                <Image
                  src={s.coverImage}
                  alt={s.coverAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold text-brand-start">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-h4 font-bold text-ink group-hover:text-brand-start">
                  {s.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-sub">{s.short}</p>
                <span className="mt-4 text-sm font-semibold text-ink">
                  Подробнее →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {limit ? (
        <div className="mt-8">
          <Link
            href="/services"
            className="text-sm font-semibold text-brand-start hover:underline"
          >
            Все услуги
          </Link>
        </div>
      ) : null}
    </div>
  );
}
