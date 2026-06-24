import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  CircleAlert,
  Mail,
  PhoneCall,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import Navbar from "../../../components/Navbar";
import InteractiveRecruitmentWalkthrough from "../../../components/case-studies/InteractiveRecruitmentWalkthrough";

export const metadata: Metadata = {
  title:
    "TalentStream AI Recruitment Platform | Abhijeet Singh",
  description:
    "An interactive case study showing how TalentStream connects candidate matching, AI voice screening, recruiter review, manager handoff, and audit history.",
};

const CONTRIBUTIONS = [
  "Worked across recruiter, manager, interviewer, administrator, and executive product surfaces.",
  "Helped model recruitment as a connected lifecycle rather than a collection of unrelated dashboards.",
  "Worked on database-backed candidate, job, communication, task, and workflow behaviour.",
  "Implemented and debugged transactional email delivery using Resend.",
  "Investigated authentication, permission, request, and provider-delivery failures.",
  "Helped distinguish implemented product behaviour from mock adapters and future integrations.",
];

const PRINCIPLES = [
  {
    icon: BrainCircuit,
    title: "AI produces evidence",
    description:
      "Matching, transcript analysis, summaries, and reply interpretation support decisions without silently becoming the decision.",
  },
  {
    icon: ShieldCheck,
    title: "Humans retain authority",
    description:
      "Recruiters and hiring managers confirm consequential transitions such as progression, hold, rejection, and interview approval.",
  },
  {
    icon: Workflow,
    title: "Every action changes workflow",
    description:
      "A decision can update state, create tasks, trigger communications, and append history through controlled side effects.",
  },
  {
    icon: CircleAlert,
    title: "Failure is normal",
    description:
      "No answer, callback, provider failure, ambiguous replies, and incomplete model output are explicit operating states.",
  },
];

