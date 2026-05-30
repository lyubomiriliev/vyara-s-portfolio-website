import type { Metadata } from 'next'
import ClientsPage from '@/components/pages/ClientsPage'

export const metadata: Metadata = {
  title: 'Клиенти — Реални Брандове, Реални Резултати | Aviva Digital',
  description: 'Вижте реалните резултати на Aviva Digital за клиенти в България — ръст в продажби, ангажираност и разпознаваемост на бранда. Real brands, real results: see how Aviva Digital delivered measurable growth for 16+ clients across Bulgaria.',
  keywords: [
    'клиенти дигитална агенция', 'резултати дигитален маркетинг', 'успешни проекти агенция',
    'кейс студии маркетинг', 'ръст в продажби социални мрежи', 'брандове България',
    'digital agency clients Bulgaria', 'marketing results case studies', 'social media growth Bulgaria',
    'brand growth examples', 'digital marketing success stories',
  ],
  alternates: {
    canonical: 'https://www.avivadigital.bg/clients',
    languages: {
      'bg': 'https://www.avivadigital.bg/clients',
      'en': 'https://www.avivadigital.bg/clients',
      'x-default': 'https://www.avivadigital.bg/clients',
    },
  },
  openGraph: {
    title: 'Клиенти | Aviva Digital — Реални Резултати',
    description: '16+ бранда в България с реални резултати. 16+ brands across Bulgaria with measurable growth in social media, ads & web.',
    url: 'https://www.avivadigital.bg/clients',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Aviva Digital Clients — Real Brands, Real Results' }],
  },
}

export default function Clients() {
  return <ClientsPage />
}
