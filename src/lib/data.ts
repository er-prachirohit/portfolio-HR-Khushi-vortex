// ---------------------------------------------------------------------------
// All portfolio content lives in this one file. Replace the bracketed
// placeholders with your real information — the layout will not break.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Khushi Sharma",
  role: "Tech Project Coordinator",
  roleLong: "Project & Product Delivery Leader",
  location: "Indore, Madhya Pradesh, India",
  email: "khushisharmap12@gmail.com",
  linkedin: "https://www.linkedin.com/in/khushi-sharma-5782ab24a",
  resumeUrl: "/ks_Resume.pdf",
  status: "Currently leading delivery at VortexCubes",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Workflow", href: "#approach" },
  { label: "Services", href: "#services" },
];

export const metrics = [
  { value: 2, suffix: "+", label: "Years of coordination" },
  { value: 10, suffix: "+", label: "Projects delivered" },
  { value: 5, suffix: "+", label: "Global Clients" },
  { value: 3, suffix: "+", label: "International projects" },
    { value: 100, suffix: "%", label: "On-time delivery rate" },
];

export const aboutParagraphs = [
  "I work at the intersection of technology, people and execution. I help organize digital projects, coordinate development tasks, track progress and keep communication clear from planning through delivery.",
  "Whether you're starting a website from scratch, improving an existing product, or coordinating a development team, I help bring structure to the process so the project keeps moving."
];

export type ExperienceItem = {
  company: string;
  position: string;
  duration: string;
  summary: string;
};

export const experience: ExperienceItem[] = [
  {
    company: "Vortex Cubes, Indore",
    position: "Tech Project Coordinator",
    duration: "SEP 2026 — PRESENT",
    summary:
      "Leading project delivery by coordinating team communication, schedules and task ownership across web and software initiatives.",
  },
  {
    company: "ThinkingBird Creation, Indore",
    position: "Project Coordinator",
    duration: "JAN 2026 — AUG 2026",
    summary:
      "Planned and tracked project timelines and task trackers, and coordinated creative, technical and stakeholder teams for on-schedule delivery.",
  },
  {
    company: "NemaTech Dynamics, Indore",
    position: "Project Coordinator",
    duration: "SEP 2025 — DEC 2025",
    summary:
      "Maintained project documentation and task-tracking sheets, flagged risks early and kept development and design teams in sync.",
  },
  {
    company: "Hotwax Systems, Indore",
    position: "Product Associate (Intern)",
    duration: "MAY 2025 — JUL 2025",
    summary:
      "Contributed to product workflows and testing coordination, and used SQL analysis to identify database anomalies and track potential issues.",
  },
];

export type CRMSlide = {
  title: string;
  image: string;
};

export type MarketingCompany = {
  name: string;
  handle: string;
  url: string;
  focus: string;
};

export type ProjectItem = {
  id: string;
  index: string;
  name: string;
  category: string;
  role: string;
  description: string;
  challenge: string;
  objective: string;
  approach: string;
  execution: string;
  result: string;
  tools: string[];
  duration: string;
  teamSize: string;
  metrics: { label: string; value: string }[];
  image?: string;
  url?: string;
  crmSlides?: CRMSlide[];
  marketingCompanies?: MarketingCompany[];
};

