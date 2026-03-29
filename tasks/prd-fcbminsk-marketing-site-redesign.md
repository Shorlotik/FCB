# PRD: FCBMINSK Marketing Site — Full Rebuild (Visual & UX)

## 1. Introduction / Overview

Rebuild **https://fcb.by/** as a new marketing site for **FCBMINSK** (full-cycle advertising agency, RU/BY market). **Information architecture and content intent** stay aligned with the live site: same primary nav, service taxonomy, lead and hiring flows, and key contact data. **Visual language, interaction patterns, and front-end architecture** are new: premium agency aesthetic, disciplined use of 3D, stronger navigation and cases UX, accessible forms, and performance-conscious motion.

**Brand story:** Position **“Never finished”** as continuous improvement—process, craft, and iteration—woven into copy blocks and section transitions, not only as a logo line.

**Assumptions (brief is silent on these):** Primary language **Russian**; Belarus phone format preserved; no separate authenticated client portal in scope; case and vacancy **content** may start as CMS/markdown or static JSON until a back office exists.

---

## 2. Goals

1. **Clarity:** Users find Services, Cases, Contacts, and both forms within ≤2 clicks from any page (desktop); mobile nav remains obvious without hiding everything behind a single icon on large viewports.
2. **Credibility:** Cases area always shows **meaningful portfolio content** (real items, or curated placeholders / “featured” stubs)—no empty-state dead ends.
3. **Accessibility & trust:** Forms match field sets and consent intent of the current site, with visible labels, errors, keyboard flow, and multi-step progress where length warrants it.
4. **Performance:** LCP and interaction targets appropriate for a marketing site; 3D does not block first paint; `prefers-reduced-motion` respected.
5. **Maintainability:** Documented design tokens, component boundaries, and route map so a junior developer can extend pages without redesign drift.

---

## 3. User Stories

| ID | Story |
|----|--------|
| US-1 | As a **marketing decision-maker**, I want to **scan services by discipline** so I can see if the agency covers my needs. |
| US-2 | As a **prospect**, I want to **filter cases by industry or service** so I can find relevant proof quickly. |
| US-3 | As a **prospect**, I want to **submit “Стать клиентом”** with clear validation so I can brief the agency without friction. |
| US-4 | As a **job seeker**, I want to **use “Работа у нас”** with a guided flow so I can apply without missing required fields. |
| US-5 | As a **journalist or partner**, I want **contacts grouped by intent** (media, HR, new business) so I reach the right person. |
| US-6 | As a **user sensitive to motion**, I want **reduced motion** honored so the site remains usable. |

---

## 4. Functional Requirements

### 4.1 Site structure & routes

1. The system must expose routes (or equivalent slugs) for: **Home**, **About**, **Services** (index + one page per sub-service: ATL, BTL, Creative, Strategy, Design, Brand ID, Event, OOH, PR, SMM), **Cases**, **Clients**, **Partners**, **Vacancies**, **Reviews**, **Contacts**.
2. The system must preserve **intent** of global content: agency positioning, service descriptions, social proof (clients/partners/reviews), vacancies list, and **contact channels**: phone **+375 (17) 224 22 17**, **info@fcb.by**, **hr@fcb.by**, and role-specific emails as on the live site (e.g. PR, new business) where applicable.
3. The system must include two persistent CTAs: **Стать клиентом** (lead) and **Работа у нас** (hiring), reachable from header/footer and contextual sections.

### 4.2 Navigation & search

4. On **viewport ≥ lg**, the system must show **primary nav links** (not hamburger-only): horizontal nav or mega-menu for Services; **search** remains visible (icon + affordance or command-k style entry point).
5. On smaller viewports, the system may collapse nav into a drawer; **search** must still be discoverable (e.g. icon in header bar).
6. Search (MVP): **scope** = pages + case titles/tags + service names; results page or overlay with keyboard navigation.

### 4.3 Cases (portfolio)

