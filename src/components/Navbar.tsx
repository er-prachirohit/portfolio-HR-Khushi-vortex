import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { nav, profile } from "@/lib/data";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = [
      document.querySelector("#home"),
      ...nav.map((item) => document.querySelector(item.href))
    ].filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuOpen && 
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 inset-x-0 z-50 flex justify-center px-4"
      >
        <div
          className={`flex w-full max-w-4xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500 ${
            scrolled
              ? "bg-ink/70 backdrop-blur-xl border border-line shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
              : "bg-transparent border border-transparent"
          }`}
        >
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="relative px-3 py-1.5 font-display text-[0.95rem] tracking-tight text-text transition-colors duration-300 ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue rounded-full"
          >
            {active === "#home" && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full bg-blue/15 border border-blue/30"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
            <span className="relative z-10">{profile.name}</span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => {
              const isActive = active === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="relative px-3.5 py-2 text-[0.85rem] text-muted hover:text-text transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue rounded-full"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-blue/15 border border-blue/30"
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? "text-blue font-medium" : ""}`}>
                    {item.label}
                  </span>
                </a>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <MagneticButton
              href="#contact"
              variant="solid"
              className="!px-5 !py-2 !text-[0.8rem]"
            >
              Let&rsquo;s Work Together
            </MagneticButton>
          </div>

          <button
            ref={buttonRef}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col gap-1.5 p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue rounded-full"
          >
            <span
              className={`block h-px w-5 bg-paper transition-transform duration-300 ${
                menuOpen ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-paper transition-transform duration-300 ${
                menuOpen ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="region"
            aria-label="Mobile Navigation"
            ref={menuRef}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 inset-x-4 z-50 rounded-2xl border border-line bg-ink/95 backdrop-blur-xl p-6 md:hidden shadow-2xl"
          >
            <nav className="flex flex-col">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`py-3 px-4 text-lg font-display text-text border-b border-line last:border-none transition-colors hover:text-blue hover:bg-white/5 focus-visible:outline-none focus-visible:bg-white/5 rounded-lg ${
                    active === item.href ? "text-blue font-medium" : ""
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-5">
              <MagneticButton href="#contact" variant="solid" className="w-full justify-center" onClick={() => setMenuOpen(false)}>
                Let&rsquo;s Work Together
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
