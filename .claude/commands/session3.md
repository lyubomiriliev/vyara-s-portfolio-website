---
name: session-3-pages
description: >
  Builds the three dedicated pages for Aviva Digital: /services (full 18-service
  list with tabs), /work (full portfolio grid with filters), /contact (full form
  + info panel). Each page exports its own metadata.
  App Router + static export. Run AFTER session-2 with a passing build.

recommended_model: opus
---

# Session 3 — Dedicated Pages: /services · /work · /contact

## Before Starting

Read these files in full:
- `CLAUDE.md`
- `.claude/design-system.md`
- `.claude/components.md`
- `.claude/static-export-rules.md`

Read these existing files before touching them:
- `components/ContactForm.tsx` — extract submit logic
- `components/Portfolio.tsx` — extract real image data
- `app/services/page.tsx` — currently a placeholder
- `app/work/page.tsx` — currently a placeholder
- `app/contact/page.tsx` — currently a placeholder

Scan `/public/designs/` and list every file before writing Portfolio component.

**App Router reminders:**
- Each `app/*/page.tsx` can export `metadata` for per-page SEO
- `'use client'` only on components with hooks or Framer Motion
- Use `<Link>` from `next/link` for all internal navigation
- No `next/head` anywhere

---

## Page 1 — /services

### app/services/page.tsx

```tsx
import type { Metadata } from 'next'
import ServicesPage from '@/components/pages/ServicesPage'
import { PageHero } from '@/components/ui/PageHero'
import CTABanner from '@/components/sections/CTABanner'

export const metadata: Metadata = {
  title: 'Our Services — Aviva Digital',
  description: 'Full-service digital agency offering social media management, AI marketing, Meta Ads, web development, graphic design, video production and more.',
}

export default function Services() {
  return (
    <main>
      <PageHero
        label="WHAT WE DO"
        title="Every Service Your Brand Needs to"
        titleGradient="Dominate Online"
        description="From AI-powered marketing to custom web applications — 18 services across marketing, creative and development."
      />
      <ServicesPage />
      <CTABanner />
    </main>
  )
}
```

### components/pages/ServicesPage.tsx

**Directive:** `'use client'` — useState + AnimatePresence

Full services list with category tabs. Data from `data/services.ts`.

```tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import { serviceCategories } from '@/data/services'
import { staggerContainer, scaleIn } from '@/lib/animations'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ButtonPrimary } from '@/components/ui/ButtonPrimary'
```

Tab buttons (`flex gap-3 flex-wrap justify-center mb-10`):
- Active: `bg-gradient-main text-white shadow-glow-violet`
- Inactive: `glass-card text-white/60 hover:text-white`
- All: `px-5 py-2 rounded-pill text-sm font-medium transition-all duration-200`

