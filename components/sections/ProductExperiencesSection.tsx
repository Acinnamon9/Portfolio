import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    title: "AtomicX — AI Agents & Automation",
    description:
      "Designed and developed an interactive B2B website showcasing AI calling agents, business automation, CRM integrations, and product demonstrations.",
    image: "/projects/atomicx.webp",
    imageAlt: "AtomicX AI agents and automation website",
    href: "https://vite-react-one-jet-80.vercel.app/",
  },
  {
    title: "Kyle Johnson — Digital Marketing Experience",
    description:
      "Built a cinematic, interactive marketing website featuring personalized user journeys, business calculators, event showcases, and custom visual experiences.",
    image: "/projects/kyle-johnson.webp",
    imageAlt: "Kyle Johnson digital marketing website",
    href: "https://kyle-johnson-digital-marketing.vercel.app/",
  },
];

const CONTRIBUTION =
  "Frontend development from the initial concept, direct client collaboration, and implementing feedback and design revisions.";

export default function ProductExperiencesSection() {
  return (
    <section
      id="product-experiences"
      className="snap-center border-t border-foreground/10 bg-background px-4 py-20 sm:px-6 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 border-b border-foreground/15 pb-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/40">
              Product experiences
            </p>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-5xl">
              Product Experiences &amp; Interfaces
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-foreground/65 lg:justify-self-end">
            Alongside operational systems, I build polished, interactive
            websites that turn business goals into clear user experiences.
          </p>
        </div>

        <div className="grid gap-8 pt-10 md:grid-cols-2 md:gap-6 lg:gap-8">
          {PROJECTS.map((project) => (
            <article
              key={project.title}
              className="group flex h-full flex-col border border-foreground/15 bg-background transition-transform duration-300 hover:-translate-y-1 hover:border-foreground/35"
            >
              <div className="relative aspect-video overflow-hidden bg-foreground/5">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 600px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <div className="flex grow flex-col p-5 sm:p-6">
                <h3 className="text-2xl font-semibold leading-tight tracking-[-0.035em] text-foreground sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-foreground/65">
                  {project.description}
                </p>
                <p className="mt-5 border-t border-foreground/10 pt-4 text-sm leading-6 text-foreground/50">
                  <span className="font-semibold text-foreground/70">
                    Contribution:{" "}
                  </span>
                  {CONTRIBUTION}
                </p>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 border-b border-foreground pb-1 text-sm font-semibold text-foreground transition-opacity hover:opacity-60"
                >
                  View Live Project
                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
