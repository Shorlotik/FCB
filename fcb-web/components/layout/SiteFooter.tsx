import { Button } from "@/components/ui/Button";
import { getSiteMeta } from "@/lib/content";
import Link from "next/link";

const LINKS = [
  { href: "/about", label: "О компании" },
  { href: "/services", label: "Услуги" },
  { href: "/search", label: "Поиск" },
  { href: "/cases", label: "Кейсы" },
  { href: "/clients", label: "Клиенты" },
  { href: "/partners", label: "Партнёры" },
  { href: "/vacancy", label: "Вакансии" },
  { href: "/otzyvy", label: "Отзывы" },
  { href: "/contacts", label: "Контакты" },
];

export function SiteFooter() {
  const site = getSiteMeta();

  return (
    <footer className="relative z-10 mt-auto border-t border-ink/10 bg-elevated/95 shadow-[0_-8px_40px_-20px_rgb(0_180_255/0.08)] backdrop-blur-md">
      <div className="mx-auto max-w-content px-4 py-12 md:px-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-bold text-ink">
              <span className="text-gradient-fcb">FCB</span>
              <span className="text-ink">MINSK</span>
            </p>
            <div className="heading-rule mt-4" aria-hidden />
            <p className="mt-3 text-sm text-sub">{site.tagline}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button href="/client" variant="secondary" className="!text-xs">
                Стать клиентом
              </Button>
              <Button href="/work" className="!text-xs">
                Работа у нас
              </Button>
            </div>
          </div>
          <nav aria-label="Нижнее меню">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sub transition-colors hover:text-brand-start"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-sm">
            <p className="font-medium text-ink">Связь</p>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="mt-2 block text-sub transition-colors hover:text-ink"
            >
              {site.phone}
            </a>
            <a
              href={`mailto:${site.emails.info}`}
              className="mt-1 block text-sub transition-colors hover:text-ink"
            >
              {site.emails.info}
            </a>
            <a
              href={`mailto:${site.emails.hr}`}
              className="mt-1 block text-sub transition-colors hover:text-ink"
            >
              {site.emails.hr}
            </a>
          </div>
          <div className="text-xs text-sub">
            <p>
              © {new Date().getFullYear()} {site.name}
            </p>
            <Link
              href="/privacy"
              className="mt-2 inline-block transition-colors hover:text-ink"
            >
              Политика обработки персональных данных
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
