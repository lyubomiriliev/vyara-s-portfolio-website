import type { Metadata } from 'next'
import ContactPage from '@/components/pages/ContactPage'
import { TranslatedPageHero } from '@/components/ui/TranslatedPageHero'

export const metadata: Metadata = {
  title: 'Контакти — Безплатна Консултация | Aviva Digital',
  description: 'Свържете се с Aviva Digital в София. Безплатна стратегическа консултация, без ангажимент. Отговаряме до 24 часа. Get in touch with Aviva Digital, Sofia. Free strategy call, no commitment — we respond within 24 hours.',
  keywords: [
    'контакт дигитална агенция', 'безплатна консултация маркетинг', 'агенция София контакти',
    'дигитален маркетинг консултация', 'наеми агенция социални мрежи',
    'contact digital agency Sofia', 'free marketing consultation Bulgaria', 'hire digital agency Sofia',
    'digital marketing consultation', 'Aviva Digital contact',
  ],
  alternates: {
    canonical: 'https://www.avivadigital.bg/contact',
    languages: {
      'bg': 'https://www.avivadigital.bg/contact',
      'en': 'https://www.avivadigital.bg/contact',
      'x-default': 'https://www.avivadigital.bg/contact',
    },
  },
  openGraph: {
    title: 'Контакти | Aviva Digital — Безплатна Консултация',
    description: 'Свържете се с нас. Безплатна консултация, без ангажимент. Get in touch — free strategy call, no commitment.',
    url: 'https://www.avivadigital.bg/contact',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Contact Aviva Digital — Free Strategy Consultation' }],
  },
}

export default function Contact() {
  return (
    <main>
      <TranslatedPageHero heroKey="contact" />
      <ContactPage />
    </main>
  )
}
