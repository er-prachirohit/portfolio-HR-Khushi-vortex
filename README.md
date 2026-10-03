# Project Manager Portfolio

A single-page, heavily-animated portfolio built with Next.js (App Router),
TypeScript, Tailwind CSS, and Framer Motion.

No dependencies are installed in this folder — install them yourself after
unzipping.

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Editing content

Every piece of copy — your name, role, experience, projects, testimonials,
skills, contact details — lives in one file:

```
lib/data.ts
```

Replace anything in `[brackets]` with your real information. The layout is
built to hold longer or shorter content gracefully, so you don't need to
touch component files just to update copy.

To add a real portrait photo, drop an image in `public/` and swap the
placeholder block in `components/About.tsx` for a normal `<Image />` or
`<img />` tag pointing at it.

To add a resume PDF, place it at `public/resume.pdf` — the "Download resume"
link in the contact section already points there.

## Structure

```
app/
  layout.tsx      → fonts (Fraunces + Inter via next/font, no extra downloads), metadata
  page.tsx         → assembles all sections
  globals.css      → design tokens, grain overlay, reduced-motion handling
components/
  Navbar, Hero, ImpactMetrics, About, Experience, Projects,
  CaseStudy, Process, Skills, Testimonials, Availability,
  Contact, Footer
  ui/
    Reveal.tsx           → shared scroll-reveal + text mask-reveal primitives
    Counter.tsx           → animated number counter
    MagneticButton.tsx     → cursor-follow CTA button
lib/
  data.ts          → all editable content
```

## Design notes

- Palette, type pairing (Fraunces display / Inter body), and the vertical
  "rail" timeline motif were chosen deliberately for a Project Manager's
  world (planning, sequencing, milestones) rather than a generic template
  default — see the inline comments in `tailwind.config.ts` and `data.ts`.
- Motion is intentionally restrained: one bold reveal moment in the hero,
  quiet whileInView reveals elsewhere, and hover/interaction motion (magnetic
  buttons, project row hovers, skill chips) rather than animation on every
  element.
- `prefers-reduced-motion` is respected globally in `globals.css`.
- The reference site (ui.watermelon.sh/template/landing-01) is a JS-rendered
  gallery page; static fetching only returned its docs shell, not the live
  rendered template pixels, so this build targets the *brief's* description
  of that visual language (large type, floating nav, scroll-linked reveals,
  case-study project rows) rather than a literal pixel clone. Once you can
  view the template in a browser, tell me anything you want brought closer
  to it — spacing, exact type scale, a specific transition — and I can tune
  the tokens.

## Performance / accessibility

- All non-essential motion respects `prefers-reduced-motion`.
- Keyboard focus states are visible on links and buttons.
- Fonts load via `next/font`, self-hosted at build time (no external font
  requests at runtime).
