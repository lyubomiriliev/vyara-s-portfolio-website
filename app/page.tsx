import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import ClientOnlyBelowFold from "@/components/ClientOnlyBelowFold";

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
