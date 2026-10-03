import { aboutParagraphs, profile } from "@/lib/data";
import { Reveal, RevealLines } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="relative px-6 py-28 md:px-12 bg-ink bg-gradient-to-b from-blue-deep to-ink from-0% to-[20%] overflow-hidden">
      {/* Abstract background shapes matching the TechFlux vibe */}
      <div className="absolute -left-20 top-20 w-96 h-96 bg-blue-deep/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-rail">
        <div className="grid gap-12 lg:gap-8 lg:grid-cols-[1fr_1.1fr] items-center">
          
          {/* Glassmorphic Card (Left Side) */}
          <Reveal>
            <div className="relative z-10 bg-surface-gradient backdrop-blur-xl border border-line p-10 md:p-12 lg:p-14 rounded-[2.5rem] shadow-2xl">
              <span className="text-sm font-mono tracking-widest text-muted uppercase mb-8 block">
                COORDINATE WITH KHUSHI
              </span>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-text mb-8">
                <RevealLines
                  lines={["Organizing", "the moving", "parts."]}
                />
              </h2>
              <p className="text-muted font-mono tracking-wide uppercase text-sm md:text-base max-w-sm mb-10 leading-relaxed">
                DELIVERING THE FINAL PRODUCT THROUGH STRUCTURED COMMUNICATION AND ALIGNMENT.
              </p>
              
              
            </div>
          </Reveal>

          {/* Image Area (Right Side) */}
          <div className="relative z-10 mt-10 lg:mt-0 flex justify-center lg:justify-end">
            <Reveal delay={0.15}>
              <div className="relative w-full max-w-md aspect-square md:aspect-[4/3] lg:aspect-[10/9.5] rounded-2xl overflow-hidden shadow-2xl border border-line rotate-1 hover:rotate-0 transition-transform duration-500">
                <img
                  src="/images/image.png"
                  alt={profile.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-transparent to-transparent mix-blend-overlay" />
              </div>
            </Reveal>
          </div>

        </div>

        {/* Text Paragraphs */}
        <div className="mt-20 flex justify-center relative z-10">
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted text-center max-w-4xl">
              {aboutParagraphs.join(" ")}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
