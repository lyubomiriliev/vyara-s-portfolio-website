---
name: session-2-homepage
description: >
  Builds all homepage sections for Aviva Digital: Hero, MarqueeBanner,
  WhyAviva, ServicesPreview (links to /services), PortfolioPreview (links
  to /work), and CTABanner (links to /contact). Heavy creative + animation work.
  App Router + static export. Run AFTER session-1 with a passing build.

recommended_model: opus
---

# Session 2 — Homepage Sections

## Before Starting

Read these files in full:
- `CLAUDE.md`
- `.claude/design-system.md`
- `.claude/components.md`

Read: `app/page.tsx`, `app/layout.tsx`, `data/services.ts`
Scan `/public/` to inventory available images and icons.

**App Router reminders:**
- Framer Motion + useState + useEffect → always `'use client'`
- Pure presentational (no hooks, no browser APIs) → no `'use client'`
- Use `<Link href="...">` from `next/link` for all internal navigation
- Never `<a href="/services">` for internal links — always `<Link>`

---

## Component 1 — Hero

**File:** `components/sections/Hero.tsx`
**Directive:** `'use client'` — Framer Motion
**Section ID:** `id="hero"`

Full viewport height, two-column layout (stacked on mobile).

**Left column — stagger on mount (not scroll):**

Wrap in `<motion.div variants={staggerContainer} initial="hidden" animate="visible">`.
Each child is `<motion.div variants={fadeUp}>`.

Children:
1. Badge pill: `🤖 AI-Powered Digital Agency`
   `glass-card px-4 py-1.5 rounded-pill inline-flex items-center gap-2 text-xs font-semibold text-accent-violet`

2. H1 Syne 800 `text-5xl md:text-7xl lg:text-8xl leading-[1.05]`:
   ```tsx
   <div>We Build</div>
   <div className="text-gradient">Digital Futures</div>
   <div>That Convert.</div>
   ```

3. Subheading `text-base md:text-lg text-white/60 max-w-md leading-relaxed`:
   "Full-service digital agency combining AI innovation with proven marketing expertise — from strategy to execution, we close the loop."

4. CTA row `flex gap-4 flex-wrap`:
   ```tsx
   <Link href="/contact"><ButtonPrimary size="lg">Start a Project →</ButtonPrimary></Link>
   <Link href="/work"><ButtonOutline size="lg">View Our Work</ButtonOutline></Link>
   ```

5. Stats row `flex gap-3 flex-wrap`:
   `<StatPill value="150+" label="Projects Delivered" />`
   `<StatPill value="40%" label="Avg. ROI Increase" />`
   `<StatPill value="30+" label="Industries Served" />`

**Right column:** `<HeroVisual />`

**Background glows:**
```tsx
<Glow color="violet" size={700} className="top-1/2 left-1/4" />
<Glow color="pink"   size={500} className="top-1/4 right-1/4" />
<Glow color="blue"   size={350} className="bottom-0 left-1/2" />
```

**Outer section:**
```tsx
<section id="hero" className="relative overflow-hidden min-h-screen flex items-center section-padding">
  {/* glows behind */}
  <div className="container relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* left: content */}
      {/* right: HeroVisual */}
    </div>
  </div>
</section>
```

---

## Component 1b — HeroVisual

**File:** `components/HeroVisual.tsx`
**Directive:** `'use client'` — CSS animations via Tailwind

Pure CSS animated orb composition:

