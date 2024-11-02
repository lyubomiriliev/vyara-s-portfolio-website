// pages/index.tsx
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Strengths from "../components/Strengths";
import Clients from "../components/Clients";
import Packages from "../components/Packages";
import Footer from "../components/Footer";
import ExperienceSummary from "@/components/ExperienceSummary";
import DailyTools from "@/components/DailyTools";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <ExperienceSummary />
      <DailyTools />
      <Skills />
      <Strengths />
      <Clients />
      <Packages />
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  );
}
