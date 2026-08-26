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
    "A case study covering industrial planning, field execution, scoped authorization, transactional workflows, and backend reliability.",
};

const PLATFORM_AREAS = [
  {
    title: "Project planning",
    description:
      "Schedules, versions, activities, dependencies, templates, and generated plans establish a controlled project baseline.",
  },
  {
    title: "Field execution",
    description:
      "Teams submit progress, supporting evidence, resource usage, and hindrances from active project sites.",
  },
  {
    title: "Verification",
    description:
      "Reported information moves through review, adjustment, return, or approval before it becomes trusted project state.",
  },
  {
    title: "Management visibility",
    description:
      "Authorized supervisors and managers see schedule health and operational data at the organization, project, or site scope they oversee.",
  },
];

const CONTRIBUTIONS = [
  "Designed modular NestJS boundaries around projects, planning, execution, IAM, audit, notifications, and shared infrastructure.",
  "Modelled the PostgreSQL domain and implemented schema evolution through TypeORM migrations.",
  "Designed Organization → Project → Site scoped authorization without tying behaviour to fixed job titles.",
  "Built versioned REST contracts and OpenAPI documentation for planning and operational workflows.",
  "Implemented transactional field-execution and verification workflows with explicit domain rules.",
  "Introduced idempotency, audit events, transactional outbox messages, request tracing, validation, and standardized errors.",
  "Converted incomplete or conflicting operational requirements into testable backend invariants.",
];

const AUTHORIZATION_FLOW = [
  {
    number: "01",
    title: "Resolve the actor",
    description:
      "Establish the authenticated user and verify that the account is active and the identity is valid.",
  },
  {
    number: "02",
    title: "Resolve the target scope",
    description:
      "Load the canonical Organization → Project → Site relationship from backend-controlled data rather than trusting client-supplied scope identifiers.",
  },
  {
    number: "03",
    title: "Find applicable assignments",
    description:
      "Determine which active, currently valid role assignments contain the target scope.",
  },
  {
    number: "04",
    title: "Resolve permissions and exceptions",
    description:
      "Evaluate permissions from applicable role templates, then apply scoped individual GRANT or DENY exceptions. DENY takes precedence.",
  },
  {
    number: "05",
    title: "Scope the database operation",
    description:
      "Use authorization-derived predicates so unauthorized records are never loaded first and filtered afterwards.",
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
    title: "Hierarchical scope, not a flat access flag",
    description:
      "Access follows Organization → Project → Site containment. Organization scope reaches its projects and sites; project scope reaches its sites; site scope reaches only that exact site.",
  },
  {
    icon: Layers3,
    title: "Activities belong to schedule versions",
    description:
      "Project schedules change over time. Activity retrieval therefore selects the active schedule version rather than mixing current and superseded planning data.",
  },
  {
    icon: Workflow,
    title: "Idempotent writes with transactional events",
    description:
      "State-changing operations use actor-scoped idempotency and database transactions, with audit and outbox records committed beside the domain change. Retries are safe and downstream work stays consistent.",
  },
];

