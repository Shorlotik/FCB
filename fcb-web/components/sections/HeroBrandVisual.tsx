/**
 * Герой-блок справа: типографика FCB, сетка и цветовые пятна — без Canvas и внешних картинок.
 */
export function HeroBrandVisual() {
  return (
    <div
      className="hero-brand-visual flex h-full min-h-[280px] w-full flex-col justify-between p-6 sm:p-8 md:p-10"
      role="img"
      aria-label="FCB Minsk — фирменная идентичность: стратегия, креатив, медиа"
    >
      <span className="hero-brand-visual__grid" aria-hidden />

      <span
        className="hero-brand-orb hero-brand-orb--a -right-4 -top-6 h-36 w-36 bg-brand-start/35 sm:h-44 sm:w-44"
        aria-hidden
      />
      <span
        className="hero-brand-orb hero-brand-orb--b -bottom-8 left-1/4 h-32 w-32 -translate-x-1/2 bg-brand-mid/30 sm:h-40 sm:w-40"
        aria-hidden
      />
      <span
        className="hero-brand-orb hero-brand-orb--c right-1/4 top-1/2 h-28 w-28 translate-x-1/2 bg-brand-end/28 sm:h-36 sm:w-36"
        aria-hidden
      />

      <div className="relative z-[1] flex flex-1 flex-col justify-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-brand-start sm:text-xs">
          Полный цикл
        </p>
        <p
          className="mt-3 font-display font-extrabold leading-[0.92] tracking-[-0.06em] text-gradient-fcb"
          style={{ fontSize: "clamp(3.25rem, 11vw, 5.75rem)" }}
        >
          FCB
        </p>
        <p className="mt-1 font-display text-xl font-bold tracking-tight text-ink/90 sm:text-2xl md:text-3xl">
          MINSK
        </p>
        <div
          className="mt-5 h-px max-w-[8rem] bg-gradient-to-r from-brand-start via-brand-mid to-brand-end"
          aria-hidden
        />
        <ul className="mt-6 flex flex-wrap gap-2">
          {["Стратегия", "Креатив", "Медиа", "Digital"].map((label) => (
            <li key={label}>
              <span className="inline-block rounded-full border border-ink/[0.08] bg-white/95 px-3 py-1 text-[11px] font-semibold text-sub shadow-sm sm:text-xs">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="relative z-[1] mt-6 max-w-[20rem] text-xs leading-relaxed text-sub sm:text-sm">
        Три акцента бренда — в логотипе и в том, как мы строим коммуникацию: от исследований до
        запуска.
      </p>
    </div>
  );
}
