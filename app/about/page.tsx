import type { Metadata } from 'next'
import AboutPage from '@/components/pages/AboutPage'

export const metadata: Metadata = {
  title: 'About Us — Aviva Digital',
  description: 'Meet the Aviva Digital team. AI-first agency combining creative vision with data-driven marketing. Learn who we are and how we work.',
}

export default function About() {
  return <AboutPage />
}
