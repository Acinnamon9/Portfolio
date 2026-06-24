import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleDashed,
  ExternalLink,
  GitBranch,
  Layers3,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import Navbar from "../../../components/Navbar";

export const metadata: Metadata = {
  title:
    "Industrial Project-Management Platform | Abhijeet Singh",
  description:
    "A case study covering backend architecture, site-scoped authorization, schedules, activity retrieval, progress workflows, and operational requirements.",
};

const PLATFORM_AREAS = [
  {
    title: "Site operations",
    description:
      "Field teams record work, resources, hindrances, attendance, and supporting evidence from active project sites.",
  },
  {
    title: "Progress control",
    description:
      "Submitted progress moves through review and approval before becoming part of the trusted project record.",
  },
  {
    title: "Project visibility",
    description:
      "Supervisors and management need information scoped to the sites and projects they are authorized to oversee.",
  },
  {
    title: "Administration",
    description:
      "Administrators configure users, roles, permissions, schedules, and project structures without hard-coding every organizational change.",
  },
];

const CONTRIBUTIONS = [
  "Established and validated the NestJS backend foundation.",
  "Worked on the PostgreSQL and TypeORM domain model and migrations.",
  "Defined API contracts around projects, sites, schedules, and activities.",
  "Helped interpret incomplete and occasionally conflicting operational requirements.",
  "Designed authorization around permissions, scope, and site ancestry.",
  "Planned implementation as small end-to-end capabilities rather than one large release.",
];

const AUTHORIZATION_FLOW = [
  {
    number: "01",
    title: "Authenticate the user",
    description:
      "Resolve the identity making the request before any project data is queried.",
  },
  {
    number: "02",
    title: "Resolve site ancestry",
    description:
      "Determine how the requested site belongs to the wider project and organizational hierarchy.",
  },
  {
    number: "03",
    title: "Evaluate permission at site scope",
    description:
      "Check whether the user has the required capability for that site or an authorized ancestor.",
  },
  {
    number: "04",
    title: "Select the active schedule version",
    description:
      "Avoid returning obsolete activities from superseded project schedules.",
  },
  {
    number: "05",
    title: "Return authorized activities",
    description:
      "Query only the activities belonging to the permitted project, site, and active schedule version.",
  },
];

const DECISIONS = [
  {
    icon: ShieldCheck,
    title: "Permissions instead of rigid role behaviour",
    description:
      "L1, L2, and L3 remain useful default role templates, but system behaviour is expressed through permissions. This allows administrators to adjust responsibilities without rewriting business logic.",
  },
  {
    icon: GitBranch,
    title: "Authorization follows site hierarchy",
    description:
      "Access is not treated as a flat project-wide flag. A user may be authorized at a specific site, across descendants of a parent site, or at a broader project scope.",
  },
  {
    icon: Layers3,
    title: "Activities belong to schedule versions",
    description:
      "Project schedules change over time. Activity retrieval therefore selects the active schedule version rather than mixing current and superseded planning data.",
  },
  {
    icon: Workflow,
    title: "Small complete paths before broad coverage",
    description:
      "The implementation is divided into useful vertical increments: authenticate, authorize, query, and return one complete resource flow before expanding the platform.",
  },
];

const STATUS = [
  {
    state: "complete",
    title: "Application and database foundation",
    description:
      "NestJS application structure, PostgreSQL connectivity, migrations, liveness checks, and readiness checks.",
  },
  {
    state: "complete",
    title: "Role and access direction",
    description:
      "Default role templates, configurable permissions, administrative responsibility, and site-scoped authorization rules.",
  },
  {
    state: "active",
    title: "Schedule and activity capabilities",
    description:
      "Retrieval paths for activities belonging to authorized sites and active schedule versions.",
  },
  {
    state: "planned",
    title: "Progress, attendance, and approvals",
    description:
      "Field submissions, supporting evidence, attendance and visit tracking, review, rejection, and approval flows.",
  },
];

