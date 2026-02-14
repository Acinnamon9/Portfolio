"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";
import {
  FRONTEND_SKILLS,
  BACKEND_SKILLS,
  AI_SKILLS,
} from "../../lib/constants";
import { InfiniteMarquee } from "../ui/InfiniteMarquee";
import { SkillCard } from "../ui/SkillCard";
import { HeroTitle } from "../ui/HeroTitle";

export default function HeroSection() {
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

            <HeroTitle />

            <p className="text-xl md:text-2xl lg:text-3xl font-black text-foreground max-w-2xl mx-auto lg:mx-0 leading-tight uppercase italic">
              POLISHED EXPERIENCES. <br />
              REAL BACKEND SYSTEMS. <br />
              PRACTICAL AI.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center lg:justify-start gap-6"
          >
            <Button
              size="lg"
              className="brutalist-button h-16 md:h-20 text-xl md:text-2xl px-10"
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
              className="border-8 h-16 md:h-20 text-xl md:text-2xl font-black px-10"
            >
              CONNECT
            </Button>
          </motion.div>
        </div>

        {/* Tech Carousel */}
        <div className="relative h-[700px] gap-6 justify-center lg:justify-end overflow-hidden hidden md:flex">
          <InfiniteMarquee
            direction="up"
            speed={22}
            className="w-auto h-full"
            gap="gap-5"
          >
            {FRONTEND_SKILLS.map((item, index) => (
              <SkillCard
                key={index}
                name={item.name}
                src={item.src}
                size="sm"
                color="bg-brand-secondary"
              />
            ))}
          </InfiniteMarquee>
          <InfiniteMarquee
            direction="down"
            speed={26}
            className="w-auto h-full"
            gap="gap-5"
          >
            {BACKEND_SKILLS.map((item, index) => (
              <SkillCard
                key={index}
                name={item.name}
                src={item.src}
                size="sm"
                color="bg-brand-primary"
              />
            ))}
          </InfiniteMarquee>
          <InfiniteMarquee
            direction="up"
            speed={18}
            className="w-auto h-full"
            gap="gap-5"
          >
            {AI_SKILLS.map((item, index) => (
              <SkillCard
                key={index}
                name={item.name}
                src={item.src}
                size="sm"
                color="bg-accent"
              />
            ))}
          </InfiniteMarquee>
        </div>
      </div>
    </section>
  );
}
