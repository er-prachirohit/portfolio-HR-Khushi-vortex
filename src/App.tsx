import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ImpactMetrics } from "@/components/ImpactMetrics";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";

import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <ImpactMetrics />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Process />
      <Services />
      <Testimonials />
      
      <Contact />
      <Footer />
    </main>
  );
}
