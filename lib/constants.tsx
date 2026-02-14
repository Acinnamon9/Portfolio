import React from "react";
import { Layout, Boxes, Code2, Rocket } from "lucide-react";

export const NAV_LINKS = [
  { name: "ABOUT", href: "#about" },
  { name: "PROJECTS", href: "#projects" },
  { name: "SKILLS", href: "#skills" },
  { name: "CONTACT", href: "#contact" },
];

export const HERO_DYNAMIC_WORDS = [
  "FRONTENDS",
  "BACKENDS",
  "LANDING PAGES",
  "SOLUTIONS",
  "EVERYTHING",
];

export const HERO_DYNAMIC_TARGETS = [
  "STARTUPS",
  "FOUNDERS",
  "BIG IDEAS",
  "THE FUTURE",
  "IMPACT",
];

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  github: string;
  image?: string;
  video?: string;
  color: string;
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
  { name: "Shadcn", src: "https://github.com/shadcn.png" },
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
    name: "Grok",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Grok-icon.svg/3840px-Grok-icon.svg.png",
  },
  {
    name: "Antigravity",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvinjxr8MVZ69diNIbNNMfcUljy04dIjkqPQ&s",
  },
];

export const ALL_SKILLS = [
  {
    skillName: "REACT",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    skillName: "NODE.JS",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    skillName: "NEXT.JS",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    skillName: "TAILWIND",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    skillName: "TYPESCRIPT",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    skillName: "PRISMA",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
  },
  {
    skillName: "CLERK",
    imgSrc: "https://images.clerk.com/static/logo-light-mode-400x400.png",
  },
  {
    skillName: "STRIPE",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/stripe/stripe-original.svg",
  },
  {
    skillName: "SHADCN",
    imgSrc: "https://github.com/shadcn.png",
  },
  {
    skillName: "GEMINI",
    imgSrc:
      "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.svg",
  },
  {
    skillName: "OPENAI",
    imgSrc: "https://www.vectorlogo.zone/logos/openai/openai-icon.svg",
  },
  {
    skillName: "GROK",
    imgSrc: "https://x.ai/favicon.ico",
  },
  {
    skillName: "GOHIGHLEVEL",
    imgSrc: "https://web-assets.gohighlevel.com/ghl-favicon.png",
  },
];

export const PROJECTS: Project[] = [
  {
    title: "COFFEEMIUM // STORE",
    description:
      "A ROBUST E-COMMERCE PLATFORM FOR COFFEE PRODUCTS BUILT WITH NEXT.JS 16, PRISMA, AND TAILWIND CSS 4. FEATURING DYNAMIC ROUTING AND A MODERN WORKFLOW.",
    tags: ["NEXT.JS 16", "PRISMA", "TAILWIND 4"],
    link: "https://github.com/Acinnamon9/Coffeemium",
    github: "https://github.com/Acinnamon9/Coffeemium",
    video: "/Coffeemium.mp4",
    color: "bg-brand-secondary",
  },
  {
    title: "AI // CHAT ASSISTANT",
    description:
      "INTERACTIVE CHAT INTERFACE POWERED BY GPT-4. FEATURE-RICH WITH MARKDOWN AND HISTORY PERSISTENCE.",
    tags: ["REACT", "OPENAI", "NODE.JS"],
    link: "#",
    github: "#",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad095?w=800&q=80",
    color: "bg-brand-primary",
  },
  {
    title: "PORTFOLIO // V1",
    description:
      "BRUTALIST ARCHITECTURE MEETS MODERN FRONTEND ENGINEERING. BUILT FOR SPEED AND IMPACT.",
    tags: ["NEXT.JS", "TYPESCRIPT", "TAILWIND"],
    link: "#",
    github: "#",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    color: "bg-accent",
  },
];

export const MISSIONS = [
  {
    title: "HIGH-QUALITY FRONTENDS",
    desc: "INTERFACES, LANDING PAGES, AND PRODUCT FLOWS BUILT WITH PRECISION AND PERFORMANCE.",
    icon: <Layout />,
    color: "bg-brand-secondary",
  },
  {
    title: "FULL-STACK FEATURES",
    desc: "APIS, AUTHENTICATION, PAYMENTS, AND AUTOMATION THAT POWER SEAMLESS USER JOURNEYS.",
    icon: <Boxes />,
    color: "bg-brand-primary",
  },
  {
    title: "AI INTEGRATIONS",
    desc: "BUILDING TOOL-CALLING WORKFLOWS AND INTELLIGENT MEDIA GENERATION FOR REAL PRODUCTS.",
    icon: <Code2 />,
    color: "bg-accent",
  },
  {
    title: "REAL IMPACT",
    desc: "I THRIVE IN ENVIRONMENTS WHERE SPEED, OWNERSHIP, AND PRACTICAL PRODUCT VALUE MATTER MOST.",
    icon: <Rocket />,
    color: "bg-white",
  },
];