```tsx
export default function HeroVisual() {
  return (
    <div className="relative w-full h-[420px] md:h-[540px]">
      {/* Large violet orb */}
      <div className="absolute top-1/2 left-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full
                      -translate-x-1/2 -translate-y-1/2 animate-float"
        style={{ background: 'radial-gradient(circle, rgba(155,89,245,0.35) 0%, rgba(155,89,245,0.05) 60%, transparent 100%)', filter: 'blur(1px)' }} />

      {/* Pink orb */}
      <div className="absolute top-[10%] right-[10%] w-44 h-44 rounded-full animate-float-slow"
        style={{ background: 'radial-gradient(circle, rgba(224,64,160,0.3) 0%, transparent 70%)', animationDelay: '2s' }} />

      {/* Blue orb */}
      <div className="absolute bottom-[15%] left-[5%] w-32 h-32 rounded-full animate-float"
        style={{ background: 'radial-gradient(circle, rgba(74,158,255,0.25) 0%, transparent 70%)', animationDelay: '4s' }} />

      {/* Floating metric cards */}
      <div className="absolute top-[8%] right-[2%] glass-card px-5 py-3 rounded-xl animate-float min-w-[160px]"
        style={{ animationDelay: '1s' }}>
        <span className="text-[11px] text-white/50 block">AI-Generated Content</span>
        <span className="text-sm font-semibold text-white">+340% Engagement</span>
      </div>
      <div className="absolute bottom-[18%] right-[5%] glass-card px-5 py-3 rounded-xl animate-float-slow min-w-[140px]"
        style={{ animationDelay: '3s' }}>
        <span className="text-[11px] text-white/50 block">Meta Ads ROAS</span>
        <span className="text-sm font-semibold text-gradient">4.8x Average</span>
      </div>
      <div className="absolute top-[42%] left-[0%] glass-card px-4 py-2.5 rounded-xl animate-float min-w-[130px]"
        style={{ animationDelay: '5s' }}>
        <span className="text-[11px] text-white/50 block">SEO Rankings</span>
        <span className="text-sm font-semibold text-white">#1 in 60 days</span>
      </div>
    </div>
  )
}
```

---

## Component 2 — MarqueeBanner

**File:** `components/sections/MarqueeBanner.tsx`
**Directive:** none — pure CSS animation, no hooks
**Replaces:** `ExperienceSummary.tsx` — delete that file

Scan `/public/clients/` and `/public/tools/` — list all files found.
Build `logos` array from all found files.

```tsx
<section className="py-10 border-y border-white/[0.06] overflow-hidden">
  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30 text-center mb-6">
    Trusted by brands across industries
  </p>
  <div className="overflow-hidden">
    <div className="flex gap-16 animate-marquee whitespace-nowrap items-center">
      {[...logos, ...logos].map((logo, i) => (
        <img key={i} src={logo.src} alt={logo.name} loading="lazy"
          className="h-7 object-contain opacity-35 grayscale hover:opacity-80
                     hover:grayscale-0 transition-all duration-300 flex-shrink-0" />
      ))}
    </div>
  </div>
</section>
```

---

## Component 3 — WhyAviva

**File:** `components/sections/WhyAviva.tsx`
**Directive:** `'use client'` — Framer Motion
**Replaces:** `About.tsx` + `Strengths.tsx` — delete both
**Section ID:** `id="about"`

### Part A — Headline
```
[SectionLabel: "OUR EDGE"]
H2: "Where AI Meets Human Creativity"
Subtext: "We engineer growth by combining AI-powered tools with deep marketing expertise and full-stack technical development."
```

### Part B — 3 glass feature cards
`staggerContainer` + `scaleIn` + `whileInView viewport={{ once: true }}`:

Card 1 / Brain: "AI-First Approach" — "We embed AI into every layer: generative visuals, predictive ad targeting, automated content pipelines."
Card 2 / RefreshCw: "Full-Circle Solutions" — "Strategy, creative, development, advertising — all under one roof. No handoffs, no gaps."
Card 3 / TrendingUp: "Measurable Results" — "Every decision is data-driven. We track, optimize and scale what works with full transparency."

Each `glass-card p-8`:
- Icon in `w-12 h-12 rounded-xl bg-gradient-subtle flex items-center justify-center mb-5`
- Icon: `text-accent-violet` size 22
- H3: `font-display font-700 text-lg text-white`
- Body: `text-sm text-white/60 leading-relaxed mt-2`

### Part C — Tools strip
`[SectionLabel: "TOOLS & PLATFORMS WE MASTER"]`
All logos from `/public/tools/`:
`grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 items-center mt-8`
Each: `h-8 object-contain opacity-40 grayscale hover:opacity-90 hover:grayscale-0 transition-all duration-300`

---

## Component 4 — ServicesPreview (PREVIEW — links to /services)

**File:** `components/sections/ServicesPreview.tsx`
**Directive:** `'use client'` — Framer Motion
**Section ID:** `id="services"`

This is a PREVIEW of services — shows 6 cards (2 from each category), not all 18.
The full list lives at `/services`.

### Header
```
[SectionLabel: "WHAT WE DO"]
H2: "Every Service Your Brand Needs"
Subtext: "From AI-generated content to custom web applications — we handle it all."
```

### Preview cards — pick 2 from each category (6 total):
Suggested picks from `data/services.ts`:
- Marketing: "AI-Powered Marketing", "Meta Ads Campaigns"
- Creative: "AI Image Generation", "Video Editing"
- Web: "Custom Websites (Next.js)", "SaaS Solutions"

