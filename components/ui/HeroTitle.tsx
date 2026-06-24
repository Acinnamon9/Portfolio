"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import {
  HERO_DYNAMIC_WORDS,
  HERO_DYNAMIC_TARGETS,
} from "../../lib/constants";

export function HeroTitle() {
  const [serviceIndex, setServiceIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const containerRef = useRef<HTMLHeadingElement>(null);

  const longestService = useMemo(
    () =>
      [...HERO_DYNAMIC_WORDS].sort(
        (a, b) => b.length - a.length,
      )[0],
    [],
  );

  const longestTarget = useMemo(
    () =>
      [...HERO_DYNAMIC_TARGETS].sort(
        (a, b) => b.length - a.length,
      )[0],
    [],
  );

  useEffect(() => {
    const serviceInterval = setInterval(() => {
      setServiceIndex(
        (index) => (index + 1) % HERO_DYNAMIC_WORDS.length,
      );
    }, 10000);

    const targetInterval = setInterval(() => {
      setTargetIndex(
        (index) => (index + 1) % HERO_DYNAMIC_TARGETS.length,
      );
    }, 8000);

    return () => {
      clearInterval(serviceInterval);
      clearInterval(targetInterval);
    };
  }, []);

  const handleMouseMove = (
    event: MouseEvent<HTMLHeadingElement>,
  ) => {
    if (!containerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();

    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;

    containerRef.current.style.setProperty(
      "--mouse-x",
      `${x}%`,
    );
    containerRef.current.style.setProperty(
      "--mouse-y",
      `${y}%`,
    );
  };

  return (
    <h1
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="
        mb-5 max-w-full
        text-center font-black tracking-tighter text-foreground
        text-[clamp(2.15rem,11vw,4rem)]
        leading-[0.9]
        md:text-6xl
        lg:text-left
        [--mouse-x:50%]
        [--mouse-y:50%]
      "
    >
      <span className="block">BUILDING</span>

      <span className="relative block h-[1em] max-w-full overflow-hidden">
        <span
          aria-hidden="true"
          className="invisible block whitespace-nowrap leading-none"
        >
          {longestService}
        </span>

        <AnimatePresence mode="wait">
          <motion.span
            key={HERO_DYNAMIC_WORDS[serviceIndex]}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              gradient-text absolute inset-0
              whitespace-nowrap leading-none
            "
            style={{
              backgroundPosition:
                "var(--mouse-x) var(--mouse-y)",
              backgroundImage:
                "radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--secondary) 0%, var(--accent) 50%, var(--secondary) 100%)",
              backgroundSize: "200% 200%",
            }}
          >
            {HERO_DYNAMIC_WORDS[serviceIndex]}
          </motion.span>
        </AnimatePresence>
      </span>

      <span
        className="
          mt-1 flex flex-wrap items-baseline
          justify-center gap-x-[0.22em]
          lg:justify-start
        "
      >
        <span>FOR</span>

        <span className="relative inline-block h-[1em] overflow-hidden">
          <span
            aria-hidden="true"
            className="
              invisible block whitespace-nowrap
              italic leading-none
            "
          >
            {longestTarget}.
          </span>

          <AnimatePresence mode="wait">
            <motion.span
              key={HERO_DYNAMIC_TARGETS[targetIndex]}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15 }}
              transition={{ duration: 0.4 }}
              className="
                absolute inset-0 whitespace-nowrap
                italic leading-none underline
                decoration-4 decoration-brand-secondary
                md:decoration-8
              "
            >
              {HERO_DYNAMIC_TARGETS[targetIndex]}.
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
    </h1>
  );
}