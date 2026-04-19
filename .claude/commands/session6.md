---
name: session-6-visual-fixes
description: >
  Visual polish and structural fixes: warm gradient on hero headline, count-up
  stats with real data, bigger logo, floating card glows, brighter hero bg,
  truly infinite marquee, clients bento grid, and dedicated /about + /clients pages.
  Run AFTER session-5 with a passing build.

recommended_model: opus
---

# Session 6 — Visual Fixes & Page Restructure

## Before Starting

Read these files in full before writing any code:

- `CLAUDE.md`
- `.claude/design-system.md`
- `.claude/components.md`
- `.claude/static-export-rules.md`

Then read every file that will be touched:

- `app/globals.css`
- `tailwind.config.ts`
- `app/layout.tsx`
- `app/page.tsx`
- `components/Header.tsx`
- `components/sections/Hero.tsx`
- `components/ui/StatPill.tsx`
- `components/sections/MarqueeBanner.tsx`
- `components/sections/Clients.tsx`
- `components/sections/WhyAviva.tsx`

---

## Change 1 — Hero: "Digital Futures" Warm Orange/Pink Gradient

**File:** `components/sections/Hero.tsx`
**File:** `app/globals.css`

The headline "Digital Futures" currently uses `.text-gradient` (pink → violet → blue).
Change it to a warm orange → pink gradient instead.

### Step 1a — Add warm gradient CSS class to globals.css

Insert after the existing `.text-gradient` block:

```css
.text-gradient-warm {
  background: linear-gradient(135deg, #ffb76c 0%, #e040a0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Step 1b — Apply to Hero headline

In `components/sections/Hero.tsx`, find the headline and change the "Digital Futures" line:

```tsx
// Before:
<div className="text-gradient">Digital Futures</div>

// After:
<div className="text-gradient-warm">Digital Futures</div>
```

Only "Digital Futures" gets the warm gradient. "We Build" and "That Convert." stay white.

---

## Change 2 — Hero: Count-Up Stats with Real Data

**File:** `components/sections/Hero.tsx`
**File:** `components/ui/StatPill.tsx`

### Context

The current Hero renders 3 static StatPill boxes:

- `150+` Projects Delivered
- `40%` Avg. ROI Increase
- `30+` Industries Served

Replace these with the real agency data (from the old website), displayed in larger
bento-style stat cards that animate from 0 to the target number when scrolled into view.

### Real data to use

```ts
const heroStats = [
  { value: 32604, suffix: "+", label: "Posts & Stories" },
  { value: 1852, suffix: "+", label: "Designs" },
  { value: 85, suffix: "+", label: "Campaigns" },
  { value: 13, suffix: "+", label: "Customers" },
];
```

### Step 2a — Create count-up hook

Add a new file `lib/useCountUp.ts`:

```ts
"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export function useCountUp(target: number, duration = 2200) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-60px",
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(easeOutQuart(progress) * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return { count, ref };
}
```

### Step 2b — Create AnimatedStat component

Add `components/ui/AnimatedStat.tsx`:

```tsx
"use client";
import { useCountUp } from "@/lib/useCountUp";

interface AnimatedStatProps {
  value: number;
  suffix?: string;
  label: string;
}

export function AnimatedStat({ value, suffix = "", label }: AnimatedStatProps) {
  const { count, ref } = useCountUp(value);
  return (
    <div
      ref={ref}
      className="glass-card flex flex-col items-center justify-center px-8 py-6 min-w-[140px]"
    >
      <span className="text-gradient-warm font-sans font-extrabold text-3xl md:text-4xl leading-none tabular-nums">
        {count.toLocaleString()}
        {suffix}
      </span>
      <span className="text-white/45 text-xs mt-2 uppercase tracking-widest text-center">
        {label}
      </span>
    </div>
  );
}
```

### Step 2c — Replace StatPill row in Hero.tsx

In `components/sections/Hero.tsx`:

1. Remove the import of `StatPill` from `@/components/ui/StatPill`
2. Add the import: `import { AnimatedStat } from '@/components/ui/AnimatedStat'`
3. Replace the existing stats `<motion.div>` block:

```tsx
// Remove this:
<motion.div variants={fadeUp} className="flex items-center justify-center gap-3 flex-wrap">
  <StatPill value="150+" label="Projects Delivered" />
  <StatPill value="40%" label="Avg. ROI Increase" />
  <StatPill value="30+" label="Industries Served" />
</motion.div>

// Replace with:
<motion.div variants={fadeUp} className="flex items-center justify-center gap-4 flex-wrap">
  {[
    { value: 32604, suffix: '+', label: 'Posts & Stories' },
    { value: 1852,  suffix: '+', label: 'Designs' },
    { value: 85,    suffix: '+', label: 'Campaigns' },
    { value: 13,    suffix: '+', label: 'Customers' },
  ].map(stat => (
    <AnimatedStat key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
  ))}
</motion.div>
```

### Step 2d — Make the logo bigger in the Header

**File:** `components/Header.tsx`

Find the logo `<img>` tag and increase its height:

```tsx
// Before:
<img src="/aviva-digital-logo.png" alt="Aviva Digital" className="h-8 w-auto object-contain" />

// After:
<img src="/aviva-digital-logo.png" alt="Aviva Digital" className="h-10 md:h-12 w-auto object-contain" />
```

---

## Change 3 — Hero: Floating Card Glows + More Visible Background

**File:** `components/sections/Hero.tsx`

### Step 3a — Reduce dark overlay opacity

The hero has a dark overlay that dims the background image too much.
Change opacity from `/60` to `/35`:

```tsx
// Before:
<div className="absolute inset-0 bg-[#0A0A0F]/60 pointer-events-none" aria-hidden />