export default function IndustrialProjectManagementCaseStudy() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <header
        className="
          border-b border-foreground/10
          px-4 sm:px-6 lg:px-12
        "
        style={{
          paddingTop: "var(--navbar-h, 5rem)",
        }}
      >
        <div className="mx-auto max-w-6xl py-14 sm:py-20 lg:py-24">
          <Link
            href="/#work"
            className="
              inline-flex items-center gap-2
              text-sm font-medium text-foreground/55
              transition-colors hover:text-foreground
            "
          >
            <ArrowLeft
              size={17}
              strokeWidth={1.8}
              aria-hidden="true"
            />
            Back to selected work
          </Link>

          <div
            className="
              mt-12 grid gap-12
              lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.65fr)]
              lg:gap-20
            "
          >
            <div>
              <p
                className="
                  text-xs font-semibold uppercase
                  tracking-[0.2em] text-foreground/40
                "
              >
                Case study 01 · Active development
              </p>

              <h1
                className="
                  mt-5 max-w-4xl
                  text-[clamp(2.75rem,6vw,5.5rem)]
                  font-semibold leading-[0.95]
                  tracking-[-0.055em]
                "
              >
                Industrial project-management platform
              </h1>

              <p
                className="
                  mt-7 max-w-3xl text-lg leading-8
                  text-foreground/65 sm:text-xl
                "
              >
                A mobile-first operational system for site
                activity, project schedules, progress reporting,
                attendance, review, approval, and management
                visibility.
              </p>
            </div>

            <dl
              className="
                divide-y divide-foreground/10
                border-y border-foreground/10
              "
            >
              <div className="grid grid-cols-[6rem_1fr] gap-4 py-4">
                <dt
                  className="
                    text-xs font-semibold uppercase
                    tracking-[0.14em] text-foreground/35
                  "
                >
                  Role
                </dt>
                <dd className="text-sm leading-6 text-foreground/70">
                  Backend and product engineering
                </dd>
              </div>

              <div className="grid grid-cols-[6rem_1fr] gap-4 py-4">
                <dt
                  className="
                    text-xs font-semibold uppercase
                    tracking-[0.14em] text-foreground/35
                  "
                >
                  Focus
                </dt>
                <dd className="text-sm leading-6 text-foreground/70">
                  Architecture, data, authorization, APIs
                </dd>
              </div>

              <div className="grid grid-cols-[6rem_1fr] gap-4 py-4">
                <dt
                  className="
                    text-xs font-semibold uppercase
                    tracking-[0.14em] text-foreground/35
                  "
                >
                  Stack
                </dt>
                <dd className="text-sm leading-6 text-foreground/70">
                  NestJS, PostgreSQL, TypeORM, REST
                </dd>
              </div>

              <div className="grid grid-cols-[6rem_1fr] gap-4 py-4">
                <dt
                  className="
                    text-xs font-semibold uppercase
                    tracking-[0.14em] text-foreground/35
                  "
                >
                  Context
                </dt>
                <dd className="text-sm leading-6 text-foreground/70">
                  Internal and client-facing product
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </header>

      <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div
            className="
              grid gap-10
              lg:grid-cols-[minmax(220px,0.4fr)_minmax(0,1fr)]
              lg:gap-20
            "
          >
            <div>
              <p
                className="
                  text-xs font-semibold uppercase
                  tracking-[0.2em] text-foreground/40
                "
              >
                01 · Context
              </p>
            </div>

            <div>
              <h2
                className="
                  max-w-3xl text-3xl font-semibold
                  leading-tight tracking-[-0.04em]
                  sm:text-4xl
                "
              >
                The difficult part was not creating another dashboard.
              </h2>

              <div
                className="
                  mt-7 max-w-3xl space-y-5
                  text-base leading-8 text-foreground/65
                  sm:text-lg
                "
              >
                <p>
                  The platform has to represent how work actually
                  moves through an industrial project: scheduled
                  activities are performed at sites, field progress
                  is submitted with evidence, supervisors review the
                  submission, and approved information becomes part
                  of the project record.
                </p>

                <p>
                  Requirements arrived through documents, spreadsheet
                  schedules, team interpretations, and conversations.
                  Some rules were incomplete or contradictory. The
                  engineering work therefore included determining
                  what the system should mean before deciding how it
                  should be implemented.
                </p>
              </div>
            </div>
          </div>

          <div
            className="
              mt-14 grid gap-px overflow-hidden
              border border-foreground/10
              bg-foreground/10
              sm:grid-cols-2
            "
          >
            {PLATFORM_AREAS.map((area) => (
              <article
                key={area.title}
                className="bg-background p-6 sm:p-8"
              >
                <h3
                  className="
                    text-xl font-semibold
                    tracking-[-0.025em]
                  "
                >
                  {area.title}
                </h3>

                <p
                  className="
                    mt-3 text-sm leading-6
                    text-foreground/60 sm:text-base
                  "
                >
                  {area.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="
          border-y border-foreground/10
          bg-foreground/5
          px-4 py-20
          sm:px-6 sm:py-24
          lg:px-12
        "
      >
        <div className="mx-auto max-w-6xl">
          <div
            className="
              grid gap-10
              lg:grid-cols-[minmax(220px,0.4fr)_minmax(0,1fr)]
              lg:gap-20
            "
          >
            <div>
              <p
                className="
                  text-xs font-semibold uppercase
                  tracking-[0.2em] text-foreground/40
                "
              >
                02 · My contribution
              </p>
            </div>

            <div>
              <h2
                className="
                  max-w-3xl text-3xl font-semibold
                  leading-tight tracking-[-0.04em]
                  sm:text-4xl
                "
              >
                Turning operational ambiguity into backend boundaries.
              </h2>

              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                {CONTRIBUTIONS.map((contribution) => (
                  <div
                    key={contribution}
                    className="
                      flex gap-3 border-t
                      border-foreground/15 pt-4
                    "
                  >
                    <CheckCircle2
                      size={18}
                      strokeWidth={1.7}
                      className="mt-1 shrink-0 text-foreground/45"
                      aria-hidden="true"
                    />

                    <p
                      className="
                        text-sm leading-6
                        text-foreground/65 sm:text-base
                      "
                    >
                      {contribution}
                    </p>
                  </div>
                ))}
              </div>

              <p
                className="
                  mt-8 max-w-3xl text-sm leading-7
                  text-foreground/45
                "
              >
                This is collaborative product work. My contribution
                is the architecture, backend implementation, and
                requirement interpretation described here—not sole
                ownership of the entire platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div
            className="
              grid gap-10
              lg:grid-cols-[minmax(220px,0.4fr)_minmax(0,1fr)]
              lg:gap-20
            "
          >
            <div>
              <p
                className="
                  text-xs font-semibold uppercase
                  tracking-[0.2em] text-foreground/40
                "
              >
                03 · Request flow
              </p>
            </div>

            <div>
              <h2
                className="
                  max-w-3xl text-3xl font-semibold
                  leading-tight tracking-[-0.04em]
                  sm:text-4xl
                "
              >
                Activity retrieval is also an authorization problem.
              </h2>

              <p
                className="
                  mt-6 max-w-3xl text-base leading-8
                  text-foreground/60 sm:text-lg
                "
              >
                Returning a list of activities requires more than a
                database query. The system must establish identity,
                understand site hierarchy, evaluate scoped access,
                and select the current schedule before data can be
                returned safely.
              </p>

              <ol
                className="
                  mt-10 border-y border-foreground/15
                "
              >
                {AUTHORIZATION_FLOW.map((step) => (
                  <li
                    key={step.number}
                    className="
                      grid gap-4 border-b
                      border-foreground/10 py-6
                      last:border-b-0
                      sm:grid-cols-[3rem_14rem_minmax(0,1fr)]
                      sm:items-start
                    "
                  >
                    <span
                      className="
                        text-xs font-semibold
                        tracking-[0.14em] text-foreground/30
                      "
                    >
                      {step.number}
                    </span>

                    <h3 className="font-semibold text-foreground">
                      {step.title}
                    </h3>

                    <p
                      className="
                        text-sm leading-6
                        text-foreground/60 sm:text-base
                      "
                    >
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section
        className="
          border-y border-foreground/10
          bg-foreground text-background
          px-4 py-20
          sm:px-6 sm:py-24
          lg:px-12
        "
      >
        <div className="mx-auto max-w-6xl">
          <p
            className="
              text-xs font-semibold uppercase
              tracking-[0.2em] text-background/40
            "
          >
            Authorization path
          </p>

          <div
            className="
              mt-8 grid gap-3
              md:grid-cols-5
            "
          >
            {[
              "Authenticate",
              "Resolve ancestry",
              "Evaluate scope",
              "Select active schedule",
              "Return activities",
            ].map((item, index) => (
              <div
                key={item}
                className="
                  flex min-h-28 flex-col
                  justify-between border
                  border-background/20 p-4
                "
              >
                <span
                  className="
                    text-xs font-semibold
                    tracking-[0.14em] text-background/30
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="mt-6 text-sm font-medium leading-5">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div
            className="
              grid gap-10
              lg:grid-cols-[minmax(220px,0.4fr)_minmax(0,1fr)]
              lg:gap-20
            "
          >
            <div>
              <p
                className="
                  text-xs font-semibold uppercase
                  tracking-[0.2em] text-foreground/40
                "
              >
                04 · Decisions
              </p>
            </div>

            <div>
              <h2
                className="
                  max-w-3xl text-3xl font-semibold
                  leading-tight tracking-[-0.04em]
                  sm:text-4xl
                "
              >
                Architectural choices made for change, not only today.
              </h2>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                {DECISIONS.map((decision) => {
                  const Icon = decision.icon;

                  return (
                    <article
                      key={decision.title}
                      className="
                        border-t border-foreground/20 pt-5
                      "
                    >
                      <Icon
                        size={22}
                        strokeWidth={1.6}
                        className="text-foreground/45"
                        aria-hidden="true"
                      />

                      <h3
                        className="
                          mt-5 text-xl font-semibold
                          tracking-[-0.025em]
                        "
                      >
                        {decision.title}
                      </h3>

                      <p
                        className="
                          mt-3 text-sm leading-7
                          text-foreground/60 sm:text-base
                        "
                      >
                        {decision.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="
          border-y border-foreground/10
          bg-foreground/5
          px-4 py-20
          sm:px-6 sm:py-24
          lg:px-12
        "
      >
        <div className="mx-auto max-w-6xl">
          <div
            className="
              grid gap-10
              lg:grid-cols-[minmax(220px,0.4fr)_minmax(0,1fr)]
              lg:gap-20
            "
          >
            <div>
              <p
                className="
                  text-xs font-semibold uppercase
                  tracking-[0.2em] text-foreground/40
                "
              >
                05 · Current state
              </p>
            </div>

            <div>
              <h2
                className="
                  max-w-3xl text-3xl font-semibold
                  leading-tight tracking-[-0.04em]
                  sm:text-4xl
                "
              >
                Presented as work in progress, not as a finished product.
              </h2>

              <div className="mt-10 space-y-3">
                {STATUS.map((item) => (
                  <article
                    key={item.title}
                    className="
                      grid gap-4 border
                      border-foreground/10
                      bg-background p-5
                      sm:grid-cols-[1.5rem_14rem_minmax(0,1fr)]
                      sm:items-start sm:p-6
                    "
                  >
                    {item.state === "complete" ? (
                      <CheckCircle2
                        size={18}
                        strokeWidth={1.7}
                        className="mt-0.5 text-foreground/55"
                        aria-hidden="true"
                      />
                    ) : (
                      <CircleDashed
                        size={18}
                        strokeWidth={1.7}
                        className="mt-0.5 text-foreground/40"
                        aria-hidden="true"
                      />
                    )}

                    <h3 className="font-semibold">
                      {item.title}
                    </h3>

                    <p
                      className="
                        text-sm leading-6
                        text-foreground/60 sm:text-base
                      "
                    >
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div
            className="
              grid gap-10
              lg:grid-cols-[minmax(220px,0.4fr)_minmax(0,1fr)]
              lg:gap-20
            "
          >
            <div>
              <p
                className="
                  text-xs font-semibold uppercase
                  tracking-[0.2em] text-foreground/40
                "
              >
                06 · Reflection
              </p>
            </div>

            <div>
              <h2
                className="
                  max-w-3xl text-3xl font-semibold
                  leading-tight tracking-[-0.04em]
                  sm:text-4xl
                "
              >
                The domain model begins before the database schema.
              </h2>

              <div
                className="
                  mt-7 max-w-3xl space-y-5
                  text-base leading-8 text-foreground/65
                  sm:text-lg
                "
              >
                <p>
                  The main lesson has been that backend architecture
                  cannot compensate for unclear product meaning.
                  Roles, sites, schedules, activities, submissions,
                  attendance, and approvals first need defensible
                  definitions.
                </p>

                <p>
                  The second lesson is implementation discipline.
                  A complete, authorized activity-retrieval path
                  creates more value and reveals more architectural
                  truth than partially constructing every module at
                  once.
                </p>
              </div>

              <div
                className="
                  mt-10 flex flex-col gap-3
                  border-t border-foreground/15 pt-7
                  sm:flex-row
                "
              >
                <Link
                  href="/#work"
                  className="
                    inline-flex min-h-12 items-center
                    justify-center gap-2
                    border border-foreground/20
                    px-5 py-3 text-sm font-semibold
                    transition-colors hover:border-foreground
                  "
                >
                  <ArrowLeft
                    size={17}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  Back to selected work
                </Link>

                <Link
                  href="/#contact"
                  className="
                    inline-flex min-h-12 items-center
                    justify-center gap-2
                    bg-foreground px-5 py-3
                    text-sm font-semibold text-background
                    transition-opacity hover:opacity-80
                  "
                >
                  Contact me
                  <ArrowRight
                    size={17}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer
        className="
          border-t border-foreground/10
          px-4 py-7
          sm:px-6 lg:px-12
        "
      >
        <div
          className="
            mx-auto flex max-w-6xl
            flex-col gap-3
            text-sm text-foreground/40
            sm:flex-row sm:items-center
            sm:justify-between
          "
        >
          <p>© {new Date().getFullYear()} Abhijeet Singh</p>

          <a
            href="mailto:abhisand30@gmail.com"
            className="
              inline-flex items-center gap-2
              transition-colors hover:text-foreground
            "
          >
            abhisand30@gmail.com
            <ExternalLink
              size={14}
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </a>
        </div>
      </footer>
    </main>
  );
}