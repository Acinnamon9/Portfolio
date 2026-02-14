"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { cn } from "../lib/utils";

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
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
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
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
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-black bg-foreground text-background px-4 py-2 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] leading-none italic"
        >
          ABHIJEET.
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex gap-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-xl font-black hover:text-brand-secondary underline decoration-4 underline-offset-8 decoration-transparent hover:decoration-brand-secondary transition-all uppercase tracking-tighter"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
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
                    className="text-4xl font-black block uppercase italic"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="pt-6 border-t-4 border-foreground">
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
