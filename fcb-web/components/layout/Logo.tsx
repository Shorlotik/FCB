import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="FCBMINSK — главная"
      className="group font-display text-xl font-bold tracking-tight md:text-2xl"
    >
      <span aria-hidden className="flex items-baseline gap-0">
        <span className="text-gradient-fcb transition-[filter] duration-motion group-hover:brightness-110">
          FCB
        </span>
        <span className="text-ink">MINSK</span>
      </span>
    </Link>
  );
}
