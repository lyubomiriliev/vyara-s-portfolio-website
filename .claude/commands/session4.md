---
name: session-4-final
description: >
  Final session. Rebuilds homepage bottom sections (Clients, Testimonials,
  Packages), assembles final app/page.tsx, and runs a full design consistency
  + multi-page architecture + static export audit across the entire codebase.
  App Router + static export. Run AFTER session-3 with a passing build.

recommended_model: opus
---

# Session 4 — Homepage Bottom Sections · Final Assembly · Full Audit

## Before Starting

Read these files in full:
- `CLAUDE.md`
- `.claude/design-system.md`
- `.claude/components.md`
- `.claude/static-export-rules.md`

Read EVERY component file rebuilt in Sessions 1–3.
Read the CURRENT versions of `Clients.tsx`, `Testimonials.tsx`, `Packages.tsx`
before rewriting — extract all real data first.

Also scan `/public/clients/` and `/public/profile/` and list all files.

---

## Component 1 — Clients

**File:** `components/sections/Clients.tsx`
**Directive:** `'use client'` — Framer Motion
**Section ID:** `id="clients"` on outer wrapper

Read existing `Clients.tsx` — extract all real client data before rewriting.

### Header
```
[SectionLabel: "CLIENT RESULTS"]
H2: "Real Brands. Real Results."
Subtext: "Measurable impact across every project we touch."
```

### Client data
Verify exact filenames in `/public/clients/`:
```ts
const clients = [
  {
    logo: '/clients/elshisha2.png',    // verify
    name: 'El Shisha',
    metrics: [
      { value: '+40%', label: 'Sales Growth' },
      { value: '100+', label: 'Happy Clients' },
      { value: '+40%', label: 'New Impressions' },
    ],
    accent: '--accent-pink',
  },
  {
    logo: '/clients/pulsehomes3.png',  // verify
    name: 'Pulse Homes',
    metrics: [
      { value: '+40%', label: 'Reach Expanded' },
      { value: '2x',   label: 'Lead Generation' },
      { value: '+60%', label: 'Brand Awareness' },
    ],
    accent: '--accent-violet',
  },
  // Add any other logos found in /public/clients/ — accent: '--accent-blue'
]
```

### ClientCard (glass-card p-6, colored top border):
```tsx
<div className="glass-card p-6 overflow-hidden relative"
  style={{ borderTop: `3px solid var(${client.accent})` }}>
  <img src={client.logo} alt={client.name} loading="lazy"
    className="h-8 object-contain mb-6 opacity-90" />
  <div className="grid grid-cols-3 gap-4">
    {client.metrics.map(m => (
      <div key={m.label}>
        <div className="font-display font-800 text-xl text-gradient">{m.value}</div>
        <div className="text-xs text-white/45 mt-0.5">{m.label}</div>
      </div>
    ))}
  </div>
  {/* Bg accent glow */}
  <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
    style={{ background: `radial-gradient(circle, var(${client.accent}) 0%, transparent 70%)`,
             opacity: 0.06, filter: 'blur(20px)', transform: 'translate(30%,-30%)' }} />
</div>
```

Grid: `grid grid-cols-1 md:grid-cols-2 gap-6`
`staggerContainer` + `fadeUp` + `whileInView viewport={{ once: true }}`.

---

## Component 2 — Testimonials

**File:** `components/sections/Testimonials.tsx`
**Directive:** `'use client'` — Framer Motion

Read existing `Testimonials.tsx` first — extract every real quote, name, role, photo.
If lorem ipsum, mark with `// TODO: Replace with real testimonials`.

### Header
```
[SectionLabel: "TESTIMONIALS"]
H2: "What Our Clients Say"
```

### Card (glass-card p-8):
```tsx
<div className="glass-card p-8 flex flex-col gap-5">
  <span className="font-display font-800 text-7xl leading-none text-gradient opacity-25 select-none -mb-4 block">"</span>
  <p className="text-white/75 leading-relaxed text-sm md:text-base italic flex-1">{t.quote}</p>
  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.08]">
    {t.photo
      ? <img src={t.photo} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
      : <div className="w-10 h-10 rounded-full bg-gradient-main flex items-center justify-center
                        text-white text-sm font-display font-700 flex-shrink-0">{t.name[0]}</div>
    }
    <div>
      <div className="text-sm font-semibold text-white">{t.name}</div>
      <div className="text-xs text-white/45">{t.role}</div>
    </div>
  </div>
</div>
```

