# Task list: PRD FCBMINSK marketing site redesign

**Source PRD:** `tasks/prd-fcbminsk-marketing-site-redesign.md`

## Relevant Files

- `fcb-web/package.json` — Next.js, Tailwind, R3F, motion deps
- `fcb-web/app/layout.tsx` — Root layout, fonts, providers, header/footer slots
- `fcb-web/app/globals.css` — CSS variables (design tokens), base styles
- `fcb-web/tailwind.config.ts` — Theme extension from tokens
- `fcb-web/components/layout/SiteHeader.tsx` — Logo, desktop nav, mobile drawer trigger, search, CTAs
- `fcb-web/components/layout/SiteFooter.tsx` — Links, contacts, legal
- `fcb-web/components/layout/NavDesktop.tsx` — Horizontal nav + services mega-menu
- `fcb-web/components/layout/NavMobile.tsx` — Drawer + focus trap
- `fcb-web/components/layout/SearchDialog.tsx` — Overlay / results, keyboard nav
- `fcb-web/components/ui/*` — Button, Card, Chip, Input, Label, Textarea, etc.
- `fcb-web/components/sections/*` — Home/about section compositions
- `fcb-web/components/cases/CaseCard.tsx`, `CaseFilters.tsx`, `CaseGrid.tsx`
- `fcb-web/components/forms/LeadForm.tsx`, `HiringForm.tsx`, `FormStepper.tsx`
- `fcb-web/components/three/LazyCanvas.tsx`, `HeroScene.tsx`, `components/three/scenes/*`
- `fcb-web/lib/motion.ts` — `useReducedMotion`, helpers
- `fcb-web/lib/cases.ts` — Filter logic, URL query sync, placeholder merge
- `fcb-web/content/*` — JSON or MDX: services, cases, reviews, vacancies, site copy
- `fcb-web/app/services/[slug]/page.tsx` — Dynamic service pages
- `fcb-web/app/cases/page.tsx`, `app/cases/[slug]/page.tsx`
- `fcb-web/app/api/lead/route.ts`, `app/api/hiring/route.ts` — Form handlers, validation, upload proxy

### Notes

- Final repo may live under `fcb-web/` or project root; adjust paths when scaffolding.
- Почта заявок: опционально **Resend** — см. комментарии в `fcb-web/lib/submission-notify.ts` (`RESEND_API_KEY`, `FCB_RESEND_FROM`, `FCB_LEAD_NOTIFY_EMAIL`, `FCB_HR_NOTIFY_EMAIL`). Иначе API возвращает `{ ok: true, emailed: false }`.
- Альтернатива Bitrix/CRM — подменить вызовы в `app/api/lead` и `app/api/hiring`.
- Unit/E2E tests are out of scope unless the team requests them.

## Tasks

- [x] 1.0 **Scaffold app, design tokens, and global layout**
  - [x] 1.1 Initialize Next.js (App Router), TypeScript, Tailwind, ESLint; add `src` or flat `app/` per preference.
  - [x] 1.2 Implement CSS variables for colors, typography scale, spacing, radii, shadows per PRD §6.1; map to `tailwind.config`.
  - [x] 1.3 Add font loading (next/font) for display + body stack; set base `font-size` / line-height for RU copy.
  - [x] 1.4 Create `SiteHeader` + `SiteFooter` shells with placeholder nav links matching IA (Home, About, Services, Cases, Clients, Partners, Vacancies, Reviews, Contacts).
  - [x] 1.5 Wire root `layout.tsx`: metadata default, `lang="ru"`, skip-link, main landmark.

- [x] 2.0 **Navigation, search, and CTAs (desktop + mobile)**
  - [x] 2.1 Build `NavDesktop`: all primary links visible at `lg+`; Services as mega-menu or grouped flyout listing all 10 sub-services.
  - [x] 2.2 Build `NavMobile`: drawer/sheet with same IA; focus trap and ESC close; visible search entry.
  - [x] 2.3 Add persistent **Стать клиентом** and **Работа у нас** (header + footer); route to dedicated pages or modals (pick one approach and keep URLs stable).
  - [x] 2.4 Implement `SearchDialog` MVP: index of routes + case titles + service names; keyboard navigation; debounced filter.
  - [x] 2.5 Optional: sync search open to `?q=` or `/search` route for shareable results.

