import { technicalSkills, softSkillsCards } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function Skills() {
  return (
    <section id="skills" className="relative px-6 pt-24 pb-8 md:px-12 bg-ink border-t border-line">
      <div className="mx-auto max-w-rail flex flex-col gap-20">
        
        {/* Technical Expertise - Pill Style */}
        <div>
          <Reveal>
            <div className="mb-10 text-center md:text-left">
              <h2 className="font-display text-4xl text-text md:text-5xl">
                Technical Skills
              </h2>
            </div>
          </Reveal>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {technicalSkills.map((skill, index) => (
              <Reveal key={skill} delay={index * 0.05}>
                <div className="px-5 py-2.5 rounded-full border border-line bg-surface-gradient backdrop-blur-sm text-muted font-medium text-[0.85rem] hover:text-text hover:border-blue transition-colors cursor-default shadow-lg">
                  {skill}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Core Expertise - Card Style */}
        <div>
          <Reveal>
            <div className="mb-10 text-center md:text-left">
              <h2 className="font-display text-4xl text-text md:text-5xl">
                Soft Skills
              </h2>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {softSkillsCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.1}>
                <div className="h-full p-8 rounded-2xl border border-line bg-gradient-to-b from-ink via-blue-900 to-blue-500 hover:-translate-y-1.5 hover:to-blue-400 transition-all duration-500 group shadow-xl flex flex-col">
                  <h3 className="text-white font-display text-xl mb-4 leading-tight drop-shadow-sm">
                    {card.title}
                  </h3>
                  <p className="text-white/90 text-[0.95rem] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
