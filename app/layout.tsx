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
  description: 'AI-powered digital agency in Sofia — social media, Meta Ads, web development & AI content. Full-circle solutions for brands that want to grow.',
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aviva Digital",
  url: "https://www.avivadigital.bg",
  logo: "https://www.avivadigital.bg/aviva-digital-white-logo.png",
  description: "AI-powered full-service digital agency based in Sofia, Bulgaria. Social media management, Meta Ads, web development, graphic design, video production and AI content generation.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sofia",
    addressCountry: "BG",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "office@avivadigital.bg",
    contactType: "customer service",
    availableLanguage: ["Bulgarian", "English"],
  },
  sameAs: [
    "https://www.facebook.com/avivadigital.bg",
    "https://www.instagram.com/avivadigital",
  ],
  knowsAbout: [
    "Social Media Marketing",
    "AI Marketing",
    "Meta Ads",
    "Web Development",
    "Graphic Design",
    "Video Production",
    "SEO",
    "E-commerce",
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Aviva Digital",
  url: "https://www.avivadigital.bg",
  image: "https://www.avivadigital.bg/aviva-digital-white-logo.png",
  description: "Full-service AI-powered digital agency in Sofia, Bulgaria.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sofia",
    addressCountry: "BG",
  },
  priceRange: "$$",
  openingHours: "Mo-Fr 09:00-18:00",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Aviva Digital",
  url: "https://www.avivadigital.bg",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.avivadigital.bg/services",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg" className={`${tenorSans.variable} overflow-x-hidden`}>
      <head>
        {/* Favicon — explicit tags so Safari picks them up regardless of metadata API */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/aviva-favicon.png" type="image/png" sizes="400x400" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
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