// After:
<div className="absolute inset-0 bg-[#0A0A0F]/35 pointer-events-none" aria-hidden />
```

### Step 3b — Add glow pulse to each floating card

Each of the 3 floating metric cards gets a pulsing glow ring beneath it.
Wrap each `motion.div` card in a relative container and add a glow layer:

```tsx
{
  /* Top right card */
}
<div className="absolute top-[18%] right-[8%] hidden lg:block">
  {/* Glow ring behind card */}
  <motion.div
    className="absolute inset-0 rounded-2xl pointer-events-none"
    animate={{ opacity: [0.3, 0.7, 0.3] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    style={{
      background:
        "radial-gradient(ellipse, rgba(224,64,160,0.5) 0%, transparent 70%)",
      filter: "blur(16px)",
      transform: "scale(1.4)",
    }}
  />
  <motion.div
    className="glass-card px-4 py-3 text-sm relative"
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    <div className="text-white/40 text-xs mb-1">AI-Generated Content</div>
    <div className="text-gradient-warm font-sans font-bold text-base">
      +340% Engagement
    </div>
  </motion.div>
</div>;

{
  /* Middle left card */
}
<div className="absolute top-[42%] left-[6%] hidden lg:block">
  <motion.div
    className="absolute inset-0 rounded-2xl pointer-events-none"
    animate={{ opacity: [0.3, 0.6, 0.3] }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 0.8,
    }}
    style={{
      background:
        "radial-gradient(ellipse, rgba(155,89,245,0.5) 0%, transparent 70%)",
      filter: "blur(16px)",
      transform: "scale(1.4)",
    }}
  />
  <motion.div
    className="glass-card px-4 py-3 text-sm relative"
    animate={{ y: [0, 8, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
  >
    <div className="text-white/40 text-xs mb-1">SEO Rankings</div>
    <div className="text-gradient-warm font-sans font-bold text-base">
      #1 in 60 days
    </div>
  </motion.div>
</div>;

{
  /* Bottom right card */
}
<div className="absolute bottom-[22%] right-[12%] hidden lg:block">
  <motion.div
    className="absolute inset-0 rounded-2xl pointer-events-none"
    animate={{ opacity: [0.3, 0.65, 0.3] }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1.6,
    }}
    style={{
      background:
        "radial-gradient(ellipse, rgba(74,158,255,0.5) 0%, transparent 70%)",
      filter: "blur(16px)",
      transform: "scale(1.4)",
    }}
  />
  <motion.div
    className="glass-card px-4 py-3 text-sm relative"
    animate={{ y: [0, -6, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
  >
    <div className="text-white/40 text-xs mb-1">Meta Ads ROAS</div>
    <div className="text-gradient-warm font-sans font-bold text-base">
      4.8x Average
    </div>
  </motion.div>
</div>;
```

Replace the old `<div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>` block entirely with the 3 individual positioned divs above (NOT wrapped in a shared container — each is independently positioned within the `<section>`).

---

## Change 4 — Marquee: Truly Infinite with No Empty Space

**File:** `components/sections/MarqueeBanner.tsx`
**File:** `tailwind.config.ts`

### Root cause

The current implementation uses 2 copies of 8 logos. With 8 logos at ~160–180px each,
the first copy spans ~1280–1440px — roughly equal to a wide viewport. On 1440px+ screens
the first copy barely fills the screen, so when the animation translates to -50%, the
loop seam may be visible or the tail of the second copy shows empty space.

### Fix — use 4 copies, animate to -25%

**tailwind.config.ts** — update the marquee keyframe to translate -25% (one copy out of 4):

```ts
keyframes: {
  // Change this:
  marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
  // To this:
  marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-25%)' } },
  // ... rest unchanged
},
```

**components/sections/MarqueeBanner.tsx** — use 4 copies instead of 2:

```tsx
// Before:
{[...logos, ...logos].map((logo, i) => (

// After:
{[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
```

The 4-copy approach guarantees content always fills the viewport on any screen size,
and -25% translates exactly one copy's width, looping seamlessly back to -25% offset
which looks identical to the start (second copy of 4 = identical to first).

### Additional marquee polish

Add `'use client'` at the top of `MarqueeBanner.tsx` if not already present.

Ensure the animation duration is `32s` (slightly slower for large viewports):

In `tailwind.config.ts`:

```ts
animation: {
  marquee: 'marquee 32s linear infinite',
  // rest unchanged
}
```

---

## Change 5 — Clients Section: Bento Grid Layout

**File:** `components/sections/Clients.tsx`

If the Clients section is not already displaying a bento grid (hero client full-width +
standard cards in a 3-col grid), rebuild it completely per the spec below.
Read the current file first and preserve all client data (logos, names, metrics, accents).

### Bento grid layout

```
[ El Shisha — full width hero card with big headline stat ]

[ Pulse Homes ]   [ CoolFit ]   [ El Well ]

[ Fox Academy ]   [ La Manière ]
```

### Full component

```tsx
"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";

const clients = [
  {
    logo: "/clients/elshisha.png",
    name: "El Shisha",
    metrics: [
      { value: "+40%", label: "Sales Growth" },
      { value: "100+", label: "Happy Clients" },
      { value: "+40%", label: "New Impressions" },
    ],
    accentRgb: "rgba(224,64,160,",
  },
  {
    logo: "/clients/pulsehomes2.png",
    name: "Pulse Homes",
    metrics: [
      { value: "+40%", label: "Reach Expanded" },
      { value: "2x", label: "Lead Generation" },
      { value: "+60%", label: "Brand Awareness" },
    ],
    accentRgb: "rgba(155,89,245,",
  },
  {
    logo: "/clients/coolfit.png",
    name: "CoolFit",
    metrics: [
      { value: "+35%", label: "Reach Expanded" },
      { value: "1.8x", label: "Client Retention" },
      { value: "+50%", label: "Brand Recognition" },
    ],
    accentRgb: "rgba(74,158,255,",
  },
  {
    logo: "/clients/elwell.png",
    name: "ElWell",
    metrics: [
      { value: "+45%", label: "Reach Expanded" },
      { value: "2x", label: "Client Retention" },
      { value: "+55%", label: "Brand Recognition" },
    ],
    accentRgb: "rgba(224,64,160,",
  },
  {
    logo: "/clients/foxacademy.png",
    name: "Fox Academy",
    metrics: [
      { value: "+30%", label: "Reach Expanded" },
      { value: "1.5x", label: "Client Retention" },
      { value: "+45%", label: "Brand Recognition" },
    ],
    accentRgb: "rgba(155,89,245,",
  },
  {
    logo: "/clients/lamaniere.png",
    name: "La Manière",
    metrics: [
      { value: "+50%", label: "Reach Expanded" },
      { value: "2.5x", label: "Client Retention" },
      { value: "+60%", label: "Brand Recognition" },
    ],
    accentRgb: "rgba(224,64,160,",
  },
];

export default function Clients() {
  const heroClient = clients[0];
  const gridClients = clients.slice(1);

  return (
    <section id="clients" className="section-padding relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse, rgba(155,89,245,0.06), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>CLIENT RESULTS</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-sans font-extrabold text-4xl md:text-5xl text-white mt-3 mb-4"
          >
            Real Brands. <span className="text-gradient">Real Results.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/60 text-lg">
            Measurable impact across every project we touch.
          </motion.p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Hero card — full width */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            whileHover={{ scale: 1.005 }}
            className="relative overflow-hidden rounded-2xl col-span-full cursor-default"
            style={{
              background: `linear-gradient(135deg, ${heroClient.accentRgb}0.08), rgba(155,89,245,0.06))`,
              border: `1px solid ${heroClient.accentRgb}0.25)`,
            }}
          >
            <div className="p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center gap-8">
              {/* Left: logo */}
              <div className="flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroClient.logo}
                  alt={heroClient.name}
                  loading="lazy"
                  className="h-14 w-auto object-contain opacity-90 mb-4"
                />
                <div className="text-xs uppercase tracking-[0.15em] text-white/35">
                  {heroClient.name}
                </div>
              </div>
              {/* Divider */}
              <div className="hidden md:block w-px self-stretch bg-white/10" />
              {/* Center: primary stat */}
              <div className="flex-1">
                <div className="font-sans font-extrabold text-6xl md:text-7xl text-gradient leading-none mb-2">
                  {heroClient.metrics[0].value}
                </div>
                <div className="text-white/55 text-lg">
                  {heroClient.metrics[0].label}
                </div>
              </div>
              {/* Right: secondary stats */}
              <div className="flex gap-8">
                {heroClient.metrics.slice(1).map((m) => (
                  <div key={m.label}>
                    <div className="font-sans font-bold text-3xl text-gradient">
                      {m.value}
                    </div>
                    <div className="text-xs text-white/40 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Accent glow */}
            <div
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
              aria-hidden
              style={{
                background: `radial-gradient(circle, ${heroClient.accentRgb}0.18), transparent 70%)`,
                filter: "blur(40px)",
              }}
            />
          </motion.div>

          {/* Standard bento cards */}
          {gridClients.map((client, i) => (
            <motion.div
              key={client.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="relative overflow-hidden rounded-2xl glass-card p-8 flex flex-col gap-6 group cursor-default"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={client.logo}
                alt={client.name}
                loading="lazy"
                className="h-10 w-auto object-contain opacity-75 group-hover:opacity-100 transition-opacity"
              />
              <div>
                <div className="font-sans font-extrabold text-5xl text-gradient leading-none">
                  {client.metrics[0].value}
                </div>
                <div className="text-white/50 text-sm mt-1.5">
                  {client.metrics[0].label}
                </div>
              </div>
              <div className="flex gap-6 pt-4 border-t border-white/[0.07]">
                {client.metrics.slice(1).map((m) => (
                  <div key={m.label}>
                    <div className="font-sans font-bold text-xl text-gradient">
                      {m.value}
                    </div>
                    <div className="text-xs text-white/35 mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
              {/* Accent glow */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
                aria-hidden
                style={{
                  background: `radial-gradient(circle, ${client.accentRgb}0.5), transparent 70%)`,
                  opacity: 0.12,
                  filter: "blur(20px)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## Change 6 — Dedicated /about and /clients Pages

**New files:**

- `app/about/page.tsx`
- `app/clients/page.tsx`
- `components/pages/AboutPage.tsx`
- `components/pages/ClientsPage.tsx`

**Updated files:**

- `components/Header.tsx`
- `app/page.tsx`

### Context

Currently "About" and "Clients" are sections on the homepage with hash anchors
(`/#about`, `/#clients`). The user wants them as dedicated pages (`/about`, `/clients`).

---

### Step 6a — Create /about page

**`app/about/page.tsx`** (Server Component):

```tsx
import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "About Us — Aviva Digital",
  description:
    "Meet the Aviva Digital team. AI-first agency combining creative vision with data-driven marketing. Learn who we are and how we work.",
};

export default function About() {
  return <AboutPage />;
}
```

**`components/pages/AboutPage.tsx`** (`'use client'`):

Extract the content from `components/sections/WhyAviva.tsx` and expand it into a full page.
Read `WhyAviva.tsx` first — copy all existing data (feature cards, team info, values, etc.).

Layout:

```
[PageHero — "Who We Are" headline + subtext]

[WhyAviva feature cards — same 3-4 cards from the section]

[Team block — Vyara as Creative Director]

[Values / mission statement block — glass card]

[CTA Banner → /contact]
```

Use the `PageHero` component from `components/ui/PageHero.tsx` at the top.
Keep all existing content from `WhyAviva.tsx` — just lift it into this page component.

```tsx
"use client";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PageHero } from "@/components/ui/PageHero";
import Link from "next/link";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";

// [Copy all cards/data arrays from WhyAviva.tsx here]

export default function AboutPage() {
  return (
    <main className="pt-20">
      <PageHero
        label="WHO WE ARE"
        title="Built for Brands That Want More"
        subtitle="AI-powered strategies. Human creativity. Full-circle digital solutions."
      />

      {/* Feature cards — same content as WhyAviva section */}
      <section className="section-padding">
        <div className="container">{/* [Paste WhyAviva card grid here] */}</div>
      </section>

      {/* Team block */}
      <section className="section-padding border-t border-white/[0.06]">
        <div className="container">
          {/* [Paste WhyAviva team block here] */}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container text-center">
          <div className="glass-card p-12 max-w-2xl mx-auto">
            <h2 className="font-sans font-extrabold text-3xl text-white mb-4">
              Ready to work with us?
            </h2>
            <Link href="/contact">
              <ButtonPrimary size="lg">Start a Project →</ButtonPrimary>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
```

---

### Step 6b — Create /clients page

**`app/clients/page.tsx`** (Server Component):

```tsx
import type { Metadata } from "next";
import ClientsPage from "@/components/pages/ClientsPage";

export const metadata: Metadata = {
  title: "Our Clients — Aviva Digital",
  description:
    "Real brands, real results. See how Aviva Digital has delivered measurable growth for clients across Bulgaria and beyond.",
};

export default function Clients() {
  return <ClientsPage />;
}
```

**`components/pages/ClientsPage.tsx`** (`'use client'`):

Copy the entire Clients bento grid (from `components/sections/Clients.tsx`) into this
page component — same data, same layout. Add a `PageHero` at the top and a CTA at bottom.

```tsx
"use client";
import { PageHero } from "@/components/ui/PageHero";
// [Copy full Clients section component code here, inside a <main> wrapper]
// Add PageHero at top
// Add CTA at bottom
```

Layout:

```
[PageHero — "Our Clients" + subtext]
[Bento grid — full clients data, same as Clients.tsx]
[CTA Banner → /contact]
```

---

### Step 6c — Update Header nav links

**File:** `components/Header.tsx`

Change the `navLinks` array — update About and Clients from hash links to page routes:

```tsx
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" }, // was '/#about'
  { label: "Clients", href: "/clients" }, // was '/#clients'
  { label: "Contact", href: "/contact" },
];
```

Also fix the `isActive` logic — the current function only marks a link active if
`pathname.startsWith(href.split('#')[0])`. Since the hash links are gone, this should
now work correctly for `/about` and `/clients` with no changes needed. But verify it.

---

### Step 6d — Update app/page.tsx

**File:** `app/page.tsx`

The homepage can keep the `WhyAviva` section (as a preview with a "Learn more →" link
to `/about`) and the `Clients` section (as a preview with "See all clients →" link to
`/clients`). Do NOT remove these sections from the homepage — they serve as teasers.

Add link buttons at the bottom of each section block:

In `WhyAviva.tsx` — add a "Learn more about us →" link at the bottom of the section:

```tsx
<div className="text-center mt-10">
  <Link href="/about">
    <ButtonOutline>Learn more about us →</ButtonOutline>
  </Link>
</div>
```

In `Clients.tsx` — add a "See all client results →" link at the bottom of the section:

```tsx
<div className="text-center mt-10">
  <Link href="/clients">
    <ButtonOutline>See all client results →</ButtonOutline>
  </Link>
</div>
```

Remove the `id="about"` from `WhyAviva.tsx` outer section wrapper.
Remove the `id="clients"` from `Clients.tsx` outer section wrapper.
(Navigation to these sections now goes via dedicated pages, not hash anchors.)

---

## Final Build Verification

Run `npm run build` — must pass with zero errors.

### Visual checklist

- [ ] "Digital Futures" in hero uses warm orange→pink gradient (not violet/blue)
- [ ] Hero stats show 4 real numbers (32604+, 1852+, 85+, 13+) with count-up animation
- [ ] Count-up starts when the stat row scrolls into view
- [ ] Logo in header is noticeably bigger (`h-10 md:h-12`)
- [ ] Hero background image is clearly visible (overlay at 35%, not 60%)
- [ ] 3 floating metric cards each have a pulsing colour glow behind them
- [ ] Marquee scrolls infinitely with no visible gap or empty space at any viewport width
- [ ] Clients section shows bento grid: El Shisha full-width hero card + 5 standard cards below
- [ ] `/about` page loads with full WhyAviva content + PageHero + CTA
- [ ] `/clients` page loads with full bento clients grid + PageHero + CTA
- [ ] Header nav "About" links to `/about` (not `/#about`)
- [ ] Header nav "Clients" links to `/clients` (not `/#clients`)
- [ ] WhyAviva section on homepage has "Learn more" link to `/about`
- [ ] Clients section on homepage has "See all" link to `/clients`
- [ ] `npm run build` completes with no TypeScript or build errors

### Static export compliance

- [ ] No API routes used in new pages
- [ ] `app/about/page.tsx` and `app/clients/page.tsx` export `metadata`
- [ ] All new client components use `'use client'` if they use hooks or Framer Motion
- [ ] `next.config.ts` still has `output: 'export'` unchanged

---

## Change 7 — Typography: Switch to Tenor Sans

**File:** `app/layout.tsx`
**File:** `tailwind.config.ts`
**File:** `app/globals.css`

Replace the current Space Grotesk (`--font-sans`) with **Tenor Sans** as the primary
display/heading font. Keep Caveat (`--font-script`) unchanged for decorative accents.

### Why Tenor Sans

Tenor Sans is a humanist serif-influenced grotesque — elegant, high-contrast,
and premium. It pairs well with the dark atmospheric design and the Caveat accents.

### Step 7a — Update `app/layout.tsx`

```tsx
// Remove:
import { Space_Grotesk, Caveat } from 'next/font/google'
const spaceGrotesk = Space_Grotesk({ ... })

// Add:
import { Tenor_Sans, Caveat } from 'next/font/google'

const tenorSans = Tenor_Sans({
  subsets: ['latin'],
  weight: ['400'],          // Tenor Sans only has weight 400
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
// className={`${tenorSans.variable} ${caveat.variable}`}
```

**Note:** Tenor Sans is single-weight (400 only). Tailwind's `font-bold`, `font-semibold`
etc. will trigger faux-bold rendering — this is acceptable for headings. For body text
and UI elements where weight variation matters (buttons, labels, nav), add a secondary
body font pairing.

### Step 7b — Add DM Sans as body companion (optional but recommended)

Because Tenor Sans has only one weight, pair it with **DM Sans** for body text
and interactive UI so weight variation (buttons, form labels, badges) still works:

```tsx
import { Tenor_Sans, DM_Sans, Caveat } from "next/font/google";

const tenorSans = Tenor_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display", // Use --font-display for headings
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans", // --font-sans for body/UI
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-script",
  display: "swap",
});

// Apply: className={`${tenorSans.variable} ${dmSans.variable} ${caveat.variable}`}
```

### Step 7c — Update `tailwind.config.ts`

```ts
fontFamily: {
  sans:    ['var(--font-sans)',    'system-ui', 'sans-serif'],   // DM Sans — body/UI
  display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'], // Tenor Sans — headings
  script:  ['var(--font-script)',  'cursive'],                   // Caveat — accents
},
```

### Step 7d — Update `globals.css`

```css
body {
  font-family: var(--font-sans), system-ui, sans-serif; /* DM Sans */
}
h1,
h2,
h3,
h4 {
  font-family:
    var(--font-display), var(--font-sans), system-ui, sans-serif; /* Tenor Sans */
}
```

### Step 7e — Apply font-display class to all headings

In every component, replace `font-sans font-extrabold` / `font-sans font-bold` on
`<h1>`, `<h2>`, `<h3>` elements with `font-display`:

```tsx
// Before:
<h1 className="font-sans font-extrabold text-5xl ...">

// After:
<h1 className="font-display text-5xl ...">
```

`font-display` loads Tenor Sans automatically. No weight class needed (it has only 400).
Keep `font-sans` on paragraphs, buttons, badges, nav links, and small text.

---

## Change 8 — i18n: Bulgarian / English Toggle

**New file:** `lib/i18n.ts`
**New file:** `lib/LanguageContext.tsx`
**Updated files:** every component with user-facing text, `components/Header.tsx`

### Approach

Use React Context (no external i18n library) — fully compatible with static export.
The selected language is stored in `localStorage` and applied client-side.
All text strings live in a single translation file. No SSR language detection needed.

### Step 7a — Create translation file `lib/i18n.ts`

```ts
export type Locale = "en" | "bg";

export const translations = {
  en: {
    // Header
    nav: {
      home: "Home",
      services: "Services",
      work: "Work",
      about: "About",
      clients: "Clients",
      contact: "Contact",
    },
    cta: "Get a Free Audit",

    // Hero
    hero: {
      badge: "AI-Powered Digital Agency",
      line1: "We Build",
      line2: "Digital Futures",
      line3: "That Convert.",
      sub: "Full-service digital agency combining AI innovation with proven marketing expertise — from strategy to execution, we close the loop.",
      ctaPrimary: "Start a Project →",
      ctaSecondary: "View Our Work",
      stats: [
        { label: "Posts & Stories" },
        { label: "Designs" },
        { label: "Campaigns" },
        { label: "Customers" },
      ],
    },

    // MarqueeBanner
    marquee: { label: "Trusted by brands across industries" },

    // WhyAviva
    whyAviva: {
      label: "WHY AVIVA",
      title: "We Don't Just Market.",
      titleAccent: "We Build Growth Systems.",
      sub: "Every strategy is designed end-to-end — from content to conversions, we own the full loop.",
      learnMore: "Learn more about us →",
    },

    // ServicesPreview
    services: {
      label: "WHAT WE DO",
      title: "Full-Circle",
      titleAccent: "Digital Services",
      sub: "From strategy to execution — we handle every layer of your digital presence.",
      seeAll: "See All Services →",
    },

    // PortfolioPreview
    portfolio: {
      label: "OUR WORK",
      title: "Work That",
      titleAccent: "Speaks for Itself.",
      sub: "A selection of projects that delivered real results for real brands.",
      viewAll: "View All Work →",
    },

    // Clients
    clients: {
      label: "CLIENT RESULTS",
      title: "Real Brands.",
      titleAccent: "Real Results.",
      sub: "Measurable impact across every project we touch.",
      seeAll: "See all client results →",
    },

    // Testimonials
    testimonials: {
      label: "TESTIMONIALS",
      title: "What Our",
      titleAccent: "Clients Say.",
    },

    // CTABanner
    ctaBanner: {
      label: "READY TO GROW?",
      title: "Let's Build Something",
      titleAccent: "Extraordinary.",
      sub: "Tell us about your brand and let's craft a strategy that converts.",
      cta: "Start a Project →",
    },

    // Contact form (embedded above footer)
    contactForm: {
      label: "GET IN TOUCH",
      title: "Let's Talk",
      sub: "Have a project in mind? Fill in the form and we'll get back to you within 24 hours.",
      namePlaceholder: "Your name",
      emailPlaceholder: "Your email",
      messagePlaceholder: "Tell us about your project...",
      submit: "Send Message →",
      sending: "Sending...",
      successMsg: "Message sent! We'll be in touch soon.",
      errorMsg: "Something went wrong. Please try again.",
    },

    // Footer
    footer: {
      tagline:
        "The Future of Marketing is Here. AI-powered strategies. Human creativity.",
      services: "Services",
      company: "Company",
      pages: "Pages",
      connect: "Connect",
      copyright: "All rights reserved.",
    },
  },

  bg: {
    // Header
    nav: {
      home: "Начало",
      services: "Услуги",
      work: "Портфолио",
      about: "За нас",
      clients: "Клиенти",
      contact: "Контакт",
    },
    cta: "Безплатен одит",

    // Hero
    hero: {
      badge: "AI дигитална агенция",
      line1: "Изграждаме",
      line2: "Дигитално бъдеще",
      line3: "Което конвертира.",
      sub: "Пълноспектърна дигитална агенция, съчетаваща AI иновации с доказан маркетинг — от стратегия до изпълнение, ние затваряме цикъла.",
      ctaPrimary: "Стартирай проект →",
      ctaSecondary: "Разгледай портфолиото",
      stats: [
        { label: "Публикации и истории" },
        { label: "Дизайни" },
        { label: "Кампании" },
        { label: "Клиенти" },
      ],
    },

    // MarqueeBanner
    marquee: { label: "Доверени от водещи марки" },

    // WhyAviva
    whyAviva: {
      label: "ЗАЩО АВИВА",
      title: "Не просто маркетинг.",
      titleAccent: "Изграждаме системи за растеж.",
      sub: "Всяка стратегия е проектирана от край до край — от съдържание до конверсии, ние управляваме целия цикъл.",
      learnMore: "Научи повече за нас →",
    },

    // ServicesPreview
    services: {
      label: "КАКВО ПРАВИМ",
      title: "Пълен спектър от",
      titleAccent: "дигитални услуги",
      sub: "От стратегия до изпълнение — поемаме всеки слой от вашото дигитално присъствие.",
      seeAll: "Виж всички услуги →",
    },

    // PortfolioPreview
    portfolio: {
      label: "НАШЕТО ПОРТФОЛИО",
      title: "Работа, която",
      titleAccent: "говори сама за себе си.",
      sub: "Избрани проекти, донесли реални резултати за реални марки.",
      viewAll: "Виж цялото портфолио →",
    },

    // Clients
    clients: {
      label: "РЕЗУЛТАТИ ЗА КЛИЕНТИ",
      title: "Реални марки.",
      titleAccent: "Реални резултати.",
      sub: "Измеримо въздействие при всеки проект.",
      seeAll: "Виж всички клиенти →",
    },

    // Testimonials
    testimonials: {
      label: "ОТЗИВИ",
      title: "Какво казват",
      titleAccent: "нашите клиенти.",
    },

    // CTABanner
    ctaBanner: {
      label: "ГОТОВИ ЛИ СТЕ?",
      title: "Нека изградим нещо",
      titleAccent: "изключително.",
      sub: "Разкажете ни за вашата марка и ще създадем стратегия, която конвертира.",
      cta: "Стартирай проект →",
    },

    // Contact form
    contactForm: {
      label: "СВЪРЖИ СЕ С НАС",
      title: "Нека поговорим",
      sub: "Имаш проект? Попълни формата и ще се свържем с теб до 24 часа.",
      namePlaceholder: "Вашето име",
      emailPlaceholder: "Вашият имейл",
      messagePlaceholder: "Разкажете ни за проекта...",
      submit: "Изпрати съобщение →",
      sending: "Изпращане...",
      successMsg: "Съобщението е изпратено! Ще се свържем скоро.",
      errorMsg: "Нещо се обърка. Моля, опитайте отново.",
    },

    // Footer
    footer: {
      tagline:
        "Бъдещето на маркетинга е тук. AI-базирани стратегии. Човешко творчество.",
      services: "Услуги",
      company: "Компания",
      pages: "Страници",
      connect: "Свържи се",
      copyright: "Всички права запазени.",
    },
  },
} satisfies Record<Locale, unknown>;

export type Translations = typeof translations.en;
```

### Step 7b — Create Language Context `lib/LanguageContext.tsx`

```tsx
"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Locale, translations, Translations } from "./i18n";

interface LangContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (l: Locale) => void;
}

const LangContext = createContext<LangContextValue>({
  locale: "en",
  t: translations.en,
  setLocale: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("aviva-lang") as Locale | null;
    if (saved === "bg" || saved === "en") setLocaleState(saved);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("aviva-lang", l);
  };

  return (
    <LangContext.Provider
      value={{ locale, t: translations[locale], setLocale }}
    >
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
```

### Step 7c — Wrap layout in LanguageProvider

**File:** `app/layout.tsx`

Import and wrap the body children:

```tsx
import { LanguageProvider } from "@/lib/LanguageContext";

// Inside the return, wrap children:
<LanguageProvider>
  <Header />
  {children}
  <Footer />
</LanguageProvider>;
```

`LanguageProvider` must be a Client Component. Since `app/layout.tsx` is a Server
Component, the provider wrapping works — React will serialise children correctly.

### Step 7d — Language toggle in Header

**File:** `components/Header.tsx`

Add the `useLang` hook and a toggle button to the right side of the header,
next to the CTA button.

```tsx
import { useLang } from "@/lib/LanguageContext";

// Inside Header component:
const { locale, setLocale, t } = useLang();

// Replace hardcoded navLinks with translated versions:
const navLinks = [
  { label: t.nav.home, href: "/" },
  { label: t.nav.services, href: "/services" },
  { label: t.nav.work, href: "/work" },
  { label: t.nav.about, href: "/about" },
  { label: t.nav.clients, href: "/clients" },
  { label: t.nav.contact, href: "/contact" },
];
```

Add the language toggle in the `{/* Right: CTA + Hamburger */}` div, before the CTA:

```tsx
{
  /* Language toggle — text only, premium style */
}
<div
  className="hidden md:flex items-center rounded-full border border-white/[0.10]
                overflow-hidden text-xs font-semibold tracking-wide"
>
  <button
    onClick={() => setLocale("en")}
    className={`px-3 py-1.5 transition-colors duration-150 ${
      locale === "en"
        ? "bg-white/10 text-white"
        : "text-white/35 hover:text-white/70"
    }`}
  >
    EN
  </button>
  <div className="w-px h-4 bg-white/10" />
  <button
    onClick={() => setLocale("bg")}
    className={`px-3 py-1.5 transition-colors duration-150 ${
      locale === "bg"
        ? "bg-white/10 text-white"
        : "text-white/35 hover:text-white/70"
    }`}
  >
    BG
  </button>
</div>;
```

On mobile (inside the mobile menu), add the same toggle at the bottom of the list:

```tsx
{
  /* Language toggle in mobile menu */
}
<div className="flex items-center gap-3 pt-4 mt-2 border-t border-white/[0.06]">
  <span className="text-white/35 text-xs uppercase tracking-widest">
    Language
  </span>
  <div className="flex items-center rounded-full border border-white/[0.12] overflow-hidden text-xs font-semibold">
    <button
      onClick={() => setLocale("en")}
      className={`px-4 py-2 transition-colors ${locale === "en" ? "bg-white/10 text-white" : "text-white/40"}`}
    >
      EN
    </button>
    <div className="w-px h-4 bg-white/10" />
    <button
      onClick={() => setLocale("bg")}
      className={`px-4 py-2 transition-colors ${locale === "bg" ? "bg-white/10 text-white" : "text-white/40"}`}
    >
      BG
    </button>
  </div>
</div>;
```

### Step 7e — Apply translations to all sections

In every section/page component, add `const { t } = useLang()` and replace all
hardcoded English strings with `t.sectionName.key`.

Sections to update (read each file before editing):

- `components/sections/Hero.tsx`
- `components/sections/MarqueeBanner.tsx`
- `components/sections/WhyAviva.tsx`
- `components/sections/ServicesPreview.tsx`
- `components/sections/PortfolioPreview.tsx`
- `components/sections/Clients.tsx`
- `components/sections/Testimonials.tsx`
- `components/sections/CTABanner.tsx`
- `components/Footer.tsx`
- `components/pages/AboutPage.tsx`
- `components/pages/ClientsPage.tsx`
- `components/pages/ContactPage.tsx` (and the embedded contact form — see Change 8)

For each component:

1. Add `'use client'` if not already present (needed for `useLang`)
2. Add `const { t } = useLang()` inside the component function
3. Replace string literals with `t.section.key`

**Important:** Service names, client names, testimonial text, and project titles do NOT
need translation in this pass — only UI chrome, labels, headings, subtext, and CTAs.
The translation file above covers exactly what to translate. Do not over-translate.

---

## Change 9 — Embedded Contact Form Above Footer (All Pages)

**New file:** `components/sections/ContactFormSection.tsx`
**Updated files:** `app/layout.tsx` (or each page if layout wrapping causes issues)

### Concept

A compact but complete contact form section that appears at the bottom of every page,
directly above the Footer — so users can reach out from anywhere on the site without
navigating to `/contact`. The `/contact` page keeps its full form as well.

### Step 9a — Create the component

Read `components/pages/ContactPage.tsx` first and copy the form submission logic exactly.

**`components/sections/ContactFormSection.tsx`** — `'use client'`

```tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";
import { useLang } from "@/lib/LanguageContext";

export default function ContactFormSection() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // Preserve existing submit logic from ContactPage.tsx
      // (copy the fetch/action from there exactly)
      await new Promise((r) => setTimeout(r, 1200)); // placeholder — replace with real logic
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section-padding relative overflow-hidden border-t border-white/[0.06]">
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse, rgba(155,89,245,0.08), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container relative z-10 max-w-2xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="text-center mb-10"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{t.contactForm.label}</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-sans font-extrabold text-3xl md:text-4xl text-white mt-3 mb-3"
          >
            {t.contactForm.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/55 text-base">
            {t.contactForm.sub}
          </motion.p>
        </motion.div>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-10 text-center"
          >
            <div className="text-4xl mb-4">✓</div>
            <p className="text-white font-semibold text-lg">
              {t.contactForm.successMsg}
            </p>
          </motion.div>
        ) : (
          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-card p-8 flex flex-col gap-4"
          >
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder={t.contactForm.namePlaceholder}
              className="form-field"
            />
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              placeholder={t.contactForm.emailPlaceholder}
              className="form-field"
            />
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) =>
                setForm((f) => ({ ...f, message: e.target.value }))
              }
              placeholder={t.contactForm.messagePlaceholder}
              className="form-field resize-none"
            />
            {status === "error" && (
              <p className="text-red-400 text-sm">{t.contactForm.errorMsg}</p>
            )}
            <ButtonPrimary
              type="submit"
              disabled={status === "sending"}
              className="w-full justify-center"
            >
              {status === "sending"
                ? t.contactForm.sending
                : t.contactForm.submit}
            </ButtonPrimary>
          </motion.form>
        )}
      </div>
    </section>
  );
}
```

**IMPORTANT:** Replace the `await new Promise(...)` placeholder with the real submit
logic from `ContactPage.tsx`. Read that file and copy the `handleSubmit` function body exactly.

### Step 9b — Add to layout

**File:** `app/layout.tsx`

Add `ContactFormSection` between the page content and the Footer:

```tsx
import ContactFormSection from "@/components/sections/ContactFormSection";

// Inside <body> / layout return:
<LanguageProvider>
  <Header />
  {children}
  <ContactFormSection />
  <Footer />
</LanguageProvider>;
```

This places the form on every page automatically. The `/contact` page's own form
still exists and provides a more detailed version (with phone, email info panel, etc.).

---

## Change 10 — Footer Redesign

**File:** `components/Footer.tsx`

Current footer: basic 4-column link grid. Rebuild it with premium visual depth.

### New design concept

```
┌─────────────────────────────────────────────────────┐
│  [gradient separator line at very top]               │
│                                                      │
│  [Logo — bigger]     [CTA call-to-action blurb]     │
│                       "Ready to grow? Let's talk."  │
│                       [Get a Free Audit →] button    │
│                                                      │
│  ─────────────────────────────────────────────────  │
│                                                      │
│  Services       Company      Pages       Connect     │
│  (links)        (links)      (links)     (social     │
│                                           icons)     │
│                                                      │
│  ─────────────────────────────────────────────────  │
│                                                      │
│  © 2025 Aviva Digital · avivadigital.bg  [socials]  │
└─────────────────────────────────────────────────────┘
```

### Full rebuilt Footer component

```tsx
import Link from "next/link";
import { Instagram, Facebook, Youtube, Linkedin } from "lucide-react";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";

const serviceLinks = [
  { label: "Social Media Management", href: "/services" },
  { label: "AI Content Generation", href: "/services" },
  { label: "Meta Ads", href: "/services" },
  { label: "SEO & Strategy", href: "/services" },
  { label: "Web Development", href: "/services" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Clients", href: "/clients" },
  { label: "Work", href: "/work" },
];

const pageLinks = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/avivadigital.bg",
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/avivadigital",
    icon: Facebook,
  },
  { label: "YouTube", href: "https://youtube.com", icon: Youtube },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#07070C] overflow-hidden">
      {/* Gradient top separator */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(155,89,245,0.6), rgba(224,64,160,0.6), transparent)",
        }}
      />

      {/* Subtle ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse, rgba(155,89,245,0.05), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container relative z-10 py-16">
        {/* Top: Logo + CTA blurb */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 my-14">
          {/* Logo block */}
          <div className="flex flex-col gap-4 max-w-xs">
            <Link href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/aviva-digital-logo.png"
                alt="Aviva Digital"
                className="h-12 md:h-14 w-auto object-contain opacity-95"
              />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed">
              The Future of Marketing is Here. AI-powered strategies. Human
              creativity. Full-circle digital solutions.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/[0.10] flex items-center justify-center
                             text-white/40 hover:text-white hover:border-white/25 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* CTA blurb */}
          <div className="glass-card p-8 max-w-sm w-full">
            <div className="text-xs uppercase tracking-[0.15em] text-white/30 mb-2">
              Ready to grow?
            </div>
            <h3 className="font-sans font-bold text-xl text-white mb-2 leading-snug">
              Let's build something{" "}
              <span className="text-gradient">extraordinary.</span>
            </h3>
            <p className="text-white/45 text-sm mb-5">
              Get a free audit of your current digital presence.
            </p>
            <Link href="/contact">
              <ButtonPrimary size="sm" className="w-full justify-center">
                Get a Free Audit →
              </ButtonPrimary>
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] mb-12" />

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
          <div>
            <h4 className="font-sans font-semibold text-white text-xs uppercase tracking-[0.12em] mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-white/40 hover:text-white text-sm transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-sans font-semibold text-white text-xs uppercase tracking-[0.12em] mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-white/40 hover:text-white text-sm transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-sans font-semibold text-white text-xs uppercase tracking-[0.12em] mb-5">
              Pages
            </h4>
            <ul className="space-y-3">
              {pageLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-white/40 hover:text-white text-sm transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-sans font-semibold text-white text-xs uppercase tracking-[0.12em] mb-5">
              Connect
            </h4>
            <ul className="space-y-3">
              {socialLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white text-sm transition-colors duration-150"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row
                        items-center justify-between gap-3"
        >
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Aviva Digital · avivadigital.bg · All
            rights reserved.
          </p>
          <p className="text-white/15 text-xs">
            Built with AI. Powered by creativity.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

**Important:** `Footer.tsx` does NOT need `'use client'` unless it uses `useLang`.
If you want the Footer link labels to be translated too, add `'use client'` and
use `const { t } = useLang()` to replace the column headings and company/pages labels.
Decide based on how much of the footer should be translated.

### Logo size update — both Header and Footer

**Header** (`components/Header.tsx`):

```tsx
// Before (from Change 2d):
className = "h-10 md:h-12 w-auto object-contain";

// Ensure it is at least:
className = "h-10 md:h-14 w-auto object-contain";
```

**Footer** (already set above to `h-12 md:h-14` — verify this is in place).

---

## Updated Visual Checklist

Add these to the existing checklist:

- [ ] Language toggle (EN / BG) appears in header on desktop — pill style, no flags
- [ ] Language toggle appears in mobile menu
- [ ] Switching language updates all UI text across the page instantly (no reload)
- [ ] Contact form appears above the footer on every page
- [ ] Contact form submission logic matches the one on `/contact` page exactly
- [ ] Footer has logo block + CTA glass card at top, link columns below, clean bottom bar
- [ ] Logo in header is at least `h-10 md:h-14`
- [ ] Logo in footer is at least `h-12 md:h-14`
- [ ] Footer "Company" links point to `/about` and `/clients` (not `/#about`, `/#clients`)
- [ ] `npm run build` still passes with zero errors after all changes
