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
  if (!service) return { title: 'Service — Aviva Digital' }
  return {
    title: `${service.title} — Aviva Digital`,
    description: service.description,
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
