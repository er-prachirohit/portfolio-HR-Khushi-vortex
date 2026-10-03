

import { motion } from "framer-motion";
import { services } from "@/lib/data";
import { Reveal, RevealLines } from "@/components/ui/Reveal";

export function Services() {
  return (
    <section id="services" className="relative px-6 py-16 md:py-32 md:px-12 bg-ink">
      <div className="mx-auto max-w-rail">
        <Reveal>
          <div className="mb-20 text-center max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="font-display text-4xl text-text md:text-6xl leading-tight">
              <span className="font-light opacity-90 block mb-2">Digital projects don't have to be chaotic.</span>
              <span className="font-bold">I'm here to help.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, si) => (
            <Reveal key={service.title} delay={si * 0.08}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-[2rem] border border-line bg-gradient-to-b from-[#020617] via-[#1e40af] to-[#bae6fd] p-10 flex flex-col justify-start shadow-2xl overflow-hidden relative"
              >
                {/* Optional glow effect inside card */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                
                <h3 className="mb-6 font-display text-xl md:text-2xl font-bold uppercase tracking-wide text-white drop-shadow-sm">
                  {service.title}
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-white/90 drop-shadow-sm">
                  {service.description}
                </p>
                <div className="mt-auto pt-10">
                  <div className="h-1 w-12 bg-line rounded-full" />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
        
        <Reveal delay={0.4}>
          <div className="mt-24 text-center">
            <p className="mb-8 text-sm text-muted/80 max-w-2xl mx-auto">
              Whether you need a new website, want to organize an ongoing development project, or need someone to coordinate the moving parts — let's talk about what you're building.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-full bg-blue px-8 py-4 text-sm font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-shadow hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
            >
              let's Discuss Your Project <span aria-hidden="true">&rarr;</span>
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