AnimatePresence grid (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`):
Each card is EXPANDED compared to the preview — more detail:

```tsx
<motion.div key={service.title} variants={scaleIn} className="glass-card p-8 flex flex-col gap-4">
  {/* Icon */}
  <div className="w-14 h-14 rounded-xl bg-gradient-subtle flex items-center justify-center
                  group-hover:shadow-glow-violet transition-all">
    {IconComp && <IconComp size={26} className="text-accent-violet" />}
  </div>

  {/* Title */}
  <h3 className="font-display font-700 text-xl text-white">{service.title}</h3>

  {/* Full description */}
  <p className="text-sm text-white/60 leading-relaxed flex-1">{service.description}</p>

  {/* Key benefits list (2-3 bullet points) */}
  <ul className="flex flex-col gap-2">
    {service.benefits?.map(b => (
      <li key={b} className="flex items-center gap-2 text-xs text-white/50">
        <span className="w-1 h-1 rounded-full bg-accent-violet flex-shrink-0" />
        {b}
      </li>
    ))}
  </ul>

  {/* CTA */}
  <Link href="/contact">
    <ButtonPrimary size="sm" className="w-full justify-center mt-2">
      Get Started →
    </ButtonPrimary>
  </Link>
</motion.div>
```

**Update `data/services.ts`** to add a `benefits` array (2-3 items) to each service.
Example:
```ts
{ icon: 'Brain', title: 'AI-Powered Marketing', description: '...', benefits: ['Predictive audience targeting', 'Automated A/B testing', 'Real-time campaign optimization'] }
```

---

## Page 2 — /work

### app/work/page.tsx

```tsx
import type { Metadata } from 'next'
import WorkPage from '@/components/pages/WorkPage'
import { PageHero } from '@/components/ui/PageHero'
import CTABanner from '@/components/sections/CTABanner'

export const metadata: Metadata = {
  title: 'Our Work — Aviva Digital',
  description: 'Portfolio of digital projects — brand identities, social media campaigns, web development, AI-generated content and more.',
}

export default function Work() {
  return (
    <main>
      <PageHero
        label="OUR WORK"
        title="Projects That"
        titleGradient="Speak for Themselves"
        description="A full showcase of our latest work across design, social, web and AI-generated content."
      />
      <WorkPage />
      <CTABanner />
    </main>
  )
}
```

### components/pages/WorkPage.tsx

**Directive:** `'use client'` — useState + AnimatePresence

Scan `/public/designs/` — list ALL files. Build complete items array.

```tsx
const allItems = [
  { src: '/designs/design1.jpg', title: 'Brand Identity',  category: 'Designs' },
  { src: '/designs/design2.jpg', title: 'Social Campaign', category: 'Social'  },
  // ... every file found, assign sensible title + category
]
```

State: `const [activeFilter, setActiveFilter] = useState('All')`

Filter tabs: `['All', 'Designs', 'Social', 'Web', 'Video']`
Same pill tab style (active = gradient, inactive = glass-card).

Full grid — no Show More limit (this is the dedicated page, show everything):
```tsx
const filtered = activeFilter === 'All' ? allItems : allItems.filter(i => i.category === activeFilter)
```

Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`

Each card — same PortfolioCard pattern as PortfolioPreview but with taller images (`h-72`):
- Image with hover scale
- Glass gradient overlay bottom (category + title)
- Full glass hover overlay with "View Project →"

Wrap in AnimatePresence for filter transitions.
Animate with `staggerContainer` + `scaleIn` + `whileInView`.

---

## Page 3 — /contact

### app/contact/page.tsx

```tsx
import type { Metadata } from 'next'
import ContactPage from '@/components/pages/ContactPage'
import { PageHero } from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Contact Us — Aviva Digital',
  description: 'Get in touch with Aviva Digital. Free strategy call, no commitment. We respond within 24 hours.',
}

export default function Contact() {
  return (
    <main>
      <PageHero
        label="GET IN TOUCH"
        title="Let's Build Something"
        titleGradient="Extraordinary"
        description="Tell us about your project. We'll get back to you within 24 hours."
      />
      <ContactPage />
    </main>
  )
}
```

### components/pages/ContactPage.tsx

**Directive:** `'use client'` — useState, form handling, Framer Motion

**CRITICAL: Read existing `components/ContactForm.tsx` first.**
Extract the exact submission logic (EmailJS IDs, Formspree endpoint, fetch URL, etc.).
Preserve it 100% in the new component. Only the UI changes.
No API routes. No server actions. See `.claude/static-export-rules.md`.

Two-column layout (`grid grid-cols-1 lg:grid-cols-2 gap-8 section-padding`):

**Left — Maximum glass form:**
```tsx
<motion.div variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}
  style={{
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: 'var(--radius-lg)', padding: '40px',
  }}>
```

Fields (all `.form-field`):
- Full Name (required)
- Email Address (required)
- Company Name (placeholder: "Company name (optional)")
- Service Interest: `<select>` with `<optgroup>` per category from `data/services.ts`
- Message: `<textarea rows={5}>`
- Submit: `<ButtonPrimary size="lg" className="w-full justify-center">`

Form states:
- Loading: spinner + "Sending..." text, fields disabled
- Success: gradient checkmark + "Message Sent!" + "We'll get back to you within 24 hours."
- Error: `<AlertCircle>` icon + error message below submit

**Right — Contact info panel (glass-card p-8):**
- Logo: `<span class="text-gradient">AVIVA</span><span> DIGITAL</span>`
- 3 contact items with Lucide icons (Mail, Phone, MapPin):
  Extract real email/phone from existing `ContactForm.tsx`
- Divider
- Social icons row (from `/public/icons/` or `/public/tools/`, fallback Lucide)
- "We respond within 24 hours on business days."

Animate left with `slideInLeft`, right with `slideInRight`, both `whileInView viewport={{ once: true }}`.

---

## Also update: PortfolioPreview on homepage

Now that the full WorkPage exists, update `components/sections/PortfolioPreview.tsx`
to use the same `allItems` data. Extract the items array to `data/portfolio.ts`
so both the preview and the full page share the same source:

```ts
// data/portfolio.ts
export const portfolioItems = [
  { src: '/designs/design1.jpg', title: 'Brand Identity', category: 'Designs' },
  // ... all items
]
```

Import in both `PortfolioPreview.tsx` (uses `.slice(0,3)`) and `WorkPage.tsx` (uses all).

---

## Verification Checklist

- [ ] `npm run build` — zero errors
- [ ] `/services` renders with full 18 services, tab filter works
- [ ] `/services` has correct page `<title>` in browser tab
- [ ] `/work` renders full portfolio, filter works, all images load
- [ ] `/work` has correct page `<title>` in browser tab
- [ ] `/contact` form renders with glass styling
- [ ] `/contact` form submits correctly (test the actual submission)
- [ ] `/contact` has correct page `<title>` in browser tab
- [ ] All CTABanner buttons on `/services` and `/work` link to `/contact`
- [ ] Header active link highlights correctly on each page
- [ ] No `<a>` tags for internal links — all use `<Link>`
- [ ] No API routes created — form uses client-side submission
- [ ] `data/portfolio.ts` created and used by both preview and full page