7. Cases must render as a **filterable grid**: filters for **industry** and **service** (multi-select or chips), with URL-query sync optional but recommended.
8. Each card: **large visual** (16:9 or 4:5), **title**, **1-line outcome** or metric, link to detail.
9. If CMS has **zero items**, the system must show **curated placeholders** (e.g. “Confidential retail / FMCG / …” with generic 3D or abstract art + copy) so the grid is never an empty message banner.

### 4.4 Forms

10. **Стать клиентом:** Fields and consent **semantics** aligned with live site: identity, company, contact, task type (strategy, branding, creative, media/influencer, SMM, production, web, other, consulting), long description, file upload (brief, size limit as today), link to brief URL, privacy consent, required markers.
11. **Работа у нас:** Aligned fields: name, Telegram, city, phone, email, portfolio link, experience text, photo upload, consent.
12. Forms must use **associated labels**, **inline validation**, **focus management** on error, and **multi-step layout** (e.g. 3 steps) for the lead form if it reduces perceived length; show **progress** (step indicator).
13. File inputs: announce limits; client-side type/size checks with server validation planned.

### 4.5 Motion, 3D, and media

14. **Scroll-linked:** subtle opacity/translate fades for section entrances; **no** motion as the only indicator of state.
15. **3D:** lazy strategy — **poster image / static WebP** in view first; load **WebGL (R3F/Three)** or video loop only when section is **in viewport** (IntersectionObserver) and `prefers-reduced-motion` is false.
16. **Reduced motion:** disable parallax, limit 3D to static image, shorten transitions.

### 4.6 Non-functional

17. Responsive images (`srcset`, modern formats); critical CSS path for hero.
18. SEO: unique titles/meta per route; structured data for `Organization` and `LocalBusiness` where appropriate.

---

## 5. Non-Goals (Out of Scope)

- Replacing Bitrix or integrating with legacy **1C-Bitrix** APIs unless explicitly added later.
- Full **reCAPTCHA** redesign beyond “compatible with existing backend expectations” (document token hook for forms).
- Full **CMS authoring UI** build (content can be files/headless CMS stub).
- **Belarusian** full duplicate of all copy unless product later requests i18n layer.

---

## 6. Design Considerations

### 6.1 Design system (tokens & components)

#### Color tokens

| Token | Role | Example (hex) |
|-------|------|----------------|
| `--color-bg-base` | Page background | `#F7F5F2` (warm off-white) |
| `--color-bg-elevated` | Cards, header | `#FFFFFF` |
| `--color-bg-muted` | Secondary bands | `#EBE8E4` |
| `--color-text-primary` | Body | `#0D0D0D` |
| `--color-text-secondary` | Meta | `#5C5A57` |
| `--color-brand-fcb-start` | Gradient start | `#00A8E8` (cyan-blue) |
| `--color-brand-fcb-mid` | Gradient mid | `#FF6B35` (orange) |
| `--color-brand-fcb-end` | Gradient end | `#E91E8C` (magenta) |
| `--color-accent-section-*` | One accent per major section | e.g. `--accent-about: #2E5266`, `--accent-cases: #6B4E71`, `--accent-contact: #1B3A4B` |

**Rule:** FCB wordmark uses the **full gradient** on “FCB” only; **MINSK** stays **near-black**. Section accents are **solid** or **duotone**—avoid repeating the full rainbow on every block.

#### Typography

- **Display / H1–H2:** High-contrast grotesk or neo-grotesk (e.g. **Söhne**, **GT America**, **Inter** fallback stack — license per project). Weight **700–800** for hero; tracking slightly tight.
- **H3–H4:** 600–700.
- **Body:** 400–500, 18px base on desktop, 16px mobile; line-height 1.5–1.6.
- **Scale (rem):** 3.5 / 2.5 / 1.75 / 1.25 / 1 / 0.875 (adjust for font).

#### Spacing

- Base unit **4px**; section vertical rhythm **96–160px** desktop, **64–96px** mobile.
- Grid: **12 columns**, max-width **1280–1440px**, gutter **24–32px**.

#### Components (list)

