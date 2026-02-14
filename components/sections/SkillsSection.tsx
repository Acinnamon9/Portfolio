"use client";

import { motion } from "framer-motion";
import styles from "./SkillsSection.module.css";
import LiSkill from "./LiSkill";
import { cn } from "../../lib/utils";

export default function SkillsSection() {
  const skills = [
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
      skillName: "ANTIGRAVITY",
      imgSrc:
        "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304fe629258b3f75.svg",
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
      skillName: "GEMINI",
      imgSrc:
        "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.svg",
    },
    {
      skillName: "GOHIGHLEVEL",
      imgSrc: "https://web-assets.gohighlevel.com/ghl-favicon.png",
    },
  ];

  return (
    <section
      id="skills"
      className="py-24 relative overflow-hidden bg-foreground text-background border-y-[12px] border-foreground"
    >
      <div className="max-w-7xl mx-auto px-6 mb-24 flex flex-col items-center text-center">
        <h2 className="text-7xl md:text-9xl font-black mb-8 italic tracking-tighter text-brand-primary leading-none">
          THE ENGINE // <br /> ROOM
        </h2>
        <p className="text-2xl md:text-3xl font-black max-w-3xl uppercase leading-none text-background/80 outline-text">
          I'VE MASTERED A DIVERSE RANGE OF TECHNOLOGIES TO BUILD ROBUST
          APPLICATIONS FROM CONCEPTION TO DEPLOYMENT.
        </p>
      </div>

      <div className="flex flex-col gap-16 py-10 bg-brand-primary shadow-[inset_0px_0px_40px_rgba(0,0,0,0.5)]">
        <div className="relative border-y-8 border-foreground py-10">
          <SkillsTrack skills={skills} direction="left" />
        </div>

        <div className="relative border-y-8 border-foreground py-10">
          <SkillsTrack skills={[...skills].reverse()} direction="right" />
        </div>
      </div>

      <style jsx global>{`
        .outline-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
          color: white;
        }
      `}</style>
    </section>
  );
}

interface SkillsTrackProps {
  skills: { skillName: string; imgSrc: string }[];
  direction: "left" | "right";
}

function SkillsTrack({ skills, direction }: SkillsTrackProps) {
  return (
    <div className={cn(styles.skillsTrackContainer, "pause-on-hover px-0")}>
      <div
        className={cn(
          "flex gap-12 whitespace-nowrap",
          direction === "left"
            ? "animate-scroll-x"
            : "animate-scroll-x-reverse",
        )}
        style={{ animationDuration: "35s" }}
      >
        {[...skills, ...skills].map((skill, index) => (
          <div key={index} className="flex-shrink-0">
            <LiSkill skillName={skill.skillName} imgSrc={skill.imgSrc} />
          </div>
        ))}
      </div>
    </div>
  );
}