export const projects: ProjectItem[] = [
  {
    id: "premium-event-designer",
    index: "01",
    name: "Premium Event Designer — Funtook",
    category: "E-commerce Platform",
    role: "Project Coordinator",
    description:
      "A premium e-commerce platform designed to help customers discover and purchase curated event decorations and celebration supplies.",
    challenge:
      "The platform needed to present a large variety of event products in a visually engaging way while keeping product discovery, navigation, and checkout interactions simple and fast.",
    objective:
      "Coordinate a polished shopping experience that combines premium visual presentation with responsive performance across desktop and mobile devices.",
    approach:
      "Focused on clear communication between design and development, ensuring a component-driven frontend architecture with reusable product patterns met client requirements.",
    execution:
      "Coordinated the responsive implementation using React, Next.js, and Tailwind CSS, tracking tasks and resolving issues to optimize key pages for performance.",
    result:
      "Delivered a modern e-commerce experience with strong performance, responsive layouts, and a premium visual identity tailored to the event-decoration market.",
    tools: ["React", "Next.js", "Tailwind CSS", "Task Tracking"],
    duration: "3 months",
    teamSize: "Project team",
    metrics: [
      { label: "Performance", value: "98%" },
      { label: "Users", value: "12K+" },
      { label: "Growth", value: "+45%" },
    ],
    image: "/images/projects/funtook.png",
    url: "https://funtook.in/",
  },
  {
    id: "ethnic-fashion-portal",
    index: "02",
    name: "Ethnic Fashion Portal — Soch",
    category: "E-commerce / Marketplace",
    role: "Project Coordinator",
    description:
      "A high-scale fashion e-commerce experience built for discovering ethnic wear through dynamic collections, product filtering, and category-driven shopping.",
    challenge:
      "The platform had to handle a large product catalog while making it easy for customers to navigate categories, refine their choices, and discover relevant collections.",
    objective:
      "Coordinate the digital shopping experience improvements with a scalable storefront capable of supporting a large and continuously changing fashion catalog.",
    approach:
      "Managed development workflow around reusable commerce components, structured category navigation, advanced filtering patterns, and responsive layouts.",
    execution:
      "Coordinated with development teams working on Magento and PHP-based e-commerce architecture to track deliverables and testing of dynamic collections.",
    result:
      "Delivered a scalable fashion storefront experience designed to support a large user base while maintaining smooth product discovery and consistent performance.",
    tools: ["Magento", "PHP", "E-commerce Workflow"],
    duration: "4 months",
    teamSize: "E-commerce project team",
    metrics: [
      { label: "Performance", value: "94%" },
      { label: "Active users", value: "1.2M+" },
      { label: "Growth", value: "+12%" },
    ],
    image: "/images/projects/soch.png",
    url: "https://www.soch.com/in/",
  },
  {
    id: "creative-video-studio",
    index: "03",
    name: "Creative Video Studio — Le Lab",
    category: "Creative / Portfolio",
    role: "Project Coordinator",
    description:
      "An immersive digital portfolio for a creative video studio, built to showcase high-end visual production and digital storytelling through an engaging web experience.",
    challenge:
      "The website needed to communicate the quality of the studio's creative work without allowing heavy visual content to compromise usability or performance.",
    objective:
      "Coordinate an immersive portfolio experience where visual storytelling becomes the primary method of presenting the studio's work.",
    approach:
      "Facilitated a visual-first design approach with carefully structured layouts, motion, and transitions, keeping developers and stakeholders aligned.",
    execution:
      "Tracked the progress of the Nuxt.js and Vue implementation, organizing testing for interactive presentation patterns and smooth navigation.",
    result:
      "Delivered a visually immersive portfolio that positioned the studio's work at the center of the experience while maintaining a fast and responsive interface.",
    tools: ["Nuxt.js", "Vue", "Delivery Coordination"],
    duration: "2 months",
    teamSize: "Creative development team",
    metrics: [
      { label: "Performance", value: "99%" },
      { label: "Users", value: "2K+" },
      { label: "Recognition", value: "Award" },
    ],
    image: "/images/projects/lelab.png",
    url: "https://le-lab.io/",
  },
  {
    id: "ayurvedic-crm-web-app",
    index: "04",
    name: "Ayurvedic CRM Web App & Marketing",
    category: "CRM & Operations Platform",
    role: "Project Coordination Lead",
    description:
      "Coordinated a CRM workflow for an ayurvedic company from ordering to shipment, alongside managing AI-assisted social media content and Instagram marketing for growing brands.",
    challenge:
      "Manual order handling, uncoordinated inventory, and untracked shipments were causing operational bottlenecks and customer follow-up delays.",
    objective:
      "Coordinate the automation of the operational flow across customer orders, inventory coordination, shipment tracking, and daily follow-up notes.",
    approach:
      "Managed the requirements and progress for a custom CRM web application for an ayurvedic company, unifying order processing, logistics status, and customer records.",
    execution:
      "Tracked the CRM app workflow development, managed order-to-shipment tracking pipelines, and coordinated marketing deliverables for multiple brand clients.",
    result:
      "Streamlined customer order fulfillment, eliminated shipment tracking bottlenecks, and expanded social brand engagement through organized execution.",
    tools: ["CRM Requirements", "Order Tracking", "Workflow QA", "Social Media Coordination"],
    duration: "4 months",
    teamSize: "Operations & Tech Team",
    metrics: [
      { label: "Fulfillment Speed", value: "2x" },
      { label: "Order Accuracy", value: "99%" },
      { label: "Social Growth", value: "+45%" },
    ],
    image: "/images/crm/dashboard.jpeg",
    crmSlides: [
      { title: "Dashboard overview", image: "/images/crm/dashboard.jpeg" },
      { title: "Customer records", image: "/images/crm/customer-records.jpeg" },
      { title: "Order management", image: "/images/crm/order-dashboard.jpeg" },
      { title: "Shipment tracker", image: "/images/crm/shipment-tracker.jpeg" },
      { title: "Payments & invoices", image: "/images/crm/invoice-flow.jpeg" },
      { title: "Tasks & follow-ups", image: "/images/crm/follow-up-notes.jpeg" },
    ],
    marketingCompanies: [
      {
        name: "Namonakoda",
        handle: "@namonakoda",
        url: "https://www.instagram.com/namonakoda?igsi=YWllbmR5MG4ydGVl",
        focus: "Instagram page handling, AI-assisted creatives, and regular post planning.",
      },
      {
        name: "Future Landmark",
        handle: "@futurelandmarkk",
        url: "https://www.instagram.com/futurelandmarkk?igsi=MWN4cWpxZ3p0bTRiZw%3D%3D",
        focus: "Marketing support, social content ideas, and AI-backed post creation.",
      },
      {
        name: "Purasure India",
        handle: "@purasure_india",
        url: "https://www.instagram.com/purasure_india?igsi=MWV0OXYzbHc0ODBvbQ%3D%3D",
        focus: "Instagram management, brand post concepts, and visual content coordination.",
      },
    ],
  },
];

