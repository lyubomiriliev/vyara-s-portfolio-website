---
name: session-5-premium-polish
description: >
  Premium design polish pass. Apple-level visual refinement: new font pairing,
  atmospheric backgrounds, glassmorphism cards, centered hero, infinite marquee,
  logo replacement, individual project pages, redesigned clients section,
  remove packages, and upgraded header. Run AFTER session-4 with a passing build.

recommended_model: opus
---

# Session 5 — Premium Design Polish

## Before Starting

Read these files in full before writing any code:
- `CLAUDE.md`
- `.claude/design-system.md`
- `.claude/components.md`
- `.claude/static-export-rules.md`

Then read EVERY component file that will be touched in this session:
- `app/layout.tsx`
- `app/globals.css`
- `tailwind.config.ts`
- `components/Header.tsx`
- `components/Footer.tsx`
- `components/sections/Hero.tsx`
- `components/HeroVisual.tsx`
- `components/sections/MarqueeBanner.tsx`
- `components/sections/Clients.tsx`
- `components/sections/Packages.tsx`
- `components/sections/PortfolioPreview.tsx`
- `components/pages/WorkPage.tsx`
- `app/page.tsx`
- `app/globals.css`
- `app/layout.tsx`
- `tailwind.config.ts`

Also scan `/public/` — list all files at root level and note `aviva-digital-logo.png`.

---

## Change 0 — Typography: New Font Pairing

**File:** `app/layout.tsx`
**File:** `app/globals.css`
**File:** `tailwind.config.ts`

Replace the current Syne + DM Sans pairing with a more characterful premium combination:

### New fonts
- **Space Grotesk** — primary sans-serif for headings, UI text, body copy
  - Weights: 300, 400, 500, 600, 700
  - Variable: `--font-sans`
  - Replaces both Syne AND DM Sans
- **Caveat** — handwritten accent font for decorative use only
  - Weights: 400, 700
  - Variable: `--font-script`
  - Used ONLY for: section label accents, pull-quote marks, decorative word
    highlights embedded in hero/section headings (e.g. the italic "Digital" word
    in the hero headline), NOT for body text

### Usage guidelines
- `font-sans` (Space Grotesk): all headings, all body text, all nav, all buttons
- `font-script` (Caveat): sparingly — maximum 3–4 uses per page
  - Section eyebrow labels that want to feel handcrafted (e.g. "Our Work" label)
  - One or two accent words INSIDE a large heading to break rhythm
  - Decorative quote marks in Testimonials
  - Never on body paragraphs, never on buttons, never on form labels

### app/layout.tsx font setup

```tsx
import { Space_Grotesk, Caveat } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-script',
  display: 'swap',
})

// Apply to <html>:
// className={`${spaceGrotesk.variable} ${caveat.variable}`}
```

Remove ALL other font imports from layout.tsx (`Syne`, `DM_Sans`, etc.)

### tailwind.config.ts changes

Replace the current fontFamily entries:

```ts
fontFamily: {
  sans:   ['var(--font-sans)', 'system-ui', 'sans-serif'],
  script: ['var(--font-script)', 'cursive'],
  // Remove: display, body
},
```

### globals.css changes

- Remove `@import url(...)` if any remain
- Replace any `font-family` references to Syne or DM Sans with CSS variable equivalents
- Update the body rule:
  ```css
  body {
    font-family: var(--font-sans), system-ui, sans-serif;
  }
  ```
- Add utility class:
  ```css
  .font-script { font-family: var(--font-script), cursive; }
  ```

### Global find & replace in all component files

After updating the config:
- `font-display` → `font-sans` (or `font-bold`/`font-semibold` on Space Grotesk)
- `font-body` → `font-sans`
- `font-700` / `font-800` → `font-bold` / `font-extrabold` (standard Tailwind weights)
- `font-600` → `font-semibold`
- `font-500` → `font-medium`

Space Grotesk supports standard Tailwind font-weight utilities — no custom weight classes needed.

### Where to use `font-script` (Caveat)

1. **Hero headline** — the gradient accent word(s) can optionally switch to script:
   ```tsx
   <span className="font-script text-gradient">Digital Future</span>
   ```
   Use judgment — if it clashes with the logo style, keep sans-serif for the headline
   and use script only for eyebrow labels instead.

