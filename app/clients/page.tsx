import type { Metadata } from 'next'
import ClientsPage from '@/components/pages/ClientsPage'

export const metadata: Metadata = {
  title: 'Our Clients — Aviva Digital',
  description: 'Real brands, real results. See how Aviva Digital has delivered measurable growth for clients across Bulgaria and beyond.',
}

export default function Clients() {
  return <ClientsPage />
}
