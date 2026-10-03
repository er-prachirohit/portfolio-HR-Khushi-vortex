

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative px-6 pt-12 pb-12 md:pt-16 md:pb-28 md:px-12">
      <div className="mx-auto max-w-rail">
        <Reveal>
          <div className="mb-16 flex items-end justify-between">
            <h2 className="font-display text-4xl text-text md:text-5xl">
              Experience
            </h2>
            <span className="hidden text-sm text-muted md:block">
              2025 — Present
            </span>
          </div>
        </Reveal>

        <div ref={ref} className="relative">
          {/* static rail */}
          <div className="absolute left-0 top-0 h-full w-px bg-line md:left-[2px]" />
          {/* progress rail */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-0 top-0 w-px bg-blue-soft md:left-[2px]"
          />

          <div className="space-y-[56px]">
            {experience.map((role, i) => (
              <Reveal key={role.company} delay={0.05 * i}>
                <div className="relative pl-8 md:pl-14">
                  <span
                    aria-hidden="true"
                    className="absolute left-[-5px] top-1.5 h-3 w-3 rounded-full border-2 border-paper bg-ink md:left-[-4px]"
                  />
                  <div className="grid gap-4 md:grid-cols-[240px_1fr]">
                    <div>
                      <p className="font-display text-xl text-text">
                        {role.position}
                      </p>
                      <p className="mt-1 text-sm text-muted">{role.company}</p>
                      <p className="mt-1 text-xs font-mono text-muted uppercase tracking-wider">
                        {role.duration}
                      </p>

                      {role.pills && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {role.pills.map((pill) => (
                            <span
                              key={pill}
                              className="inline-block rounded-full border border-line bg-line px-2.5 py-0.5 text-xs text-muted/80"
                            >
                              {pill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="max-w-[560px] text-base leading-relaxed text-muted">
                        {role.summary}
                      </p>
                      
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
