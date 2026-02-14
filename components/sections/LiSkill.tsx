"use client";

import { motion } from "framer-motion";

interface LiSkillProps {
  skillName: string;
  imgSrc: string;
}

export default function LiSkill({ skillName, imgSrc }: LiSkillProps) {
  return (
    <motion.div
      whileHover={{ y: -10, rotate: -3 }}
      data-tooltip={skillName}
      className="flex items-center justify-center p-8 w-40 h-40 bg-background text-foreground border-8 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group brutalist-tooltip"
    >
      <div className="relative w-24 h-24 flex-shrink-0 border-4 border-foreground bg-white flex items-center justify-center group-hover:bg-brand-secondary transition-colors">
        <img
          src={imgSrc}
          alt={skillName}
          className="w-16 h-16 grayscale group-hover:grayscale-0 transition-all duration-300 object-contain"
        />
      </div>
    </motion.div>
  );
}