2. **Section eyebrow labels** — select 2–3 sections for the handwritten treatment:
   ```tsx
   <span className="font-script text-2xl text-accent-violet tracking-normal">
     our work
   </span>
   ```
   (lowercase looks better with script fonts)

3. **Testimonials quote mark** — the large decorative `"` character:
   ```tsx
   <span className="font-script font-700 text-8xl leading-none text-gradient opacity-30">"</span>
   ```

4. **CTABanner or PageHero sub-headline accent** — one stylistic word in script

---

## Change 1 — Logo: Replace Text with Image Everywhere

**File:** `components/Header.tsx`
**File:** `components/Footer.tsx`

Replace every instance of the plain text "AVIVA DIGITAL" (including any styled
span/gradient text renditions) with the logo image:

```tsx
<img
  src="/aviva-digital-logo.png"
  alt="Aviva Digital"
  className="h-8 w-auto object-contain"
/>
```

- In the Header: wrap in `<Link href="/">` so it navigates home
- In the Footer: same image, `className="h-10 w-auto object-contain opacity-90"`
- Remove any font-display text that spelled out the agency name in both components
- Do NOT change layout or other header/footer logic

---

## Change 2 — Header: Premium Redesign

**File:** `components/Header.tsx`
**Directive:** `'use client'`

Rebuild the header to feel premium and polished:

### Visual treatment
- Background on scroll: `backdrop-blur-xl bg-[#0A0A0F]/80 border-b border-white/[0.06]`
  with a subtle gradient shimmer line at the very bottom edge:
  `before:content-[''] before:absolute before:bottom-0 before:left-0 before:right-0
   before:h-px before:bg-gradient-to-r before:from-transparent before:via-accent-violet/50 before:to-transparent`
- At top (no scroll): fully transparent, no border
- Use Framer Motion `AnimatePresence` + `motion.header` to transition background smoothly

### Layout
```
[Logo]                     [Nav links — centered absolutely]     [CTA Button]
```
- Logo: `aviva-digital-logo.png` (per Change 1)
- Nav links: `absolute left-1/2 -translate-x-1/2` so they are perfectly centered
- Nav links: `text-sm font-medium text-white/60 hover:text-white transition-colors`
- Active link: `text-white` with a small dot indicator below:
  ```tsx
  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1
                   rounded-full bg-accent-violet" />
  ```
- CTA: `ButtonPrimary` — "Get a Free Audit" — links to `/contact`
- CTA pill shape, subtle `shadow-glow-violet` on hover

### Mobile
- Hamburger icon (Lucide `Menu` / `X`)
- Full-screen slide-down menu with same glass background
- Each link closes the menu on click

---

## Change 3 — Global Backgrounds: Atmospheric & Premium

**File:** `app/globals.css`
**File:** `tailwind.config.ts`

The site must NOT use plain flat `#0A0A0F` everywhere. Add layered atmospheric depth.

### globals.css — body background

Replace or augment the body background with a living, layered treatment:

```css
body {
  background-color: #0A0A0F;
  background-image:
    radial-gradient(ellipse 80% 50% at 20% -10%, rgba(155, 89, 245, 0.12) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 10%, rgba(224, 64, 160, 0.08) 0%, transparent 55%),
    radial-gradient(ellipse 70% 50% at 50% 100%, rgba(74, 158, 255, 0.07) 0%, transparent 60%);
  background-attachment: fixed;
}
```

### Section-level atmospheric accents

Add these utility classes to globals.css for use inside sections:

```css
/* Ambient noise texture overlay — gives Apple-like depth */
.noise-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
}

/* Section separator glow — subtle color bleed between sections */
.section-glow-top {
  position: relative;
}
.section-glow-top::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  max-width: 600px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(155,89,245,0.4), transparent);
}
```

### Glassmorphism — enforce properly

Ensure `.glass-card` in globals.css is exactly:

```css
.glass-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.06);
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}
.glass-card:hover {
  border-color: rgba(155, 89, 245, 0.25);
  box-shadow: 0 8px 40px rgba(155,89,245,0.15), inset 0 1px 0 rgba(255,255,255,0.08);
  transform: translateY(-2px);
}
```

