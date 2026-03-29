import type { Metadata } from "next";
import Link from "next/link";
import { ServicesBento } from "@/components/sections/ServicesBento";
import { MotionSection } from "@/components/sections/MotionSection";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "ATL, BTL, креатив, стратегия, дизайн, брендинг, ивенты, OOH, PR и SMM — полный цикл под ключ.",
};

export default function ServicesPage() {
  return (
    <>
      <div className="border-b border-ink/[0.06] mesh-hero grain-hero">
        <div className="mx-auto max-w-content px-4 section-y md:px-8">
          <nav className="text-xs text-sub" aria-label="Хлебные крошки">
            <Link href="/" className="hover:text-ink">
              Главная
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink">Услуги</span>
          </nav>
          <h1 className="mt-6 font-display text-display-lg font-extrabold text-ink">
            Услуги
          </h1>
          <div className="heading-rule mt-5" aria-hidden />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-sub md:text-lg md:leading-relaxed">
            Полный цикл: от стратегии и айдентики до медиа, событий и digital.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-content px-4 section-y md:px-8">
        <MotionSection>
          <ServicesBento showHeading={false} />
        </MotionSection>
      </div>
    </>
  );
}
