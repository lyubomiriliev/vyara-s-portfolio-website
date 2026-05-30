import { Suspense } from 'react'
import type { Metadata } from 'next'
import WorkPage from '@/components/pages/WorkPage'
import { TranslatedPageHero } from '@/components/ui/TranslatedPageHero'
import CTABanner from '@/components/sections/CTABanner'

export const metadata: Metadata = {
  title: 'Портфолио — Дизайн, Социални мрежи, Уеб | Aviva Digital',
  description: 'Разгледайте портфолиото на Aviva Digital — бранд дизайн, социални мрежи, уеб разработка и AI съдържание за клиенти в България. Browse our portfolio: brand identities, social media campaigns, web development & AI-generated content for clients across Bulgaria.',
  keywords: [
    'портфолио дигитална агенция', 'дизайн портфолио', 'социални мрежи проекти',
    'уеб разработка портфолио', 'AI съдържание примери', 'бранд дизайн България',
    'digital agency portfolio', 'social media portfolio Bulgaria', 'web design portfolio Sofia',
    'AI content examples', 'brand design portfolio',
  ],
  alternates: {
    canonical: 'https://www.avivadigital.bg/work',
    languages: {
      'bg': 'https://www.avivadigital.bg/work',
      'en': 'https://www.avivadigital.bg/work',
      'x-default': 'https://www.avivadigital.bg/work',
    },
  },
  openGraph: {
    title: 'Портфолио | Aviva Digital — AI Дигитална Агенция',
    description: 'Дизайн, социални мрежи, уеб и AI проекти за клиенти в България. Brand design, social media, web & AI projects for clients across Bulgaria.',
    url: 'https://www.avivadigital.bg/work',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Aviva Digital Portfolio — Design, Social Media, Web & AI Projects' }],
  },
}

export default function Work() {
  return (
    <main>
      <TranslatedPageHero heroKey="work" />
      <Suspense fallback={null}>
        <WorkPage />
      </Suspense>
      <CTABanner />
    </main>
  )
}
