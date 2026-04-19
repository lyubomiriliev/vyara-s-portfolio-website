import type { Metadata } from 'next'
import ProjectsPage from '@/components/pages/ProjectsPage'
import { TranslatedPageHero } from '@/components/ui/TranslatedPageHero'

export const metadata: Metadata = {
  title: 'Web Projects — Aviva Digital',
  description: 'Custom-built websites and web applications engineered for speed, SEO, and conversions. From landing pages to full e-commerce platforms.',
}

export default function Projects() {
  return (
    <main>
      <TranslatedPageHero heroKey="projects" />
      <ProjectsPage />
    </main>
  )
}
