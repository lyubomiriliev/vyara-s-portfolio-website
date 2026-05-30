import type { Metadata } from 'next'
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import ClientOnlyBelowFold from "@/components/ClientOnlyBelowFold";

export const metadata: Metadata = {
  title: 'Aviva Digital — AI Дигитална Агенция | София, България',
  description: 'Aviva Digital — AI дигитална агенция в София. Социални мрежи, Meta Ads, уеб разработка, графичен дизайн и AI съдържание. AI-powered digital agency in Sofia, Bulgaria: social media management, Meta Ads, web development & AI content for brands that want to grow.',
  alternates: {
    canonical: 'https://www.avivadigital.bg',
    languages: {
      'bg': 'https://www.avivadigital.bg',
      'en': 'https://www.avivadigital.bg',
      'x-default': 'https://www.avivadigital.bg',
    },
  },
  openGraph: {
    title: 'Aviva Digital — AI Дигитална Агенция | София, България',
    description: 'AI дигитална агенция в София — социални мрежи, Meta Ads, уеб разработка. AI-powered digital agency in Sofia, Bulgaria.',
    url: 'https://www.avivadigital.bg',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Aviva Digital — AI Дигитална Агенция | Sofia, Bulgaria' }],
  },
}

// SEO-critical: keep SSR'd
const ServicesPreview = dynamic(
  () => import("@/components/sections/ServicesPreview"),
);
const PortfolioPreview = dynamic(
  () => import("@/components/sections/PortfolioPreview"),
);
const ProjectsPreview = dynamic(
  () => import("@/components/sections/ProjectsPreview"),
);
const WhyAviva = dynamic(() => import("@/components/sections/WhyAviva"));

export default function Home() {
  return (
    <main>
      {/* Preload the LCP image with media query so each device gets only its own version */}
      <link
        rel="preload"
        as="image"
        href="/background-images/ai-master-wallpaper-mobile.webp"
        media="(max-width: 768px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/background-images/ai-master-wallpaper.webp"
        media="(min-width: 769px)"
        fetchPriority="high"
      />
      <Hero />
      <ClientOnlyBelowFold slot="marquee" />
      <ServicesPreview />
      <PortfolioPreview />
      <ProjectsPreview />
      <WhyAviva />
      <ClientOnlyBelowFold slot="clients" />
      <ClientOnlyBelowFold slot="testimonials" />
      <ClientOnlyBelowFold slot="cta" />
    </main>
  );
}
