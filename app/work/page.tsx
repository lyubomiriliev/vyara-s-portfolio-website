import type { Metadata } from 'next'
import WorkPage from '@/components/pages/WorkPage'
import { TranslatedPageHero } from '@/components/ui/TranslatedPageHero'
import CTABanner from '@/components/sections/CTABanner'

export const metadata: Metadata = {
  title: 'Our Work — Aviva Digital',
  description: 'Portfolio of digital projects — brand identities, social media campaigns, web development, AI-generated content and more.',
}

export default function Work() {
  return (
    <main>
      <TranslatedPageHero heroKey="work" />
      <WorkPage />
      <CTABanner />
    </main>
  )
}
