"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, Moon, Sun, FileDown, Linkedin } from "lucide-react";
import { cn } from "../lib/utils";
import Link from "next/link";

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [activeSection, setActiveSection] = useState<string>("");
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    lastScrollY.current = latest;
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const navLinks = [
    { name: "About", href: "/#about", sectionId: "about" },
    { name: "Projects", href: "/#projects", sectionId: "projects" },
    { name: "Skills", href: "/#skills", sectionId: "skills" },
    { name: "Contact", href: "/#contact", sectionId: "contact" },
  ];

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["about", "projects", "skills", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navRef = useRef<HTMLElement>(null);

  // Expose navbar height as a CSS variable so other sections can avoid overlap
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      document.documentElement.style.setProperty(
        "--navbar-h",
        `${entry.borderBoxSize[0].blockSize}px`,
      );
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      ref={navRef}
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 w-full z-50 px-6 py-4 border-b-8 border-foreground bg-background shadow-[0px_8px_0px_0px_rgba(0,0,0,0.1)] opacity-100"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black bg-foreground text-background px-4 py-2 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] leading-none italic cursor-pointer"
          >
            ABHIJEET.
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex gap-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={cn(
                    "text-xl font-black underline decoration-4 underline-offset-8 transition-all uppercase tracking-tighter",
                    activeSection === link.sectionId
                      ? "text-brand-secondary decoration-brand-secondary"
                      : "decoration-transparent hover:text-brand-secondary hover:decoration-brand-secondary",
                  )}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <a
              href="/Abhijeet_Resume.pdf"
              download
              className="p-3 border-4 border-foreground bg-brand-secondary shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              title="Download Resume"
            >
              <FileDown size={24} strokeWidth={3} />
            </a>
            <a
              href="https://www.linkedin.com/in/abhijeet-sandhu"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border-4 border-foreground bg-[#0077B5] text-white shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              title="LinkedIn"
            >
              <Linkedin size={24} strokeWidth={3} />
            </a>
            <button
              onClick={toggleTheme}
              className="p-3 border-4 border-foreground bg-brand-primary shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              {theme === "light" ? (
                <Moon size={24} strokeWidth={3} />
              ) : (
                <Sun size={24} strokeWidth={3} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 border-4 border-foreground"
          >
            {isMobileMenuOpen ? (
              <X size={28} strokeWidth={4} />
            ) : (
              <Menu size={28} strokeWidth={4} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden bg-background border-t-8 border-foreground overflow-hidden"
          >
            <ul className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-4xl font-black block uppercase italic transition-colors",
                      activeSection === link.sectionId
                        ? "text-brand-secondary"
                        : "",
                    )}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="pt-6 border-t-4 border-foreground flex flex-col gap-6">
                <a
                  href="/Abhijeet_Resume.pdf"
                  download
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-black uppercase flex items-center gap-4"
                >
                  <FileDown size={24} strokeWidth={3} /> DOWNLOAD RESUME
                </a>
                <a
                  href="https://www.linkedin.com/in/abhijeet-sandhu"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-black uppercase flex items-center gap-4"
                >
                  <Linkedin size={24} strokeWidth={3} /> LINKEDIN
                </a>
                <button
                  onClick={toggleTheme}
                  className="text-2xl font-black uppercase flex items-center gap-4"
                >
                  {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
                  TOGGLE THEME
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
