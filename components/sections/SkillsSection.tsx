"use client";

import LiSkill from "./LiSkill";
import { ALL_SKILLS } from "../../lib/constants";
import { InfiniteMarquee } from "../ui/InfiniteMarquee";

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-24 relative overflow-hidden bg-foreground text-background border-y-12 border-foreground"
    >
      <div className="max-w-7xl mx-auto px-6 mb-24 flex flex-col items-center text-center">
        <h2 className="text-5xl md:text-7xl lg:text-9xl font-black mb-8 italic tracking-tighter text-brand-primary leading-none">
          THE ENGINE // <br /> ROOM
        </h2>
        <p className="text-lg md:text-2xl font-black max-w-3xl uppercase leading-none text-background/80 outline-text">
          MOBILE-FIRST DESIGN, CLEAN ARCHITECTURE, AND CORE WEB VITALS
          OPTIMIZATION — FROM CONCEPTION TO DEPLOYMENT.
        </p>
      </div>

      <div className="flex flex-col gap-16 py-10 bg-brand-primary shadow-[inset_0px_0px_40px_rgba(0,0,0,0.5)]">
        <div className="relative border-y-8 border-foreground py-10">
          <InfiniteMarquee speed={35} direction="left" gap="gap-12">
            {ALL_SKILLS.map((skill, index) => (
              <LiSkill
                key={index}
                skillName={skill.skillName}
                imgSrc={skill.imgSrc}
              />
            ))}
          </InfiniteMarquee>
        </div>

        <div className="relative border-y-8 border-foreground py-10">
          <InfiniteMarquee speed={35} direction="right" gap="gap-12">
            {[...ALL_SKILLS].reverse().map((skill, index) => (
              <LiSkill
                key={index}
                skillName={skill.skillName}
                imgSrc={skill.imgSrc}
              />
            ))}
          </InfiniteMarquee>
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
