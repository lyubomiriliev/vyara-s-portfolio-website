# Aviva Digital — Component Patterns

> This file defines how every reusable UI component should be built and styled.
> Always check here before creating a new component — it may already be defined.
> All components use Tailwind CSS + CSS variables from design-system.md.

---

## Glassmorphism — Core Rules

Glassmorphism is used throughout this site. Apply consistently with these exact values.

### The Standard Glass Card
```css
background:      rgba(255, 255, 255, 0.04);
border:          1px solid rgba(255, 255, 255, 0.08);
border-radius:   20px;
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
box-shadow:      0 4px 24px rgba(0, 0, 0, 0.4);
```

Tailwind utility class (add to globals.css):
```css
.glass-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: var(--shadow-card);
  transition: background var(--transition-base),
              border-color var(--transition-base),
              box-shadow var(--transition-base);
}
.glass-card:hover {
  background: var(--glass-bg-hover);
  border-color: var(--glass-border-hover);
  box-shadow: var(--shadow-card-hover);
}
```

### Glassmorphism Locations — Where to Apply

| Location                   | Blur   | BG Alpha | Border Alpha | Notes                                  |
|----------------------------|--------|----------|--------------|----------------------------------------|
| Navbar (on scroll)         | 20px   | 0.70     | 0.06         | Dark bg tint, thin bottom border       |
| Service cards              | 12px   | 0.04     | 0.08         | Standard glass-card, violet hover glow |
| "Why Aviva" feature cards  | 12px   | 0.04     | 0.08         | Same as service cards                  |
| Process step cards         | 10px   | 0.04     | 0.08         | Numbered badge with gradient           |
| Client result cards        | 12px   | 0.05     | 0.08         | Colored top border accent (3px)        |
| Hero stats pills           | 8px    | 0.06     | 0.10         | Pill shape, compact                    |
| Contact form container     | 16px   | 0.05     | 0.08         | Most impactful — generous padding      |
| CTA banner inner container | 12px   | 0.06     | 0.10         | Sits over gradient background          |
| Portfolio card overlay     | 10px   | gradient | —            | Gradient-to-top on image bottom        |
| Mobile nav drawer          | 24px   | 0.85     | 0.10         | Heavy blur, near-opaque                |
| Modal / lightbox           | 40px   | 0.85     | 0.10         | Maximum glass effect                   |
| Section label pills        | 8px    | 0.06     | 0.10         | Small pill, accent-colored text        |

---

## Component: Navbar

```tsx
// components/Navbar.tsx
'use client' // only if not static — in static export use regular component

// Behavior:
// - Transparent on page top
// - On scroll past 50px: glass background appears with transition
// - Active link: white with underline or accent color
// - CTA button: gradient pill, always visible

// Structure:
<nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
  scrolled
    ? 'bg-[rgba(10,10,15,0.75)] backdrop-blur-xl border-b border-white/[0.06]'
    : 'bg-transparent'
}`}>
  <div className="container flex items-center justify-between h-16 md:h-20">
    {/* Logo */}
    <span className="font-display font-800 text-xl">
      <span className="text-gradient">AVIVA</span>
      <span className="text-white"> DIGITAL</span>
    </span>

    {/* Nav links (desktop) */}
    <div className="hidden md:flex items-center gap-8">
      {links.map(link => (
        <a key={link.href} href={link.href}
          className="text-sm text-white/60 hover:text-white transition-colors duration-150">
          {link.label}
        </a>
      ))}
    </div>

    {/* CTA + mobile menu button */}
    <div className="flex items-center gap-3">
      <ButtonPrimary size="sm">Get a Free Audit</ButtonPrimary>
      <MobileMenuButton /> {/* hamburger */}
    </div>
  </div>
