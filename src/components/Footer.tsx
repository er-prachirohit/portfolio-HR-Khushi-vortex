

import { motion } from "framer-motion";
import { nav, profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative border-t border-line px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-rail flex-col items-center gap-6 md:flex-row md:justify-between">
        <div className="text-sm text-muted">
          <span className="text-text">{profile.name}</span> — {profile.role}
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-text transition-colors">
              {item.label}
            </a>
          ))}
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-text transition-colors">
            LinkedIn
          </a>
          <a href={profile.resumeUrl} target="_blank" rel="noreferrer" download="Khushi_Sharma_Resume.pdf" className="hover:text-text transition-colors">
            Resume
          </a>
        </nav>

        <div className="flex items-center gap-6 text-sm text-muted">
          <span>&copy; {new Date().getFullYear()}</span>
          <motion.a
            href="#home"
            whileHover={{ y: -2 }}
            className="flex items-center gap-2 hover:text-text transition-colors"
          >
            Back to top <span aria-hidden="true">&uarr;</span>
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