export default function AIRecruitmentPlatformPage() {
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
        <div className="mx-auto max-w-7xl py-14 sm:py-20 lg:py-24">
          <Link
            href="/#work"
            className="
              inline-flex items-center gap-2
              text-sm font-medium
              text-foreground/55
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
              lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.62fr)]
              lg:gap-20
            "
          >
            <div>
              <p
                className="
                  text-xs font-semibold uppercase
                  tracking-[0.2em]
                  text-foreground/38
                "
              >
                Case study 02 · Interactive product walkthrough
              </p>

              <h1
                className="
                  mt-5 max-w-4xl normal-case
                  text-[clamp(2.8rem,6vw,5.6rem)]
                  font-semibold leading-[0.96]
                  tracking-[-0.055em]
                "
              >
                TalentStream AI recruitment platform
              </h1>

              <p
                className="
                  mt-7 max-w-3xl
                  text-lg leading-8
                  text-foreground/65
                  sm:text-xl
                "
              >
                An AI-assisted recruitment operating system
                connecting jobs, candidates, voice screening,
                recruiter decisions, manager coordination,
                communications, interviews, and audit history.
              </p>

              <div
                className="
                  mt-8 flex flex-col gap-3
                  sm:flex-row
                "
              >
                <a
                  href="#walkthrough"
                  className="
                    inline-flex min-h-12
                    items-center justify-center
                    gap-2 bg-foreground
                    px-5 py-3 text-sm
                    font-semibold text-background
                    transition-opacity hover:opacity-80
                  "
                >
                  Run interactive walkthrough
                  <ArrowRight
                    size={17}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </a>

                <a
                  href="#contribution"
                  className="
                    inline-flex min-h-12
                    items-center justify-center
                    border border-foreground/20
                    px-5 py-3 text-sm
                    font-semibold
                    transition-colors
                    hover:border-foreground
                  "
                >
                  View my contribution
                </a>
              </div>
            </div>

            <dl
              className="
                divide-y divide-foreground/10
                border-y border-foreground/10
              "
            >
              <div
                className="
                  grid grid-cols-[6rem_1fr]
                  gap-4 py-4
                "
              >
                <dt
                  className="
                    text-xs font-semibold uppercase
                    tracking-[0.14em]
                    text-foreground/34
                  "
                >
                  Product
                </dt>

                <dd className="text-sm leading-6 text-foreground/68">
                  TalentStream AI by Ravan AI
                </dd>
              </div>

              <div
                className="
                  grid grid-cols-[6rem_1fr]
                  gap-4 py-4
                "
              >
                <dt
                  className="
                    text-xs font-semibold uppercase
                    tracking-[0.14em]
                    text-foreground/34
                  "
                >
                  Role
                </dt>

                <dd className="text-sm leading-6 text-foreground/68">
                  Product, frontend, workflow, and integration work
                </dd>
              </div>

              <div
                className="
                  grid grid-cols-[6rem_1fr]
                  gap-4 py-4
                "
              >
                <dt
                  className="
                    text-xs font-semibold uppercase
                    tracking-[0.14em]
                    text-foreground/34
                  "
                >
                  Stack
                </dt>

                <dd className="text-sm leading-6 text-foreground/68">
                  Next.js, TypeScript, PostgreSQL, Clerk, Resend
                </dd>
              </div>

              <div
                className="
                  grid grid-cols-[6rem_1fr]
                  gap-4 py-4
                "
              >
                <dt
                  className="
                    text-xs font-semibold uppercase
                    tracking-[0.14em]
                    text-foreground/34
                  "
                >
                  Status
                </dt>

                <dd className="text-sm leading-6 text-foreground/68">
                  Evolving product implemented in stages
                </dd>
              </div>
            </dl>
          </div>

          <div
            className="
              mt-12 flex items-start gap-3
              border border-amber-500/30
              bg-amber-500/[0.06]
              p-4
            "
          >
            <CircleAlert
              size={18}
              strokeWidth={1.7}
              className="mt-0.5 shrink-0 text-amber-500"
              aria-hidden="true"
            />

            <p className="text-sm leading-6 text-foreground/58">
              The walkthrough below is an illustrative simulation
              using fictional candidate data. It demonstrates the
              product model and engineering boundaries without
              exposing client data, private source code, or claiming
              that every proposed integration is active in production.
            </p>
          </div>
        </div>
      </header>

      <section
        className="
          px-4 py-16
          sm:px-6 sm:py-20
          lg:px-12 lg:py-24
        "
      >
        <div className="mx-auto max-w-7xl">
          <div
            className="
              mb-10 grid gap-7
              lg:grid-cols-[0.7fr_1.3fr]
              lg:items-end
            "
          >
            <div>
              <p
                className="
                  text-xs font-semibold uppercase
                  tracking-[0.2em]
                  text-foreground/38
                "
              >
                Guided demonstration
              </p>

              <h2
                className="
                  mt-4 max-w-xl normal-case
                  text-4xl font-semibold
                  leading-[1.02]
                  tracking-[-0.045em]
                  sm:text-5xl
                "
              >
                From candidate evidence to an interview-ready decision.
              </h2>
            </div>

            <p
              className="
                max-w-2xl text-lg leading-8
                text-foreground/62
                lg:justify-self-end
              "
            >
              Switch between Product view and Engineering view
              to see both the recruiter experience and the
              application behaviour underneath it.
            </p>
          </div>

          <InteractiveRecruitmentWalkthrough />
        </div>
      </section>

      <section
        className="
          border-y border-foreground/10
          bg-foreground/[0.035]
          px-4 py-20
          sm:px-6 sm:py-24
          lg:px-12
        "
      >
        <div
          className="
            mx-auto grid max-w-7xl gap-12
            lg:grid-cols-[0.65fr_1.35fr]
            lg:gap-20
          "
        >
          <div>
            <p
              className="
                text-xs font-semibold uppercase
                tracking-[0.2em]
                text-foreground/38
              "
            >
              Product thesis
            </p>

            <h2
              className="
                mt-4 normal-case
                text-4xl font-semibold
                leading-[1.03]
                tracking-[-0.045em]
                sm:text-5xl
              "
            >
              Recruitment is a stateful workflow, not a collection of dashboards.
            </h2>
          </div>

          <div>
            <div
              className="
                max-w-3xl space-y-5
                text-base leading-8
                text-foreground/64
                sm:text-lg
              "
            >
              <p>
                A job requirement becomes useful only when it is
                connected to candidate discovery, application state,
                screening, recruiter judgement, manager decisions,
                interviews, communications, and final outcomes.
              </p>

              <p>
                Agni provides the conversational voice layer.
                TalentStream owns the surrounding recruitment context:
                why the call is happening, which application it belongs
                to, what evidence is required, who has authority, and
                what must happen next.
              </p>
            </div>

            <div
              className="
                mt-10 grid gap-5
                sm:grid-cols-2
              "
            >
              {PRINCIPLES.map((principle) => {
                const Icon = principle.icon;

                return (
                  <article
                    key={principle.title}
                    className="
                      border-t border-foreground/20
                      pt-5
                    "
                  >
                    <Icon
                      size={21}
                      strokeWidth={1.7}
                      className="text-foreground/42"
                      aria-hidden="true"
                    />

                    <h3
                      className="
                        mt-5 normal-case
                        text-xl font-semibold
                        tracking-[-0.025em]
                      "
                    >
                      {principle.title}
                    </h3>

                    <p
                      className="
                        mt-3 text-sm leading-7
                        text-foreground/60
                      "
                    >
                      {principle.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section
        id="contribution"
        className="
          px-4 py-20
          sm:px-6 sm:py-24
          lg:px-12
        "
      >
        <div
          className="
            mx-auto grid max-w-7xl gap-12
            lg:grid-cols-[0.65fr_1.35fr]
            lg:gap-20
          "
        >
          <div>
            <p
              className="
                text-xs font-semibold uppercase
                tracking-[0.2em]
                text-foreground/38
              "
            >
              My contribution
            </p>

            <h2
              className="
                mt-4 normal-case
                text-4xl font-semibold
                leading-[1.03]
                tracking-[-0.045em]
                sm:text-5xl
              "
            >
              Moving between product requirements and operational software.
            </h2>
          </div>

          <div>
            <p
              className="
                max-w-3xl text-lg leading-8
                text-foreground/64
              "
            >
              My work involved understanding the hiring process
              and converting it into explicit entities, states,
              permissions, integrations, user actions, and failure
              paths.
            </p>

            <div
              className="
                mt-9 grid gap-4
                sm:grid-cols-2
              "
            >
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
                    className="
                      mt-1 shrink-0
                      text-foreground/42
                    "
                    aria-hidden="true"
                  />

                  <p
                    className="
                      text-sm leading-6
                      text-foreground/64
                      sm:text-base
                    "
                  >
                    {contribution}
                  </p>
                </div>
              ))}
            </div>

            <p
              className="
                mt-8 max-w-3xl
                text-sm leading-7
                text-foreground/42
              "
            >
              TalentStream is collaborative product work. This
              case study describes areas I worked on or directly
              influenced; it does not represent sole ownership of
              the complete product.
            </p>
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
        <div
          className="
            mx-auto grid max-w-7xl gap-12
            lg:grid-cols-[0.7fr_1.3fr]
            lg:items-end lg:gap-20
          "
        >
          <div>
            <PhoneCall
              size={28}
              strokeWidth={1.6}
              className="text-background/45"
              aria-hidden="true"
            />

            <h2
              className="
                mt-6 max-w-3xl normal-case
                text-4xl font-semibold
                leading-[1.04]
                tracking-[-0.045em]
                sm:text-5xl
              "
            >
              Agni conducts the conversation.
            </h2>
          </div>

          <div>
            <p
              className="
                max-w-3xl text-lg leading-8
                text-background/64
              "
            >
              TalentStream understands why the conversation is
              happening, what evidence is required, which candidate
              and job it belongs to, who can make the next decision,
              and how the complete process should be recorded.
            </p>

            <p
              className="
                mt-5 max-w-3xl text-lg font-semibold
                leading-8
              "
            >
              That surrounding operational system is what turns an
              AI caller into a recruitment product.
            </p>
          </div>
        </div>
      </section>

      <section
        className="
          px-4 py-16
          sm:px-6 sm:py-20
          lg:px-12
        "
      >
        <div
          className="
            mx-auto flex max-w-7xl
            flex-col gap-4
            border-t border-foreground/15
            pt-8 sm:flex-row
            sm:items-center sm:justify-between
          "
        >
          <Link
            href="/#work"
            className="
              inline-flex min-h-11
              items-center gap-2
              text-sm font-semibold
              text-foreground/60
              transition-colors
              hover:text-foreground
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
              inline-flex min-h-11
              items-center gap-2
              text-sm font-semibold
              transition-opacity hover:opacity-60
            "
          >
            Discuss this work
            <ArrowRight
              size={17}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </Link>
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
            mx-auto flex max-w-7xl
            flex-col gap-3
            text-sm text-foreground/40
            sm:flex-row sm:items-center
            sm:justify-between
          "
        >
          <p>
            © {new Date().getFullYear()} Abhijeet Singh
          </p>

          <a
            href="mailto:abhisand30@gmail.com"
            className="
              inline-flex items-center gap-2
              transition-colors hover:text-foreground
            "
          >
            <Mail
              size={14}
              strokeWidth={1.7}
              aria-hidden="true"
            />
            abhisand30@gmail.com
          </a>
        </div>
      </footer>
    </main>
  );
}