Grid based on count:
- 3+: `grid grid-cols-1 md:grid-cols-3 gap-5`
- 2: `grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto gap-5`
- 1: `max-w-xl mx-auto`

`staggerContainer` + `fadeUp` + `whileInView viewport={{ once: true }}`.

---

## Component 3 — Packages

**File:** `components/sections/Packages.tsx`
**Directive:** `'use client'` — Framer Motion

Read existing `Packages.tsx` first — extract ALL real data:
- Package names, prices, currency, period
- Every feature bullet per package
- Which package is featured/recommended

### Header
```
[SectionLabel: "PRICING"]
H2: "Transparent Pricing for Every Stage"
Subtext: "No hidden fees. No lock-ins. Just results."
```

### Standard card (glass-card p-8):
```tsx
<div className="glass-card p-8 flex flex-col gap-5">
  <h3 className="font-display font-700 text-lg text-white">{pkg.name}</h3>
  <div className="flex items-baseline gap-1">
    <span className="font-display font-800 text-4xl text-gradient">{pkg.price}</span>
    <span className="text-white/40 text-sm">{pkg.period}</span>
  </div>
  <p className="text-sm text-white/55">{pkg.description}</p>
  <hr className="border-white/10" />
  <ul className="flex flex-col gap-3 flex-1">
    {pkg.features.map(f => (
      <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
        <Check size={15} className="text-accent-violet mt-0.5 flex-shrink-0" />{f}
      </li>
    ))}
  </ul>
  <Link href="/contact">
    <ButtonOutline className="w-full justify-center mt-auto">Get Started</ButtonOutline>
  </Link>
</div>
```

### Featured card differences:
- Wrapper: `scale-[1.03] z-10 relative`
- Style: `background: rgba(155,89,245,0.08)`, `borderColor: rgba(155,89,245,0.4)`
- Badge: `absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-main text-white text-xs font-semibold px-4 py-1.5 rounded-pill shadow-glow-violet`
- CTA: `<Link href="/contact"><ButtonPrimary className="w-full justify-center">Get Started</ButtonPrimary></Link>`

Grid: `grid grid-cols-1 md:grid-cols-3 gap-6 items-center mt-12`
`staggerContainer` + `scaleIn` + `whileInView viewport={{ once: true }}`.

---

## Final app/page.tsx

```tsx
import Hero from '@/components/sections/Hero'
import MarqueeBanner from '@/components/sections/MarqueeBanner'
import WhyAviva from '@/components/sections/WhyAviva'
import ServicesPreview from '@/components/sections/ServicesPreview'
import PortfolioPreview from '@/components/sections/PortfolioPreview'
import Clients from '@/components/sections/Clients'
import Testimonials from '@/components/sections/Testimonials'
import Packages from '@/components/sections/Packages'
import CTABanner from '@/components/sections/CTABanner'

export default function Home() {
  return (
    <main>
      <Hero />
      <MarqueeBanner />
      <WhyAviva />
      <ServicesPreview />
      <PortfolioPreview />
      <Clients />
      <Testimonials />
      <Packages />
      <CTABanner />
    </main>
  )
}
```

Confirm these old files are deleted:
`ExperienceSummary.tsx`, `About.tsx`, `Timeline.tsx`, `Skills.tsx`, `Strengths.tsx`
`components/ContactForm.tsx` (replaced by `components/pages/ContactPage.tsx`)
`components/Portfolio.tsx` (replaced by `PortfolioPreview` + `WorkPage`)

---

## Full Audit — Fix Every Issue Found

### Architecture check
- [ ] Homepage has NO full services list — only 6-card preview with link to `/services`
- [ ] Homepage has NO full portfolio — only 3-card preview with link to `/work`
- [ ] Homepage has NO contact form — CTABanner links to `/contact`
- [ ] `/services`, `/work`, `/contact` are fully built with real content
- [ ] All internal links use `<Link>` from `next/link` — no bare `<a href="/...">` tags
- [ ] Each page (`/services`, `/work`, `/contact`) exports its own `metadata`