- [x] 3.0 **Content model and all marketing routes**
  - [x] 3.1 Define content schema (TypeScript types) for services, cases, clients, partners, reviews, vacancies, contacts, team/stats.
  - [x] 3.2 Populate `content/` (JSON or MDX) with copy aligned to live site intent; include 10 service slugs: `atl`, `btl`, `creative`, `strategy`, `design`, `brand_id`, `event`, `ooh`, `pr`, `smm`.
  - [x] 3.3 Implement pages: `/`, `/about`, `/services`, `/services/[slug]`, `/clients`, `/partners`, `/vacancy`, `/otzyvy` (or `/reviews` if slug finalized), `/contacts`.
  - [x] 3.4 Add unique `metadata` (title, description) per route; Organization / LocalBusiness JSON-LD on home or contacts.
  - [x] 3.5 Contacts page: group by audience (СМИ, HR, клиенты) with phone **+375 (17) 224 22 17**, **info@fcb.by**, **hr@fcb.by**, role emails from PRD.
  - [x] 3.6 Weave **«Never finished»** narrative into home + about copy blocks (not logo-only).

- [x] 4.0 **Cases: grid, filters, detail, zero-empty-state**
  - [x] 4.1 Build `CaseCard` (aspect ratio, title, outcome line, link) and `CaseGrid` (responsive columns).
  - [x] 4.2 Build `CaseFilters` (industry + service chips); client-side filter; optional `useSearchParams` URL sync.
  - [x] 4.3 Implement `lib/cases.ts`: merge CMS-like array with **curated placeholders** when live list length is 0 (PRD §4.3 item 9).
  - [x] 4.4 Case detail template: hero media, challenge / approach / outcome, gallery; responsive images (`next/image`, `sizes`).
  - [x] 4.5 Home: featured cases section (e.g. 3 cards) pulling from same content source.

- [x] 5.0 **Forms: lead (multi-step) and hiring**
  - [x] 5.1 `LeadForm`: fields per PRD §4.4 item 10; grouped into ~3 steps with visible progress; required markers and consent checkbox text aligned to live intent.
  - [x] 5.2 `HiringForm`: fields per item 11; validation for Telegram, email, phone patterns.
  - [x] 5.3 Accessible patterns: `<label htmlFor>`, `aria-describedby` for errors, `aria-invalid`, focus first error on submit.
  - [x] 5.4 File inputs: accept/size attributes, helper text for max size; client-side guard + server validation in API route.
  - [x] 5.5 `POST /api/lead` and `POST /api/hiring`: Zod (or similar) schemas, rate limiting hook, forward to email/CRM or placeholder log until backend chosen; document reCAPTCHA token field if required later.

- [x] 6.0 **Motion, 3D, performance, and accessibility polish**
  - [x] 6.1 `lib/motion.ts`: detect `prefers-reduced-motion`; wrapper for section fades (CSS or Framer Motion) — no motion-only state cues.
  - [x] 6.2 `LazyCanvas`: dynamic import R3F `Canvas` with `ssr: false`; IntersectionObserver to load WebGL when near viewport; poster `<Image>` until then.
  - [x] 6.3 Implement home hero 3D (or static WebP fallback) per PRD §6.2; service detail stills or lightweight scenes as needed.
  - [x] 6.4 Reduce motion path: static poster only, disable parallax and shorten transitions.
  - [x] 6.5 Performance pass: lazy non-critical components, image priority only for LCP hero, verify Lighthouse targets from PRD §8.
  - [x] 6.6 Full keyboard pass on nav, search, forms, filters; color contrast check on gradient text (provide solid fallback for small text if needed).

**Дополнительно сделано:** `/search`, `sitemap.xml`, `robots.txt`, `not-found`, баннер cookie, карта на контактах, `metadataBase`, ESLint через `eslint-config-next` + `npm run lint`, SSG для всех id кейсов (`getAllCaseStaticIds`).
