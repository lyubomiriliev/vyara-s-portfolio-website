import type { Metadata } from 'next'
import ContactPage from '@/components/pages/ContactPage'
import { TranslatedPageHero } from '@/components/ui/TranslatedPageHero'

export const metadata: Metadata = {
  title: 'Contact Us — Aviva Digital',
  description: 'Get in touch with Aviva Digital. Free strategy call, no commitment. We respond within 24 hours.',
}

export default function Contact() {
  return (
    <main>
      <TranslatedPageHero heroKey="contact" />
      <ContactPage />
    </main>
  )
}
