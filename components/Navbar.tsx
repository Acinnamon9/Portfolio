"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FileDown,
  Github,
  Linkedin,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import Link from "next/link";

const NAVIGATION = [
  {
    label: "Work",
    href: "/#work",
  },
  {
    label: "Contact",
    href: "/#contact",
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const initialTheme = storedTheme === "dark" ? "dark" : "light";

    setTheme(initialTheme);
    document.documentElement.setAttribute(
      "data-theme",
      initialTheme,
    );
  }, []);

  useEffect(() => {
    const nav = navRef.current;

    if (!nav) {
      return;
    }

    const updateNavbarHeight = () => {
      document.documentElement.style.setProperty(
        "--navbar-h",
        `${nav.getBoundingClientRect().height}px`,
      );
    };

    updateNavbarHeight();

    const observer = new ResizeObserver(updateNavbarHeight);
    observer.observe(nav);

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";

    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute(
      "data-theme",
      nextTheme,
    );
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className="
        fixed inset-x-0 top-0 z-50
        border-b border-foreground/10
        bg-background/95 backdrop-blur-md
      "
    >
      <div
        className="
          mx-auto flex h-20 max-w-7xl
          items-center justify-between
          px-4 sm:px-6 lg:px-12
        "
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="
            group flex min-w-0 items-center
            gap-3 text-foreground
          "
        >
          <span
            className="
              whitespace-nowrap text-lg font-semibold
              tracking-[-0.025em]
              transition-opacity group-hover:opacity-60
              sm:text-xl
            "
          >
            Abhijeet Singh
          </span>

          <span
            className="
              hidden border-l border-foreground/20
              pl-3 text-xs font-medium uppercase
              tracking-[0.16em] text-foreground/45
              sm:block
            "
          >
            Software Engineer
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {NAVIGATION.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="
                text-sm font-medium text-foreground/65
                transition-colors hover:text-foreground
              "
            >
              {item.label}
            </a>
          ))}

          <a
            href="/Abhijeet_Resume.pdf"
            download
            className="
              inline-flex items-center gap-2
              text-sm font-medium text-foreground/65
              transition-colors hover:text-foreground
            "
          >
            Resume
            <FileDown
              size={16}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </a>

          <a
            href="https://github.com/Acinnamon9"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Abhijeet's GitHub profile"
            className="
              text-foreground/55
              transition-colors hover:text-foreground
            "
          >
            <Github size={19} strokeWidth={1.8} />
          </a>

          <a
            href="https://www.linkedin.com/in/abhijeet-sandhu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Abhijeet's LinkedIn profile"
            className="
              text-foreground/55
              transition-colors hover:text-foreground
            "
          >
            <Linkedin size={19} strokeWidth={1.8} />
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "light"
                ? "Switch to dark theme"
                : "Switch to light theme"
            }
            className="
              flex h-9 w-9 items-center justify-center
              border border-foreground/15
              text-foreground/65
              transition-colors
              hover:border-foreground/40
              hover:text-foreground
            "
          >
            {theme === "light" ? (
              <Moon size={17} strokeWidth={1.8} />
            ) : (
              <Sun size={17} strokeWidth={1.8} />
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "light"
                ? "Switch to dark theme"
                : "Switch to light theme"
            }
            className="
              flex h-10 w-10 items-center justify-center
              border border-foreground/15
              text-foreground/70
            "
          >
            {theme === "light" ? (
              <Moon size={18} strokeWidth={1.8} />
            ) : (
              <Sun size={18} strokeWidth={1.8} />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label={
              isMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            className="
              flex h-10 w-10 items-center justify-center
              border border-foreground/15
              text-foreground
            "
          >
            {isMenuOpen ? (
              <X size={20} strokeWidth={1.8} />
            ) : (
              <Menu size={20} strokeWidth={1.8} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              overflow-hidden border-t
              border-foreground/10 bg-background md:hidden
            "
          >
            <div className="space-y-1 px-4 py-5 sm:px-6">
              {NAVIGATION.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="
                    block border-b border-foreground/10
                    py-4 text-lg font-medium text-foreground
                  "
                >
                  {item.label}
                </a>
              ))}

              <a
                href="/Abhijeet_Resume.pdf"
                download
                onClick={closeMenu}
                className="
                  flex items-center justify-between
                  border-b border-foreground/10
                  py-4 text-lg font-medium text-foreground
                "
              >
                Resume
                <FileDown size={19} strokeWidth={1.8} />
              </a>

              <a
                href="https://github.com/Acinnamon9"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="
                  flex items-center justify-between
                  border-b border-foreground/10
                  py-4 text-lg font-medium text-foreground
                "
              >
                GitHub
                <Github size={19} strokeWidth={1.8} />
              </a>

              <a
                href="https://www.linkedin.com/in/abhijeet-sandhu"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="
                  flex items-center justify-between
                  py-4 text-lg font-medium text-foreground
                "
              >
                LinkedIn
                <Linkedin size={19} strokeWidth={1.8} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}