const STATUS = [
  {
    state: "complete",
    title: "Backend foundation",
    description:
      "NestJS structure, PostgreSQL/PostGIS integration, TypeORM migrations, configuration validation, health checks, request tracing, error handling, and OpenAPI contracts.",
  },
  {
    state: "complete",
    title: "Identity and authorization",
    description:
      "Scoped permissions, active role assignments, Organization → Project → Site containment, individual permission exceptions, and authorized resource queries.",
  },
  {
    state: "complete",
    title: "Planning and field execution",
    description:
      "Schedule import and validation, versions, activities and dependencies, schedule health, templates, schedule generation, progress, evidence, resource reporting, and hindrance reporting.",
  },
  {
    state: "complete",
    title: "Verification and reliability",
    description:
      "Progress decisions, hindrance verification, idempotency, transactional outbox messages, audit events, notifications, structured logging, and extensive E2E coverage.",
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
                Enterprise backend for coordinating industrial
                project planning, field execution, progress
                verification, resource reporting, and management
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
                  Domain architecture, authorization, transactional workflows, reliability
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
                  NestJS, TypeScript, PostgreSQL, PostGIS, TypeORM, REST, OpenAPI
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
                Project-management data is useful only when the system can establish who may change it—and which version of the truth is trusted.
              </h2>

              <div
                className="
                  mt-7 max-w-3xl space-y-5
                  text-base leading-8 text-foreground/65
                  sm:text-lg
                "
              >
                <p>
                  The platform models the operational lifecycle of an industrial project: projects contain sites, schedules define activities, field teams report execution, supervisors verify progress and hindrances, and approved information becomes part of the trusted project record.
                </p>

                <p>
                  The backend coordinates planning, field execution, verification, access control, and reliability—not just CRUD APIs. Requirements arrived through operational documents, spreadsheets, discussions, and evolving interpretations, so the work included translating business rules into enforceable domain invariants.
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
                03 · Authorization
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
                Authorization is evaluated against the resource’s real scope, not identifiers supplied by the client.
              </h2>

              <p
                className="
                  mt-6 max-w-3xl text-base leading-8
                  text-foreground/60 sm:text-lg
                "
              >
                A request does not simply ask, “Does this user have this role?” The backend resolves account and identity state, active role assignments, scope containment, role permissions, and individual exceptions before it permits an operation.
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
            Reliable write workflow
          </p>

          <p className="mt-4 max-w-3xl text-base leading-7 text-background/65 sm:text-lg">
            State-changing APIs remain correct when clients retry requests, calls fail, or operations interact concurrently. Domain state, audit records, and downstream events are committed together in one transaction.
          </p>

          <div
            className="
              mt-8 grid gap-3
              md:grid-cols-5
            "
          >
            {[
              "Resolve actor + scope",
              "Evaluate permission",
              "Validate + idempotency",
              "Commit domain, audit + outbox",
              "Return stable result",
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
                04 · Engineering decisions
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

      <section className="border-y border-foreground/10 bg-foreground/5 px-4 py-20 sm:px-6 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(220px,0.4fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/40">
                05 · Planning &amp; verification
              </p>
            </div>

            <div>
              <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
                Project schedules are versioned data; field reports become trusted only through verification.
              </h2>

              <div className="mt-9 grid gap-8 sm:grid-cols-2">
                <article className="border-t border-foreground/15 pt-5">
                  <h3 className="text-xl font-semibold tracking-[-0.025em]">Planning and scheduling</h3>
                  <p className="mt-3 text-sm leading-7 text-foreground/60 sm:text-base">
                    Excel-based imports, workbook validation, schedule versions and activation, activities, dependencies, health calculations, reusable templates, parameterized generation, and resource requirements keep current plans distinct from superseded ones.
                  </p>
                </article>
                <article className="border-t border-foreground/15 pt-5">
                  <h3 className="text-xl font-semibold tracking-[-0.025em]">Field execution and review</h3>
                  <p className="mt-3 text-sm leading-7 text-foreground/60 sm:text-base">
                    Progress submissions with evidence enter a review queue before approval, adjustment, return, or rejection. Hindrances are independently verified, while manpower, material, and equipment are reported as operational resources.
                  </p>
                </article>
              </div>

              <div className="mt-9 border border-foreground/10 bg-background p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/40">Trusted project state</p>
                <p className="mt-4 font-medium leading-7 text-foreground/80">
                  Activity → Progress submission → Supporting evidence → Review queue → Approve / Adjust / Return / Reject → Trusted activity actual
                </p>
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
                06 · Current state
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
                A substantial backend foundation, still evolving with the product.
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
                07 · Security &amp; testing
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
                Fail safely at the boundary, then prove the behaviour through real application paths.
              </h2>

              <div
                className="
                  mt-7 max-w-3xl space-y-5
                  text-base leading-8 text-foreground/65
                  sm:text-lg
                "
              >
                <p>
                  Security is built into the operational paths: canonical scope is resolved by the backend, authorization-derived predicates prevent unrestricted reads, and unauthorized evidence retrieval conceals whether the resource exists. Upload validation checks file signatures as well as declared MIME types, while request and upload sizes are constrained.
                </p>

                <p>
                  The E2E suite runs against an isolated PostgreSQL database with real migrations and data resets. It covers IAM, project and site operations, schedule imports and health, progress and evidence, hindrances, resources, audit and notifications, idempotency, and transactional outbox behaviour.
                </p>

                <p>
                  The test harness protects non-test databases from accidental cleanup—an intentionally small safeguard with outsized value when tests operate against real infrastructure.
                </p>
              </div>

              <div className="mt-10 border-t border-foreground/15 pt-7">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/40">What this project taught me</p>
                <p className="mt-4 max-w-3xl text-base leading-8 text-foreground/65 sm:text-lg">
                  Backend engineering for operational software is primarily about preserving invariants across boundaries: who may change state, at what scope, which data is authoritative, what survives retries and concurrent actions, and what must remain auditable.
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
