import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getDisplayCases } from "@/lib/cases";
import { CaseGrid } from "@/components/cases/CaseGrid";
import { CasesExplorer } from "@/components/cases/CasesExplorer";
import { MotionSection } from "@/components/sections/MotionSection";

export const metadata: Metadata = {
  title: "Кейсы",
  description:
    "Реализованные проекты FCBMINSK: фильтр по отрасли и услугам, крупные визуалы и краткие результаты.",
};

export default function CasesPage() {
  const cases = getDisplayCases();

  return (
    <div className="mx-auto max-w-content px-4 section-y md:px-8">
      <nav className="text-xs text-sub" aria-label="Хлебные крошки">
        <Link href="/" className="hover:text-ink">
          Главная
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">Кейсы</span>
      </nav>
      <h1 className="mt-6 font-display text-display-lg font-extrabold text-ink">
        Кейсы
      </h1>
      <div className="heading-rule mt-5" aria-hidden />
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-sub md:text-lg md:leading-relaxed">
        Подборка работ агентства. Используйте фильтры по отрасли и услуге.
      </p>
      <MotionSection className="mt-12">
        <Suspense fallback={<CaseGrid cases={cases} />}>
          <CasesExplorer cases={cases} />
        </Suspense>
      </MotionSection>
    </div>
  );
}
