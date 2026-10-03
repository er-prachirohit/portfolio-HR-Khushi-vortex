

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

import { ProjectItem } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CaseStudy({
  project,
  onClose,
}: {
  project: ProjectItem | null;
  onClose: () => void;
}) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const closeImage = useCallback(() => {
    setActiveImageIndex(null);
  }, []);

  const nextImage = useCallback(() => {
    if (!project?.crmSlides) return;
    setActiveImageIndex((prev) =>
      prev !== null ? (prev + 1) % project.crmSlides!.length : 0
    );
  }, [project]);

  const prevImage = useCallback(() => {
    if (!project?.crmSlides) return;
    setActiveImageIndex((prev) =>
      prev !== null
        ? (prev - 1 + project.crmSlides!.length) % project.crmSlides!.length
        : 0
    );
  }, [project]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (activeImageIndex !== null) {
        if (e.key === "Escape") closeImage();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
      } else {
        if (e.key === "Escape") onClose();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeImageIndex, closeImage, nextImage, prevImage, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] bg-ink/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.55, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-0 bottom-0 top-6 overflow-y-auto rounded-t-3xl border-t border-line bg-ink px-6 pb-16 pt-10 md:inset-x-10 md:top-14 md:px-16"
          >
            <div className="mx-auto max-w-4xl">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="text-sm text-muted">
                    {project.index} — {project.category}
                  </span>
                  <h3 className="mt-3 font-display text-3xl text-text md:text-5xl">
                    {project.name}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-blue/40 bg-blue/10 px-5 py-2.5 text-sm font-medium text-blue transition-all duration-300 hover:border-blue hover:bg-blue hover:text-ink shadow-[0_0_12px_rgba(59,130,246,0.2)]"
                    >
                      Visit Live Site
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  )}

                  <button
                    onClick={onClose}
                    aria-label="Close case study"
                    className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-line text-text transition-colors hover:border-line"
                  >
                    &times;
                  </button>
                </div>
              </div>

              {/* Horizontal CRM Slides Gallery (Auto-scrolling) */}
              {project.crmSlides && project.crmSlides.length > 0 ? (
                <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-navy p-4 shadow-xl">
                  <div className="mb-3 flex items-center justify-between px-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-muted">
                      CRM Web App Previews (Auto-scrolling • Hover to pause • Click to enlarge)
                    </span>
                    <span className="text-xs font-mono text-blue">
                      {project.crmSlides.length} Screens →
                    </span>
                  </div>

                  <div className="relative overflow-hidden py-1">
                    <div className="crm-track-scroll">
                      {[...project.crmSlides, ...project.crmSlides].map(
                        (slide, index) => {
                          const realIndex = index % project.crmSlides!.length;
                          return (
                            <div
                              key={`${slide.title}-${index}`}
                              onClick={() => setActiveImageIndex(realIndex)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setActiveImageIndex(realIndex);
                                }
                              }}
                              role="button"
                              tabIndex={0}
                              aria-label={`Open ${slide.title} preview`}
                              className="group relative flex-none w-72 md:w-80 overflow-hidden rounded-xl border border-line bg-ink shadow-lg transition-all duration-300 hover:border-blue/60 hover:shadow-2xl cursor-pointer"
                            >
                              <div className="relative aspect-[16/10] w-full overflow-hidden">
                                <img
                                  src={slide.image}
                                  alt={slide.title}
                                  style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
                                  
                                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue/50 bg-ink/90 px-3 py-1.5 text-xs font-medium text-blue shadow-lg">
                                    <svg
                                      width="14"
                                      height="14"
                                      viewBox="0 0 24 24"
                                      style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
                                      stroke="currentColor"
                                      strokeWidth="2.2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <polyline points="15 3 21 3 21 9" />
                                      <polyline points="9 21 3 21 3 15" />
                                      <line x1="21" y1="3" x2="14" y2="10" />
                                      <line x1="3" y1="21" x2="10" y2="14" />
                                    </svg>
                                    Preview
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between border-t border-line bg-navy p-3">
                                <p className="text-xs font-medium text-text">
                                  {slide.title}
                                </p>
                                <span className="text-xs text-muted group-hover:text-blue transition-colors">
                                  &rarr;
                                </span>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Standard Project Image Preview */
                project.image && (
                  <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-line bg-navy shadow-2xl">
                    <img
                      src={project.image}
                      alt={project.name}
                      style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
                      
                      className="object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                      priority
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                  </div>
                )
              )}

              {/* Metadata Grid */}
              <div className="mt-8 grid grid-cols-2 gap-6 border-y border-line py-6 md:grid-cols-4">
                <div>
                  <p className="text-xs text-muted">Role</p>
                  <p className="mt-1 text-sm text-text">{project.role}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">Duration</p>
                  <p className="mt-1 text-sm text-text">{project.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">Team</p>
                  <p className="mt-1 text-sm text-text">{project.teamSize}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">Tools</p>
                  <p className="mt-1 text-sm text-text">
                    {project.tools.join(", ")}
                  </p>
                </div>
              </div>

              {/* Challenge / Objective / Approach / Execution */}
              <div className="mt-12 grid gap-10 md:grid-cols-2">
                <Block title="Challenge" text={project.challenge} />
                <Block title="Objective" text={project.objective} />
                <Block title="Approach" text={project.approach} />
                <Block title="Execution" text={project.execution} />
              </div>

              {/* Result */}
              <div className="mt-14">
                <p className="text-sm text-muted">Result</p>
                <p className="mt-3 max-w-2xl text-xl leading-relaxed text-text md:text-2xl">
                  {project.result}
                </p>
              </div>

              {/* Metrics */}
              <div className="mt-12 grid grid-cols-3 gap-6 rounded-2xl border border-line bg-navy p-6">
                {project.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="font-display text-2xl text-text md:text-3xl">
                      {m.value}
                    </p>
                    <p className="mt-1 text-xs text-muted">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Marketing Clients (if present in CRM project) */}
              {project.marketingCompanies && (
                <div className="mt-14 border-t border-line pt-10">
                  <div className="mb-6">
                    <span className="text-xs font-mono uppercase tracking-wider text-blue">
                      Marketing & Social Media
                    </span>
                    <h4 className="mt-1 font-display text-2xl text-text">
                      Instagram pages handled with AI-assisted post creation
                    </h4>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {project.marketingCompanies.map((company) => (
                      <a
                        key={company.handle}
                        href={company.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-xl border border-line bg-navy p-5 transition-all duration-300 hover:border-blue/40 hover:bg-line"
                      >
                        <span className="text-xs font-mono text-blue">
                          {company.handle}
                        </span>
                        <h5 className="mt-1 font-display text-lg text-text group-hover:text-blue transition-colors">
                          {company.name}
                        </h5>
                        <p className="mt-2 text-xs leading-relaxed text-muted">
                          {company.focus}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Fullscreen Image Lightbox Modal for CRM Slides */}
      {project?.crmSlides && activeImageIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md"
          onClick={closeImage}
        >
          <div
            className="relative flex w-full max-w-5xl flex-col rounded-2xl border border-line bg-ink p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-blue">
                  Ayurvedic CRM System
                </span>
                <h4 className="font-display text-xl text-text">
                  {project.crmSlides[activeImageIndex].title}
                </h4>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-muted">
                  {activeImageIndex + 1} / {project.crmSlides.length}
                </span>
                <button
                  onClick={closeImage}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-text hover:bg-line"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Image & Nav Arrows */}
            <div className="relative flex min-h-[300px] max-h-[70vh] items-center justify-center overflow-hidden rounded-xl border border-line bg-ink">
              <button
                onClick={prevImage}
                className="absolute left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ink/80 text-text transition-all hover:border-blue hover:text-blue"
                aria-label="Previous image"
              >
                &larr;
              </button>

              <div className="relative aspect-[16/10] w-full max-h-[68vh]">
                <img
                  src={project.crmSlides[activeImageIndex].image}
                  alt={project.crmSlides[activeImageIndex].title}
                  style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
                  
                  className="object-contain"
                />
              </div>

              <button
                onClick={nextImage}
                className="absolute right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ink/80 text-text transition-all hover:border-blue hover:text-blue"
                aria-label="Next image"
              >
                &rarr;
              </button>
            </div>

            {/* Indicator Dots */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {project.crmSlides.map((s, idx) => (
                  <button
                    key={s.title}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === activeImageIndex
                        ? "w-6 bg-blue"
                        : "w-2 bg-line hover:bg-line"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted">
                ESC to close &bull; &larr; / &rarr; to navigate
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Block({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <p className="text-sm text-muted">{title}</p>
      <p className="mt-2 leading-relaxed text-text/90">{text}</p>
    </div>
  );
}


