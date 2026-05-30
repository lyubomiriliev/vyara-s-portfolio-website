import type { Metadata } from 'next'
import AboutPage from '@/components/pages/AboutPage'

export const metadata: Metadata = {
  title: 'За нас — Екип, Опит & Визия | Aviva Digital',
  description: 'Aviva Digital — AI дигитална агенция от ново поколение в София. Запознайте се с основателите: Вяра Иванова-Илиева (8+ г. маркетинг) и Любомир Илиев (уеб разработка). Aviva Digital — next-generation AI digital agency in Sofia, Bulgaria. Real experience, AI-powered execution.',
  keywords: [
    'авива дигитал екип', 'дигитална агенция основатели', 'AI агенция ново поколение',
    'маркетинг агенция история', 'дигитален маркетинг опит България',
    'Aviva Digital team', 'digital agency founders Sofia', 'AI marketing agency Bulgaria',
    'about digital agency Sofia', 'marketing agency experience Bulgaria',
  ],
  alternates: {
    canonical: 'https://avivadigital.bg/about',
    languages: {
      'bg': 'https://avivadigital.bg/about',
      'en': 'https://avivadigital.bg/about',
      'x-default': 'https://avivadigital.bg/about',
    },
  },
  openGraph: {
    title: 'За нас | Aviva Digital — AI Дигитална Агенция',
    description: 'AI агенция от ново поколение в София. Опит, визия и реални резултати. Next-generation AI digital agency in Sofia — meet the team.',
    url: 'https://avivadigital.bg/about',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Aviva Digital Team — AI Digital Agency Sofia' }],
  },
}

export default function About() {
  return <AboutPage />
}
