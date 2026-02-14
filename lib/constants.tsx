import React from "react";
import { Layout, Boxes, Code2, Rocket } from "lucide-react";

export const NAV_LINKS = [
  { name: "ABOUT", href: "#about" },
  { name: "PROJECTS", href: "#projects" },
  { name: "SKILLS", href: "#skills" },
  { name: "CONTACT", href: "#contact" },
];

export const HERO_DYNAMIC_WORDS = [
  "INTERFACES",
  "EXPERIENCES",
  "LANDING PAGES",
  "PRODUCTS",
  "PLATFORMS",
];

export const HERO_DYNAMIC_TARGETS = [
  "STARTUPS",
  "FOUNDERS",
  "REAL USERS",
  "THE FUTURE",
  "GROWTH",
];

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  link: string;
  github: string;
  image?: string;
  video?: string;
  color: string;
  features: string[];
  challenges: string[];
  outcome: string;
}

export const FRONTEND_SKILLS = [
  {
    name: "React",
    src: "https://cdn.iconscout.com/icon/free/png-256/free-react-icon-svg-download-png-282599.png?f=webp",
  },
  {
    name: "Next.js",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Tailwind",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo4NWd7U9WhJy93utoP7li8o8-1WBTHA1mng&s",
  },
  {
    name: "TypeScript",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Framer Motion",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg",
  },
  { name: "Shadcn", src: "https://ui.shadcn.com/apple-touch-icon.png" },
];

export const BACKEND_SKILLS = [
  {
    name: "Node.js",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Prisma",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
  },
  {
    name: "PostgreSQL",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Clerk",
    src: "https://images.clerk.com/static/logo-light-mode-400x400.png",
  },
  {
    name: "Stripe",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8cCaflWSiLqi_CrHWi8PEj7cMlFyoo3LlKg&s",
  },
  {
    name: "GHL",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlP5-DzGZ8az0bYqDgUDe44U3OdzIw75iJjA&s",
  },
];

export const AI_SKILLS = [
  {
    name: "OpenAI",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSobT6Nq7W-FJnK5lLapZlwySLwB0W4sKCYDg&s",
  },
  {
    name: "Gemini",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Google_Gemini_icon_2025.svg/500px-Google_Gemini_icon_2025.svg.png",
  },
  {
    name: "Dexie.js",
    src: "https://dexie.org/assets/images/dexie-logo-icon.svg",
  },
  {
    name: "Vercel",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
  },
];

