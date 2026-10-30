"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Maximize2, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const PROJECTS = [
  {
    number: "01",
    title: "HMEL industrial project-management platform",
    companyHref: "https://en.wikipedia.org/wiki/HPCL-Mittal_Energy_Limited",
    image: "/images/hmel/HMEL.png",
    imageAlt: "HMEL construction operations management platform showcase.",
    imageWidth: 1122,
    imageHeight: 1402,
    category: "Backend architecture and operational workflows",
    context:
      "A system for HPCL-Mittal Energy Limited (HMEL) coordinating project planning, field execution, verification, and management visibility.",
    contribution:
      "Designed backend boundaries, Organization → Project → Site authorization, transactional field workflows, audit/outbox reliability, API contracts, and migrations.",
    decision:
      "Modelled access around site hierarchy and permission scope instead of hard-coding behaviour directly to role labels.",
    status: "Complete",
    presentation: "standard",
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
    image: "/images/hiring/Hiring.png",
    imageAlt: "TalentStream AI hiring platform dashboard and workflow showcase.",
    imageWidth: 1536,
    imageHeight: 1024,
    liveHref: "https://talentstream.ravan.ai",
    category: "Multi-role product and integration work",
    context:
      "A recruitment system connecting requisitions, candidates, AI screening, recruiter workspaces, interviews, communications, and decisions.",
    contribution:
      "Modelled connected recruitment workflows and worked on AI screening attempts, callback/retry paths, idempotent webhooks, resume processing, provider integrations, and production debugging.",
    decision:
      "Treated recruitment as an end-to-end workflow system rather than a collection of independent dashboards.",
    status: "Complete",
    presentation: "standard",
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
    status: "Currently building",
    presentation: "building",
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
    presentation: "standard",
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

function ExpandableProjectImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen && !dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Expand image: ${alt}`}
        className="group relative block w-full cursor-zoom-in text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
        />
        <span className="absolute bottom-3 right-3 inline-flex translate-y-2 items-center gap-2 bg-foreground px-3 py-2 text-xs font-medium text-background opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
          <Maximize2 size={14} aria-hidden="true" />
          Expand image
        </span>
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            dialogRef.current?.close();
          }
        }}
        aria-label="Expanded project image"
        className="m-auto max-h-[94dvh] max-w-[96vw] overflow-visible border-0 bg-transparent p-0 backdrop:bg-black/80"
      >
        <div className="relative rounded-lg bg-background p-2 shadow-2xl sm:p-3">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close expanded image"
            className="absolute right-3 top-3 z-10 inline-flex size-10 items-center justify-center rounded-full bg-foreground text-background transition-opacity hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background"
          >
            <X size={20} aria-hidden="true" />
          </button>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="max-h-[88dvh] w-auto max-w-[92vw] object-contain"
            priority
          />
        </div>
      </dialog>
    </>
  );
}

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
              className={`
                snap-center grid gap-8 border-b
                border-foreground/15 py-10
                lg:grid-cols-[4rem_minmax(0,1.1fr)_minmax(300px,0.9fr)]
                lg:gap-10 ${project.presentation === "building" ? "lg:py-10" : "lg:py-16"}
              `}
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
                  {"companyHref" in project ? (
                    <>
                      <a
                        href={project.companyHref}
                        target="_blank"
                        rel="noreferrer"
                        className="underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
                      >
                        HMEL
                      </a>
                      {project.title.slice("HMEL".length)}
                    </>
                  ) : (
                    project.title
                  )}
                </h3>

                <p
                  className="
                    mt-5 max-w-2xl text-base leading-7
                    text-foreground/65 sm:text-lg
                  "
                >
                  {project.context}
                </p>

                {"image" in project &&
                  "imageAlt" in project &&
                  "imageWidth" in project &&
                  "imageHeight" in project && (
                  <div className="mt-7 max-w-xl overflow-hidden border border-foreground/10">
                    <ExpandableProjectImage
                      src={project.image}
                      alt={project.imageAlt}
                      width={project.imageWidth}
                      height={project.imageHeight}
                    />
                  </div>
                )}

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

              </div>

              <div className="flex h-full flex-col">
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
                      {"liveHref" in project ? (
                        <a
                          href={project.liveHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
                        >
                          {project.status}
                        </a>
                      ) : (
                        project.status
                      )}
                    </dd>
                  </div>
                </dl>

                <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8">
                  {project.href ? (
                    <Link
                      href={project.href}
                      className="
                        inline-flex items-center gap-2
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
                        text-xs font-medium uppercase
                        tracking-[0.14em] text-foreground/30
                      "
                    >
                      Detailed case study coming later
                    </p>
                  )}

                  {"liveHref" in project && (
                    <a
                      href={project.liveHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex items-center gap-2
                        border-b border-foreground/40 pb-1
                        text-sm font-semibold text-foreground/70
                        transition-colors hover:border-foreground
                        hover:text-foreground
                      "
                    >
                      Visit TalentStream
                      <ArrowUpRight
                        size={17}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
