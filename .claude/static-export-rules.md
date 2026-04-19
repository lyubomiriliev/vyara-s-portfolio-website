# Aviva Digital — Static Export Rules

> CRITICAL: This Next.js project is configured as a static export.
> Read this file before writing ANY Next.js code or modifying any config.
> Violations will break the build. These rules are non-negotiable.

---

## What Static Export Means

`next.config.js` has `output: 'export'`. This means:

- `next build` produces a `/out` directory of pure static HTML/CSS/JS files
- There is **no Node.js server** at runtime — no API routes, no SSR, no middleware
- The site is deployed to a static host (Vercel static, Netlify, or plain file hosting)
- Every page is pre-rendered to a `.html` file at build time

---

## ✅ ALLOWED — Use These

### Rendering
- `export default function Page()` — standard static pages
- `generateStaticParams()` — for dynamic routes like `[slug]`, required to pre-render all paths
- `export const metadata = { ... }` — static metadata per page
- Client components (`'use client'`) — fully supported, run in browser
- `useEffect`, `useState`, `useRef` — all fine, run client-side

### Data Fetching
- Import JSON files directly: `import data from '@/data/clients.json'`
- Fetch at build time inside `generateStaticParams` or page-level async functions
- All data must be available at **build time** — no runtime DB calls

### Images
```js
// next.config.js must have:
images: { unoptimized: true }
// Always use this — next/image optimization requires a server
```

### Routing
- File-based routing works normally: `app/about/page.tsx` → `/about`
- Dynamic routes work if `generateStaticParams` exports all paths
- Use `<Link href="/services">` for internal navigation — never `<a>` tags for internal links

### Fonts
- `next/font/google` — works fine, fonts are downloaded at build time

---

## ❌ FORBIDDEN — Never Use These

### Server-Only Next.js Features
```ts
// NEVER — these require a running Node server
import { cookies }  from 'next/headers'
import { headers }  from 'next/headers'
import { redirect } from 'next/navigation'  // server redirect — use client-side instead
```

### API Routes
```
// NEVER create these — they require a server runtime
app/api/*/route.ts
pages/api/*.ts
```

### Server Actions
```ts
// NEVER — 'use server' requires server runtime
'use server'
async function submitForm(data: FormData) { ... }
```

### Dynamic Server-Side Rendering
```ts
// NEVER — forces SSR
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'edge'  // edge runtime not compatible with static export
```

### Middleware
```
// NEVER create middleware.ts — not compatible with static export
middleware.ts
```

---

## Contact Form — How to Handle Without a Server

The existing form solution must be preserved. Check the codebase first.
If rebuilding or the existing solution is unclear, use one of these:

### Option A: EmailJS (no backend, sends email from browser)
```ts
import emailjs from '@emailjs/browser'

const sendEmail = async (formData: FormData) => {
  await emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    Object.fromEntries(formData),
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
  )
}
```

### Option B: Formspree (form submits to Formspree's endpoint)
```tsx
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  {/* fields */}
</form>
// Or use their React library: @formspree/react
```

### Option C: Netlify Forms (if hosted on Netlify)
```html
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  {/* fields */}
</form>
```

**Never create an API route for the contact form.**

---

## Dynamic Routes — Required Pattern

If creating routes like `/services/[slug]` or `/work/[id]`:

```ts
// app/services/[slug]/page.tsx

// REQUIRED — tells Next.js which paths to pre-render
export async function generateStaticParams() {
  return [
    { slug: 'social-media-management' },
    { slug: 'meta-ads-campaigns' },
    // ... all possible slugs
  ]
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  // use params.slug to load data
}
```

Without `generateStaticParams`, dynamic routes will **fail to build**.

---

## next.config.js — Preserve This Structure

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // ← NEVER remove this line
  trailingSlash: true,     // ← likely present — preserves /about/ → about/index.html
  images: {
    unoptimized: true,     // ← NEVER remove — required for static export
  },
  // Do not add: runtime, serverActions, or any server config
}

module.exports = nextConfig
```

---

## Environment Variables

- Only `NEXT_PUBLIC_` prefixed variables are available client-side
- Non-prefixed variables are build-time only (for `generateStaticParams` etc.)
- Never store secrets in `NEXT_PUBLIC_` variables — they're visible in browser

---

## Deployment Checklist

Before considering the build complete, verify:

- [ ] `npm run build` completes without errors
- [ ] No "Dynamic server usage" errors in build output
- [ ] `/out` directory is generated
- [ ] All pages appear as `.html` files in `/out`
- [ ] Images load correctly (unoptimized mode)
- [ ] Contact form submits without an API route
- [ ] All internal links use `<Link>` not `<a>`
- [ ] No `cookies()`, `headers()`, or `redirect()` from `next/headers`

---

## Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `Error: Dynamic server usage: cookies` | Used `cookies()` from `next/headers` | Remove it — use client-side state |
| `Error: Page "/api/contact" is missing` | Created API route | Delete it, use EmailJS/Formspree |
| `Error: Page "/services/[slug]" is missing generateStaticParams` | Dynamic route without static paths | Add `generateStaticParams()` |
| Images return 404 | Using `next/image` without `unoptimized: true` | Add to `next.config.js` |
| `useRouter().push()` not working | Using `redirect()` from `next/navigation` (server) | Use `useRouter()` from `next/navigation` (client component) |
| Build works locally but fails on deploy | Missing env vars | Check all `NEXT_PUBLIC_` vars are set in host dashboard |
