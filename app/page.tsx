// pages/index.tsx
import Hero from "../components/Hero";
import SocialMediaPlatforms from "../components/SocialMediaPlatforms";
import About from "../components/About";
import Skills from "../components/Skills";
import Strengths from "../components/Strengths";
import Clients from "../components/Clients";
import Packages from "../components/Packages";
import Footer from "../components/Footer";
import ExperienceSummary from "@/components/ExperienceSummary";

export default function Home() {
  return (
    <div>
      <Hero />
      <SocialMediaPlatforms />
      <About />
      <ExperienceSummary />
      {/* <Skills /> */}
      {/* <Strengths /> */}
      {/* <Clients /> */}
      {/* <Packages /> */}
      {/* <Footer /> */}
    </div>
  );
}
