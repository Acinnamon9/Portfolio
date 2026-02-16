"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";
import {
  FRONTEND_SKILLS,
  BACKEND_SKILLS,
  AI_SKILLS,
} from "../../lib/constants";
import { InfiniteMarquee } from "../ui/InfiniteMarquee";
import { SkillCard } from "../ui/SkillCard";
import { HeroTitle } from "../ui/HeroTitle";

const HERO_CAROUSELS = [
  {
    skills: FRONTEND_SKILLS,
    direction: "up" as const,
    speed: 22,
    color: "bg-brand-secondary",
  },
  {
    skills: BACKEND_SKILLS,
    direction: "down" as const,
    speed: 26,
    color: "bg-brand-primary",
  },
  {
    skills: AI_SKILLS,
    direction: "up" as const,
    speed: 18,
    color: "bg-accent",
  },
];

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-8 md:px-16 lg:px-24 pb-16 md:pb-20  bg-brand-primary/10 border-b-8 border-foreground"
      style={{ paddingTop: "calc(var(--navbar-h, 5rem) + 1rem)" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center w-full">
        <div className="space-y-6 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-4 py-2 bg-foreground text-background font-black uppercase tracking-widest mb-4 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
              Frontend Developer
            </div>

            <HeroTitle />

            {/* never increase text size more than 2xl */}

            <p className="text-xl md:text-2xl font-black text-foreground max-w-2xl mx-auto lg:mx-0 leading-tight uppercase italic">
              RESPONSIVE, INTERACTIVE UIs. <br />
              FULL-STACK FOUNDATIONS. <br />
              CLEAN, USER-FIRST CODE.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center lg:justify-start gap-4"
          >
            <Button
              size="lg"
              className="brutalist-button h-16 md:h-20 text-xl px-10"
              asChild
            >
              <a href="#projects">
                VIEW WORK
                <ArrowRight className="ml-4" size={28} />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-8 h-16 md:h-20 text-xl font-black px-10"
            >
              CONNECT
            </Button>
          </motion.div>
        </div>

        {/* Tech Carousel */}
        <div className="relative h-[550px] gap-4 justify-center lg:justify-end  md:flex z-0 ">
          {HERO_CAROUSELS.map(({ skills, direction, speed, color }) => (
            <InfiniteMarquee
              key={color}
              direction={direction}
              speed={speed}
              className="w-auto h-full"
              gap="gap-5"
            >
              {skills.map((item) => (
                <SkillCard
                  key={item.name}
                  name={item.name}
                  src={item.src}
                  size="sm"
                  color={color}
                />
              ))}
            </InfiniteMarquee>
          ))}
        </div>
      </div>
    </section>
  );
}
