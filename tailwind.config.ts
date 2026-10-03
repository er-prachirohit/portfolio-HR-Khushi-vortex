import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html", "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        navy: "var(--navy)",
        "blue-deep": "var(--blue-deep)",
        "surface-top": "var(--surface-top)",
        "surface-bottom": "var(--surface-bottom)",
        line: "var(--line)",
        text: "var(--text)",
        muted: "var(--muted)",
        body: "var(--body)",
        blue: {
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          DEFAULT: "var(--blue)",
          soft: "var(--blue-soft)",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-inter)", "Helvetica", "Arial", "sans-serif"],
      },
      maxWidth: {
        rail: "1360px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      backgroundImage: {
        "grain": "url('/grain.png')",
        "contact-glow": "linear-gradient(180deg, var(--ink) 0%, var(--navy) 100%), radial-gradient(600px 360px at 85% 10%, rgba(59,130,246,.18), transparent 70%)",
        "surface-gradient": "linear-gradient(180deg, var(--surface-top) 0%, var(--surface-bottom) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
