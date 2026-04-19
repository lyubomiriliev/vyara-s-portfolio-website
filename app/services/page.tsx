import type { Metadata } from 'next'
import ServicesPage from '@/components/pages/ServicesPage'
import { TranslatedPageHero } from '@/components/ui/TranslatedPageHero'
import CTABanner from '@/components/sections/CTABanner'

export const metadata: Metadata = {
  title: 'Our Services — Aviva Digital',
  description: 'Full-service digital agency offering social media management, AI marketing, Meta Ads, web development, graphic design, video production and more.',
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
