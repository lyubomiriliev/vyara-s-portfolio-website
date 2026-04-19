---
name: session-1-foundation
description: >
  Foundation for Aviva Digital multi-page redesign. Sets up Tailwind,
  globals.css, app/layout.tsx with fonts and metadata, creates all shared
  UI primitives, PageHero component, rebuilds Header and Footer.
  App Router + static export. Run FIRST.

recommended_model: sonnet
---

# Session 1 — Foundation

## Before Starting

Read these files in full before writing any code:
- `CLAUDE.md`
- `.claude/design-system.md`
- `.claude/components.md`
- `.claude/static-export-rules.md`

Explore the full project:
- List all files in `app/`, `components/`, `public/`
- Read: `next.config.ts`, `tailwind.config.js` (or `.ts`), `package.json`
- Read: `app/layout.tsx`, `app/globals.css`, `components/Header.tsx`, `components/Footer.tsx`

---

## Step 1 — next.config.ts

Verify and preserve — do not change:
```ts
output: 'export'
images: { unoptimized: true }
```
Add `trailingSlash: true` if missing. No server runtime config.

---

## Step 2 — tailwind.config

Extend with all tokens from `.claude/design-system.md`:

```js
theme: {
  extend: {
    colors: {
      bg: { primary: '#0A0A0F', secondary: '#111118', tertiary: '#16161F' },
      accent: { pink: '#E040A0', violet: '#9B59F5', blue: '#4A9EFF' },
    },
    backgroundImage: {
      'gradient-main':   'linear-gradient(135deg, #E040A0, #9B59F5, #4A9EFF)',
      'gradient-subtle': 'linear-gradient(135deg, rgba(224,64,160,0.15), rgba(155,89,245,0.15))',
    },
    boxShadow: {
      'card':        '0 4px 24px rgba(0,0,0,0.4)',
      'card-hover':  '0 8px 40px rgba(155,89,245,0.2)',
      'glow-pink':   '0 0 40px rgba(224,64,160,0.3)',
      'glow-violet': '0 0 40px rgba(155,89,245,0.3)',
    },
    borderRadius: { pill: '999px' },
    fontFamily: {
      display: ['var(--font-display)', 'sans-serif'],
      body:    ['var(--font-body)', 'sans-serif'],
    },
    keyframes: {
      marquee:      { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      float:        { '0%, 100%': { transform: 'translateY(0px) scale(1)' }, '50%': { transform: 'translateY(-18px) scale(1.04)' } },
      'pulse-glow': { '0%, 100%': { opacity: '0.15' }, '50%': { opacity: '0.30' } },
    },
    animation: {
      marquee:      'marquee 25s linear infinite',
      float:        'float 6s ease-in-out infinite',
      'float-slow': 'float 9s ease-in-out infinite',
      'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
    },
  },
},
```

---

## Step 3 — app/globals.css

Replace entire file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* No @import url() here — fonts load via next/font in layout.tsx */