export const process = [
  {
    index: "01",
    title: "Vision & Alignment",
    description: "We start by understanding your core goals, target audience, and exactly what success looks like for your digital project.",
  },
  {
    index: "02",
    title: "Structuring the Chaos",
    description: "I break down your big ideas into actionable steps, creating clear timelines, technical milestones, and prioritized task lists.",
  },
  {
    index: "03",
    title: "Seamless Execution",
    description: "I act as the bridge between you and the development team, ensuring everyone is unblocked, aligned, and hitting their deadlines.",
  },
  {
    index: "04",
    title: "Quality & Testing",
    description: "Before anything goes live, we review progress and rigorously test the output to make sure it meets your highest standards.",
  },
  {
    index: "05",
    title: "Launch & Handover",
    description: "Your project goes live smoothly. I ensure a clean handover with all the documentation and support needed for the next phase.",
  },
];

export const services = [
  {
    index: "01",
    title: "Web & App Development Ops",
    description: "End-to-end coordination for web and mobile apps. I keep developers on track, manage sprints, and ensure clean, timely code delivery.",
  },
  {
    index: "02",
    title: "UI/UX Design Coordination",
    description: "Bridging the gap between creative and technical. I manage design handoffs from Figma to front-end, ensuring pixel-perfect implementation.",
  },
  {
    index: "03",
    title: "AI & Tech Integration",
    description: "Overseeing the implementation of modern tech, including AI models and custom APIs, translating complex tech requirements into clear tasks.",
  },
  {
    index: "04",
    title: "E-commerce & CMS Setup",
    description: "Streamlining Shopify, WordPress, and custom CMS projects. I organize catalogs, manage plugins, and coordinate digital storefront launches.",
  },
  {
    index: "05",
    title: "Requirement Scoping",
    description: "Turning your rough ideas and business goals into clear, developer-ready technical tickets, architecture plans, and sprint milestones.",
  },
  {
    index: "06",
    title: "QA & Launch Strategy",
    description: "Rigorous pre-launch testing coordination. I manage bug tracking, user acceptance testing (UAT), and ensure a flawless product handover.",
  }
];



export const technicalSkills = [
  "Python",
  "Flutter & Dart",
  "Machine Learning",
  "Database Management",
  "Front-End Development",
  "Agile & Scrum Methodologies",
  "Sprint Planning & Execution",
  "Jira, Trello, Notion, Asana",
  "Cross-functional Coordination",
  "Figma to Code Handoffs",
  "Quality Assurance (QA) & UAT"
];

export const softSkillsCards = [
  {
    title: "Leadership & Coordination",
    description: "Aligning cross-functional teams and keeping developers, designers, and stakeholders on the exact same page."
  },
  {
    title: "Problem Solving & Adaptability",
    description: "Identifying blockers early and pivoting project strategies quickly without losing development momentum."
  },
  {
    title: "Communication & Clarity",
    description: "Translating complex client ideas and technical requirements into actionable, easy-to-understand tasks."
  },
  {
    title: "Time Management & Execution",
    description: "Rigidly tracking parallel deadlines, managing scope creep, and ensuring consistent on-time delivery."
  }
];



export const testimonials = [
  {
    quote:
      "Working with Khushi brought structure to a project that initially had more questions than answers. Every handoff had an owner, and I always knew where things stood.",
    person: "Mahak Sarla",
    role: "Engineering Lead",
    company: "VortexCubes",
  },
  {
    quote:
      "They're the person who tells you the deadline is at risk two weeks before it matters, not two days. That kind of early honesty saved us more than once.",
    person: "Rohit sharma",
    role: "Product Director",
    company: "HotWax Systems",
  },
  {
    quote:
      "What stood out was how little drama there was. Priorities shifted constantly and the plan just adapted instead of falling apart.",
    person: "Riya Mahra",
    role: "Design Lead",
    company: "NemaTech Dynamics",
  },
  {
    quote:
      "Khushi is the rare coordinator who can sit in a room with clients and a room with engineers and be equally credible in both.",
    person: "Sakshi",
    role: "Python Developer",
    company: "VortexCubes",
  },
];

export const availability = [
  "Web & App Ops",
  "Figma / UI Design Handoffs",
  "Jira / Trello / Notion",
  "AI & SaaS Projects",
  "E-commerce Coordination",
];
