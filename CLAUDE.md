# AVIVA DIGITAL — Project Instructions

> IMPORTANT: At the start of every session, read ALL files in the `.claude/`
> directory before writing any code:
> - `.claude/design-system.md`
> - `.claude/components.md`
> - `.claude/static-export-rules.md`

---

## Project Overview

**avivadigital.bg** — Full-service AI-first digital agency website.
Built with: **Next.js App Router + Tailwind CSS + Framer Motion**
Export type: **Static export** (`output: 'export'`) — see `.claude/static-export-rules.md`

---

## Architecture — App Router, Multi-Page Site

This project uses the **App Router** (`app/` directory).

### Page Routes

```
app/
├── page.tsx              → / (Homepage)
├── layout.tsx            → Root layout (Header, Footer, fonts, metadata)
├── globals.css
├── services/
│   └── page.tsx          → /services
├── work/
│   └── page.tsx          → /work
└── contact/
    └── page.tsx          → /contact
```

### Navigation Links (Header)
```
Home → /
Services → /services
Work → /work
About → /#about       (scrolls to about section on homepage)
Clients → /#clients   (scrolls to clients section on homepage)
Contact → /contact
```

### Static Export + Dynamic Routes
- All pages are statically pre-rendered at build time
- No dynamic `[slug]` routes needed for now
- `generateStaticParams` not required unless slug-based routes are added later

---

## Homepage Structure (`app/page.tsx`)

The homepage contains full sections OR preview sections that link to dedicated pages:

```
Hero                    → full section
MarqueeBanner           → full section (client logo scroll)
WhyAviva                → full section (id="about")
ServicesPreview         → preview: 6 cards + "See All Services →" → /services
PortfolioPreview        → preview: 3 items + "View All Work →" → /work
Clients                 → full section (id="clients")
Testimonials            → full section
Packages                → full section
CTABanner               → full section (CTA links to /contact)
```

Homepage does NOT contain the full Services list, full Portfolio grid, or ContactForm.
Those live on their dedicated pages.

### Homepage Anchor IDs (for nav scroll links)
```
#hero | #about | #clients
```

---

## Dedicated Pages

### /services (`app/services/page.tsx`)
- Full services list — all 18 services
- 3-category tab filter (Marketing & Social | Creative & Content | Web & Development)
- Each service: expanded card with icon, title, description, key benefits, CTA
- Hero banner at top: "Our Services" headline + subtext
- CTA banner at bottom linking to /contact

### /work (`app/work/page.tsx`)
- Full portfolio grid — all items from `/public/designs/`
- Category filter tabs: All | Designs | Social | Web | Video
- No pagination limit (show all, or load more)
- Hero banner at top: "Our Work" headline + subtext
- CTA banner at bottom linking to /contact

### /contact (`app/contact/page.tsx`)
- Full contact form (rebuilt UI, preserved submit logic)
- Contact info panel (email, phone, location, social links)
- Hero banner at top: "Let's Build Something Great"
- No footer CTA banner needed (the page IS the CTA)

---

## Shared Components Structure

```
components/
├── Header.tsx              ← Navbar (rebuilt, handles both / and /page routes)
├── Footer.tsx              ← Footer (rebuilt)
├── HeroVisual.tsx          ← Hero orb animation (used only on homepage)
│
├── sections/               ← Homepage-only sections
│   ├── Hero.tsx
│   ├── MarqueeBanner.tsx
│   ├── WhyAviva.tsx
│   ├── ServicesPreview.tsx ← 6 cards + link to /services
│   ├── PortfolioPreview.tsx← 3 items + link to /work
│   ├── Clients.tsx
│   ├── Testimonials.tsx
│   ├── Packages.tsx
│   └── CTABanner.tsx
│
├── pages/                  ← Page-specific components
│   ├── ServicesPage.tsx    ← Full services list with tabs (used in /services)
│   ├── WorkPage.tsx        ← Full portfolio grid (used in /work)
│   └── ContactPage.tsx     ← Full contact form + info (used in /contact)
│
└── ui/                     ← Shared primitive components
    ├── Glow.tsx
    ├── ButtonPrimary.tsx
    ├── ButtonOutline.tsx
    ├── SectionLabel.tsx
    ├── StatPill.tsx
    └── PageHero.tsx        ← Reusable inner page hero banner
```

---

## App Router Critical Rules

- `app/layout.tsx` — Server Component. Fonts, metadata, Header, Footer.
- `app/page.tsx` and all `app/*/page.tsx` — Server Components by default.
- Any component using `useState`, `useEffect`, `useRef`, or browser APIs → `'use client'`
- ALL Framer Motion components → `'use client'`
- Static presentational components with no hooks → no `'use client'` needed
- NEVER use `next/head` — use `export const metadata` in page files or layout
- Each page can export its own `metadata` for per-page SEO titles/descriptions

### Font loading in `app/layout.tsx`:
```tsx
import { Syne, DM_Sans } from 'next/font/google'
const syne = Syne({ subsets: ['latin'], weight: ['600','700','800'], variable: '--font-display', display: 'swap' })
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400','500'], variable: '--font-body', display: 'swap' })
// Apply: <html className={`${syne.variable} ${dmSans.variable}`}>
```

Remove ALL `@import url(...)` from `globals.css`.

---

## Brand Identity

- **Agency name:** AVIVA DIGITAL
- **Tagline:** "The Future of Marketing is Here"
- **Language:** Always "we / our / the team" — NEVER "I / me / my"
- **Vyara** appears only in WhyAviva team block — as Creative Director

---

## Components Being Removed (delete files)

- `ExperienceSummary.tsx`
- `Timeline.tsx`
- `About.tsx`
- `Skills.tsx`
- `Strengths.tsx`

## Components Being Rebuilt (preserve real data)

- `Hero` → `components/sections/Hero.tsx`
- `Portfolio` → split into `PortfolioPreview.tsx` (homepage) + `WorkPage.tsx` (/work)
- `Clients` → `components/sections/Clients.tsx`
- `Testimonials` → `components/sections/Testimonials.tsx`
- `Packages` → `components/sections/Packages.tsx`
- `ContactForm` → `components/pages/ContactPage.tsx` (UI rebuild, preserve submit logic)
- `Header` → rebuilt in place
- `Footer` → rebuilt in place

---

## Asset Locations

- `/public/clients/` — client logos
- `/public/designs/` — portfolio images
- `/public/tools/` — platform logos
- `/public/images/` — illustrations
- `/public/backgrounds/` — backgrounds
- `/public/profile/` — team photos
- `/public/icons/` — icons

---

## Session Order

Run `npm run build` after every session. Only proceed if it passes.

- **Session 1:** Foundation — config, globals, layout.tsx, shared UI, Header, Footer, PageHero
- **Session 2:** Homepage sections — Hero through CTABanner (preview components)
- **Session 3:** Dedicated pages — /services, /work, /contact
- **Session 4:** Homepage bottom sections (Clients, Testimonials, Packages) + full audit
