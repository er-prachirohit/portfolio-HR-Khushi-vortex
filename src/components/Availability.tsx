import { availability } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function Availability() {
  return (
    <section className="relative px-6 py-28 md:px-12">
      <div className="mx-auto max-w-rail">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <Reveal>
            <div className="flex items-center gap-3 text-sm text-muted">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue/60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
              </span>
              Currently available
            </div>
            <h2 className="mt-6 max-w-lg font-display text-3xl leading-tight text-text md:text-4xl">
              Currently helping teams turn ambitious ideas into shipped
              outcomes.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-3">
              {availability.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-line px-4 py-2.5 text-sm text-text/85"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
