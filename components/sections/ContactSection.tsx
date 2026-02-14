"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, FileDown } from "lucide-react";
import { Button } from "../ui/Button";

export default function ContactSection() {
  return (
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
              LET'S BUILD <br />
              <span className="text-brand-primary">SOMETHING REAL.</span>
            </h2>
            <p className="text-2xl md:text-4xl text-background/80 max-w-4xl mx-auto font-black leading-none uppercase">
              SEEKING FRONTEND OR FULL-STACK OPPORTUNITIES (REACT/TS/NEXT.JS)
              WITH REAL IMPACT, FAIR COMPENSATION, AND ROOM TO GROW.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-8 flex-wrap">
            <Button
              size="lg"
              className="bg-brand-secondary text-foreground hover:bg-brand-primary h-20 px-12 text-2xl md:text-3xl font-black border-4 shadow-[8px_8px_0px_0px_#fff]"
              asChild
            >
              <a href="mailto:abhisand30@gmail.com">
                <Mail size={32} className="mr-4" />
                SEND EMAIL
              </a>
            </Button>
            <Button
              size="lg"
              className="bg-brand-primary text-foreground hover:bg-brand-secondary h-20 px-12 text-2xl md:text-3xl font-black border-4 shadow-[8px_8px_0px_0px_#fff]"
              asChild
            >
              <a href="/Abhijeet_Resume.pdf" download>
                <FileDown size={32} className="mr-4" />
                RESUME
              </a>
            </Button>
          </div>

          <div className="flex justify-center gap-8">
            <a
              href="https://github.com/Acinnamon9"
              target="_blank"
              rel="noopener noreferrer"
              className="w-20 h-20 border-4 border-background flex items-center justify-center hover:bg-background hover:text-foreground transition-all"
            >
              <Github size={40} />
            </a>
            <a
              href="https://www.linkedin.com/in/abhijeet-sandhu"
              target="_blank"
              rel="noopener noreferrer"
              className="w-20 h-20 border-4 border-background flex items-center justify-center hover:bg-[#0077B5] hover:border-[#0077B5] transition-all"
            >
              <Linkedin size={40} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
