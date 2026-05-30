import type { Metadata } from 'next'
import { Tenor_Sans } from 'next/font/google'
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

export const metadata: Metadata = {
  title: 'Aviva Digital — AI-Powered Digital Agency | Sofia, Bulgaria',
  description: 'Full-service digital agency combining AI innovation with proven marketing expertise. Social media, Meta Ads, web development, AI content generation — Sofia, Bulgaria.',
  keywords: 'digital agency Bulgaria, AI marketing, social media management, web development Sofia, Meta Ads, SEO',
  openGraph: {
    title: 'Aviva Digital — AI-Powered Digital Agency',
    description: 'Full-circle digital solutions: marketing, advertising, and web development powered by AI.',
    type: 'website', url: 'https://www.avivadigital.bg', locale: 'bg_BG',
    images: [{ url: 'https://www.avivadigital.bg/aviva-digital-logo.png', width: 1200, height: 630, alt: 'Aviva Digital' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aviva Digital — AI-Powered Digital Agency',
    description: 'Full-circle digital solutions: marketing, advertising, and web development powered by AI.',
    images: ['https://www.avivadigital.bg/aviva-digital-logo.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.avivadigital.bg' },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/aviva-favicon.png', sizes: '400x400', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [{ rel: 'msapplication-config', url: '/browserconfig.xml' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg" className={`${tenorSans.variable} overflow-x-hidden`}>
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