</nav>
```

---

## Component: ButtonPrimary

Gradient pill button — the main CTA style.

```tsx
// components/ui/ButtonPrimary.tsx
export function ButtonPrimary({
  children,
  size = 'md',
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm:  'px-4 py-2 text-sm',
    md:  'px-6 py-3 text-sm',
    lg:  'px-8 py-4 text-base',
  }
  return (
    <button
      className={`
        inline-flex items-center gap-2 rounded-pill font-medium
        bg-gradient-main text-white
        shadow-[0_0_20px_rgba(155,89,245,0.35)]
        hover:shadow-[0_0_30px_rgba(155,89,245,0.55)]
        hover:scale-[1.02] active:scale-[0.98]
        transition-all duration-200
        ${sizes[size]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
```

---

## Component: ButtonOutline

Ghost/outline pill button — secondary CTA style.

```tsx
export function ButtonOutline({ children, className = '', ...props }) {
  return (
    <button
      className={`
        inline-flex items-center gap-2 rounded-pill font-medium text-sm
        px-6 py-3 border border-white/20 text-white/80
        hover:border-white/40 hover:text-white hover:bg-white/[0.05]
        transition-all duration-200
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
```

---

## Component: SectionLabel

```tsx
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-accent-violet mb-3">
      {children}
    </span>
  )
}
```

---

## Component: ServiceCard

```tsx
// Used in services grid — 3 cols desktop, 2 tablet, 1 mobile
export function ServiceCard({ icon: Icon, title, description, href = '#' }) {
  return (
    <div className="glass-card p-6 group cursor-pointer">
      {/* Icon container */}
      <div className="w-12 h-12 rounded-xl bg-gradient-subtle flex items-center justify-center mb-5
                      group-hover:shadow-glow-violet transition-all duration-300">
        <Icon size={22} className="text-accent-violet" />
      </div>

      <h3 className="font-display font-700 text-lg text-white mb-2">{title}</h3>
      <p className="text-sm text-white/55 leading-relaxed mb-5">{description}</p>

      <a href={href}
        className="inline-flex items-center gap-1.5 text-sm text-accent-violet
                   hover:gap-3 transition-all duration-200 font-medium">
        Learn More <span>→</span>
      </a>
    </div>
  )
}
```

---

## Component: StatPill (Hero stats)

```tsx
export function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass-card px-5 py-3 rounded-pill inline-flex flex-col items-center
                    backdrop-blur-sm border border-white/10">
      <span className="font-display font-800 text-xl text-gradient">{value}</span>
      <span className="text-xs text-white/50 mt-0.5">{label}</span>
    </div>
  )
}
```

---

## Component: ProcessStep

```tsx
export function ProcessStep({ number, title, description }: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="glass-card p-6 relative">
      {/* Number badge */}
      <div className="w-10 h-10 rounded-full bg-gradient-main flex items-center justify-center
                      text-white font-display font-800 text-sm mb-5 shadow-glow-violet">
        {number}
      </div>
      <h3 className="font-display font-700 text-lg text-white mb-2">{title}</h3>
      <p className="text-sm text-white/55 leading-relaxed">{description}</p>
    </div>
  )
}
```

---

## Component: PortfolioCard

```tsx
export function PortfolioCard({ image, title, category }: {
  image: string
  title: string
  category: string
}) {
  return (
    <div className="group relative overflow-hidden rounded-[var(--radius-lg)] cursor-pointer">
      {/* Image */}
      <img src={image} alt={title}
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />

      {/* Glass overlay — always visible at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5
                      bg-gradient-to-t from-[rgba(10,10,15,0.95)] via-[rgba(10,10,15,0.6)] to-transparent
                      backdrop-blur-[2px]">
        <span className="text-xs text-accent-violet font-semibold uppercase tracking-wider">
          {category}
        </span>
        <h3 className="font-display font-700 text-white text-base mt-1">{title}</h3>
      </div>

      {/* Hover: full glass overlay with CTA */}
      <div className="absolute inset-0 flex items-center justify-center
                      bg-[rgba(10,10,15,0.7)] backdrop-blur-sm
                      opacity-0 group-hover:opacity-100 transition-all duration-300">
        <span className="px-5 py-2.5 rounded-pill border border-white/30 text-white text-sm font-medium
                         hover:bg-white/10 transition-colors">
          View Project →
        </span>
      </div>
    </div>
  )
}
```

---

## Component: ClientCard

```tsx
export function ClientCard({ logo, name, metrics, accentColor = '--accent-violet' }: {
  logo: string
  name: string
  metrics: Array<{ value: string; label: string }>
  accentColor?: string
}) {
  return (
    <div className="glass-card p-6 overflow-hidden relative"
      style={{ borderTop: `3px solid var(${accentColor})` }}>
      <img src={logo} alt={name} className="h-8 object-contain mb-6 opacity-90" />

      <div className="grid grid-cols-3 gap-4">
        {metrics.map(m => (
          <div key={m.label}>
            <div className="font-display font-800 text-xl text-gradient">{m.value}</div>
            <div className="text-xs text-white/45 mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Subtle bg glow */}
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, var(${accentColor}) 0%, transparent 70%)`,
          opacity: 0.06,
          filter: 'blur(20px)',
          transform: 'translate(30%, -30%)',
        }} />
    </div>
  )
}
```

---

## Component: ContactForm

```tsx
// The form container uses maximum glass effect — most impactful location
// Keep existing form submission logic (EmailJS / Formspree / etc.)

<div className="glass-card p-8 md:p-12"
  style={{
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.10)',
  }}>
  {/* Input field style */}
  <input className="
    w-full bg-white/[0.05] border border-white/[0.10] rounded-[var(--radius-md)]
    px-4 py-3 text-sm text-white placeholder:text-white/30
    focus:outline-none focus:border-accent-violet/50 focus:bg-white/[0.07]
    transition-all duration-200
  " />
</div>
```

---

## Component: MarqueeBanner (Client logos)

```tsx
// Infinite horizontal scroll marquee
// Apply grayscale filter, remove on hover

<div className="overflow-hidden py-8">
  <div className="flex gap-12 animate-marquee whitespace-nowrap">
    {[...logos, ...logos].map((logo, i) => (
      <img key={i} src={logo.src} alt={logo.name}
        className="h-8 object-contain opacity-40 grayscale hover:opacity-90
                   hover:grayscale-0 transition-all duration-300 cursor-pointer"
      />
    ))}
  </div>
</div>

// Add to tailwind.config keyframes:
// marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } }
// animation: { marquee: 'marquee 25s linear infinite' }
```

---

## Layout: Page Wrapper

Every page should use this structure:

```tsx
<main className="bg-[#0A0A0F] text-white font-body min-h-screen overflow-x-hidden">
  <Navbar />
  {/* Page sections */}
  <Footer />
</main>
```

---

## Services Data Structure

Organize services into 3 categories for the tab filter:

```ts
// data/services.ts
export const serviceCategories = [
  {
    id: 'marketing',
    label: 'Marketing & Social',
    services: [
      { icon: 'Share2',      title: 'Social Media Management',  description: 'Strategic content, scheduling and community management across all platforms.' },
      { icon: 'Brain',       title: 'AI-Powered Marketing',     description: 'Machine learning-driven campaigns that adapt and optimize in real time.' },
      { icon: 'Target',      title: 'Meta Ads Campaigns',       description: 'High-converting Facebook and Instagram ad campaigns with precise targeting.' },
      { icon: 'Users',       title: 'Influencer Marketing',     description: 'Partnerships with the right voices to amplify your brand authentically.' },
      { icon: 'Mail',        title: 'Email Marketing',          description: 'Automated sequences and campaigns that nurture leads and drive sales.' },
      { icon: 'Search',      title: 'SEO Optimization',         description: 'Technical and content SEO to dominate search rankings in your niche.' },
    ],
  },
  {
    id: 'creative',
    label: 'Creative & Content',
    services: [
      { icon: 'Printer',     title: 'Graphic Design (Print)',   description: 'Brochures, banners, packaging and all print collateral, pixel-perfect.' },
      { icon: 'Monitor',     title: 'Graphic Design (Digital)', description: 'Social creatives, web banners, and UI assets built for scroll-stopping impact.' },
      { icon: 'Video',       title: 'Video Filming',            description: 'Professional video production for ads, brand stories and social content.' },
      { icon: 'Film',        title: 'Video Editing',            description: 'Post-production, color grading, captions and platform-optimized exports.' },
      { icon: 'Image',       title: 'AI Image Generation',      description: 'Photorealistic AI visuals and product shots — hours of shooting, minutes of output.' },
      { icon: 'Clapperboard',title: 'AI Video Generation',      description: 'Cinematic AI video sequences for ads, reels and property showcases.' },
    ],
  },
  {
    id: 'web',
    label: 'Web & Development',
    services: [
      { icon: 'Globe',       title: 'Website Creation',         description: 'Fast, beautiful websites built for conversion and search performance.' },
      { icon: 'Code2',       title: 'Custom Websites (Next.js)',description: 'Bespoke React / Next.js builds with performance-first architecture.' },
      { icon: 'ShoppingBag', title: 'Shopify Websites',         description: 'Custom Shopify themes and apps that turn visitors into customers.' },
      { icon: 'Store',       title: 'Online Store / E-commerce',description: 'Full e-commerce solutions with payment, inventory and logistics integrations.' },
      { icon: 'Smartphone',  title: 'Web Applications',        description: 'Cross-platform apps built with React Native and Electron.' },
      { icon: 'Layers',      title: 'SaaS Solutions',           description: 'Scalable SaaS products from MVP to production-ready platform.' },
    ],
  },
]
```