Apply `.glass-card` to ALL cards across the site that don't already use it:
- `WhyAviva` feature cards
- `ServicesPreview` service cards
- `Testimonials` quote cards
- `PortfolioPreview` item overlays
- Any stat pills or info cards in the Hero

---

## Change 4 — Hero: Center Layout, Remove Orbs

**File:** `components/sections/Hero.tsx`
**File:** `components/HeroVisual.tsx`

### Layout change
Convert the hero from a left-aligned split layout to a **centered, full-width layout**:

```
          [badge pill]
   We Build Digital Future
        That Converts.

   Full-service digital agency...

   [Start a Project →]  [View Our Work]

   [150+ stat]  [40% stat]  [30+ stat]

        [floating metric cards]
```

- Outer wrapper: `flex flex-col items-center text-center`
- Heading: `text-center max-w-4xl mx-auto`
- Subtext: `text-center max-w-xl mx-auto`
- Buttons: `flex items-center justify-center gap-4`
- Stats row: `flex items-center justify-center gap-6 flex-wrap`

### Remove the orb visual
- Delete or gut `HeroVisual.tsx` — remove the large glowing blob/orb component entirely
- Remove its import from `Hero.tsx`

### Replace with atmospheric floating metric cards
Instead of orbs, show **3 floating metric cards** scattered in the background behind the
centered text, using absolute positioning with `pointer-events-none`:

```tsx
{/* Floating cards — decorative, behind content */}
<div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
  {/* Top right */}
  <motion.div
    className="absolute top-[18%] right-[8%] glass-card px-4 py-3 text-sm hidden lg:block"
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
  >
    <div className="text-white/40 text-xs mb-1">AI-Generated Content</div>
    <div className="text-gradient font-display font-700 text-base">+340% Engagement</div>
  </motion.div>

  {/* Middle left */}
  <motion.div
    className="absolute top-[42%] left-[6%] glass-card px-4 py-3 text-sm hidden lg:block"
    animate={{ y: [0, 8, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
  >
    <div className="text-white/40 text-xs mb-1">SEO Rankings</div>
    <div className="text-gradient font-display font-700 text-base">#1 in 60 days</div>
  </motion.div>

  {/* Bottom right */}
  <motion.div
    className="absolute bottom-[22%] right-[12%] glass-card px-4 py-3 text-sm hidden lg:block"
    animate={{ y: [0, -6, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
  >
    <div className="text-white/40 text-xs mb-1">Meta Ads ROAS</div>
    <div className="text-gradient font-display font-700 text-base">4.8x Average</div>
  </motion.div>
</div>
```

### Background glow behind centered heading
Add a subtle radial glow centered behind the headline text only:

```tsx
<div
  className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
             w-[700px] h-[400px] pointer-events-none"
  style={{
    background: 'radial-gradient(ellipse, rgba(155,89,245,0.12) 0%, transparent 70%)',
    filter: 'blur(40px)',
  }}
  aria-hidden
/>
```

---

## Change 5 — MarqueeBanner: Infinite + Bigger Logos

**File:** `components/sections/MarqueeBanner.tsx`
**Directive:** `'use client'`

### Fix infinite scroll

The carousel must scroll **truly infinitely** with no jump/reset visible.
Use a CSS animation approach — duplicate the logo list so you always have 2× copies,
and animate only the container:

```css
/* globals.css */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.animate-marquee {
  animation: marquee 28s linear infinite;
  will-change: transform;
}
.animate-marquee:hover {
  animation-play-state: paused;
}
```

```tsx
// Component — outer hides overflow, inner animates
<div className="overflow-hidden w-full" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
  <div className="flex animate-marquee" style={{ width: 'max-content' }}>
    {/* Render logos TWICE — first copy + exact duplicate */}
    {[...logos, ...logos].map((logo, i) => (
      <div key={i} className="flex-shrink-0 px-10 flex items-center justify-center">
        <img
          src={logo.src}
          alt={logo.alt}
          loading="lazy"
          className="h-10 w-auto object-contain opacity-50 hover:opacity-80 transition-opacity"
          style={{ maxWidth: '140px' }}
        />
      </div>
    ))}
  </div>
</div>
```

