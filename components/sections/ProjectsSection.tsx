"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/Card";
import { Button } from "../ui/Button";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

const projects = [
  {
    title: "E-COMMERCE // PLATFORM",
    description:
      "A FULL-FEATURED ONLINE STORE BUILT WITH NEXT.JS, STRIPE, AND SANITY.IO. DRIVING REAL REVENUE THROUGH CLEAN CODE.",
    tags: ["NEXT.JS", "STRIPE", "TAILWIND"],
    link: "#",
    github: "#",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    color: "bg-brand-secondary",
  },
  {
    title: "AI // CHAT ASSISTANT",
    description:
      "INTERACTIVE CHAT INTERFACE POWERED BY GPT-4. FEATURE-RICH WITH MARKDOWN AND HISTORY PERSISTENCE.",
    tags: ["REACT", "OPENAI", "NODE.JS"],
    link: "#",
    github: "#",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad095?w=800&q=80",
    color: "bg-brand-primary",
  },
  {
    title: "PORTFOLIO // V1",
    description:
      "BRUTALIST ARCHITECTURE MEETS MODERN FRONTEND ENGINEERING. BUILT FOR SPEED AND IMPACT.",
    tags: ["NEXT.JS", "TYPESCRIPT", "TAILWIND"],
    link: "#",
    github: "#",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    color: "bg-accent",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="px-6 py-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20 bg-foreground text-background p-10 border-8 border-foreground shadow-[12px_12px_0px_0px_#ffeb3b]">
          <div className="space-y-4">
            <h2 className="text-2xl font-black tracking-widest uppercase italic text-brand-primary">
              Selected Output
            </h2>
            <h3 className="text-6xl md:text-8xl font-black uppercase leading-none">
              THE PORTFOLIO.
            </h3>
          </div>
          <Button
            variant="outline"
            className="text-2xl font-black bg-brand-primary text-foreground border-4 border-foreground h-16 px-10"
          >
            VIEW ALL
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className={cn(
                  "group flex flex-col p-0 border-8 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-8px] hover:translate-y-[-8px] hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] transition-all duration-300",
                  project.color,
                )}
              >
                <div className="relative aspect-video border-b-8 border-foreground overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-foreground/20 group-hover:bg-transparent transition-colors"></div>
                </div>

                <div className="p-8 space-y-6 flex-grow">
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-background border-2 border-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-4xl font-black leading-none uppercase italic group-hover:text-background transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-lg font-bold leading-tight uppercase group-hover:text-background/90 transition-colors">
                    {project.description}
                  </p>
                </div>

                <CardFooter className="p-8 pt-0 border-t-0 flex flex-col gap-4">
                  <Button className="w-full bg-background text-foreground border-4 border-foreground font-black text-xl italic hover:bg-foreground hover:text-background">
                    CASE STUDY // READ
                  </Button>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="flex-1 bg-background border-4 h-16"
                    >
                      <Github size={28} strokeWidth={3} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="flex-1 bg-background border-4 h-16"
                    >
                      <ExternalLink size={28} strokeWidth={3} />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
