import Hero from "@/components/sections/Hero";
import ServicesPreview from "@/components/sections/ServicesPreview";
import Clients from "@/components/sections/Clients";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import WhyAviva from "@/components/sections/WhyAviva";
import MarqueeBanner from "@/components/sections/MarqueeBanner";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <main>
      <Hero />
      <MarqueeBanner />
      <ServicesPreview />
      <PortfolioPreview />
      <ProjectsPreview />
      <Clients />
      <Testimonials />
      <WhyAviva />
      <CTABanner />
    </main>
  );
}
