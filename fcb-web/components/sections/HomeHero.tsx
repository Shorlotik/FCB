import { HeroBrandVisual } from "@/components/sections/HeroBrandVisual";
import { Button } from "@/components/ui/Button";

type Props = {
  tagline: string;
  neverFinished: string;
};

export function HomeHero({ tagline, neverFinished }: Props) {
  return (
    <section className="relative overflow-x-clip overflow-y-hidden border-b border-brand-start/10 mesh-hero">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-500/[0.03] via-transparent to-base/50" />
      <div className="pointer-events-none absolute -right-8 top-1/4 h-40 w-40 rounded-full bg-brand-end/[0.07] sm:h-52 sm:w-52 md:-right-16" />
      <div className="relative mx-auto grid max-w-content gap-12 px-4 section-y-lg md:grid-cols-2 md:items-center md:gap-16 md:px-8">
        <div>
          <p className="inline-flex max-w-full flex-wrap items-center gap-x-1 rounded-full border border-brand-start/25 bg-brand-start/[0.07] px-2.5 py-1 text-[9px] font-bold uppercase leading-tight tracking-[0.12em] text-brand-start sm:px-3 sm:text-[10px] sm:tracking-[0.18em] md:text-xs md:tracking-[0.2em]">
            Стратегия · Креатив · Технологии
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-sub md:text-sm">
            {tagline}
          </p>
          <h1 className="mt-5 font-display text-display-lg font-extrabold text-ink">
            <span className="text-gradient-fcb">FCB</span>
            <span className="text-ink">MINSK</span>
          </h1>
          <div className="heading-rule mt-5" aria-hidden />
          <p className="mt-5 font-display text-base font-bold tracking-[0.12em] text-ink md:text-lg">
            NVR FNSHD
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-sub md:text-lg md:leading-relaxed">
            {neverFinished}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/client">Стать клиентом</Button>
            <Button href="/cases" variant="secondary">
              Смотреть кейсы
            </Button>
          </div>
        </div>
        <figure className="flex flex-col gap-3" aria-labelledby="hero-brand-caption">
          <div className="min-h-[280px] shrink-0 md:min-h-[440px]">
            <HeroBrandVisual />
          </div>
          <figcaption
            id="hero-brand-caption"
            className="text-xs leading-relaxed text-sub sm:text-sm md:px-1"
          >
            Визуальный блок без тяжёлой 3D-графики: быстро грузится и хорошо смотрится на любом
            экране.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
