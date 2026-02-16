"use client";

import { motion } from "framer-motion";
import {
  Layout,
  Boxes,
  Code2,
  Rocket,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Award,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";
import { MissionCard } from "../ui/MissionCard";
import {
  MISSIONS,
  EXPERIENCE,
  EDUCATION,
  CERTIFICATIONS,
  STATS,
} from "../../lib/constants";

export default function AboutSection() {
  return (
    <section id="about" className="relative px-6 z-40 bg-background ">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Social Proof Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-8 border-foreground p-6 md:p-8 text-center bg-background shadow-[8px_8px_0px_0px_#000]"
            >
              <div className="text-4xl md:text-6xl font-black text-brand-primary leading-none">
                {stat.value}
              </div>
              <div className="text-sm md:text-base font-black uppercase tracking-widest mt-2 text-foreground/70">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main About Grid */}
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
                TURNING COMPLEX IDEAS INTO{" "}
                <span className="text-brand-secondary">SMOOTH</span>,{" "}
                <span className="underline decoration-8 decoration-brand-primary underline-offset-12">
                  RELIABLE
                </span>{" "}
                APPS.
              </h3>
              <div className="space-y-6 text-lg md:text-xl font-bold leading-tight">
                <p className="bg-foreground text-background p-5 border-l-16 border-brand-primary">
                  FRONTEND DEVELOPER WITH FULL-STACK EXPOSURE. CURRENTLY
                  INTERNING AS A FRONTEND DEVELOPER (DEC 2025 — PRESENT),
                  WORKING ON REAL TEAM PROJECTS, CODE REVIEWS, AND ITERATIVE
                  BUILDS.
                </p>
                <p className="text-foreground border-l-16 border-brand-secondary p-5 bg-brand-secondary/10">
                  100+ LEETCODE & HACKERRANK PROBLEMS. COMPLETED ANDREW NG'S ML
                  COURSE, ANGELA YU'S MERN STACK, AND SCHWARZMÜLLER'S NEXT.JS.
                  PURSUING A MASTER'S IN MATHEMATICS FOR DEEPER ANALYTICAL
                  THINKING.
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

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <Briefcase size={32} strokeWidth={3} />
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">
                  EXPERIENCE
                </h3>
              </div>
              {EXPERIENCE.map((exp, i) => (
                <div
                  key={i}
                  className="border-8 border-foreground p-6 md:p-8 bg-brand-primary/10 shadow-[8px_8px_0px_0px_#000]"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                    <h4 className="text-2xl font-black uppercase">
                      {exp.role}
                    </h4>
                    <span className="text-sm font-black uppercase tracking-widest bg-foreground text-background px-4 py-1 self-start">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-foreground/70 uppercase mb-4">
                    {exp.company}
                  </p>
                  <ul className="space-y-3">
                    {exp.points.map((point, j) => (
                      <li key={j} className="flex gap-3 items-start">
                        <CheckCircle2
                          size={20}
                          strokeWidth={3}
                          className="shrink-0 mt-0.5 text-brand-primary"
                        />
                        <span className="font-bold text-base uppercase">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <GraduationCap size={32} strokeWidth={3} />
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">
                  EDUCATION
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {EDUCATION.map((edu, i) => (
                  <div
                    key={i}
                    className="border-8 border-foreground p-6 bg-background shadow-[8px_8px_0px_0px_#000]"
                  >
                    <span className="text-xs font-black uppercase tracking-widest bg-foreground text-background px-3 py-1 inline-block mb-3">
                      {edu.period}
                    </span>
                    <h4 className="text-xl font-black uppercase mb-1">
                      {edu.degree}
                    </h4>
                    <p className="text-sm font-bold text-foreground/60 uppercase mb-3">
                      {edu.institution}
                    </p>
                    <p className="text-sm font-bold leading-tight uppercase text-foreground/80">
                      {edu.note}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <Award size={32} strokeWidth={3} />
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">
                  CERTIFICATIONS
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CERTIFICATIONS.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={cn(
                      "border-8 border-foreground p-6 shadow-[6px_6px_0px_0px_#000]",
                      cert.color,
                    )}
                  >
                    <h4 className="text-lg font-black uppercase leading-tight mb-2">
                      {cert.name}
                    </h4>
                    <p className="text-sm font-bold uppercase text-foreground/70">
                      {cert.provider}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
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
