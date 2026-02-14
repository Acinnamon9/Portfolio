"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import HeroSection from "../components/sections/HeroSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import SkillsSection from "../components/sections/SkillsSection";
import { Button } from "../components/ui/Button";
import {
  Mail,
  Github,
  Linkedin,
  CheckCircle2,
  Layout,
  Boxes,
  Code2,
  Rocket,
  Share2,
} from "lucide-react";
import { cn } from "../lib/utils";

export default function Home() {
  const whatIWorkOn = [
    {
      title: "HIGH-QUALITY FRONTENDS",
      desc: "INTERFACES, LANDING PAGES, AND PRODUCT FLOWS BUILT WITH PRECISION AND PERFORMANCE.",
      icon: <Layout size={40} strokeWidth={3} className="text-foreground" />,
      color: "bg-brand-secondary",
    },
    {
      title: "FULL-STACK FEATURES",
      desc: "APIS, AUTHENTICATION, PAYMENTS, AND AUTOMATION THAT POWER SEAMLESS USER JOURNEYS.",
      icon: <Boxes size={40} strokeWidth={3} className="text-foreground" />,
      color: "bg-brand-primary",
    },
    {
      title: "AI INTEGRATIONS",
      desc: "BUILDING TOOL-CALLING WORKFLOWS AND INTELLIGENT MEDIA GENERATION FOR REAL PRODUCTS.",
      icon: <Code2 size={40} strokeWidth={3} className="text-foreground" />,
      color: "bg-accent",
    },
  ];

  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />

      <div className="space-y-48 pb-32">
        <HeroSection />

        {/* Development Philosophy Section */}
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
                    ABOUT ME // THE MISSION
                  </div>
                  <h3 className="text-6xl md:text-8xl font-black leading-[0.8] tracking-tighter">
                    BUILDING USABLE{" "}
                    <span className="text-brand-secondary">FEATURES</span> WITH
                    TOTAL{" "}
                    <span className="underline decoration-8 decoration-brand-primary underline-offset-[12px]">
                      OWNERSHIP
                    </span>
                    .
                  </h3>
                  <div className="space-y-8 text-2xl md:text-3xl font-bold leading-tight">
                    <p className="bg-foreground text-background p-6 border-l-[16px] border-brand-primary">
                      I'M A DEVELOPER WORKING PRIMARILY ON THE FRONTEND, WITH
                      STRONG FULL-STACK EXPERIENCE AND HANDS-ON WORK INTEGRATING
                      AI INTO REAL PRODUCTS.
                    </p>
                    <p className="text-foreground border-l-[16px] border-brand-secondary p-6 bg-brand-secondary/10">
                      MY FOCUS IS SIMPLE: BUILD FAST, SHIP USABLE FEATURES, AND
                      MAKE COMPLEX SYSTEMS FEEL CLEAR AND INTUITIVE IN THE
                      BROWSER.
                    </p>
                  </div>
                </motion.div>

                {/* What I Work On Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {whatIWorkOn.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={cn("brutalist-card p-10 group", item.color)}
                    >
                      <div className="w-20 h-20 border-4 border-foreground bg-background flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform">
                        {item.icon}
                      </div>
                      <h4 className="text-3xl font-black mb-6 leading-none">
                        {item.title}
                      </h4>
                      <p className="font-bold text-xl leading-tight">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="brutalist-card p-10 bg-foreground text-background flex flex-col justify-center"
                  >
                    <h4 className="text-4xl font-black mb-6 flex items-center gap-4 italic">
                      <Rocket size={48} strokeWidth={4} />
                      REAL IMPACT
                    </h4>
                    <p className="text-xl font-black uppercase leading-none">
                      I THRIVE IN ENVIRONMENTS WHERE SPEED, OWNERSHIP, AND
                      PRACTICAL PRODUCT VALUE MATTER MOST.
                    </p>
                  </motion.div>
                </div>
              </div>

              <div className="lg:col-span-4 lg:sticky lg:top-40">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="brutalist-card p-10 bg-brand-primary space-y-10"
                >
                  <h4 className="text-4xl font-black italic tracking-tighter">
                    THE RULES.
                  </h4>
                  <ul className="space-y-8">
                    {[
                      "EXECUTION OVER THEORY.",
                      "USABILITY FIRST.",
                      "LIVE SYSTEMS ONLY.",
                      "PRACTICAL AI VALUABLE.",
                    ].map((point, i) => (
                      <li key={i} className="flex gap-6 items-center">
                        <CheckCircle2
                          size={32}
                          strokeWidth={4}
                          className="flex-shrink-0"
                        />
                        <span className="font-black text-2xl tracking-tighter">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full text-2xl h-20 border-8 shadow-none hover:translate-x-1 hover:translate-y-1">
                    LET'S CONNECT
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="space-y-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-brand-secondary inline-block border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_#000]">
              <p className="text-3xl font-black leading-none italic uppercase">
                REAL PROJECTS. REAL BUSINESS PROBLEMS. <br />
                FRONTEND + FULLSTACK + AI.
              </p>
            </div>
          </div>
          <ProjectsSection />
        </section>

        <SkillsSection />

        <section id="contact" className="px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-foreground text-background border-8 border-foreground p-16 md:p-32 text-center space-y-16 relative shadow-[16px_16px_0px_0px_#ffeb3b]"
            >
              <div className="space-y-10">
                <h2 className="text-6xl md:text-9xl font-black tracking-tighter leading-none italic uppercase">
                  SHIP THE <br />
                  <span className="text-brand-primary">EXTRAORDINARY.</span>
                </h2>
                <p className="text-2xl md:text-4xl text-background/80 max-w-4xl mx-auto font-black leading-none uppercase">
                  IF YOU NEED OWNERSHIP, FRONTEND EXPERTISE AND FULL WORKING
                  FEATURES, LET'S CONNECT.
                </p>
              </div>

              <div className="flex flex-col md:flex-row justify-center gap-10">
                <Button
                  size="lg"
                  className="bg-brand-secondary text-foreground hover:bg-brand-primary h-24 px-16 text-4xl font-black border-4 shadow-[8px_8px_0px_0px_#fff]"
                  asChild
                >
                  <a href="mailto:abhisand30@gmail.com">
                    <Mail size={40} className="mr-6" />
                    SEND EMAIL
                  </a>
                </Button>
                <div className="flex gap-8">
                  <a
                    href="https://github.com/Acinnamon9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-24 h-24 border-4 border-background flex items-center justify-center hover:bg-background hover:text-foreground transition-all"
                  >
                    <Github size={48} />
                  </a>
                  <a
                    href="#"
                    className="w-24 h-24 border-4 border-background flex items-center justify-center hover:bg-background hover:text-foreground transition-all shadow-[8px_8px_0px_0px_#fff]"
                  >
                    <Share2 size={48} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <footer className="py-20 border-t-8 border-foreground text-center bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 font-black text-2xl uppercase italic">
          <p>© {new Date().getFullYear()} ABHIJEET // BUILT FOR RESULTS</p>
          <div className="flex gap-16">
            <a href="#" className="hover:text-brand-primary">
              TWITTER
            </a>
            <a
              href="https://github.com/Acinnamon9"
              className="hover:text-brand-primary"
            >
              GITHUB
            </a>
            <a href="#" className="hover:text-brand-primary">
              LINKEDIN
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
