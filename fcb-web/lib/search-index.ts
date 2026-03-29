import { getServices } from "@/lib/content";
import { getDisplayCases } from "@/lib/cases";

export type SearchEntry = {
  id: string;
  title: string;
  href: string;
  kind: "page" | "service" | "case";
};

const STATIC_PAGES: SearchEntry[] = [
  { id: "home", title: "Главная", href: "/", kind: "page" },
  { id: "about", title: "О компании", href: "/about", kind: "page" },
  { id: "services", title: "Услуги", href: "/services", kind: "page" },
  { id: "cases", title: "Кейсы", href: "/cases", kind: "page" },
  { id: "clients", title: "Клиенты", href: "/clients", kind: "page" },
  { id: "partners", title: "Партнёры", href: "/partners", kind: "page" },
  { id: "vacancy", title: "Вакансии", href: "/vacancy", kind: "page" },
  { id: "reviews", title: "Отзывы", href: "/otzyvy", kind: "page" },
  { id: "contacts", title: "Контакты", href: "/contacts", kind: "page" },
  { id: "client", title: "Стать клиентом", href: "/client", kind: "page" },
  { id: "work", title: "Работа у нас", href: "/work", kind: "page" },
  { id: "search", title: "Поиск", href: "/search", kind: "page" },
  {
    id: "privacy",
    title: "Политика персональных данных",
    href: "/privacy",
    kind: "page",
  },
];

export function buildSearchIndex(): SearchEntry[] {
  const services = getServices().map((s) => ({
    id: `svc-${s.slug}`,
    title: s.title,
    href: `/services/${s.slug}`,
    kind: "service" as const,
  }));

  const cases = getDisplayCases().map((c) => ({
    id: `case-${c.id}`,
    title: c.title,
    href: `/cases/${c.id}`,
    kind: "case" as const,
  }));

  return [...STATIC_PAGES, ...services, ...cases];
}

export function filterSearchIndex(
  query: string,
  index: SearchEntry[],
): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return index.slice(0, 12);
  return index.filter((e) => e.title.toLowerCase().includes(q)).slice(0, 20);
}
