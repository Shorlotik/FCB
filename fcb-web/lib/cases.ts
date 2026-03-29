import { getCaseById, getCases } from "@/lib/content";
import type { CaseStudy } from "@/lib/types";

const CURATED_PLACEHOLDERS: CaseStudy[] = [
  {
    id: "ph-retail",
    title: "Retail · под NDA",
    outcome: "Рост узнаваемости и конверсии в сезонной кампании",
    industry: "Retail",
    services: ["atl", "creative", "ooh"],
    heroImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80",
    challenge:
      "Задача и результаты скрыты соглашением о конфиденциальности — показываем формат работы без раскрытия бренда.",
    approach:
      "Стратегия медиамикса, креативные механики и OOH в ключевых точках контакта.",
    result: "Стабильный рост вовлечённости и выполнение KPI по узнаваемости.",
    placeholder: true,
  },
  {
    id: "ph-fmcg",
    title: "FMCG · комплексный запуск",
    outcome: "Единая визуальная система и активации на местах продаж",
    industry: "FMCG",
    services: ["btl", "design", "smm"],
    heroImage:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80",
    challenge: "Синхронизировать digital и offline в одной истории бренда.",
    approach: "Дизайн-система, BTL-навигация, поддержка в соцсетях.",
    result: "Согласованный customer journey от полки до подписки в соцсетях.",
    placeholder: true,
  },
  {
    id: "ph-tech",
    title: "B2B · performance + PR",
    outcome: "Лиды и упоминания в отраслевых медиа",
    industry: "B2B",
    services: ["pr", "strategy", "creative"],
    heroImage:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80",
    challenge: "Усилить доверие к продукту на конкурентном рынке.",
    approach: "PR-повестка, контент для воронки, креативные форматы под сегменты.",
    result: "Рост качественных лидов и охватов в целевых изданиях.",
    placeholder: true,
  },
];

export function getDisplayCases(): CaseStudy[] {
  const all = getCases();
  const real = all.filter((c) => !c.placeholder);
  if (real.length === 0) {
    return CURATED_PLACEHOLDERS;
  }
  return all;
}

export function getFeaturedCases(count = 3): CaseStudy[] {
  return getDisplayCases().slice(0, count);
}

/** Detail page: файл кейсов или кураторский плейсхолдер (если реальных нет). */
export function getCaseForDetail(id: string): CaseStudy | undefined {
  const fromFile = getCaseById(id);
  if (fromFile) return fromFile;
  return CURATED_PLACEHOLDERS.find((c) => c.id === id);
}

export function industriesFromCases(cases: CaseStudy[]): string[] {
  const set = new Set(cases.map((c) => c.industry));
  return Array.from(set).sort();
}

/** Все id для SSG: реальные из CMS + плейсхолдеры (прямые ссылки не дают 404). */
export function getAllCaseStaticIds(): { id: string }[] {
  const ids = new Set<string>();
  getCases().forEach((c) => ids.add(c.id));
  CURATED_PLACEHOLDERS.forEach((c) => ids.add(c.id));
  return Array.from(ids, (id) => ({ id }));
}
