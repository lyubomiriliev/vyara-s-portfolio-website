// pages/index.tsx
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Strengths from "../components/Strengths";
import Clients from "../components/Clients";
import Packages from "../components/Packages";
import Footer from "../components/Footer";
import ExperienceSummary from "@/components/ExperienceSummary";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Timeline from "@/components/Timeline";
import Portfolio from "@/components/Portfolio";

export default function Home() {
  return (
    <div>
      <Hero />
      <ExperienceSummary />
      <About />
      <Timeline />
      <Skills />
      <Strengths />
      <Portfolio />
      <Clients />
      <Testimonials />
      <Packages />
      <ContactForm />
      <Footer />
    </div>
  );
}
