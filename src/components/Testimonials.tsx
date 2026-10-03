import { testimonials } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  // Take first 3 testimonials to match the 3-column design perfectly
  const displayTestimonials = testimonials.slice(0, 3);

  return (
    <section id="testimonials" className="relative px-6 py-32 md:px-12 bg-gradient-to-b from-[#1e40af] to-[#020617] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute left-12 bottom-12 w-32 h-32 bg-white/10 rounded-tr-[2rem] pointer-events-none blur-[2px]" />
      <div className="absolute -left-12 -bottom-12 w-64 h-64 border-[0.5px] border-line rounded-tr-[4rem] pointer-events-none opacity-30 mix-blend-overlay" />

      <div className="mx-auto max-w-rail relative z-10">
        <Reveal>
          <div className="mb-16">
            <h2 className="font-display text-4xl text-white md:text-5xl text-center">
              What People Say
            </h2>
          </div>
          <div className="grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-16">
            {displayTestimonials.map((t, i) => (
              <div key={i} className="flex flex-col justify-between h-full space-y-10 relative">
                {/* Quote Mark Decoration */}
                <div className="absolute -top-6 -left-4 text-6xl text-white/20 font-display leading-none pointer-events-none select-none">
                  "
                </div>
                
                <p className="text-white font-display italic text-xl md:text-2xl leading-relaxed opacity-90 relative z-10 pt-4">
                  "{t.quote}"
                </p>
                <div>
                  <p className="text-white font-medium uppercase tracking-widest text-xs block">
                    {t.person}, {t.role.split(' ')[0]}
                  </p>
                  <p className="text-blue-300 font-medium uppercase tracking-widest text-xs mt-1 block">
                    {t.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