export const ALL_SKILLS = [
  {
    skillName: "REACT 18+",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    skillName: "NEXT.JS",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    skillName: "TYPESCRIPT",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    skillName: "TAILWIND 4",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    skillName: "FRAMER MOTION",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg",
  },
  {
    skillName: "NODE.JS",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    skillName: "PRISMA",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
  },
  {
    skillName: "POSTGRESQL",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    skillName: "DEXIE.JS",
    imgSrc: "https://dexie.org/assets/images/dexie-logo-icon.svg",
  },
  {
    skillName: "VERCEL",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
  },
  {
    skillName: "OPENAI",
    imgSrc: "https://www.vectorlogo.zone/logos/openai/openai-icon.svg",
  },
  {
    skillName: "GEMINI",
    imgSrc:
      "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.svg",
  },
  {
    skillName: "GIT",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
];

export const PROJECTS: Project[] = [
  {
    slug: "lexical-maxxing",
    title: "LEXICAL MAXXING",
    description:
      "LOCAL-FIRST VOCAB MASTERY APP WITH CUSTOM TERMINAL INTERFACE, DUAL AI AGENTS, OFFLINE STORAGE (DEXIE.JS), AND SPACED REPETITION FOR POWER USERS.",
    longDescription:
      "LEXICAL MAXXING IS A PREMIUM VOCABULARY MASTERY APPLICATION DESIGNED FOR POWER USERS WHO WANT TOTAL CONTROL OVER THEIR LEARNING. IT FEATURES A CUSTOM TERMINAL INTERFACE (LEX-SH) WITH FILESYSTEM-LIKE COMMANDS, DUAL AI AGENTS (ARCHITECT MODE FOR STRUCTURE BUILDING + SCHOLAR MODE FOR EXPLANATIONS), AND AN OFFLINE-FIRST ARCHITECTURE USING DEXIE.JS WITH OPTIONAL SUPABASE SYNC AND CONFLICT RESOLUTION.",
    tags: ["REACT", "TYPESCRIPT", "DEXIE.JS", "AI AGENTS"],
    link: "https://lexical-maxxing.vercel.app",
    github: "https://github.com/Acinnamon9/lexical-maxxing",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    color: "bg-brand-primary",
    features: [
      "CUSTOM SHELL (LEX-SH) WITH FILESYSTEM COMMANDS (MKDIR, LS, CD, ETC.)",
      "DUAL AI AGENT: ARCHITECT MODE + SCHOLAR MODE",
      "OFFLINE-FIRST STORAGE WITH DEXIE.JS AND OPTIONAL SUPABASE SYNC",
      "ADAPTIVE MASTERY TRACKING (0–5 SCALE) WITH REVIEW SCHEDULING",
      "CONFLICT HANDLING FOR MULTI-DEVICE SYNC",
    ],
    challenges: [
      "BUILDING A CONVINCING TERMINAL EXPERIENCE INSIDE A WEB BROWSER",
      "DESIGNING OFFLINE-FIRST DATA FLOW WITH EVENTUAL CONSISTENCY",
      "INTEGRATING TWO DISTINCT AI MODES WITHOUT OVERWHELMING THE USER",
    ],
    outcome:
      "A UNIQUE, FULLY FUNCTIONAL LEARNING TOOL THAT BLENDS CLI POWER WITH MODERN WEB CAPABILITIES. DEMONSTRATES DEEP UNDERSTANDING OF STATE MANAGEMENT, AI INTEGRATION, AND OFFLINE-FIRST ARCHITECTURE.",
  },
  {
    slug: "empire-revenue-engine",
    title: "EMPIRE // REVENUE ENGINE",
    description:
      "INTERACTIVE REVENUE MODELING PLATFORM FOR FOUNDERS. DYNAMIC STACK BUILDER WITH REAL-TIME CALCULATIONS, 70+ REUSABLE COMPONENTS, AND FRAMER MOTION TRANSITIONS.",
    longDescription:
      "EMPIRE REVENUE ENGINE IS A HIGH-END INTERACTIVE PLATFORM THAT HELPS FOUNDERS BUILD AND SIMULATE BUSINESS GROWTH STACKS. IT FEATURES A DYNAMIC 'STACK BUILDER' WITH REAL-TIME FINANCIAL CALCULATIONS, OVER 70 REUSABLE COMPONENTS BUILT WITH TAILWIND CSS 4, AND A GLOBAL STATE SYSTEM POWERED BY CONTEXT API. THE ENTIRE APPLICATION FEELS LIKE A NATIVE SPA THANKS TO A CUSTOM NAVIGATION ENGINE AND THEME SYSTEM.",
    tags: ["NEXT.JS", "TAILWIND 4", "CONTEXT API", "FRAMER MOTION"],
    link: "#",
    github: "#",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    color: "bg-accent",
    features: [
      "DYNAMIC STACK BUILDER WITH REAL-TIME REVENUE CALCULATIONS",
      "70+ REUSABLE UI COMPONENTS IN TAILWIND CSS 4",
      "GLOBAL STATE MANAGEMENT VIA CONTEXT API",
      "CUSTOM NAVIGATION ENGINE FOR SPA-LIKE FEEL",
      "FRAMER MOTION TRANSITIONS THROUGHOUT",
      "VERCEL INSIGHTS + OPTIMIZED ASSET DELIVERY",
    ],
    challenges: [
      "MANAGING COMPLEX INTERDEPENDENT CALCULATIONS IN REAL-TIME",
      "SCALING A COMPONENT LIBRARY TO 70+ PIECES WITHOUT BLOAT",
      "BUILDING A NAVIGATION SYSTEM THAT FEELS NATIVE WITHOUT A ROUTER",
    ],
    outcome:
      "A PRODUCT-MINDED PLATFORM WHERE COMPLEX BUSINESS LOGIC MEETS POLISHED UX. DEMONSTRATES ABILITY TO BUILD LARGE-SCALE APPLICATIONS WITH CLEAN ARCHITECTURE AND ATTENTION TO PERFORMANCE.",
  },
  {
    slug: "coffeemium",
    title: "COFFEEMIUM // STORE",
    description:
      "END-TO-END E-COMMERCE PLATFORM WITH RESPONSIVE PRODUCT GRIDS, CLIENT-SIDE FILTERING, PERSISTENT CART STATE, AND PRISMA/POSTGRESQL BACKEND.",
    longDescription:
      "COFFEEMIUM IS A COMPLETE ONLINE COFFEE STORE BUILT FROM SCRATCH WITH NEXT.JS 16, PRISMA, AND TAILWIND CSS 4. IT FEATURES A RESPONSIVE PRODUCT CATALOG WITH CLIENT-SIDE FILTERING AND SEARCH, A PERSISTENT SHOPPING CART, AND A CLEAN CHECKOUT FLOW. THE BACKEND USES PRISMA WITH POSTGRESQL FOR RELIABLE DATA PERSISTENCE AND DYNAMIC ROUTING FOR INDIVIDUAL PRODUCT PAGES.",
    tags: ["NEXT.JS 16", "PRISMA", "TAILWIND 4"],
    link: "https://github.com/Acinnamon9/Coffeemium",
    github: "https://github.com/Acinnamon9/Coffeemium",
    video: "/Coffeemium.mp4",
    color: "bg-brand-secondary",
    features: [
      "RESPONSIVE PRODUCT GRIDS WITH CLIENT-SIDE FILTERING",
      "PERSISTENT CART STATE ACROSS SESSIONS",
      "PRISMA/POSTGRESQL BACKEND FOR DATA PERSISTENCE",
      "DYNAMIC ROUTING FOR INDIVIDUAL PRODUCT PAGES",
      "CLEAN, INTUITIVE SHOPPING FLOW",
    ],
    challenges: [
      "DESIGNING A CART SYSTEM THAT PERSISTS ACROSS PAGE RELOADS",
      "BUILDING RESPONSIVE PRODUCT GRIDS THAT WORK ON ALL DEVICES",
      "INTEGRATING PRISMA WITH NEXT.JS APP ROUTER PATTERNS",
    ],
    outcome:
      "A CLASSIC END-TO-END E-COMMERCE BUILD THAT DEMONSTRATES FULL-STACK CAPABILITY FROM DATABASE DESIGN TO FRONTEND POLISH. BUILT ENTIRELY FROM SCRATCH WITHOUT TEMPLATES.",
  },
  {
    slug: "portfolio-v2",
    title: "PORTFOLIO // V2",
    description:
      "NEO-BRUTALIST PORTFOLIO WITH INFINITE CAROUSELS, MOUSE-TRACKING GRADIENTS, DYNAMIC NAVBAR MEASUREMENT, AND FRAMER MOTION ANIMATIONS.",
    longDescription:
      "THIS PORTFOLIO IS THE SECOND ITERATION OF MY PERSONAL SITE, REBUILT FROM THE GROUND UP WITH A NEO-BRUTALIST DESIGN SYSTEM. IT FEATURES INFINITE MARQUEE CAROUSELS, MOUSE-TRACKING CSS GRADIENT EFFECTS ON THE HERO TITLE, DYNAMIC NAVBAR HEIGHT MEASUREMENT VIA RESIZEOBSERVER, AND A FULLY MODULAR COMPONENT ARCHITECTURE. EVERY COMPONENT IS PURPOSE-BUILT FOR PERFORMANCE AND REUSABILITY.",
    tags: ["NEXT.JS", "TYPESCRIPT", "TAILWIND 4", "FRAMER MOTION"],
    link: "#",
    github: "https://github.com/Acinnamon9/Portfolio",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    color: "bg-brand-primary",
    features: [
      "NEO-BRUTALIST DESIGN SYSTEM WITH CUSTOM CSS VARIABLES",
      "INFINITE MARQUEE CAROUSELS WITH PAUSE-ON-HOVER",
      "MOUSE-TRACKING CSS GRADIENT EFFECTS (ZERO RE-RENDERS)",
      "DYNAMIC NAVBAR HEIGHT MEASUREMENT VIA RESIZEOBSERVER",
      "EXPANDABLE PROJECT SECTION WITH CASE STUDY PAGES",
    ],
    challenges: [
      "ACHIEVING 60FPS MOUSE-TRACKING WITHOUT REACT RE-RENDERS",
      "BUILDING REUSABLE BRUTALIST COMPONENTS THAT SCALE",
      "PREVENTING HERO CONTENT OVERLAP WITH A DYNAMIC NAVBAR",
    ],
    outcome:
      "A PORTFOLIO THAT DOUBLES AS A ENGINEERING SHOWCASE — EVERY INTERACTION IS INTENTIONAL, EVERY COMPONENT IS MODULAR, AND THE CODEBASE IS AS CLEAN AS THE DESIGN.",
  },
  {
    slug: "company-landing-page",
    title: "COMPANY // LANDING PAGE",
    description:
      "CUSTOMIZED BUSINESS ACCELERATION SITE EXTENDING THE EMPIRE PLATFORM WITH EXPANDED SERVICES, INTERACTIVE PREVIEWS, AND CONVERSION-FOCUSED LAYOUTS.",
    longDescription:
      "A TAILORED LANDING PAGE FOR A CLIENT, BUILT AS A CUSTOMIZED SHELL OVER THE EMPIRE REVENUE ENGINE PLATFORM. IT EXTENDS THE CORE PRODUCT WITH BROADER SERVICE PROMISES, EXPANDED SECTIONS, AND CONVERSION-FOCUSED LAYOUTS. THE PAGE FEATURES INTERACTIVE CONTENT PREVIEWS AND DYNAMIC PERSONALIZATION FOR DIFFERENT USER JOURNEYS.",
    tags: ["NEXT.JS", "TAILWIND 4", "FRAMER MOTION"],
    link: "#",
    github: "#",
    image:
      "https://images.unsplash.com/photo-1522542550221-31fd8043a146?w=800&q=80",
    color: "bg-accent",
    features: [
      "EXPANDED SERVICE SECTIONS WITH INTERACTIVE PREVIEWS",
      "ENHANCED CTAs AND CONVERSION-FOCUSED LAYOUTS",
      "DYNAMIC CONTENT FOR PERSONALIZED USER JOURNEYS",
      "ADAPTED CORE PRODUCT FOR SPECIFIC BUSINESS NEEDS",
    ],
    challenges: [
      "ADAPTING AN EXISTING PRODUCT INTO A CLIENT-SPECIFIC LANDING PAGE",
      "BALANCING BRAND CONSISTENCY WITH CLIENT CUSTOMIZATION",
      "OPTIMIZING CONVERSION FLOWS FOR A NON-TECHNICAL AUDIENCE",
    ],
    outcome:
      "REAL CLIENT-ADJACENT WORK THAT DEMONSTRATES ABILITY TO ADAPT CORE PRODUCTS FOR SPECIFIC BUSINESS NEEDS. SHOWS PRODUCT THINKING BEYOND PURE ENGINEERING.",
  },
  {
    slug: "personal-blog",
    title: "BLOG // COMING SOON",
    description:
      "PERSONAL DEV BLOG PLATFORM FOR SHARING INSIGHTS ON FRONTEND ENGINEERING, AI INTEGRATION, AND BUILDING IN PUBLIC.",
    longDescription:
      "AN UPCOMING PERSONAL BLOG PLATFORM DESIGNED TO SHARE DEVELOPER INSIGHTS, TECHNICAL DEEP-DIVES, AND BUILD-IN-PUBLIC CONTENT. THE BLOG WILL FEATURE MDX-POWERED CONTENT, CODE SYNTAX HIGHLIGHTING, AND A CLEAN READING EXPERIENCE BUILT WITH THE SAME NEO-BRUTALIST DESIGN SYSTEM AS THIS PORTFOLIO.",
    tags: ["NEXT.JS", "MDX", "TYPESCRIPT"],
    link: "#",
    github: "#",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
    color: "bg-brand-secondary",
    features: [
      "MDX-POWERED CONTENT WITH CUSTOM COMPONENTS",
      "CODE SYNTAX HIGHLIGHTING",
      "NEO-BRUTALIST READING EXPERIENCE",
      "RSS FEED AND SEO OPTIMIZATION",
    ],
    challenges: [
      "BUILDING A CONTENT PIPELINE THAT'S EASY TO MAINTAIN",
      "DESIGNING FOR READABILITY WITHIN A BRUTALIST AESTHETIC",
    ],
    outcome:
      "A FORWARD-LOOKING PROJECT THAT DEMONSTRATES MOMENTUM AND A COMMITMENT TO SHARING KNOWLEDGE WITH THE DEVELOPER COMMUNITY.",
  },
];

export const MISSIONS = [
  {
    title: "INTUITIVE UIs",
    desc: "SMOOTH INTERACTIONS, MOBILE-FIRST OPTIMIZATION, AND ACCESSIBLE FLOWS THAT PEOPLE ACTUALLY ENJOY USING.",
    icon: <Layout />,
    color: "bg-brand-secondary",
  },
  {
    title: "SCALABLE CODE",
    desc: "MODULAR COMPONENTS, CLEAN STATE MANAGEMENT, AND ARCHITECTURE THAT DOESN'T FALL APART AT SCALE.",
    icon: <Boxes />,
    color: "bg-brand-primary",
  },
  {
    title: "AI-AUGMENTED",
    desc: "DUAL AI AGENTS, TOOL-CALLING WORKFLOWS, AND INTELLIGENT FEATURES BUILT INTO REAL PRODUCTS.",
    icon: <Code2 />,
    color: "bg-accent",
  },
  {
    title: "REAL IMPACT",
    desc: "SEEKING ROLES WITH MEANINGFUL WORK, FAIR COMPENSATION, AND ROOM TO GROW WITH A STRONG TEAM.",
    icon: <Rocket />,
    color: "bg-white",
  },
];

export const EXPERIENCE = [
  {
    role: "FRONTEND DEVELOPER INTERN",
    company: "COMPANY NAME",
    period: "DEC 2025 — PRESENT",
    points: [
      "BUILDING PRODUCTION FEATURES IN REACT/NEXT.JS WITH TAILWIND CSS",
      "PARTICIPATING IN CODE REVIEWS AND AGILE SPRINT CYCLES",
      "SHIPPING ITERATIVE BUILDS WITH REAL TEAM COLLABORATION",
    ],
  },
];

export const EDUCATION = [
  {
    degree: "MASTER'S IN MATHEMATICS",
    institution: "UNIVERSITY NAME",
    period: "2024 — PRESENT",
    note: "ANALYTICAL THINKING, PROBLEM DECOMPOSITION, AND LOGICAL RIGOR APPLIED TO SOFTWARE ENGINEERING.",
  },
  {
    degree: "BACHELOR'S DEGREE",
    institution: "UNIVERSITY NAME",
    period: "2020 — 2024",
    note: "FOUNDATIONS IN COMPUTER SCIENCE AND MATHEMATICAL REASONING.",
  },
];

export const CERTIFICATIONS = [
  {
    name: "MACHINE LEARNING SPECIALIZATION",
    provider: "ANDREW NG // COURSERA",
    color: "bg-brand-primary",
  },
  {
    name: "COMPLETE MERN STACK BOOTCAMP",
    provider: "ANGELA YU // UDEMY",
    color: "bg-brand-secondary",
  },
  {
    name: "NEXT.JS & REACT — COMPLETE GUIDE",
    provider: "SCHWARZMÜLLER // UDEMY",
    color: "bg-accent",
  },
];

export const STATS = [
  { value: "6+", label: "PROJECTS SHIPPED" },
  { value: "100+", label: "PROBLEMS SOLVED" },
  { value: "1", label: "INTERNSHIP" },
  { value: "3", label: "CERTIFICATIONS" },
];