```tsx
// Resolve Lucide icons dynamically
import * as Icons from 'lucide-react'
const IconComp = (Icons as any)[service.icon] as React.ElementType
```

`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`
Each card: `glass-card p-6` with icon, title, 1-line description, "Learn More →"
"Learn More →" links to `/services` (not anchor scroll).

### "See All Services" CTA below grid:
```tsx
<div className="flex justify-center mt-10">
  <Link href="/services">
    <ButtonOutline>See All 18 Services →</ButtonOutline>
  </Link>
</div>
```

Animate grid with `staggerContainer` + `scaleIn` + `whileInView`.

---

## Component 5 — PortfolioPreview (PREVIEW — links to /work)

**File:** `components/sections/PortfolioPreview.tsx`
**Directive:** `'use client'` — Framer Motion

This shows only 3 portfolio items. Full grid lives at `/work`.

Scan `/public/designs/` for images. Show first 3.

### Header
```
[SectionLabel: "OUR WORK"]
H2: "Projects That Speak for Themselves"
Subtext: "A selection of our latest design, social, and web work."
```

### Grid — 3 items only, `grid grid-cols-1 md:grid-cols-3 gap-5`

Each card (`PortfolioCard` pattern from `.claude/components.md`):
- Image `h-64 object-cover`, `loading="lazy"`
- Glass gradient overlay at bottom (title + category)
- Hover: full glass overlay with "View Project →"

### CTA below grid:
```tsx
<div className="flex justify-center mt-10">
  <Link href="/work">
    <ButtonOutline>View All Projects →</ButtonOutline>
  </Link>
</div>
```

Animate with `staggerContainer` + `scaleIn` + `whileInView`.

---

## Component 6 — CTABanner

**File:** `components/sections/CTABanner.tsx`
**Directive:** `'use client'` — Framer Motion

```tsx
<section className="section-padding relative overflow-hidden">
  <Glow color="violet" size={600} className="top-1/2 left-1/2" />
  <div className="container relative z-10">
    <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
      className="glass-card p-10 md:p-16 text-center max-w-3xl mx-auto"
      style={{ background: 'rgba(155,89,245,0.06)', borderColor: 'rgba(155,89,245,0.2)' }}>
      <SectionLabel>READY TO GROW?</SectionLabel>
      <h2 className="font-display font-800 text-4xl md:text-5xl text-white mt-3 mb-4">
        Ready to Scale Your Brand<br />
        <span className="text-gradient">with AI?</span>
      </h2>
      <p className="text-white/60 text-lg mb-8 max-w-lg mx-auto">
        Let's build something extraordinary together. Free strategy call, no commitment.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Link href="/contact"><ButtonPrimary size="lg">Get a Free Strategy Call</ButtonPrimary></Link>
        <Link href="/contact"><ButtonOutline>Send Us a Message</ButtonOutline></Link>
      </div>
    </motion.div>
  </div>
</section>
```

---

## Update app/page.tsx

```tsx
import Hero from '@/components/sections/Hero'
import MarqueeBanner from '@/components/sections/MarqueeBanner'
import WhyAviva from '@/components/sections/WhyAviva'
import ServicesPreview from '@/components/sections/ServicesPreview'
import PortfolioPreview from '@/components/sections/PortfolioPreview'
import Clients from '@/components/Clients'           // not yet rebuilt — keep existing
import Testimonials from '@/components/Testimonials' // not yet rebuilt — keep existing
import Packages from '@/components/Packages'         // not yet rebuilt — keep existing
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

Note: Clients, Testimonials, Packages are rebuilt in Session 4.
ContactForm is no longer on the homepage — it lives at `/contact`.

Delete these component files:
`ExperienceSummary.tsx`, `About.tsx`, `Timeline.tsx`, `Skills.tsx`, `Strengths.tsx`

---

## Verification Checklist

- [ ] `npm run build` — zero errors
- [ ] Homepage renders all 8 sections
- [ ] Hero headline gradient, floating cards, orbs all visible
- [ ] Marquee scrolls infinitely
- [ ] WhyAviva 3 cards + tools grid visible
- [ ] ServicesPreview shows 6 cards, "See All Services →" links to `/services`
- [ ] PortfolioPreview shows 3 images, "View All Projects →" links to `/work`
- [ ] CTABanner buttons link to `/contact`
- [ ] All `<Link>` components used for internal nav (no bare `<a>` tags)
- [ ] No console errors
