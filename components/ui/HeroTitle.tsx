"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { HERO_DYNAMIC_WORDS, HERO_DYNAMIC_TARGETS } from "../../lib/constants";

export function HeroTitle() {
  const [serviceIndex, setServiceIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Find the longest words to reserve space naturally
  const longestService = useMemo(
    () => [...HERO_DYNAMIC_WORDS].sort((a, b) => b.length - a.length)[0],
    [],
  );
  const longestTarget = useMemo(
    () => [...HERO_DYNAMIC_TARGETS].sort((a, b) => b.length - a.length)[0],
    [],
  );

  useEffect(() => {
    const sInt = setInterval(
      () => setServiceIndex((i) => (i + 1) % HERO_DYNAMIC_WORDS.length),
      10000,
    );
    const tInt = setInterval(
      () => setTargetIndex((i) => (i + 1) % HERO_DYNAMIC_TARGETS.length),
      8000,
    );
    return () => {
      clearInterval(sInt);
      clearInterval(tInt);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    containerRef.current.style.setProperty("--mouse-x", `${x}%`);
    containerRef.current.style.setProperty("--mouse-y", `${y}%`);
  };

  // Never increase text size more than 6xl

  return (
    <h1
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.85] mb-6 text-foreground text-center lg:text-left [--mouse-x:50%] [--mouse-y:50%]"
    >
      BUILDING <br className="hidden sm:block" />
      {/* Service Word */}
      <span
        className="inline-block relative align-bottom overflow-hidden h-[1em]"
        style={{ width: "auto" }}
      >
        <span className="invisible pointer-events-none select-none leading-none whitespace-nowrap">
          {longestService}
        </span>

        <AnimatePresence mode="wait">
          <motion.span
            key={HERO_DYNAMIC_WORDS[serviceIndex]}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="gradient-text absolute inset-0 whitespace-nowrap leading-none"
            style={{
              backgroundPosition: "var(--mouse-x) var(--mouse-y)",
              backgroundImage:
                "radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--secondary) 0%, var(--accent) 50%, var(--secondary) 100%)",
              backgroundSize: "200% 200%",
            }}
          >
            {HERO_DYNAMIC_WORDS[serviceIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
      <br className="hidden sm:block" />
      FOR {/* Target Word */}
      <span className="inline-block relative align-bottom overflow-hidden h-[1em]">
        <span className="invisible pointer-events-none select-none leading-none whitespace-nowrap italic">
          {longestTarget}.
        </span>

        <AnimatePresence mode="wait">
          <motion.span
            key={HERO_DYNAMIC_TARGETS[targetIndex]}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 whitespace-nowrap leading-none italic underline decoration-4 md:decoration-8 decoration-brand-secondary"
          >
            {HERO_DYNAMIC_TARGETS[targetIndex]}.
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  );
}
