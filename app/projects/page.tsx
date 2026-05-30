import type { Metadata } from 'next'
import ProjectsPage from '@/components/pages/ProjectsPage'
import { TranslatedPageHero } from '@/components/ui/TranslatedPageHero'

export const metadata: Metadata = {
  title: 'Уеб Проекти — Сайтове & Приложения | Aviva Digital',
  description: 'Персонализирани уебсайтове и уеб приложения с фокус върху скорост, SEO и конверсии. От landing pages до пълни e-commerce платформи. Custom-built websites & web applications: landing pages, e-commerce stores, SaaS platforms — speed, SEO & conversion-optimized.',
  keywords: [
    'уеб разработка по поръчка', 'персонализиран уебсайт', 'e-commerce разработка',
    'landing page разработка', 'Next.js уебсайт', 'React разработка България',
    'бърз уебсайт SEO', 'онлайн магазин разработка',
    'custom website development Sofia', 'Next.js development Bulgaria', 'e-commerce website Bulgaria',
    'landing page development', 'web application development Sofia', 'fast website SEO optimized',
  ],
  alternates: {
    canonical: 'https://www.avivadigital.bg/projects',
    languages: {
      'bg': 'https://www.avivadigital.bg/projects',
      'en': 'https://www.avivadigital.bg/projects',
      'x-default': 'https://www.avivadigital.bg/projects',
    },
  },
  openGraph: {
    title: 'Уеб Проекти | Aviva Digital — Сайтове & Приложения',
    description: 'Персонализирани уебсайтове за бизнеса в България. Custom websites & web applications built for speed, SEO & conversions.',
    url: 'https://www.avivadigital.bg/projects',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Aviva Digital Web Projects — Custom Websites & Applications' }],
  },
}

export default function Projects() {
  return (
    <main>
      <TranslatedPageHero heroKey="projects" />
      <ProjectsPage />
    </main>
  )
}
