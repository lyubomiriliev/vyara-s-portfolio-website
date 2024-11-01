import Header from "../components/Header";
import SocialIcons from "../components/SocialIcons";
import About from "../components/About";
import Skills from "../components/Skills";
import Clients from "../components/Clients";
import ContactForm from "../components/ContactForm";

export default function Home() {
  return (
    <div>
      <Header />
      <SocialIcons />
      <About />
      <Skills />
      <Clients />
      <ContactForm />
    </div>
  );
}
