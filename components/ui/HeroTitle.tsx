"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { HERO_DYNAMIC_WORDS, HERO_DYNAMIC_TARGETS } from "../../lib/constants";

export function HeroTitle() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [serviceIndex, setServiceIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const serviceInterval = setInterval(() => {
      setServiceIndex((prev) => (prev + 1) % HERO_DYNAMIC_WORDS.length);
    }, 10000);
    const targetInterval = setInterval(() => {
      setTargetIndex((prev) => (prev + 1) % HERO_DYNAMIC_TARGETS.length);
    }, 8000);
    return () => {
      clearInterval(serviceInterval);
      clearInterval(targetInterval);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!textRef.current) return;
    const rect = textRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <h1 className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-10 text-foreground">
      BUILDING <br />
      <div
        ref={textRef}
        onMouseMove={handleMouseMove}
        className="inline-block relative min-h-[1em] min-w-[300px]"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={HERO_DYNAMIC_WORDS[serviceIndex]}
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
            {HERO_DYNAMIC_WORDS[serviceIndex]}
          </motion.span>
        </AnimatePresence>
      </div>{" "}
      <br />
      FOR{" "}
      <span className="inline-block relative min-h-[1em] min-w-[200px]">
        <AnimatePresence mode="wait">
          <motion.span
            key={HERO_DYNAMIC_TARGETS[targetIndex]}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 top-0 whitespace-nowrap lg:relative italic underline decoration-8 decoration-brand-secondary"
          >
            {HERO_DYNAMIC_TARGETS[targetIndex]}.
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  );
}
