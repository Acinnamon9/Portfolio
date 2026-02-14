"use client";

import { motion } from "framer-motion";
import { Mail, Github, Share2 } from "lucide-react";
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
  );
}
