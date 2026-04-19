import type { Metadata } from 'next'
import { Tenor_Sans, Caveat } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/lib/LanguageContext'

const tenorSans = Tenor_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-script',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Aviva Digital — AI-Powered Digital Agency | Sofia, Bulgaria',
  description: 'Full-service digital agency combining AI innovation with proven marketing expertise. Social media, Meta Ads, web development, AI content generation — Sofia, Bulgaria.',
  keywords: 'digital agency Bulgaria, AI marketing, social media management, web development Sofia, Meta Ads, SEO',
  openGraph: {
    title: 'Aviva Digital — AI-Powered Digital Agency',
    description: 'Full-circle digital solutions: marketing, advertising, and web development powered by AI.',
    type: 'website', url: 'https://www.avivadigital.bg', locale: 'bg_BG',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.avivadigital.bg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg" className={`${tenorSans.variable} ${caveat.variable} overflow-x-hidden`}>
      <body className="bg-[#0A0A0F] text-white overflow-x-hidden antialiased" style={{ fontFamily: 'var(--font-display), system-ui, sans-serif' }}>
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