Key rules:
- `h-10` (40px) for logos — was likely `h-6` or `h-7` before, this is bigger
- `max-width: 140px` keeps wide logos from dominating
- Fade mask on left/right edges via `maskImage` for polish
- Duration `28s` — adjust if too fast/slow
- The two copies must be identical and seamlessly joined (no gap, no jump)

---

## Change 6 — Clients Section: Full Redesign (WOW)

**File:** `components/sections/Clients.tsx`
**Directive:** `'use client'`

**Delete the current card grid entirely.** Replace with a premium "bento-style" layout.

### Concept
A visually stunning 3-column bento grid where each client gets a "case study card"
with a large logo, a bold headline result, and a glowing accent. One card spans full
width at the top as a "hero case study". The others sit below in a 3-col grid.

### Data — read existing file first and preserve all real client data

### Layout

```
[ HERO CARD — El Shisha — full width ]

[ Pulse Homes ]   [ CoolFit ]   [ ElWell ]

[ Fox Academy ]   [ La Manière ]   [ + any others ]
```

### Hero Card (first client, full width)

```tsx
<motion.div
  className="relative overflow-hidden rounded-2xl col-span-full"
  style={{ background: 'linear-gradient(135deg, rgba(224,64,160,0.08), rgba(155,89,245,0.06))' }}
  whileHover={{ scale: 1.005 }}
  {...fadeUp}
>
  {/* Glass inner */}
  <div className="glass-card rounded-2xl p-10 md:p-14 flex flex-col md:flex-row items-start
                  md:items-center gap-8 border-none"
       style={{ background: 'transparent', backdropFilter: 'none' }}>

    {/* Left: logo + name */}
    <div className="flex-shrink-0">
      <img src={clients[0].logo} alt={clients[0].name}
           className="h-14 w-auto object-contain opacity-90 mb-4" />
      <div className="text-xs uppercase tracking-[0.15em] text-white/35">{clients[0].name}</div>
    </div>

    {/* Divider */}
    <div className="hidden md:block w-px self-stretch bg-white/10" />

    {/* Center: headline stat */}
    <div className="flex-1">
      <div className="font-display font-800 text-6xl md:text-7xl text-gradient leading-none mb-2">
        {clients[0].metrics[0].value}
      </div>
      <div className="text-white/55 text-lg">{clients[0].metrics[0].label}</div>
    </div>

    {/* Right: other metrics */}
    <div className="flex gap-8">
      {clients[0].metrics.slice(1).map(m => (
        <div key={m.label}>
          <div className="font-display font-700 text-3xl text-gradient">{m.value}</div>
          <div className="text-xs text-white/40 mt-1">{m.label}</div>
        </div>
      ))}
    </div>
  </div>

  {/* Glow accent */}
  <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
       style={{ background: 'radial-gradient(circle, rgba(224,64,160,0.15), transparent 70%)',
                filter: 'blur(40px)' }} />
  {/* Gradient border */}
  <div className="absolute inset-0 rounded-2xl pointer-events-none"
       style={{ background: 'linear-gradient(135deg, rgba(224,64,160,0.3), rgba(155,89,245,0.2)) border-box',
                border: '1px solid transparent',
                WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'destination-out',
                maskComposite: 'exclude' }} />
</motion.div>
```

### Standard Bento Cards (remaining clients)

```tsx
<motion.div
  className="relative overflow-hidden rounded-2xl glass-card p-8 flex flex-col gap-6 group"
  whileHover={{ y: -4 }}
  {...fadeUp}
>
  {/* Client logo */}
  <img src={client.logo} alt={client.name}
       className="h-10 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity" />

  {/* Big primary stat */}
  <div>
    <div className="font-display font-800 text-5xl text-gradient leading-none">
      {client.metrics[0].value}
    </div>
    <div className="text-white/50 text-sm mt-1.5">{client.metrics[0].label}</div>
  </div>

  {/* Secondary stats row */}
  <div className="flex gap-6 pt-4 border-t border-white/[0.07]">
    {client.metrics.slice(1).map(m => (
      <div key={m.label}>
        <div className="font-display font-700 text-xl text-gradient">{m.value}</div>
        <div className="text-xs text-white/35 mt-0.5">{m.label}</div>
      </div>
    ))}
  </div>

  {/* Accent glow — positioned top-right */}
  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
       style={{ background: `radial-gradient(circle, var(${client.accent}) 0%, transparent 70%)`,
                opacity: 0.1, filter: 'blur(20px)' }} />
</motion.div>
```

### Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
  {/* Hero card — col-span-full */}
  <HeroClientCard client={clients[0]} />
  {/* Standard cards */}
  {clients.slice(1).map(c => <ClientBentoCard key={c.name} client={c} />)}
</div>
```

### Section background accent
Wrap the entire section in a `relative` div and add an ambient glow:
```tsx
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
               w-[800px] h-[500px] pointer-events-none"
     style={{ background: 'radial-gradient(ellipse, rgba(155,89,245,0.06), transparent 70%)',
              filter: 'blur(60px)' }} />
```

---

## Change 7 — Individual Project Pages

**New file:** `app/work/[slug]/page.tsx`
**New file:** `data/projects.ts`
**Update:** `components/pages/WorkPage.tsx`
**Update:** `components/sections/PortfolioPreview.tsx`

### Step 7a — Create `data/projects.ts`

Read `WorkPage.tsx` and `PortfolioPreview.tsx` first — extract ALL real project data.

Create `data/projects.ts` that exports a typed array:

```ts
export interface Project {
  slug: string            // e.g. 'el-shisha-brand'
  title: string
  client: string
  category: 'Designs' | 'Social' | 'Web' | 'Video'
  coverImage: string      // path in /public/designs/
  images: string[]        // all images for this project
  description: string     // 2-3 sentence overview
  services: string[]      // e.g. ['Brand Identity', 'Social Media']
  results?: {
    value: string
    label: string
  }[]
  year?: string
}

export const projects: Project[] = [
  // One entry per real design/project image in /public/designs/
  // Scan the directory and group related images by project
  // Use slugs like 'el-shisha', 'pulse-homes', etc.
]
```

Scan `/public/designs/` — list every file. Group related filenames by client/project.
Each group becomes one Project entry. The first image in the group is `coverImage`,
all images in the group go into `images[]`.

### Step 7b — Update WorkPage and PortfolioPreview

In both components, import from `data/projects.ts` and pass `slug` to project links:

```tsx
// Link to individual project
import Link from 'next/link'
<Link href={`/work/${project.slug}`}>
  {/* project card */}
</Link>
```

Add a subtle "View Project →" overlay on hover to each portfolio card:
```tsx
<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100
                transition-opacity flex items-end p-5">
  <span className="text-white font-semibold text-sm">View Project →</span>
</div>
```

### Step 7c — Create `app/work/[slug]/page.tsx`

**This must be a static page — add `generateStaticParams`.**

```tsx
import { projects } from '@/data/projects'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const project = projects.find(p => p.slug === params.slug)
  if (!project) return {}
  return {
    title: `${project.title} — Aviva Digital`,
    description: project.description,
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.slug === params.slug)
  if (!project) notFound()
  return <ProjectPageContent project={project} />
}
```

### Step 7d — Create `components/pages/ProjectPage.tsx`

**Directive:** `'use client'` — Framer Motion

Layout:

```
[Back ← Our Work]

[Project Title]
[Client · Category · Year]

[Full-width cover image]

[Two-column body]
  Left col (2/3):
    [Description paragraph]
    [Image gallery — masonry or simple grid]

  Right col (1/3):
    [glass-card — Services]
    [glass-card — Results (if any)]

[CTA Banner — "Ready for results like these?" → /contact]
```

```tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Project } from '@/data/projects'
import ButtonPrimary from '@/components/ui/ButtonPrimary'

