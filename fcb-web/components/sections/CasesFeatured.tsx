import { getFeaturedCases } from "@/lib/cases";
import { CaseGrid } from "@/components/cases/CaseGrid";
import Link from "next/link";

type Props = {
  tone?: "light" | "dark";
};

export function CasesFeatured({ tone = "light" }: Props) {
  const cases = getFeaturedCases(6);
  const isDark = tone === "dark";

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2
            className={
              isDark
                ? "font-display text-h2 font-bold text-elevated"
                : "font-display text-h2 font-bold text-ink"
            }
          >
            Кейсы
          </h2>
          <div
            className={`heading-rule mt-4 ${isDark ? "opacity-90" : ""}`}
            aria-hidden
          />
          <p
            className={
              isDark
                ? "mt-4 max-w-xl text-elevated/70"
                : "mt-2 max-w-xl text-sub"
            }
          >
            Подборка работ: стратегия, креатив и реализация в одной истории.
          </p>
        </div>
        <Link
          href="/cases"
          className={
            isDark
              ? "shrink-0 text-sm font-semibold text-brand-start hover:text-brand-mid hover:underline"
              : "shrink-0 text-sm font-semibold text-brand-start hover:underline"
          }
        >
          Все кейсы
        </Link>
      </div>
      <div className="mt-10">
        <CaseGrid cases={cases} />
      </div>
    </div>
  );
}
