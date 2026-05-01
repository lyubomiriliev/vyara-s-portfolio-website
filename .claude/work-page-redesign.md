# Work Page — Premium Content Feed Redesign

> Reference document for the `/work` page redesign of Aviva Digital.
> Stack: Next.js App Router · Tailwind CSS · Framer Motion · static export.

---

## Design Philosophy

The page should feel like a **curated editorial feed**, not a gallery grid.
Think: premium creative studio showreel meets high-end social platform.

Key principles:
- **Clarity over clutter** — generous whitespace, restrained type
- **Interaction over decoration** — every animation serves a purpose
- **Editorial rhythm** — cards have varied sizes; the eye travels, not bounces
- **Content-first modals** — clicking feels native, not like a lightbox hack

---

## Page Structure

```
<TranslatedPageHero heroKey="work" />   ← existing, keep
<WorkPage />                            ← full redesign
<CTABanner />                           ← existing, keep
```

---

## WorkPage Component Structure

```
WorkPage (root, 'use client')
├── FilterBar                   — animated filter pills
├── FeedGrid                    — masonry-inspired responsive grid
│   └── FeedCard (×N)          — individual post tile with hover overlay
├── ContentModal (portal)       — fullscreen overlay, type-aware
│   ├── CarouselModal           — swipeable slides + side info
│   ├── ImageModal              — clean lightbox + side info
│   └── VideoModal              — 9:16 vertical player + side info
```

---

## Data Model

Extend the existing `Project` type with content-type fields:

```ts
export type ContentType = 'carousel' | 'image' | 'video' | 'ai'

export interface WorkItem {
  id: string
  type: ContentType
  title: string
  client: string
  category: 'Designs' | 'Social' | 'Web' | 'Video' | 'AI Content'
  thumbnail: string          // displayed in grid
  slides?: string[]          // for type: 'carousel' — array of image paths
  videoSrc?: string          // for type: 'video'
  description: string
  goal?: 'Engagement' | 'Sales' | 'Awareness'
  results?: { value: string; label: string }[]
  year?: string
}
```

---

## Filter Bar

```
[ All ] [ Designs ] [ Social ] [ Video ] [ AI Content ]
```

- Centered, horizontal pill group
- Active state: `bg-white/[0.08] border border-white/[0.10]` with spring layout animation (`layoutId="work-filter-pill"`)
- Inactive: `text-white/40 hover:text-white/75`
- No page reload — instant client-side filter
- Transition: `AnimatePresence` + `staggerChildren` on grid re-render

---

## Feed Grid Layout

Use CSS columns (masonry) — **not CSS Grid** — for the uneven rhythm:

```
Desktop (lg+):  3 columns  →  columns-3
Tablet (md):    2 columns  →  md:columns-2
Mobile:         1 column   →  columns-1
```

Gap: `gap-4` between columns, `mb-4` break-inside-avoid on each card.

Card sizes are varied naturally because image aspect ratios differ:
- Portrait (9:16) images → tall cards (reels, AI portraits)
- Square (1:1) images → medium cards (carousels, social posts)
- Landscape (4:3) images → shorter cards (web, ads)

---

## FeedCard

```tsx
<motion.div
  layoutId={`card-${item.id}`}     // enables shared layout animation into modal
  onClick={() => openModal(item)}
  whileHover={{ scale: 1.02 }}
  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
  className="break-inside-avoid mb-4 relative overflow-hidden rounded-2xl cursor-pointer group"
>
  {/* Thumbnail */}
  <Image src={item.thumbnail} fill className="object-cover" />

  {/* Type badge — top left */}
  <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-pill
                   bg-black/50 backdrop-blur-md text-[10px] font-semibold
                   uppercase tracking-[0.12em] text-white/80 border border-white/10">
    {item.type}
  </span>

  {/* Hover overlay — fades in */}
  <motion.div
    initial={{ opacity: 0 }}
    whileHover={{ opacity: 1 }}
    transition={{ duration: 0.2 }}
    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent
               flex flex-col justify-end p-5"
  >
    <p className="text-[11px] uppercase tracking-[0.14em] text-white/50 mb-1">{item.client}</p>
    <h3 className="font-display font-bold text-base text-white leading-snug">{item.title}</h3>
  </motion.div>
</motion.div>
```

