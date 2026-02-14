"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

const frontendIcons = [
  {
    name: "React",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Tailwind",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "TypeScript",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  { name: "Shadcn", src: "https://github.com/shadcn.png" },
];

const backendIcons = [
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
    src: "https://play-lh.googleusercontent.com/MAbanjWwLE2Ps3c6ZxUgLE6SMSzwy8PQ5mYvc_Txhn_1zv9gLEEKSsLYqW89y1wGdww",
  },
];

const aiIcons = [
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

const dynamicWords = [
  "FRONTENDS",
  "BACKENDS",
  "LANDING PAGES",
  "SOLUTIONS",
  "EVERYTHING",
];

const dynamicTargets = [
  "STARTUPS",
  "FOUNDERS",
  "BIG IDEAS",
  "THE FUTURE",
  "IMPACT",
];

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [serviceIndex, setServiceIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);

  // Cadence 1: Services (Faster)
  useEffect(() => {
    const interval = setInterval(() => {
      setServiceIndex((prev) => (prev + 1) % dynamicWords.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Cadence 2: Targets (Slower)
  useEffect(() => {
    const interval = setInterval(() => {
      setTargetIndex((prev) => (prev + 1) % dynamicTargets.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!textRef.current) return;
    const rect = textRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-24 md:pb-32 overflow-hidden bg-[#ffeb3b]/10 border-b-8 border-foreground">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        <div className="space-y-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-4 py-2 bg-foreground text-background font-black uppercase tracking-widest mb-8 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
              Full-Stack Engineer
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-10 text-foreground">
              BUILDING <br />
              <div
                ref={textRef}
                onMouseMove={handleMouseMove}
                className="inline-block relative min-h-[1em] min-w-[300px]"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={dynamicWords[serviceIndex]}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="gradient-text transition-none absolute left-0 top-0 whitespace-nowrap lg:relative"
                    style={{
                      backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                      backgroundImage: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, var(--secondary) 0%, var(--accent) 50%, var(--secondary) 100%)`,
                      backgroundSize: "200% 200%",
                    }}
                  >
                    {dynamicWords[serviceIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>{" "}
              <br />
              FOR{" "}
              <span className="inline-block relative min-h-[1em] min-w-[200px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={dynamicTargets[targetIndex]}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 top-0 whitespace-nowrap lg:relative italic underline decoration-8 decoration-brand-secondary"
                  >
                    {dynamicTargets[targetIndex]}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <p className="text-2xl md:text-4xl font-black text-foreground max-w-2xl mx-auto lg:mx-0 leading-tight uppercase italic">
              POLISHED EXPERIENCES. <br />
              REAL BACKEND SYSTEMS. <br />
              PRACTICAL AI.
            </p>
          </motion.div>

          {/* Connect & View buttons placeholders were here, putting them back for completeness if they existed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center lg:justify-start gap-6"
          >
            <Button
              size="lg"
              className="brutalist-button h-20 text-3xl"
              asChild
            >
              <a href="#projects">
                VIEW WORK
                <ArrowRight className="ml-4" size={32} />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-8 h-20 text-3xl font-black"
            >
              CONNECT
            </Button>
          </motion.div>
        </div>

        {/* Intentional Tech Carousel — grouped by domain */}
        <div className="relative h-[700px] gap-6 justify-center lg:justify-end overflow-hidden hidden md:flex">
          <Track
            icons={frontendIcons}
            duration={22}
            color="bg-brand-secondary"
          />
          <Track
            icons={backendIcons}
            duration={26}
            reverse
            color="bg-brand-primary"
          />
          <Track icons={aiIcons} duration={18} color="bg-accent" />
        </div>
      </div>
    </section>
  );
}

interface TrackProps {
  icons: { name: string; src: string }[];
  duration: number;
  reverse?: boolean;
  color: string;
}

function Track({ icons, duration, reverse = false, color }: TrackProps) {
  return (
    <div className="flex flex-col items-center gap-4 pause-on-hover">
      {/* Track */}
      <div className="flex-1 overflow-hidden relative">
        <div
          className={cn(
            "flex flex-col gap-5",
            reverse ? "animate-scroll-y-reverse" : "animate-scroll-y",
          )}
          style={{ animationDuration: `${duration}s` }}
        >
          {/* Double the icons for seamless scroll */}
          {[...icons, ...icons].map((icon, index) => (
            <div
              key={index}
              data-tooltip={icon.name}
              className={cn(
                "w-28 h-28 md:w-32 md:h-32 flex items-center justify-center border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 group transition-all hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] brutalist-tooltip",
                color,
              )}
            >
              <img
                src={icon.src}
                alt={icon.name}
                className="w-16 h-16 md:w-20 md:h-20 object-contain opacity-90 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
