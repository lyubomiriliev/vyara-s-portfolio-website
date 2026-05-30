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
  metadataBase: new URL('https://www.avivadigital.bg'),
  title: {
    template: '%s | Aviva Digital',
    default: 'Aviva Digital — AI Дигитална Агенция | София, България',
  },
  description: 'AI дигитална агенция в София — социални мрежи, Meta Ads, уеб разработка и AI съдържание. Full-service digital agency in Sofia, Bulgaria: social media management, Meta Ads, custom websites, AI marketing. Пълни дигитални решения за брандове, които искат да растат.',
  keywords: [
    // Bulgarian primary keywords
    'дигитална агенция', 'дигитална агенция София', 'маркетинг агенция България',
    'AI маркетинг агенция', 'управление на социални мрежи', 'Meta реклами',
    'уеб разработка София', 'SEO оптимизация', 'AI съдържание',
    'социални мрежи агенция', 'графичен дизайн', 'видео продукция',
    // English primary keywords
    'digital agency Sofia', 'digital agency Bulgaria', 'AI marketing agency',
    'social media management Sofia', 'Meta Ads Bulgaria', 'web development Sofia',
    'AI content generation', 'SEO Bulgaria', 'graphic design agency Sofia',
    'full service digital agency', 'marketing agency Bulgaria',
  ],
  authors: [{ name: 'Aviva Digital', url: 'https://www.avivadigital.bg' }],
  creator: 'Aviva Digital',
  publisher: 'Aviva Digital',
  openGraph: {
    title: 'Aviva Digital — AI Дигитална Агенция | Sofia, Bulgaria',
    description: 'AI дигитална агенция в София: социални мрежи, Meta Ads, уеб разработка. Full-service digital agency in Sofia, Bulgaria — social media, Meta Ads, web development & AI content.',
    type: 'website',
    url: 'https://www.avivadigital.bg',
    siteName: 'Aviva Digital',
    locale: 'bg_BG',
    alternateLocale: 'en_US',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Aviva Digital — AI Дигитална Агенция | Sofia, Bulgaria' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aviva Digital — AI Дигитална Агенция | Sofia, Bulgaria',
    description: 'AI дигитална агенция в София: социални мрежи, Meta Ads, уеб разработка. Full-service digital solutions powered by AI.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: {
    canonical: 'https://www.avivadigital.bg',
    languages: {
      'bg': 'https://www.avivadigital.bg',
      'en': 'https://www.avivadigital.bg',
      'x-default': 'https://www.avivadigital.bg',
    },
  },
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
  "@type": ["Organization", "ProfessionalService"],
  name: "Aviva Digital",
  alternateName: "Авива Дигитал",
  url: "https://www.avivadigital.bg",
  logo: {
    "@type": "ImageObject",
    url: "https://www.avivadigital.bg/aviva-digital-white-logo.png",
    width: 400,
    height: 400,
  },
  description: "AI дигитална агенция в София — социални мрежи, Meta Ads, уеб разработка, графичен дизайн, видео продукция и AI съдържание. AI-powered full-service digital agency in Sofia, Bulgaria.",
  foundingDate: "2024",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sofia",
    addressRegion: "Sofia",
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
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Дигитални маркетинг услуги / Digital Marketing Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Управление на социални мрежи", alternateName: "Social Media Management" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Meta Ads кампании", alternateName: "Meta Ads Campaigns" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Уеб разработка", alternateName: "Website Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI маркетинг", alternateName: "AI-Powered Marketing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO оптимизация", alternateName: "SEO Optimization" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Графичен дизайн", alternateName: "Graphic Design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Видео продукция", alternateName: "Video Production" } },
    ],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Aviva Digital",
  alternateName: "Авива Дигитал",
  url: "https://www.avivadigital.bg",
  image: "https://www.avivadigital.bg/og-image.jpg",
  description: "AI дигитална агенция в София — пълни дигитални решения за съвременния бизнес. Full-service AI-powered digital agency in Sofia, Bulgaria.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sofia",
    addressRegion: "Sofia",
    addressCountry: "BG",
  },
  priceRange: "$$",
  openingHours: "Mo-Fr 09:00-18:00",
  email: "office@avivadigital.bg",
  areaServed: ["Bulgaria", "Europe"],
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