---

## ContentModal

Triggered by clicking any card. Uses `AnimatePresence` for enter/exit.

### Backdrop
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
  onClick={closeModal}
/>
```

### Modal Container
```
Desktop: max-w-5xl, two-column layout (media left, info right 320px)
Mobile:  full-width, stacked (media top, info below, scrollable)
```

Glass surface: `bg-[rgba(16,16,24,0.92)] border border-white/[0.08] rounded-3xl`

### Close button
Top-right `X`, `w-9 h-9 rounded-full bg-white/10 hover:bg-white/20`

---

## Modal: Image / AI Visual

```
Left (60%):  image fills the space, object-contain, subtle zoom-in animation
Right (40%): client name, title, description, goal badge, results metrics
```

Animation: `scaleIn` from `0.95` → `1.0` on mount.

---

## Modal: Carousel

```
Left (60%):
  - Swipeable horizontal slider
  - Drag gesture via Framer Motion useMotionValue + drag prop
  - Arrow buttons overlaid (left/right chevrons)
  - Slide counter: "3 / 7" centered below
  - Smooth spring transition between slides

Right (40%):
  - Client, title, description
  - Goal pill (color-coded: pink=engagement, violet=sales, blue=awareness)
  - Results (if available)
```

Slide transition: `x` offset driven by `motionValue`, spring animation.
Swipe threshold: 50px drag triggers next/prev.

---

## Modal: Video

```
Center: 9:16 aspect ratio container (max-h-[80vh], auto width)
  - <video> tag, autoplay muted loop playsInline
  - Custom play/pause overlay (click to toggle)
  - Progress bar at bottom

Below (mobile) / Right panel removed for video — full focus on content
  - Small caption strip below: client, title, goal
```

Video wrapper aspect ratio: `aspect-[9/16]` class.

---

## Animation System

| Interaction | Animation |
|---|---|
| Page load — cards | `staggerChildren(0.05)` + `fadeUp` from `y:20` |
| Filter change | `AnimatePresence mode="wait"` + grid re-enters with stagger |
| Card hover | `scale(1.02)` spring, overlay `opacity: 0→1` |
| Modal open | backdrop `opacity 0→1`, panel `scale 0.96→1 + opacity 0→1` |
| Modal close | reverse of above |
| Carousel slide | spring `x` transition, drag gesture |
| Image in modal | `scale 0.95→1` on mount |

All transitions use `cubic-bezier(0.4, 0, 0.2, 1)` or Framer spring where noted.

---

## Visual Design Tokens (from design-system.md)

- Background: `#0A0A0F` (bg-primary)
- Cards: glass-card pattern (`rgba(255,255,255,0.04)`, `border rgba(255,255,255,0.08)`)
- Modal surface: `rgba(16,16,24,0.92)` — deeper dark than cards
- Type badge bg: `rgba(0,0,0,0.50)` + `backdrop-blur-md`
- Accent: `--accent-violet` (#9B59F5) for labels, active states, goal badges
- Goal colors: pink=engagement, violet=sales, blue=awareness
- Fonts: Syne (display/headings) · DM Sans (body/captions)
- Section label: `text-xs font-semibold uppercase tracking-[0.15em] text-accent-violet`

---

## Responsive Behavior

| Breakpoint | Grid columns | Modal layout |
|---|---|---|
| Mobile (<768px) | 1 col | Full-width, media top + info stacked below, scrollable |
| Tablet (768–1023px) | 2 cols | Media top, info below (compact) |
| Desktop (1024px+) | 3 cols | Side-by-side: media 60% / info 40% |

---

## File Locations

- Page component: `components/pages/WorkPage.tsx` — full rewrite
- Data: `data/projects.ts` — extend Project type + add `type`, `slides`, `goal` fields
- Page route: `app/work/page.tsx` — unchanged (uses `<WorkPage />`)

---

## Constraints (Static Export)

- No API routes — all data is imported from `data/projects.ts`
- `next/image` with `unoptimized: true` (already in next.config.js)
- All interactive logic is `'use client'`
- No `[slug]` routes used — modal is client-side overlay, not navigation
- Body scroll lock when modal is open (`overflow-hidden` on `<body>` via `useEffect`)
