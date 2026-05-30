import { projects } from '@/data/projects'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ProjectPageContent from '@/components/pages/ProjectPage'

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find(p => p.slug === slug)
  if (!project) return {}
  const canonicalUrl = `https://avivadigital.bg/work/${slug}`
  return {
    title: `${project.title} | Портфолио — Aviva Digital`,
    description: `${project.description} Aviva Digital — AI дигитална агенция в София, България. Sofia, Bulgaria.`,
    alternates: {
      canonical: canonicalUrl,
      languages: { 'bg': canonicalUrl, 'en': canonicalUrl, 'x-default': canonicalUrl },
    },
    openGraph: {
      title: `${project.title} | Aviva Digital`,
      description: project.description,
      url: canonicalUrl,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: `${project.title} — Aviva Digital Portfolio` }],
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find(p => p.slug === slug)
  if (!project) notFound()
  return <ProjectPageContent project={project} />
}
