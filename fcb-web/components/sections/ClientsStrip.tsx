import Image from "next/image";
import Link from "next/link";
import { getSiteMeta } from "@/lib/content";

export function ClientsStrip() {
  const { clients } = getSiteMeta();

  return (
    <div className="rounded-[var(--radius-xl)] border border-brand-start/15 bg-elevated/90 px-6 py-12 shadow-[0_0_48px_-16px_rgb(0_180_255/0.14)] backdrop-blur-md md:px-10">
      <h2 className="text-center font-display text-h3 font-bold text-ink">
        Клиенты агентства FCBMINSK
      </h2>
      <div className="heading-rule mx-auto mt-6 max-w-none" aria-hidden />
      <ul className="mt-10 flex flex-wrap items-stretch justify-center gap-6 md:gap-8">
        {clients.map((c) => (
          <li key={c.id} className="w-[calc(50%-0.75rem)] max-w-[140px] sm:w-auto sm:max-w-none">
            <Link
              href="/clients"
              className="group flex flex-col items-center gap-3 text-center"
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-brand-start/20 shadow-md ring-2 ring-transparent transition duration-motion group-hover:ring-brand-start/30 sm:h-[4.5rem] sm:w-[4.5rem]">
                <Image
                  src={c.image}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover transition duration-500 group-hover:scale-110"
                  sizes="80px"
                />
              </div>
              <span className="text-xs font-semibold leading-snug text-ink sm:text-sm">
                {c.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center text-sm text-sub">
        <Link href="/clients" className="font-semibold text-brand-start hover:underline">
          Подробнее о сотрудничестве →
        </Link>
      </p>
    </div>
  );
}
