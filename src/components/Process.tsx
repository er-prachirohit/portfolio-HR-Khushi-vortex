import { motion } from "framer-motion";
import { process as processSteps } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  return (
    <section id="approach" className="relative px-6 py-16 md:py-28 md:px-12 bg-ink">
      <div className="mx-auto max-w-rail">
        <Reveal>
          <div className="mb-20 md:text-center max-w-2xl md:mx-auto">
            <span className="text-sm font-mono tracking-widest text-blue uppercase">
              The Blueprint
            </span>
            <h2 className="mt-4 font-display text-4xl text-text md:text-5xl">
              How We Collaborate
            </h2>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              A clear approach keeps projects moving, communication simple, and expectations aligned from the first conversation to final delivery.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-12 md:gap-16">
          {processSteps.map((step, si) => (
            <Reveal key={step.title} delay={si * 0.1}>
              <div className="group relative grid gap-6 md:grid-cols-[auto_1fr] md:gap-12 md:items-start">
                
                {/* Number Indicator */}
                <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-line border border-line shrink-0 text-white font-mono text-xl shadow-lg transition-colors group-hover:bg-[#3B82F6] group-hover:border-[#3B82F6]">
                  {step.index}
                </div>

                {/* Content */}
                <div className="md:pt-3">
                  <h3 className="mb-4 font-display text-2xl text-white md:text-3xl font-bold tracking-wide">
                    {step.title}
                  </h3>
                  <p className="max-w-3xl text-base md:text-lg leading-relaxed text-white/70">
                    {step.description}
                  </p>
                </div>
                
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