- `SiteHeader` (logo, nav, search, CTAs)
- `SiteFooter` (nav repeat, legal, contacts)
- `Section` (variant: default, accent, full-bleed)
- `Hero3D` (poster + lazy canvas)
- `ServiceCard`, `ServiceBentoGrid`
- `CaseCard`, `CaseFilters`, `CaseGrid`
- `ClientLogoMarquee` / grid
- `Quote` / review card
- `VacancyAccordion` or list
- `LeadForm` (multi-step), `HiringForm`
- `CookieBanner` (if required by legal)
- `MotionFade` (wrapper respecting reduced motion)

---

### 6.2 Page-by-page wireframe notes & 3D art direction

**Global 3D rules**

- **Lighting:** Soft studio key + **rim** on glass/metal edges; occasional dramatic side light on one hero only.
- **DOF:** Shallow; background bokeh **same hue** as section accent.
- **Grading:** Desaturate environment 10–15%; push **cyan shadow / warm highlight** to echo brand gradient without full rainbow in scene.
- **Assets:** GLB for interactive zones; **pre-rendered 4K WebP** sequences acceptable for heavy heroes.

| Page | Layout / wireframe notes | 3D motif |
|------|---------------------------|----------|
| **Home** | Hero: **asymmetric split** — left typographic stack (H1 + “Never finished” story 2–3 lines), right **full-bleed 3D** (floating glass shards / abstract “idea fragments”). Below: **bento** for services preview (4–6 tiles). Clients: horizontal logo strip + single accent color. Cases: **3 featured** large cards. CTA band: solid accent + single 3D object (small). | Abstract **glass + brushed metal** forms, soft gradient void; subtle particles; **no** literal office clipart. |
| **About** | **No** default purple band. Use **editorial**: large stat numerals (30 / 80 / 500+), timeline or principle list, team grid. 3D as **section divider** only: thin floating plane or folded paper-like mesh (still abstract). | **Low-poly city silhouette** in fog OR **single sculptural “M” monolith** — pick one per brand sign-off; rim-lit. |
| **Services** (index) | **Bento grid** 2×3 + featured row; each tile = service + short outcome line; hover: micro-lift + gradient stroke. | One **hero object** per scroll “chapter” (swap on scroll snap optional): e.g. megaphone abstract → lens → pen tool abstract (stylized, not emoji). |
| **Service detail** (×10) | Hero: H1 + 1 paragraph; **split**: copy left, **static 3D still** right. Body: capabilities list, deliverables, related cases (2). | **Discipline-specific abstract** (ATL: light beams + panels; BTL: tactile materials stack; SMM: floating UI glass cards — abstract). |
| **Cases** | Filter bar sticky; **masonry or uniform grid**; detail page: full-bleed hero image, challenge / approach / outcome, gallery. | Optional **frame** or **gallery pedestal** 3D on detail only; listing stays **2D + photography**. |
| **Clients / Partners** | Clean grid or categories; generous whitespace; optional **single** subtle 3D ribbon background (monochrome). | Monochrome **metal ribbon** or **glass torus** — heavily blurred. |
| **Vacancies** | List + expandable cards; link hiring form. | None or **tiny** desk-object still (shared asset). |
| **Reviews** | Large quote typography; avatar optional; carousel with reduced motion fallback. | None. |
| **Contacts** | **Asymmetric:** left column contacts by audience; right **map** or static map image + address; form short-links to full lead form. | Soft **ambient orb** (gradient sphere) far background, heavily blurred. |

---

## 7. Technical Considerations

### 7.1 Recommended stack

- **Framework:** **Next.js** (App Router) — SSG/ISR for marketing pages, API routes or server actions for form proxy.
- **Styling:** **Tailwind CSS** + CSS variables for tokens; `@tailwindcss/typography` for long copy.
- **3D:** **React Three Fiber** + ** drei** for in-view scenes; **fallback:** `<Image>` poster; load `Canvas` dynamic `ssr: false`.
- **Motion:** **Framer Motion** or **CSS** `@media (prefers-reduced-motion)` wrappers; intersection-based triggers.
- **Content:** **MDX** or **Contentlayer** / JSON for cases and services v1; later **Sanity** or **Payload** if editorial need grows.
- **Forms:** Server validation + rate limit; file upload to **S3-compatible** or existing endpoint contract.

