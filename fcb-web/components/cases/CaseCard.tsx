import { cn } from "@/lib/cn";
import type { CaseStudy } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  item: CaseStudy;
};

export function CaseCard({ item }: Props) {
  return (
    <Link
      href={`/cases/${item.id}`}
      aria-label={`Кейс: ${item.title}`}
      className="group block overflow-hidden rounded-[var(--radius-xl)] border border-ink/[0.08] bg-elevated shadow-card transition-[transform,box-shadow] duration-motion hover:-translate-y-1 hover:shadow-soft"
    >
      <div
        className={cn(
          "relative aspect-[16/10] w-full overflow-hidden bg-muted",
          !item.heroImage && "grain-hero",
        )}
      >
        {item.heroImage ? (
          <Image
            src={item.heroImage}
            alt={`Обложка кейса: ${item.title}`}
            fill
            unoptimized
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, rgb(0 180 255 / 0.22) 0%, rgb(255 107 53 / 0.16) 45%, rgb(233 30 140 / 0.14) 100%)`,
            }}
          />
        )}
        {item.placeholder ? (
          <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-elevated">
            Пример формата
          </span>
        ) : null}
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-ink group-hover:text-brand-start">
          {item.title}
        </h3>
        <p className="mt-2 text-sm text-sub">{item.outcome}</p>
        <p className="mt-3 text-xs font-medium uppercase tracking-wide text-sub">
          {item.industry}
        </p>
      </div>
    </Link>
  );
}
