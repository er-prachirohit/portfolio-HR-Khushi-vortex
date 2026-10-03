import { metrics } from "@/lib/data";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

export function ImpactMetrics() {
  return (
    <section className="relative px-6 py-24 md:px-12 bg-ink overflow-hidden border-y border-line">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[200px] bg-blue-500/10 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-rail relative z-10">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5 md:gap-6">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08} className="h-full">
              <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-surface-gradient backdrop-blur-md border border-line shadow-xl hover:-translate-y-2 hover:brightness-110 transition-all duration-300 h-full">
                <div className="font-display text-5xl md:text-6xl text-blue font-bold mb-4">
                  <Counter value={m.value} suffix={m.suffix} />
                </div>
                <p className="text-sm md:text-[0.9rem] text-muted uppercase tracking-widest text-center font-mono leading-relaxed">
                  {m.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
