import servicesData from "@/content/services.json";
import casesData from "@/content/cases.json";
import siteData from "@/content/site.json";
import reviewsData from "@/content/reviews.json";
import vacanciesData from "@/content/vacancies.json";
import type {
  CaseStudy,
  ContactGroup,
  Review,
  Service,
  ServiceSlug,
  Vacancy,
} from "@/lib/types";

export function getServices(): Service[] {
  return servicesData as Service[];
}

export function getServiceBySlug(slug: string): Service | undefined {
  return getServices().find((s) => s.slug === slug);
}

export function getServiceSlugs(): ServiceSlug[] {
  return getServices().map((s) => s.slug);
}

export function getCases(): CaseStudy[] {
  return casesData as CaseStudy[];
}

export function getCaseById(id: string): CaseStudy | undefined {
  return getCases().find((c) => c.id === id);
}

export function getReviews(): Review[] {
  return reviewsData as Review[];
}

export function getVacancies(): Vacancy[] {
  return vacanciesData as Vacancy[];
}

export function getContactGroups(): ContactGroup[] {
  return (siteData as { contactGroups: ContactGroup[] }).contactGroups;
}

export type SiteMeta = {
  name: string;
  tagline: string;
  /** Канонический URL сайта (sitemap, robots, metadataBase) */
  url: string;
  phone: string;
  emails: { info: string; hr: string };
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  /** WGS84 для карты и schema.org GeoCoordinates */
  geo?: { lat: number; lon: number };
  clients: {
    id: string;
    name: string;
    segment: string;
    summary: string;
    image: string;
    imageAlt: string;
  }[];
  partners: { name: string; id: string; image: string; imageAlt: string }[];
  stats: { label: string; value: string }[];
  aboutLead: string;
  neverFinished: string;
};

export function getSiteMeta(): SiteMeta {
  return siteData as SiteMeta;
}
