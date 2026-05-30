import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { services } from '@/data/services'
import ServiceDetailPage from '@/components/pages/ServiceDetailPage'
import CTABanner from '@/components/sections/CTABanner'

export async function generateStaticParams() {
  return services.map(s => ({ slug: s.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = services.find(s => s.id === slug)
  if (!service) return { title: 'Услуга — Aviva Digital' }
  const canonicalUrl = `https://www.avivadigital.bg/services/${slug}`
  return {
    title: `${service.title} | ${service.categoryLabel} — Aviva Digital`,
    description: `${service.description} Aviva Digital — AI дигитална агенция в София, България. Sofia, Bulgaria.`,
    alternates: {
      canonical: canonicalUrl,
      languages: { 'bg': canonicalUrl, 'en': canonicalUrl, 'x-default': canonicalUrl },
    },
    openGraph: {
      title: `${service.title} | Aviva Digital`,
      description: service.description,
      url: canonicalUrl,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: `${service.title} — Aviva Digital` }],
    },
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services.find(s => s.id === slug)
  if (!service) notFound()

  return (
    <main>
      <ServiceDetailPage service={service} />
      <CTABanner />
    </main>
  )
}