:root {
  --bg-primary:         #0A0A0F;
  --bg-secondary:       #111118;
  --bg-tertiary:        #16161F;
  --glass-bg:           rgba(255,255,255,0.04);
  --glass-bg-hover:     rgba(255,255,255,0.07);
  --glass-border:       rgba(255,255,255,0.08);
  --glass-border-hover: rgba(155,89,245,0.35);
  --accent-pink:        #E040A0;
  --accent-violet:      #9B59F5;
  --accent-blue:        #4A9EFF;
  --gradient-main:      linear-gradient(135deg, #E040A0, #9B59F5, #4A9EFF);
  --gradient-text:      linear-gradient(135deg, #E040A0 0%, #9B59F5 50%, #4A9EFF 100%);
  --gradient-subtle:    linear-gradient(135deg, rgba(224,64,160,0.15), rgba(155,89,245,0.15));
  --text-primary:       #FFFFFF;
  --text-secondary:     rgba(255,255,255,0.60);
  --text-muted:         rgba(255,255,255,0.35);
  --border-subtle:      rgba(255,255,255,0.06);
  --shadow-card:        0 4px 24px rgba(0,0,0,0.4);
  --shadow-card-hover:  0 8px 40px rgba(155,89,245,0.2);
  --radius-sm: 8px; --radius-md: 14px; --radius-lg: 20px;
  --radius-xl: 28px; --radius-pill: 999px;
  --transition-fast: 150ms cubic-bezier(0.4,0,0.2,1);
  --transition-base: 250ms cubic-bezier(0.4,0,0.2,1);
  --transition-slow: 400ms cubic-bezier(0.4,0,0.2,1);
}

html { scroll-behavior: smooth; background-color: #0A0A0F; }
body {
  background-color: #0A0A0F; color: #FFFFFF;
  -webkit-font-smoothing: antialiased; overflow-x: hidden;
}

.text-gradient {
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glass-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: var(--shadow-card);
  transition: background var(--transition-base), border-color var(--transition-base), box-shadow var(--transition-base);
}
.glass-card:hover {
  background: var(--glass-bg-hover);
  border-color: var(--glass-border-hover);
  box-shadow: var(--shadow-card-hover);
}

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
@media (min-width: 768px)  { .container { padding: 0 48px; } }
@media (min-width: 1024px) { .container { padding: 0 64px; } }

.section-padding { padding-top: 96px; padding-bottom: 96px; }
@media (max-width: 768px) { .section-padding { padding-top: 64px; padding-bottom: 64px; } }

.form-field {
  width: 100%; background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: var(--radius-md); padding: 12px 16px;
  font-size: 14px; color: white; outline: none;
  transition: border-color 250ms, background 250ms;
  font-family: var(--font-body);
}
.form-field::placeholder { color: rgba(255,255,255,0.30); }
.form-field:focus { border-color: rgba(155,89,245,0.50); background: rgba(255,255,255,0.07); }
select.form-field option { background: #111118; color: white; }

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
```

---

## Step 4 — app/layout.tsx

Replace entirely:

```tsx
import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const syne = Syne({
  subsets: ['latin'], weight: ['600','700','800'],
  variable: '--font-display', display: 'swap',
})
const dmSans = DM_Sans({
  subsets: ['latin'], weight: ['400','500'],
  variable: '--font-body', display: 'swap',
})

export const metadata: Metadata = {
  title: 'Aviva Digital — AI-Powered Digital Agency | Sofia, Bulgaria',
  description: 'Full-service digital agency combining AI innovation with proven marketing expertise. Social media, Meta Ads, web development, AI content generation — Sofia, Bulgaria.',
  keywords: 'digital agency Bulgaria, AI marketing, social media management, web development Sofia, Meta Ads, SEO',
  openGraph: {
    title: 'Aviva Digital — AI-Powered Digital Agency',
    description: 'Full-circle digital solutions: marketing, advertising, and web development powered by AI.',
    type: 'website', url: 'https://www.avivadigital.bg', locale: 'bg_BG',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.avivadigital.bg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg" className={`${syne.variable} ${dmSans.variable} overflow-x-hidden`}>
      <body className="bg-[#0A0A0F] text-white font-body overflow-x-hidden antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

---

## Step 5 — lib/animations.ts

Create `lib/animations.ts` — full variants from `.claude/design-system.md`:

```ts
export const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4,0,0.2,1] } },
}
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
}
export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.4,0,0.2,1] } },
}
export const slideInLeft = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.4,0,0.2,1] } },
}
export const slideInRight = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.4,0,0.2,1] } },
}
```

---

## Step 6 — data/services.ts

Create `data/services.ts` using the full structure from
`.claude/components.md` → "Services Data Structure".
All 18 services, 3 categories, Lucide icon name strings.

---

## Step 7 — Shared UI Primitives

Create in `components/ui/` — none of these need `'use client'`:

- `Glow.tsx` — radial gradient atmosphere element (from `.claude/design-system.md`)
- `ButtonPrimary.tsx` — gradient pill button (from `.claude/components.md`)
- `ButtonOutline.tsx` — ghost pill button
- `SectionLabel.tsx` — uppercase section label
- `StatPill.tsx` — glass stat pill

---

## Step 8 — PageHero component (NEW — reused on /services, /work, /contact)

Create `components/ui/PageHero.tsx`:

```tsx
// No 'use client' needed — pure presentational
import { SectionLabel } from './SectionLabel'
import { Glow } from './Glow'

interface PageHeroProps {
  label: string
  title: string
  titleGradient?: string   // optional word(s) to render in gradient
  description: string
}

export function PageHero({ label, title, titleGradient, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
      <Glow color="violet" size={500} className="top-1/2 left-1/3" />
      <Glow color="pink"   size={300} className="top-1/3 right-1/4" />
      <div className="container relative z-10 text-center max-w-3xl mx-auto">
        <SectionLabel>{label}</SectionLabel>
        <h1 className="font-display font-800 text-5xl md:text-6xl lg:text-7xl text-white mt-3 mb-5 leading-[1.05]">
          {titleGradient
            ? title.replace(titleGradient, '')
            : title}
          {titleGradient && (
            <span className="text-gradient"> {titleGradient}</span>
          )}
        </h1>
        <p className="text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
          {description}
        </p>
      </div>
    </section>
  )
}
```

---

## Step 9 — Header rebuild

**File:** `components/Header.tsx` — replace entirely.
`'use client'` required (useState + useEffect).

Key differences from old single-page header:
- Nav links are now a mix of page routes (`/services`, `/work`, `/contact`)
  and homepage anchors (`/#about`, `/#clients`)
- Use Next.js `<Link>` from `next/link` for all navigation
- Active page highlighting: use `usePathname()` from `next/navigation`

```tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ButtonPrimary } from './ui/ButtonPrimary'

const navLinks = [
  { label: 'Home',     href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work',     href: '/work' },
  { label: 'About',    href: '/#about' },
  { label: 'Clients',  href: '/#clients' },
  { label: 'Contact',  href: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.replace('/#',''))

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(10,10,15,0.80)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      transition: 'all 0.3s ease',
    }}>
      <div className="container flex items-center justify-between h-16 md:h-20">

        {/* Logo */}
        <Link href="/" className="font-display font-800 text-xl">
          <span className="text-gradient">AVIVA</span>
          <span className="text-white"> DIGITAL</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              className={`text-sm transition-colors duration-150 ${
                isActive(link.href)
                  ? 'text-white font-medium'
                  : 'text-white/55 hover:text-white'
              }`}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <Link href="/contact" className="hidden md:block">
            <ButtonPrimary size="sm">Get a Free Audit</ButtonPrimary>
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2" aria-label="Toggle menu">
            <div className="w-5 flex flex-col gap-1">
              <span className={`h-px bg-white block transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`h-px bg-white block transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`h-px bg-white block transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{
          background: 'rgba(10,10,15,0.96)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }} className="md:hidden px-6 py-6 flex flex-col gap-1">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-base text-white/70 hover:text-white py-3 border-b border-white/[0.06]">
              {link.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setMobileOpen(false)} className="mt-4">
            <ButtonPrimary className="w-full justify-center">Get a Free Audit</ButtonPrimary>
          </Link>
        </div>
      )}
    </header>
  )
}
```

---

## Step 10 — Footer rebuild

**File:** `components/Footer.tsx` — replace entirely. No `'use client'` needed.
Use Next.js `<Link>` for all internal links.

Structure:
- Top: 1px gradient line
- Dark bg `bg-[#0A0A0F] border-t border-white/[0.06]`
- Row 1: Logo + tagline | Social icons
- Row 2: 4-column grid
  - **Services:** Social Media | AI Marketing | Meta Ads | SEO | Web Development (all link to /services)
  - **Company:** About | Work | Clients | Packages (About/Clients → `/#about`, `/#clients`)
  - **Pages:** Services→`/services` | Work→`/work` | Contact→`/contact`
  - **Connect:** Instagram | Facebook | TikTok | LinkedIn (external links)
- Row 3: Copyright `© {new Date().getFullYear()} Aviva Digital. All rights reserved.`

Social icons: check `/public/icons/` and `/public/tools/` for assets.
Fallback: Lucide `Instagram`, `Facebook`, `Youtube`, `Linkedin` icons.

---

## Step 11 — Create page route folders

Create these empty placeholder files so the build doesn't fail:

`app/services/page.tsx`:
```tsx
export default function ServicesPage() {
  return <main className="pt-32"><div className="container"><h1 className="text-white">Services — coming in Session 3</h1></div></main>
}
```

`app/work/page.tsx`:
```tsx
export default function WorkPage() {
  return <main className="pt-32"><div className="container"><h1 className="text-white">Work — coming in Session 3</h1></div></main>
}
```

`app/contact/page.tsx`:
```tsx
export default function ContactPage() {
  return <main className="pt-32"><div className="container"><h1 className="text-white">Contact — coming in Session 3</h1></div></main>
}
```

These will be fully built in Session 3.

---

## Step 12 — Install Missing Packages

Check `package.json`. If missing, install:
```bash
npm install framer-motion lucide-react
```

---

## Verification Checklist

- [ ] `npm run build` — zero errors
- [ ] `next.config.ts` still has `output: 'export'`
- [ ] No `@import url()` in globals.css
- [ ] Fonts apply (check `--font-display` in browser devtools)
- [ ] Header renders on `/` — glass on scroll, active link highlighted
- [ ] Header renders on `/services` — "Services" link shows as active
- [ ] Footer renders with `<Link>` navigation
- [ ] `/services`, `/work`, `/contact` routes resolve (placeholder pages)
- [ ] No TypeScript errors
