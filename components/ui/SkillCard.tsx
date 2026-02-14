"use client";

import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface SkillCardProps {
  name: string;
  src: string;
  color?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  animateOnHover?: boolean;
}

export function SkillCard({
  name,
  src,
  color = "bg-background",
  size = "md",
  className,
  animateOnHover = true,
}: SkillCardProps) {
  const sizeClasses = {
    sm: "w-20 h-20 md:w-24 md:h-24 p-3",
    md: "w-24 h-24 md:w-32 md:h-32 p-4",
    lg: "w-32 h-32 md:w-40 md:h-40 p-6",
  };

  const imgSizeClasses = {
    sm: "w-10 h-10 md:w-12 md:h-12",
    md: "w-14 h-14 md:w-16 md:h-16",
    lg: "w-20 h-20 md:w-24 md:h-24",
  };

  return (
    <motion.div
      whileHover={animateOnHover ? { y: -5, x: -3 } : {}}
      data-tooltip={name}
      className={cn(
        "flex items-center justify-center border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group transition-all brutalist-tooltip shrink-0",
        sizeClasses[size],
        color,
        animateOnHover && "hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]",
        className,
      )}
    >
      <img
        src={src}
        alt={name}
        className={cn(
          "object-contain grayscale group-hover:grayscale-0 transition-all duration-300",
          imgSizeClasses[size],
        )}
      />
    </motion.div>
  );
}
