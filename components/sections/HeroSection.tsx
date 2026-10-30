"use client";

import { motion } from "framer-motion";
import {
  ArrowDownRight,
  FileDown,
  Mail,
} from "lucide-react";

const CURRENT_FOCUS = [
  "HMEL industrial project platform — NestJS + PostgreSQL",
  "Scoped authorization, scheduling, and field-verification workflows",
];

export default function HeroSection() {
  return (
    <section
      className="
        border-b border-foreground/10
        bg-background px-4 sm:px-6 lg:px-12
      "
      style={{
        paddingTop: "var(--navbar-h, 5rem)",
      }}
    >
      <div
        className="
          mx-auto grid max-w-7xl
          gap-12 py-16
          md:py-20
          lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]
          lg:items-center lg:gap-20 lg:py-24
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="min-w-0"
        >
          <h1
            className="
              max-w-4xl
              text-[clamp(2.75rem,6vw,5.25rem)]
              font-semibold leading-[0.96]
              tracking-[-0.055em] text-foreground
            "
          >
            I design and build software for complex operations.
          </h1>

          <p
            className="
              mt-7 max-w-2xl text-lg leading-8
              text-foreground/70 sm:text-xl
            "
          >
            I work across product flows, interfaces, backend
            services, data models, permissions, and AI
            integrations.
          </p>

          <p
            className="
              mt-3 max-w-2xl text-base leading-7
              text-foreground/50 sm:text-lg
            "
          >
            Recent work includes industrial project management,
            AI-assisted recruitment, voice-agent operations, and
            agentic commerce.
          </p>

          <div
            className="
              mt-8 flex flex-col gap-3
              sm:flex-row sm:flex-wrap
            "
          >
            <a
              href="#work"
              className="
                inline-flex min-h-12 items-center
                justify-center gap-3
                bg-foreground px-6 py-3
                text-sm font-semibold text-background
                transition-opacity hover:opacity-80
              "
            >
              View selected work
              <ArrowDownRight
                size={18}
                strokeWidth={1.9}
                aria-hidden="true"
              />
            </a>

            <a
              href="/documents/abhijeet-resume.pdf"
              download
              className="
                inline-flex min-h-12 items-center
                justify-center gap-3
                border border-foreground/25
                px-6 py-3 text-sm font-semibold
                text-foreground
                transition-colors
                hover:border-foreground
              "
            >
              Resume
              <FileDown
                size={17}
                strokeWidth={1.9}
                aria-hidden="true"
              />
            </a>

            <a
              href="#contact"
              className="
                inline-flex min-h-12 items-center
                justify-center gap-3 px-5 py-3
                text-sm font-semibold text-foreground/65
                transition-colors hover:text-foreground
              "
            >
              Contact
              <Mail
                size={17}
                strokeWidth={1.9}
                aria-hidden="true"
              />
            </a>
          </div>

          <div
            className="
              mt-9 border-t border-foreground/10 pt-5
              text-sm leading-6 text-foreground/45
            "
          >
            Available for product engineering, frontend
            engineering, and full-stack opportunities.
          </div>
        </motion.div>

        <motion.aside
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.1,
          }}
          className="
            border border-foreground/15
            bg-foreground/5 p-5
            sm:p-6
          "
        >
          <div
            className="
              mb-5 flex items-center justify-between
              gap-4 border-b border-foreground/15 pb-4
            "
          >
            <div>
              <p
                className="
                  text-xs font-semibold uppercase
                  tracking-[0.18em] text-foreground/40
                "
              >
                Current focus
              </p>

              <h2
                className="
                  mt-2 text-xl font-semibold
                  tracking-[-0.035em] text-foreground
                "
              >
                Industrial project management
              </h2>
            </div>

            <span
              className="
                shrink-0 border border-foreground/15
                px-3 py-1 text-xs font-medium
                text-foreground/50
              "
            >
              In progress
            </span>
          </div>

          <ul className="space-y-3">
            {CURRENT_FOCUS.map((item, index) => (
              <li
                key={item}
                className="
                  grid grid-cols-[2rem_minmax(0,1fr)]
                  gap-3 text-sm leading-6
                  text-foreground/65
                  sm:text-base
                "
              >
                <span
                  className="
                    pt-0.5 text-xs font-semibold
                    tracking-[0.12em] text-foreground/30
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.aside>
      </div>
    </section>
  );
}
