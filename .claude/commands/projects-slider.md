# Interactive Project Slider — Build Guide

## What This Is

A premium horizontal card slider for a digital agency's Projects page. It displays 7 real website projects as a row of **tall narrow cards**. One card is always **expanded** to show full project details. Clicking any slim card expands it with a smooth, cinematic animation.

---

## Core Interaction Model

- All projects live in **one horizontal flex row**
- **Inactive cards**: narrow (min-width: 64px), portrait, dim, show logo + vertical project name
- **Active card**: expands via `flexGrow: 5`, shows full content — logo, name, description, tech stack, CTA buttons
- Width animation uses Framer Motion `layout` + `animate` on `flexGrow`
- All transitions use `[0.4, 0, 0.2, 1]` cubic-bezier — smooth, not bouncy
- Navigation: dot indicators (active dot stretches wide like a pill) + prev/next arrows

---

## Card Anatomy

### Inactive card layers (bottom to top)
1. Background image (`object-cover`, slightly zoomed via `scale: 1.05`)
2. Dark gradient overlay (`rgba(10,10,15,0.88)` → top)
3. Centered logo (inverted white, ~40x40px)
4. Vertical project name (rotated 180°, `writing-mode: vertical-rl`)

### Active card layers (bottom to top)
1. Background image (`scale: 1.0`, unzoomed)
2. Strong gradient overlay (`rgba(10,10,15,0.92)` at bottom → transparent at top)
3. Content panel at bottom (`p-8`, flex column):
   - Category pill (violet tint)
   - Project logo (white inverted, larger ~64x48px)
   - Project name (`font-display`, 2xl–3xl, bold)
   - Short description (white/60, sm, relaxed)
   - Tech stack pills (glass style)
   - Two CTA buttons: primary gradient + ghost border

---

## Animation Details

```ts
// Card layout animation
<motion.div
  layout
  animate={{
    flexGrow: isActive ? 5 : 1,
    opacity: isActive ? 1 : 0.72,
  }}
  transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
>

// Image scale shift
<motion.div
  animate={{ scale: isActive ? 1.0 : 1.05 }}
  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
>

// Content reveal
<motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.15 }}
>
```

---

## Data Shape

```ts
interface WebProject {
  id: string           // unique key
  name: string         // display name
  client: string       // client name
  logo: string         // path to logo in /public
  thumbnail: string    // path to screenshot/image in /public
  description: { en: string; bg: string }  // bilingual
  url: string          // live website URL
  category: string     // e.g. "E-Commerce", "Business Website"
  accentColor: string  // for future per-project theming
  tech: string[]       // tech stack labels
}
```

---

## Mobile Behavior

On `< 768px`, the slider converts to a **single-card swipeable carousel**:
- One project visible at a time
- Full height card (480px) with image + overlay + content
- Prev/next arrows + dot indicators
- Animated with `AnimatePresence mode="wait"` + slide-in from right

---

## File Structure

```
components/pages/ProjectsPage.tsx   ← main component (desktop + mobile)
app/projects/page.tsx               ← page wrapper with metadata + PageHero
public/websites/                    ← all project logos
public/projects/                    ← project thumbnail screenshots
```

---

## Design Tokens Used

From `design-system.md`:
- `--gradient-text` for heading gradient
- `--accent-violet` (`#9B59F5`) for category pills and labels
- `--gradient-main` (`linear-gradient(135deg, #E040A0, #9B59F5)`) for active dots, primary buttons
- `--shadow-card` (`0 4px 24px rgba(0,0,0,0.4)`) for inactive cards
- Glass border: `1px solid rgba(255,255,255,0.1)`
- `font-display` = Syne (headings), `font-body` = DM Sans

---

## How to Add Real Screenshots

1. Take a full-width screenshot of each website at 1440px viewport
2. Export as `.jpg` or `.webp`, ~1200×800px
3. Place in `/public/projects/` with slugged filenames (e.g. `mbcenter.jpg`)
4. Update each project's `thumbnail` field in the `projects` array

---

## Prompt to Rebuild This Component

Use the following prompt with the `/projects-slider` command or paste directly:

```
Rebuild the Projects page slider for Aviva Digital following .claude/commands/projects-slider.md.

Key requirements:
- Desktop: horizontal flex row, 7 cards, one expanded active card with smooth Framer Motion layout animation
- Inactive cards: 64px min-width, show white inverted logo + vertical name
- Active card: flexGrow 5, shows logo, name, description, tech pills, 2 CTAs (Visit Website + Similar Project)  
- Mobile: single-card AnimatePresence carousel with prev/next arrows and dot nav
- Use real project data: mbcenter.bg, robohubpro.com, activegym.eu, pulse-padel.com, smartstrips.bg, paws-heaven.com, trending.bg
- Logos from /public/websites/ — invert white on all cards
- Thumbnails from /public/projects/ (one per project)
- Bilingual (en/bg) using useLang() hook
- Follow design-system.md tokens exactly
- Keep existing CTA section at bottom
- Component lives in components/pages/ProjectsPage.tsx
```
