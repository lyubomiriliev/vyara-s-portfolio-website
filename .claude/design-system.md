# Aviva Digital — Design System

> Reference this file whenever making styling decisions. All values here are
> the single source of truth. Do not deviate from these tokens.

---

## Color Tokens

### CSS Custom Properties
Define these in `globals.css` under `:root` and use them everywhere.

```css
:root {
  /* Backgrounds */
  --bg-primary:        #0A0A0F;
  --bg-secondary:      #111118;
  --bg-tertiary:       #16161F;

  /* Glass / Surface */
  --glass-bg:          rgba(255, 255, 255, 0.04);
  --glass-bg-hover:    rgba(255, 255, 255, 0.07);
  --glass-border:      rgba(255, 255, 255, 0.08);
  --glass-border-hover:rgba(155, 89, 245, 0.35);

  /* Accent Palette */
  --accent-pink:       #E040A0;
  --accent-violet:     #9B59F5;
  --accent-blue:       #4A9EFF;
  --accent-orange:     #FFB76C;

  /* Gradients */
  --gradient-main:     linear-gradient(135deg, #E040A0, #9B59F5, #4A9EFF);
  --gradient-text:     linear-gradient(135deg, #E040A0 0%, #9B59F5 50%, #4A9EFF 100%);
  --gradient-subtle:   linear-gradient(135deg, rgba(224,64,160,0.15), rgba(155,89,245,0.15));
  --gradient-glow-pink:   radial-gradient(circle, rgba(224,64,160,0.25) 0%, transparent 70%);
  --gradient-glow-violet: radial-gradient(circle, rgba(155,89,245,0.2) 0%, transparent 70%);
  --gradient-glow-blue:   radial-gradient(circle, rgba(74,158,255,0.2) 0%, transparent 70%);

  /* Text */
  --text-primary:      #FFFFFF;
  --text-secondary:    rgba(255, 255, 255, 0.60);
  --text-muted:        rgba(255, 255, 255, 0.35);
  --text-placeholder:  rgba(255, 255, 255, 0.25);

  /* Borders & Dividers */
  --border-subtle:     rgba(255, 255, 255, 0.06);
  --border-divider:    rgba(255, 255, 255, 0.08);

  /* Shadows */
  --shadow-card:       0 4px 24px rgba(0, 0, 0, 0.4);
  --shadow-card-hover: 0 8px 40px rgba(155, 89, 245, 0.2);
  --shadow-glow-pink:  0 0 40px rgba(224, 64, 160, 0.3);
  --shadow-glow-violet:0 0 40px rgba(155, 89, 245, 0.3);

  /* Radius */
  --radius-sm:   8px;
  --radius-md:   14px;
  --radius-lg:   20px;
  --radius-xl:   28px;
  --radius-pill: 999px;

  /* Transitions */
  --transition-fast:   150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base:   250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow:   400ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Tailwind Config Extension
Add to `tailwind.config.js` / `tailwind.config.ts`:

```js
theme: {
  extend: {
    colors: {
      bg: {
        primary:   '#0A0A0F',
        secondary: '#111118',
        tertiary:  '#16161F',
      },
      accent: {
        pink:   '#E040A0',
        violet: '#9B59F5',
        blue:   '#4A9EFF',
        orange: '#FFB76C',
      },
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
    borderRadius: {
      'pill': '999px',
    },
    fontFamily: {
      display: ['Syne', 'sans-serif'],
      body:    ['DM Sans', 'sans-serif'],
    },
  },
},
```

---

## Typography

### Font Stack
- **Display (headings, nav logo, section labels):** `Syne` — weights 600, 700, 800
- **Body (paragraphs, captions, UI copy):** `DM Sans` — weights 400, 500

### Loading (next/font in `layout.tsx`)
```tsx
import { Syne, DM_Sans } from 'next/font/google'

const syne = Syne({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
})

// Apply to <html>: className={`${syne.variable} ${dmSans.variable}`}
```

### Type Scale

| Role               | Size (desktop) | Size (mobile) | Weight | Font    | Notes                          |
|--------------------|----------------|---------------|--------|---------|--------------------------------|
| Hero H1            | 80–96px        | 48px          | 800    | Syne    | Gradient on key words          |
| Page H1            | 56–64px        | 36px          | 800    | Syne    |                                |
| Section H2         | 40–48px        | 30px          | 700    | Syne    |                                |
| Card H3            | 20–24px        | 18px          | 700    | Syne    |                                |
| Section label      | 11–12px        | 11px          | 600    | DM Sans | UPPERCASE, tracking: 0.15em    |
| Body / lead        | 16–18px        | 15px          | 400    | DM Sans | line-height: 1.7               |
| Caption / muted    | 13–14px        | 13px          | 400    | DM Sans | color: var(--text-muted)       |
| Button             | 14–15px        | 14px          | 500    | DM Sans | tracking: 0.02em               |

### Gradient Text Utility
```css
.text-gradient {
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## Spacing & Layout

### Container
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px; /* mobile */
}
@media (min-width: 768px)  { .container { padding: 0 48px; } }
@media (min-width: 1024px) { .container { padding: 0 64px; } }
```

### Section Spacing
- **Vertical padding per section:** `py-24` (96px) on desktop, `py-16` (64px) on mobile
- **Between section label and headline:** `mb-3`
- **Between headline and body copy:** `mt-4`
- **Between body copy and CTA:** `mt-8`
- **Card gaps in grid:** `gap-5` (20px) or `gap-6` (24px)

### Breakpoints (Tailwind defaults)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

---

## Decorative Glow Elements

These are absolutely-positioned, blurred radial gradient `<div>` elements used as
background atmosphere in hero and section backgrounds. Always `pointer-events-none`,
`z-index: 0`. Content must be `z-index: 10` relative to them.

### Reusable Glow Component
```tsx
// components/ui/Glow.tsx
export function Glow({
  color = 'violet',
  size = 600,
  className = '',
}: {
  color?: 'pink' | 'violet' | 'blue'
  size?: number
  className?: string
}) {
  const colorMap = {
    pink:   'rgba(224,64,160,0.18)',
    violet: 'rgba(155,89,245,0.15)',
    blue:   'rgba(74,158,255,0.15)',
  }
  return (
    <div
      aria-hidden
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${colorMap[color]} 0%, transparent 70%)`,
        filter: 'blur(40px)',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}
```

### Typical Hero Placement
```tsx
<section className="relative overflow-hidden">
  <Glow color="violet" size={700} className="top-1/2 left-1/4" />
  <Glow color="pink"   size={500} className="top-1/3 right-1/4" />
  <Glow color="blue"   size={400} className="bottom-0 left-1/2" />
  {/* content here with relative z-10 */}
</section>
```

---

## Animation Tokens (Framer Motion)

### Standard variants — import and reuse these
```ts
// lib/animations.ts

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
```

### Scroll trigger wrapper pattern
```tsx
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-80px' }}
>
```

### Floating orb animation (hero)
```tsx
animate={{ y: [0, -18, 0], scale: [1, 1.04, 1] }}
transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
```

---

## Section Label Style

Every section has a small label above the headline. Always render as:

```tsx
<span className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-accent-violet mb-3">
  OUR SERVICES
</span>
```

Or with a pill background variant:
```tsx
<span className="inline-flex items-center gap-2 px-3 py-1 rounded-pill text-xs font-semibold 
  uppercase tracking-[0.12em] bg-glass border border-glass text-accent-violet mb-4">
  🤖 AI-Powered Agency
</span>
```
