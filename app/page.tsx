"use client";

import Navbar from "../components/Navbar";
import HeroSection from "../components/sections/HeroSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import SkillsSection from "../components/sections/SkillsSection";
import AboutSection from "../components/sections/AboutSection";
import ContactSection from "../components/sections/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />

      <div className="space-y-24 md:space-y-40 pb-16 md:pb-32">
        <HeroSection />

        <AboutSection />

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

        <ContactSection />
      </div>

      <Footer />
    </main>
  );
}
