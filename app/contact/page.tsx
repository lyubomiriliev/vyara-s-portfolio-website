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
      <div className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'url(/background-images/aviva-digital.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            opacity: 0.2,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.92) 100%)',
          }}
        />
        <div className="relative">
          <TranslatedPageHero heroKey="contact" />
        </div>
      </div>
      <ContactPage />
    </main>
  )
}
