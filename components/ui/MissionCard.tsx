"use client";

import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import React from "react";

interface MissionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color?: string;
  index: number;
  variant?: "default" | "impact";
}

export function MissionCard({
  title,
  description,
  icon,
  color,
  index,
  variant = "default",
}: MissionCardProps) {
  if (variant === "impact") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="brutalist-card p-6 md:p-8 bg-foreground text-background flex flex-col justify-center"
      >
        <h4 className="text-2xl font-black mb-4 flex items-center gap-4 italic">
          {React.isValidElement(icon)
            ? React.cloneElement(icon as React.ReactElement<any>, {
                size: 32,
                strokeWidth: 4,
              })
            : icon}
          {title}
        </h4>
        <p className="text-lg font-black uppercase leading-none">
          {description}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={cn("brutalist-card p-6 md:p-8 group", color)}
    >
      <div className="w-16 h-16 border-4 border-foreground bg-background flex items-center justify-center mb-6">
        {React.isValidElement(icon)
          ? React.cloneElement(icon as React.ReactElement<any>, {
              size: 40,
              strokeWidth: 3,
            })
          : icon}
      </div>
      <h4 className="text-2xl font-black mb-4 leading-none">{title}</h4>
      <p className="font-bold text-lg leading-tight">{description}</p>
    </motion.div>
  );
}