### 7.2 Folder structure (suggested)

```text
fcb-web/
├── app/
│   ├── layout.tsx                 # fonts, providers, header/footer
│   ├── page.tsx                   # Home
│   ├── about/page.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx        # atl, btl, …
│   ├── cases/
│   │   ├── page.tsx               # grid + filters
│   │   └── [slug]/page.tsx
│   ├── clients/page.tsx
│   ├── partners/page.tsx
│   ├── vacancy/page.tsx
│   ├── otzyvy/page.tsx            # or /reviews — match final slug choice
│   ├── contacts/page.tsx
│   ├── api/
│   │   ├── lead/route.ts
│   │   └── hiring/route.ts
│   └── globals.css
├── components/
│   ├── layout/     # SiteHeader, SiteFooter, NavDesktop, NavMobile, Search
│   ├── sections/   # HeroHome, ClientsStrip, ServicesBento, CasesFeatured, …
│   ├── cases/      # CaseCard, CaseFilters, CaseGrid
│   ├── forms/      # LeadForm, HiringForm, FormStepper
│   ├── three/      # HeroScene, LazyCanvas, scenes/* (per page)
│   └── ui/         # Button, Card, Chip, Input, …
├── content/        # MDX/JSON: services, cases, reviews, vacancies
├── lib/            # motion.ts (reduced motion), cn, filters/url
├── styles/         # tokens.css (optional split)
└── public/
    ├── models/     # .glb (compressed)
    └── media/      # posters, og images
```

### 7.3 Component ↔ route map (summary)

| Route | Primary components |
|-------|-------------------|
| `/` | `Hero3D`, `ServicesBento` (preview), `ClientLogoMarquee`, `CasesFeatured`, `CTASection` |
| `/about` | `StatsSection`, `TeamGrid`, `Divider3D` |
| `/services` | `ServicesBento` (full) |
| `/services/[slug]` | `ServiceHero`, `CapabilityList`, `RelatedCases` |
| `/cases` | `CaseFilters`, `CaseGrid` |
| `/cases/[slug]` | `CaseHero`, `CaseBody`, `CaseGallery` |
| `/clients`, `/partners` | `LogoGrid`, `Section` |
| `/vacancy` | `VacancyList` |
| `/otzyvy` | `ReviewCarousel` |
| `/contacts` | `ContactGroups`, `MapOrStatic`, links to forms |
| Global | `SiteHeader`, `SiteFooter`, `LeadForm` modal/page, `HiringForm` modal/page |

---

## 8. Success Metrics

- **Qualitative:** Stakeholder sign-off on brand, nav clarity, and cases never empty.
- **Quantitative:** Lighthouse **Performance ≥ 85** on Home (mobile lab); **Accessibility** no critical axe issues on forms and nav; form **submission success rate** tracked vs baseline.

---

## 9. Open Questions

1. **Locales:** Russian only at launch, or RU + BY (and URL strategy `/be/...`)?
2. **Search:** Full-text later vs MVP keyword + route links only?
3. **Case media:** Who supplies photography, and are **NDA** cases allowed as blind entries only?
4. **Form backend:** Existing Bitrix endpoints vs new serverless + email/CRM?
5. **Analytics:** Yandex.Metrica / GA4 / both — privacy copy impact?

---

## Clarifying questions (per `01-create-prd.md` process)

If you want to tighten scope before build, reply with letters:

**A. Locales:** (1) RU only (2) RU + BY parity (3) RU primary, BY selected pages  
**B. Case content at launch:** (1) Real CMS only (2) Mix real + curated placeholders (3) Placeholders until shoot  
**C. Form submission:** (1) New API + email (2) Must post to existing Bitrix forms (3) TBD  
**D. 3D budget:** (1) Pre-rendered stills/loops only (2) One interactive R3F hero (3) Multiple interactive scenes  

*Answers can be incorporated into v2 of this PRD.*