### App Router 'use client' audit
- [ ] `app/page.tsx` — Server Component, NO `'use client'`
- [ ] `app/layout.tsx` — Server Component, NO `'use client'`
- [ ] `app/services/page.tsx` — Server Component, NO `'use client'`
- [ ] `app/work/page.tsx` — Server Component, NO `'use client'`
- [ ] `app/contact/page.tsx` — Server Component, NO `'use client'`
- [ ] Every component using useState/useEffect/Framer Motion has `'use client'`
- [ ] No `next/head` anywhere — only `export const metadata`

### Typography consistency
- [ ] All headings: `font-display` (Syne)
- [ ] All body: `font-body` (DM Sans)
- [ ] `.text-gradient` uses `background-clip: text` pattern throughout
- [ ] Section labels: identical `text-xs uppercase tracking-[0.15em] text-accent-violet`
- [ ] Zero "I / me / my" — only "we / our / the team"
- [ ] Zero lorem ipsum

### Colors
- [ ] No hardcoded hex values — CSS variables or Tailwind tokens only
- [ ] Background always `#0A0A0F` across all pages
- [ ] Consistent `text-white/60` secondary, `text-white/35` muted

### Glassmorphism
- [ ] All glass cards: `.glass-card` class or exact same inline values
- [ ] `-webkit-backdrop-filter` present alongside `backdrop-filter` everywhere
- [ ] Hover states work on all glass cards
- [ ] Applied in all locations from `.claude/components.md` table

### Spacing
- [ ] All sections: `.section-padding` or `py-24` equivalent
- [ ] Container `max-width: 1200px` consistent across all pages
- [ ] Inner pages have `pt-32` or `pt-40` to clear the fixed Header

### Animations
- [ ] All `whileInView` use `viewport={{ once: true, margin: '-80px' }}`
- [ ] Hero: `animate="visible"` on mount, NOT whileInView
- [ ] `staggerContainer` on all card grids

### Mobile responsiveness
- [ ] Header hamburger works, closes on link click AND route change
- [ ] All grids: `grid-cols-1` → `md:grid-cols-2` → `lg:grid-cols-3`
- [ ] No horizontal overflow on any page
- [ ] Inner pages readable on mobile (correct top padding clears header)

### Images
- [ ] All `<img>` have `loading="lazy"` and `alt` text
- [ ] All `src` paths start with `/` and match real files in `/public/`
- [ ] No broken images in browser network tab

### Static export compliance
- [ ] `next.config.ts`: `output: 'export'`, `images: { unoptimized: true }`
- [ ] No `cookies()`, `headers()` from `next/headers`
- [ ] No API routes, no `'use server'`
- [ ] Contact form: client-side submission preserved
- [ ] All routes are static — no dynamic `[slug]` without `generateStaticParams`

---

## Cleanup

- Remove unused component files
- Remove unused imports everywhere
- Remove `console.log` statements
- Remove `@ts-ignore` shortcuts

---

## Final Build & Visual Verification

`npm run build` — zero errors, zero warnings.

### Homepage (`/`)
1. Hero: badge, gradient headline, floating cards, orbs
2. Marquee: infinite scroll, no jump
3. WhyAviva: 3 cards, tools grid
4. ServicesPreview: 6 cards, "See All Services →" → `/services`
5. PortfolioPreview: 3 images, "View All Projects →" → `/work`
6. Clients: logos, metrics, colored borders
7. Testimonials: renders cleanly
8. Packages: real prices, featured card distinguished, CTAs → `/contact`
9. CTABanner: links to `/contact`

### /services
10. PageHero renders with gradient word
11. All 18 services across 3 tab categories
12. Expanded cards with benefits + CTA buttons → `/contact`
13. Page title: "Our Services — Aviva Digital"

### /work
14. PageHero renders
15. Full portfolio grid, all images load
16. Filter tabs work
17. Page title: "Our Work — Aviva Digital"

### /contact
18. PageHero renders
19. Glass form renders, submits correctly
20. Success state shows after submit
21. Page title: "Contact Us — Aviva Digital"

### Global
22. Header: glass on scroll, active link per page, hamburger on mobile
23. Footer: all links correct (`<Link>` not `<a>`)
24. No horizontal scrollbar on any page
25. 375px mobile — all pages readable, nav works
26. 768px tablet — 2-col layouts
27. 1280px desktop — full layout
