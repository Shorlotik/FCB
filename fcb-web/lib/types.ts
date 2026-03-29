export type ServiceSlug =
  | "atl"
  | "btl"
  | "creative"
  | "strategy"
  | "design"
  | "brand_id"
  | "event"
  | "ooh"
  | "pr"
  | "smm";

export type Service = {
  slug: ServiceSlug;
  title: string;
  short: string;
  body: string;
  /** Обложка (Unsplash или свой хост из next.config images) */
  coverImage: string;
  /** Краткое описание для alt у изображения */
  coverAlt: string;
  capabilities: string[];
  deliverables: string[];
};

export type CaseStudy = {
  id: string;
  title: string;
  outcome: string;
  industry: string;
  services: ServiceSlug[];
  heroImage?: string;
  challenge: string;
  approach: string;
  result: string;
  gallery?: string[];
  placeholder?: boolean;
};

export type Review = {
  id: string;
  quote: string;
  author: string;
  role?: string;
  client?: string;
};

export type Vacancy = {
  id: string;
  title: string;
  summary: string;
  details: string;
};

export type ContactPerson = {
  name: string;
  role: string;
  email: string;
};

export type ContactGroup = {
  id: string;
  title: string;
  people: ContactPerson[];
};

export type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};
