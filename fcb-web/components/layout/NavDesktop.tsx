import { ServicesMegaMenu } from "@/components/layout/ServicesMegaMenu";
import Link from "next/link";

const AFTER_SERVICES = [
  { href: "/cases", label: "Кейсы" },
  { href: "/clients", label: "Клиенты" },
  { href: "/partners", label: "Партнёры" },
  { href: "/vacancy", label: "Вакансии" },
  { href: "/otzyvy", label: "Отзывы" },
  { href: "/contacts", label: "Контакты" },
];

export function NavDesktop() {
  return (
    <nav
      className="flex min-w-max items-center gap-4 py-1 pr-2 xl:gap-6 2xl:gap-8"
      aria-label="Основная"
    >
      <Link
        href="/about"
        className="text-sm font-medium text-sub transition-colors duration-motion hover:text-brand-start"
      >
        О компании
      </Link>

      <ServicesMegaMenu />

      {AFTER_SERVICES.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium text-sub transition-colors duration-motion hover:text-brand-start"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
