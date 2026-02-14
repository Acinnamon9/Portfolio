"use client";

import { motion } from "framer-motion";
import { Layout, Boxes, Code2, Rocket, CheckCircle2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";
import { MissionCard } from "../ui/MissionCard";

import { MISSIONS } from "../../lib/constants";

export default function AboutSection() {
  return (
    <section id="about" className="px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          <div className="lg:col-span-8 space-y-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-block px-6 py-2 bg-foreground text-background font-black text-xl uppercase italic">
                ABOUT ME // THE MISSIONS
              </div>
              <h3 className="text-3xl md:text-5xl lg:text-7xl font-black leading-[0.8] tracking-tighter">
                BUILDING USABLE{" "}
                <span className="text-brand-secondary">FEATURES</span> WITH
                TOTAL{" "}
                <span className="underline decoration-8 decoration-brand-primary underline-offset-12">
                  OWNERSHIP
                </span>
                .
              </h3>
              <div className="space-y-6 text-lg md:text-xl font-bold leading-tight">
                <p className="bg-foreground text-background p-5 border-l-16 border-brand-primary">
                  I'M A DEVELOPER WORKING PRIMARILY ON THE FRONTEND, WITH STRONG
                  FULL-STACK EXPERIENCE AND HANDS-ON WORK INTEGRATING AI INTO
                  REAL PRODUCTS.
                </p>
                <p className="text-foreground border-l-16 border-brand-secondary p-5 bg-brand-secondary/10">
                  MY FOCUS IS SIMPLE: BUILD FAST, SHIP USABLE FEATURES, AND MAKE
                  COMPLEX SYSTEMS FEEL CLEAR AND INTUITIVE IN THE BROWSER.
                </p>
              </div>
            </motion.div>

            {/* Mission Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {MISSIONS.map((item, i) => (
                <MissionCard
                  key={i}
                  index={i}
                  title={item.title}
                  description={item.desc}
                  icon={item.icon}
                  color={item.color}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-40">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="brutalist-card p-8 bg-brand-primary space-y-8"
            >
              <h4 className="text-3xl font-black italic tracking-tighter">
                THE RULES.
              </h4>
              <ul className="space-y-6">
                {[
                  "LEAVE IT BETTER THAN I FOUND IT.",
                  "BUILT FOR MAINTAINABILITY.",
                  "NO VIBECODING. LOGIC ONLY.",
                  "100% PRODUCT COMPLETION.",
                ].map((point, i) => (
                  <li key={i} className="flex gap-4 items-center">
                    <CheckCircle2
                      size={24}
                      strokeWidth={4}
                      className="shrink-0"
                    />
                    <span className="font-black text-xl tracking-tighter">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              <Button className="w-full text-xl h-16 border-8 shadow-none hover:translate-x-1 hover:translate-y-1">
                LET'S CONNECT
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
