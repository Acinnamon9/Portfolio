"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, CheckCircle2 } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { cn } from "../../../lib/utils";
import { PROJECTS } from "../../../lib/constants";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Link from "next/link";

export default function CaseStudyPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-black uppercase">PROJECT NOT FOUND</h1>
          <Button
            onClick={() => router.push("/")}
            className="brutalist-button text-xl h-16 px-10"
          >
            <ArrowLeft size={24} className="mr-4" /> BACK HOME
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section
        className={cn(
          "border-b-8 border-foreground relative overflow-hidden",
          project.color,
        )}
        style={{ paddingTop: "calc(var(--navbar-h, 5rem) + 2rem)" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <Link
              href="/#projects"
              className="inline-flex items-center gap-3 font-black text-lg uppercase hover:underline decoration-4 underline-offset-8"
            >
              <ArrowLeft size={20} strokeWidth={3} /> BACK TO PROJECTS
            </Link>

            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs md:text-sm font-black uppercase tracking-widest px-4 py-2 bg-background border-4 border-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase leading-none tracking-tighter italic">
              {project.title}
            </h1>

            <p className="text-xl md:text-2xl font-black max-w-3xl leading-tight uppercase">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              {project.link !== "#" && (
                <Button className="brutalist-button h-16 text-xl px-10" asChild>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={24} className="mr-3" /> LIVE DEMO
                  </a>
                </Button>
              )}
              {project.github !== "#" && (
                <Button
                  variant="outline"
                  className="h-16 text-xl px-10 border-4 border-foreground font-black"
                  asChild
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={24} className="mr-3" /> VIEW CODE
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Image */}
      <section className="border-b-8 border-foreground">
        <div className="max-w-7xl mx-auto">
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full aspect-video object-cover"
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full aspect-video object-cover"
            />
          )}
        </div>
      </section>

      {/* Case Study Content */}
      <section className="py-16 md:py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-16">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">
                OVERVIEW
              </h2>
              <div className="bg-foreground text-background p-6 md:p-8 border-l-16 border-brand-primary">
                <p className="text-lg md:text-xl font-bold leading-tight uppercase">
                  {project.longDescription}
                </p>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">
                KEY FEATURES
              </h2>
              <ul className="space-y-4">
                {project.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 items-start p-4 border-4 border-foreground bg-brand-primary/10"
                  >
                    <CheckCircle2
                      size={24}
                      strokeWidth={3}
                      className="shrink-0 mt-0.5"
                    />
                    <span className="font-black text-lg uppercase tracking-tight">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Challenges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic">
                CHALLENGES
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.challenges.map((challenge, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 border-4 border-foreground bg-foreground text-background"
                  >
                    <span className="text-5xl font-black text-brand-primary block mb-4">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-black text-lg uppercase leading-tight">
                      {challenge}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-40 space-y-8">
              {/* Outcome Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="brutalist-card p-8 bg-brand-primary space-y-6"
              >
                <h3 className="text-2xl font-black italic tracking-tighter uppercase">
                  THE OUTCOME
                </h3>
                <p className="text-lg font-bold leading-tight uppercase">
                  {project.outcome}
                </p>
              </motion.div>

              {/* Tech Stack Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="brutalist-card p-8 bg-brand-secondary space-y-6"
              >
                <h3 className="text-2xl font-black italic tracking-tighter uppercase">
                  TECH STACK
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-foreground text-background font-black text-sm uppercase border-4 border-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Links */}
              <div className="space-y-4">
                {project.link !== "#" && (
                  <Button
                    className="w-full brutalist-button h-16 text-xl"
                    asChild
                  >
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={20} className="mr-3" /> LIVE DEMO
                    </a>
                  </Button>
                )}
                {project.github !== "#" && (
                  <Button
                    variant="outline"
                    className="w-full h-16 text-xl border-4 font-black"
                    asChild
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={20} className="mr-3" /> SOURCE CODE
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next / Prev Navigation */}
      <section className="border-t-8 border-foreground bg-foreground text-background px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <Link
              href="/#projects"
              className="text-2xl font-black uppercase hover:text-brand-primary transition-colors"
            >
              ← ALL PROJECTS
            </Link>
            {(() => {
              const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
              const nextProject =
                PROJECTS[(currentIndex + 1) % PROJECTS.length];
              return (
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="text-2xl font-black uppercase hover:text-brand-primary transition-colors"
                >
                  NEXT: {nextProject.title} →
                </Link>
              );
            })()}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
