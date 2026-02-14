"use client";

import { motion } from "framer-motion";
import { Card, CardFooter } from "../ui/Card";
import { Button } from "../ui/Button";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "../../lib/utils";
import { PROJECTS } from "../../lib/constants";

export default function ProjectsSection() {
  return (
    <section id="projects" className="px-6 py-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20 bg-foreground text-background p-6 md:p-10 border-8 border-foreground shadow-[12px_12px_0px_0px_#ffeb3b]">
          <div className="space-y-4">
            <h2 className="text-xl font-black tracking-widest uppercase italic text-brand-primary">
              Selected Output
            </h2>
            <h3 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase leading-none">
              THE PORTFOLIO.
            </h3>
          </div>
          <Button
            variant="outline"
            className="text-xl md:text-2xl font-black bg-brand-primary text-foreground border-4 border-foreground h-14 md:h-16 px-8 md:px-10"
          >
            VIEW ALL
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className={cn(
                  "group flex flex-col p-0 border-8 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-8px] hover:translate-y-[-8px] hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 h-full",
                  project.color,
                )}
              >
                <div className="relative aspect-video border-b-8 border-foreground overflow-hidden">
                  {project.video ? (
                    <video
                      src={project.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-foreground/20 group-hover:bg-transparent transition-colors pointer-events-none"></div>
                </div>

                <div className="p-6 md:p-8 space-y-4 md:space-y-6 flex-grow">
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] md:text-xs font-black uppercase tracking-widest px-3 py-1 bg-background border-2 border-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-2xl md:text-3xl lg:text-4xl font-black leading-none uppercase italic group-hover:text-background transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-base md:text-lg font-bold leading-tight uppercase group-hover:text-background/90 transition-colors">
                    {project.description}
                  </p>
                </div>

                <CardFooter className="p-6 md:p-8 pt-0 border-t-0 flex flex-col gap-4">
                  <Button className="w-full bg-background text-foreground border-4 border-foreground font-black text-lg md:text-xl italic hover:bg-foreground hover:text-background">
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
