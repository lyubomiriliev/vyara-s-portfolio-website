import type { Metadata } from 'next'
import ServicesPage from '@/components/pages/ServicesPage'
import { TranslatedPageHero } from '@/components/ui/TranslatedPageHero'
import CTABanner from '@/components/sections/CTABanner'

export const metadata: Metadata = {
  title: 'Услуги — Дигитален маркетинг, Уеб, AI | Aviva Digital',
  description: 'Aviva Digital предлага 18 услуги: управление на социални мрежи, Meta Ads, AI маркетинг, уеб разработка, графичен дизайн, видео продукция. 18 digital marketing services: social media management, Meta Ads, AI marketing, web development, graphic design & video production. София, България.',
  keywords: [
    'дигитален маркетинг услуги', 'управление на социални мрежи', 'Meta Ads агенция',
    'AI маркетинг', 'уеб разработка агенция', 'SEO оптимизация', 'графичен дизайн',
    'видео продукция', 'имейл маркетинг', 'e-commerce разработка',
    'social media management Sofia', 'Meta Ads agency Bulgaria', 'web development agency',
    'AI content generation', 'digital marketing services Bulgaria',
  ],
  alternates: {
    canonical: 'https://avivadigital.bg/services',
    languages: {
      'bg': 'https://avivadigital.bg/services',
      'en': 'https://avivadigital.bg/services',
      'x-default': 'https://avivadigital.bg/services',
    },
  },
  openGraph: {
    title: 'Услуги | Aviva Digital — AI Дигитална Агенция',
    description: '18 дигитални услуги: социални мрежи, Meta Ads, AI маркетинг, уеб разработка, дизайн и видео. 18 services: social media, Meta Ads, AI marketing, web development, design & video.',
    url: 'https://avivadigital.bg/services',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Aviva Digital Services — AI Digital Marketing Agency' }],
  },
}

export default function Services() {
  return (
    <main>
      <TranslatedPageHero heroKey="services" />
      <ServicesPage />
      <CTABanner />
    </main>
  )
}
