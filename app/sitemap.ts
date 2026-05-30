import type { MetadataRoute } from 'next'
import { services } from '@/data/services'
import { projects } from '@/data/projects'

const BASE = 'https://avivadigital.bg'

// trailingSlash: true is set in next.config — every URL must end with "/"
const url = (path: string) => `${BASE}${path}`.replace(/([^/])$/, '$1/')

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url('/'), changeFrequency: 'weekly', priority: 1.0, lastModified: now },
    { url: url('/services'), changeFrequency: 'monthly', priority: 0.9, lastModified: now },
    { url: url('/work'), changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: url('/projects'), changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: url('/clients'), changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: url('/about'), changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: url('/faq'), changeFrequency: 'monthly', priority: 0.6, lastModified: now },
    { url: url('/contact'), changeFrequency: 'monthly', priority: 0.7, lastModified: now },
    { url: url('/terms'), changeFrequency: 'yearly', priority: 0.3, lastModified: now },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: url(`/services/${s.id}`),
    changeFrequency: 'monthly',
    priority: 0.7,
    lastModified: now,
  }))

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: url(`/work/${p.slug}`),
    changeFrequency: 'monthly',
    priority: 0.6,
    lastModified: now,
  }))

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes]
}
