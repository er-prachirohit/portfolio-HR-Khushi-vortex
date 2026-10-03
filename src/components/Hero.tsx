import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/lib/data";
import { RevealLines } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TaskStage } from "@/components/TaskStage";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden bg-gradient-to-b from-ink via-navy to-blue-deep px-6 pt-32 pb-32 md:px-12"
    >
            <motion.div style={{ y }} className="pointer-events-none absolute inset-0 z-0">
        {/* Radial fading dotted grid */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: "radial-gradient(circle at center, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 10%, transparent 70%)",
            maskImage: "radial-gradient(ellipse at center, black 10%, transparent 70%)"
          }}
        />
      </motion.div>

      <div className="relative mx-auto w-full max-w-rail z-10 flex flex-col items-center text-center">
        
        {/* Centered Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-10 inline-flex items-center gap-3 rounded-full border border-line bg-line px-5 py-2 text-sm text-white/80 backdrop-blur-md"
        >
          
          {profile.status}
        </motion.div>

        {/* Main Heading */}
        <h1 className="font-display text-[11vw] leading-[1.05] tracking-tight text-white md:text-[6.4vw] lg:text-[5.6rem]">
          <RevealLines
            delay={0.25}
            lines={["Turning complex projects", "into clear outcomes."]}
          />
        </h1>

        {/* Sub-paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8, ease: EASE }}
          className="mt-8 mx-auto max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed"
        >
          I'm {profile.name}, a {profile.roleLong.toLowerCase()}. I align people,
          strategy, and execution to deliver products that ship and results you can measure.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="#projects" variant="solid" className="bg-blue text-white hover:bg-blue-soft px-8">
            View my work
            <span aria-hidden="true" className="ml-2">&rarr;</span>
          </MagneticButton>
          <MagneticButton href="#contact" variant="outline" className="border-line text-white hover:bg-line hover:border-line px-8">
            Let's connect
          </MagneticButton>
        </motion.div>

        {/* Interactive Task Stage Component */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: EASE }}
          className="mt-24 w-full"
        >
          <TaskStage />
        </motion.div>

      </div>
    </section>
  );
}
