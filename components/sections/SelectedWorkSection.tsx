"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const PROJECTS = [
  {
    number: "01",
    title: "HMEL industrial project-management platform",
    category: "Backend architecture and operational workflows",
    context:
      "A system for HPCL-Mittal Energy Limited (HMEL) coordinating project planning, field execution, verification, and management visibility.",
    contribution:
      "Backend foundation, domain modelling, authorization design, API contracts, migrations, and activity-retrieval implementation.",
    decision:
      "Modelled access around site hierarchy and permission scope instead of hard-coding behaviour directly to role labels.",
    status: "Active development",
    stack: [
      "NestJS",
      "PostgreSQL",
      "TypeORM",
      "REST APIs",
      "RBAC",
    ],
    href: "/work/industrial-project-management",
  },
  {
    number: "02",
    title: "AI recruitment platform",
    category: "Multi-role product and integration work",
    context:
      "A recruitment system connecting requisitions, candidates, AI screening, recruiter workspaces, interviews, communications, and decisions.",
    contribution:
      "Worked across recruiter and manager workflows, communication delivery, permissions, dashboards, email integration, and production debugging.",
    decision:
      "Treated recruitment as an end-to-end workflow system rather than a collection of independent dashboards.",
    status: "Implemented in stages",
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Clerk",
      "Resend",
    ],
    href: "/work/ai-recruitment-platform",
  },
  {
    number: "03",
    title: "AI calling operations",
    category: "Voice-agent product systems",
    context:
      "Product flows connecting workspaces, call goals, agents, phone numbers, contacts, calls, transcripts, outcomes, and follow-ups.",
    contribution:
      "Worked on product modelling, frontend experiences, provider integrations, appointment flows, email delivery, and product positioning.",
    decision:
      "Focused the product around business outcomes after the call, not only the voice interaction itself.",
    status: "Ongoing product work",
    stack: [
      "Next.js",
      "Webhooks",
      "AI calling",
      "Email",
      "Integrations",
    ],
    href: null,
  },
  {
    number: "04",
    title: "Voice-driven agentic commerce",
    category: "Agentic commerce and browser execution",
    context:
      "An experimental e-commerce system where a conversational AI understands the shopper’s page and cart, searches a grounded catalog, and performs shopping actions directly in the browser.",
    contribution:
      "Designed and implemented the storefront-agent integration, session architecture, browser action bridge, commerce tools, product grounding, voice interface, and execution feedback loop.",
    decision:
      "Separated AI intent from browser execution: the model requests typed actions, while a deterministic client-side bridge validates and performs them, then reports the real outcome back to the agent.",
    status: "Working prototype",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "LiveKit / WebRTC",
      "AI tool calling",
    ],
    href: null,
  },
];

export default function SelectedWorkSection() {
  return (
    <section
      id="work"
      className="
        bg-background px-4 py-20
        sm:px-6 sm:py-24
        lg:px-12 lg:py-28
      "
    >
      <div className="mx-auto max-w-7xl">
        <div
          className="
            grid gap-8 border-b
            border-foreground/15 pb-10
            lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]
          "
        >
          <div>
            <p
              className="
                text-xs font-semibold uppercase
                tracking-[0.2em] text-foreground/40
              "
            >
              Selected work
            </p>

            <h2
              className="
                mt-4 max-w-xl text-4xl font-semibold
                leading-[1.02] tracking-[-0.045em]
                text-foreground
                sm:text-5xl
              "
            >
              Systems shaped around real operational problems.
            </h2>
          </div>

          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-lg leading-8 text-foreground/65">
              My recent work has moved beyond isolated
              interfaces into workflows, authorization,
              backend systems, data modelling, and external
              integrations.
            </p>

            <p className="mt-4 text-sm leading-6 text-foreground/45">
              Some product details are generalized because
              the systems are internal or client-facing.
              Contributions described below refer specifically
              to my own work or direct involvement.
            </p>
          </div>
        </div>

        <div>
          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.number}
              initial={{
                opacity: 0,
                y: 16,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.45,
                delay: index * 0.05,
              }}
              className="
                grid gap-8 border-b
                border-foreground/15 py-12
                lg:grid-cols-[4rem_minmax(0,1.1fr)_minmax(300px,0.9fr)]
                lg:gap-10 lg:py-16
              "
            >
              <div
                className="
                  text-xs font-semibold tracking-[0.15em]
                  text-foreground/30
                "
              >
                {project.number}
              </div>

              <div>
                <p
                  className="
                    text-xs font-semibold uppercase
                    tracking-[0.16em] text-foreground/40
                  "
                >
                  {project.category}
                </p>

                <h3
                  className="
                    mt-3 max-w-2xl text-3xl font-semibold
                    leading-tight tracking-[-0.035em]
                    text-foreground
                    sm:text-4xl
                  "
                >
                  {project.title}
                </h3>

                <p
                  className="
                    mt-5 max-w-2xl text-base leading-7
                    text-foreground/65 sm:text-lg
                  "
                >
                  {project.context}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {project.stack.map((technology) => (
                    <span
                      key={technology}
                      className="
                        border border-foreground/15
                        px-3 py-1.5 text-xs font-medium
                        text-foreground/55
                      "
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                {project.href ? (
                  <Link
                    href={project.href}
                    className="
                      mt-8 inline-flex items-center gap-2
                      border-b border-foreground pb-1
                      text-sm font-semibold text-foreground
                      transition-opacity hover:opacity-60
                    "
                  >
                    Read case study
                    <ArrowUpRight
                      size={17}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </Link>
                ) : (
                  <p
                    className="
                      mt-8 text-xs font-medium uppercase
                      tracking-[0.14em] text-foreground/30
                    "
                  >
                    Detailed case study coming later
                  </p>
                )}
              </div>

              <dl className="space-y-6">
                <div>
                  <dt
                    className="
                      text-xs font-semibold uppercase
                      tracking-[0.16em] text-foreground/35
                    "
                  >
                    My contribution
                  </dt>

                  <dd
                    className="
                      mt-2 text-sm leading-6
                      text-foreground/65 sm:text-base
                    "
                  >
                    {project.contribution}
                  </dd>
                </div>

                <div>
                  <dt
                    className="
                      text-xs font-semibold uppercase
                      tracking-[0.16em] text-foreground/35
                    "
                  >
                    Important decision
                  </dt>

                  <dd
                    className="
                      mt-2 text-sm leading-6
                      text-foreground/65 sm:text-base
                    "
                  >
                    {project.decision}
                  </dd>
                </div>

                <div>
                  <dt
                    className="
                      text-xs font-semibold uppercase
                      tracking-[0.16em] text-foreground/35
                    "
                  >
                    Status
                  </dt>

                  <dd className="mt-2 text-sm font-medium text-foreground">
                    {project.status}
                  </dd>
                </div>
              </dl>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
