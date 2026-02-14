"use client";

import React from "react";
import { cn } from "../../lib/utils";

interface InfiniteMarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
  gap?: string;
}

export function InfiniteMarquee({
  children,
  direction = "left",
  speed = 30,
  pauseOnHover = true,
  className,
  gap = "gap-12",
}: InfiniteMarqueeProps) {
  const isVertical = direction === "up" || direction === "down";

  const getAnimationClass = () => {
    switch (direction) {
      case "left":
        return "animate-scroll-x";
      case "right":
        return "animate-scroll-x-reverse";
      case "up":
        return "animate-scroll-y";
      case "down":
        return "animate-scroll-y-reverse";
      default:
        return "animate-scroll-x";
    }
  };

  return (
    <div
      className={cn(
        "overflow-hidden select-none",
        isVertical ? "flex flex-col h-full" : "flex w-full",
        pauseOnHover && "pause-on-hover",
        className,
      )}
    >
      <div
        className={cn(
          "flex shrink-0",
          isVertical ? "flex-col" : "flex-row",
          gap,
          getAnimationClass(),
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {/* Render children twice for seamless scrolling */}
        {children}
        {children}
      </div>
    </div>
  );
}