export default function ProjectPageContent({ project }: { project: Project }) {
  return (
    <main className="pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Back link */}
        <Link href="/work"
          className="inline-flex items-center gap-2 text-sm text-white/40
                     hover:text-white transition-colors mb-10 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Our Work
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs uppercase tracking-[0.15em] text-accent-violet">
              {project.category}
            </span>
            {project.client && <>
              <span className="text-white/20">·</span>
              <span className="text-xs text-white/40">{project.client}</span>
            </>}
            {project.year && <>
              <span className="text-white/20">·</span>
              <span className="text-xs text-white/40">{project.year}</span>
            </>}
          </div>
          <h1 className="font-display font-800 text-4xl md:text-6xl text-white leading-tight">
            {project.title}
          </h1>
        </motion.div>

        {/* Cover image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl overflow-hidden mb-12 aspect-video w-full bg-bg-secondary"
        >
          <img src={project.coverImage} alt={project.title}
               className="w-full h-full object-cover" />
        </motion.div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left: description + gallery */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <p className="text-white/65 text-lg leading-relaxed">{project.description}</p>

            {project.images.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.images.slice(1).map((img, i) => (
                  <motion.div key={i}
                    className="rounded-xl overflow-hidden bg-bg-secondary aspect-square"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <img src={img} alt={`${project.title} ${i + 2}`}
                         className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Right: meta cards */}
          <div className="flex flex-col gap-5">
            {project.services.length > 0 && (
              <div className="glass-card p-6">
                <div className="text-xs uppercase tracking-[0.15em] text-white/35 mb-4">
                  Services
                </div>
                <ul className="flex flex-col gap-2.5">
                  {project.services.map(s => (
                    <li key={s} className="text-sm text-white/70 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent-violet flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.results && project.results.length > 0 && (
              <div className="glass-card p-6">
                <div className="text-xs uppercase tracking-[0.15em] text-white/35 mb-4">
                  Results
                </div>
                <div className="flex flex-col gap-4">
                  {project.results.map(r => (
                    <div key={r.label}>
                      <div className="font-display font-700 text-2xl text-gradient">{r.value}</div>
                      <div className="text-xs text-white/40 mt-0.5">{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center glass-card p-12 relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-xs uppercase tracking-[0.15em] text-accent-violet mb-4">
              Ready for Results?
            </div>
            <h2 className="font-display font-800 text-3xl md:text-4xl text-white mb-4">
              Let's build something like this for you.
            </h2>
            <Link href="/contact">
              <ButtonPrimary>Start Your Project →</ButtonPrimary>
            </Link>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                         w-96 h-64 pointer-events-none"
               style={{ background: 'radial-gradient(ellipse, rgba(155,89,245,0.12), transparent 70%)',
                        filter: 'blur(40px)' }} />
        </div>
      </div>
    </main>
  )
}
```

---

## Change 8 — Remove Packages Section

**File:** `app/page.tsx`
**File:** `components/sections/Packages.tsx`

1. Remove `<Packages />` from `app/page.tsx` and delete its import
2. Delete the file `components/sections/Packages.tsx`
3. Update `app/page.tsx` so section order is:
   ```
   Hero → MarqueeBanner → WhyAviva → ServicesPreview →
   PortfolioPreview → Clients → Testimonials → CTABanner
   ```
4. If `/contact` page has a packages CTA, remove it or replace with a generic CTA

---

## Final Build Verification

Run `npm run build` — must pass with zero errors.

### Visual checklist
- [ ] Logo image renders correctly in Header and Footer — no text fallback
- [ ] Header: glass on scroll, gradient bottom line, centered nav, CTA button
- [ ] Hero: perfectly centered layout, NO orbs, floating metric cards visible on desktop
- [ ] Body background has atmospheric gradient (not flat black)
- [ ] MarqueeBanner scrolls truly infinitely — no visible reset/jump
- [ ] Marquee logos are `h-10` — visibly larger than before
- [ ] Marquee fades on left/right edges
- [ ] ALL cards across the site use `.glass-card` with proper backdrop-blur
- [ ] Glass cards have hover states (subtle lift + border glow)
- [ ] Clients section shows bento layout — hero card full-width, grid below
- [ ] Clicking any portfolio card navigates to `/work/[slug]`
- [ ] Individual project page renders: cover image, gallery, services card, results card
- [ ] `generateStaticParams` covers every project slug — no 404s
- [ ] Packages section is completely gone from homepage and nav
- [ ] `npm run build` produces static output with `/work/[slug]` pages included

### Static export compliance
- [ ] `app/work/[slug]/page.tsx` has `generateStaticParams` returning all slugs
- [ ] No API routes or server-only APIs used
- [ ] `next.config.ts` still has `output: 'export'` and `images: { unoptimized: true }`