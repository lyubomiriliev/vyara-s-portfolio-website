// pages/index.tsx
import Header from "../components/Header";
import SocialMediaPlatforms from "../components/SocialMediaPlatforms";
import ExperienceSummary from "../components/ExperienceSummary";
import About from "../components/About";
import Skills from "../components/Skills";
import Strengths from "../components/Strengths";
import Packages from "../components/Packages";
import Clients from "../components/Clients";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <div>
      <Header />
      <SocialMediaPlatforms />
      <ExperienceSummary />
      <About />
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
