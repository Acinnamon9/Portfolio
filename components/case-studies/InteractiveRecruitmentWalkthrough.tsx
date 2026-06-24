"use client";

import {
  useMemo,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clock3,
  FileSearch,
  Mail,
  PhoneCall,
  RefreshCw,
  ShieldCheck,
  UserCheck,
  Workflow,
  XCircle,
} from "lucide-react";

type WalkthroughMode = "product" | "engineering";

type CallOutcome =
  | "completed"
  | "callback"
  | "no-answer";

type RecruiterDecision =
  | "approve"
  | "hold"
  | "reject"
  | null;

type ManagerDecision =
  | "approve"
  | "hold"
  | "reject"
  | null;

type EngineeringNodeKind =
  | "deterministic"
  | "ai"
  | "external";

const STEPS = [
  {
    short: "Match",
    title: "Candidate match",
  },
  {
    short: "Screen",
    title: "AI screening",
  },
  {
    short: "Extract",
    title: "Structured intelligence",
  },
  {
    short: "Review",
    title: "Recruiter decision",
  },
  {
    short: "Handoff",
    title: "Manager handoff",
  },
  {
    short: "History",
    title: "Audit timeline",
  },
];

const SCORE_METRICS = [
  {
    label: "Must-have skills",
    score: 21,
    maximum: 25,
    requirement:
      "BOPP production knowledge and hands-on manufacturing experience.",
    evidence:
      "Worked on BOPP line operations, process monitoring, and production troubleshooting.",
    source: "Resume · Professional experience",
  },
  {
    label: "Relevant experience",
    score: 13,
    maximum: 15,
    requirement:
      "At least four years of relevant production experience.",
    evidence:
      "Candidate profile reports six years of total experience in manufacturing roles.",
    source: "Resume · Employment history",
  },
  {
    label: "Industry alignment",
    score: 12,
    maximum: 15,
    requirement:
      "Experience in specialty films, flexible packaging, or adjacent manufacturing.",
    evidence:
      "Three years in BOPP production and earlier work in polymer processing.",
    source: "Resume · Company and role evidence",
  },
  {
    label: "Education",
    score: 8,
    maximum: 10,
    requirement:
      "Engineering qualification relevant to production or manufacturing.",
    evidence:
      "Bachelor of Technology in Mechanical Engineering.",
    source: "Resume · Education",
  },
  {
    label: "Location fit",
    score: 3,
    maximum: 5,
    requirement:
      "Ability to work at the plant location.",
    evidence:
      "Current city is known, but relocation willingness has not yet been confirmed.",
    source: "Candidate profile · Incomplete",
  },
];

const ENGINEERING_STEPS: Array<{
  title: string;
  description: string;
  nodes: Array<{
    label: string;
    kind: EngineeringNodeKind;
  }>;
  writes: string[];
  failure: string;
  principle: string;
}> = [
  {
    title: "From documents to explainable evidence",
    description:
      "The match score is not stored as one unexplained number. The system retains dimensions, weights, evidence, and the source of each claim.",
    nodes: [
      {
        label: "Job requirements loaded",
        kind: "deterministic",
      },
      {
        label: "Resume parsed",
        kind: "ai",
      },
      {
        label: "Candidate fields normalised",
        kind: "deterministic",
      },
      {
        label: "Evidence mapped",
        kind: "ai",
      },
      {
        label: "Score calculated",
        kind: "deterministic",
      },
    ],
    writes: [
      "candidate_profile",
      "resume_document",
      "application",
      "match_score",
      "score_evidence",
    ],
    failure:
      "Low-confidence extraction remains unknown or is placed in a recruiter-review queue instead of being invented.",
    principle:
      "AI interprets evidence. Deterministic application logic applies weights, thresholds, access rules, and persistence.",
  },
  {
    title: "A phone call becomes a durable workflow",
    description:
      "The application owns the screening session and its lifecycle. The calling provider performs the conversation but does not own recruitment state.",
    nodes: [
      {
        label: "Recruiter authorises screening",
        kind: "deterministic",
      },
      {
        label: "Screening session created",
        kind: "deterministic",
      },
      {
        label: "Agni call requested",
        kind: "external",
      },
      {
        label: "Conversation occurs",
        kind: "ai",
      },
      {
        label: "Provider events received",
        kind: "external",
      },
    ],
    writes: [
      "screening_session",
      "call_attempt",
      "call_event",
      "candidate_consent",
      "callback_preference",
    ],
    failure:
      "No answer, callback, disconnection, invalid number, and opt-out are represented as explicit outcomes with different next actions.",
    principle:
      "Telephony is an unreliable external dependency. Recruitment state must remain recoverable and idempotent.",
  },
  {
    title: "Probabilistic output enters deterministic software",
    description:
      "Transcript analysis produces suggestions and structured fields. Validation and workflow rules determine whether the output can be committed.",
    nodes: [
      {
        label: "Recording received",
        kind: "external",
      },
      {
        label: "Transcript generated",
        kind: "ai",
      },
      {
        label: "Answers extracted",
        kind: "ai",
      },
      {
        label: "Schema validated",
        kind: "deterministic",
      },
      {
        label: "Candidate evidence updated",
        kind: "deterministic",
      },
    ],
    writes: [
      "transcript",
      "screening_answer",
      "screening_summary",
      "discrepancy",
      "qualification_result",
    ],
    failure:
      "Malformed or low-confidence model output does not silently update consequential candidate state.",
    principle:
      "Model output is evidence. It is not authority.",
  },
  {
    title: "A decision is more than a status label",
    description:
      "The recruiter action is authorised, validated against the current state, recorded with evidence, and connected to retryable side effects.",
    nodes: [
      {
        label: "Recruiter selects action",
        kind: "deterministic",
      },
      {
        label: "Permission checked",
        kind: "deterministic",
      },
      {
        label: "Transition validated",
        kind: "deterministic",
      },
      {
        label: "Application stage updated",
        kind: "deterministic",
      },
      {
        label: "Side effects queued",
        kind: "deterministic",
      },
    ],
    writes: [
      "recruiter_decision",
      "application_transition",
      "manager_review_task",
      "communication",
      "audit_event",
    ],
    failure:
      "If email delivery fails, the decision remains valid and the communication can be retried independently.",
    principle:
      "Core state transitions and external side effects should not be treated as one fragile operation.",
  },
  {
    title: "Users outside the portal still participate safely",
    description:
      "Managers can act through secure links or communication channels, but ambiguous natural-language interpretation requires confirmation.",
    nodes: [
      {
        label: "Manager brief generated",
        kind: "deterministic",
      },
      {
        label: "Email delivered",
        kind: "external",
      },
      {
        label: "Manager reply received",
        kind: "external",
      },
      {
        label: "Decision interpreted",
        kind: "ai",
      },
      {
        label: "Manager confirms action",
        kind: "deterministic",
      },
    ],
    writes: [
      "manager_shortlist",
      "manager_decision",
      "inbound_message",
      "interpretation_result",
      "interview_task",
    ],
    failure:
      "A low-confidence or ambiguous response creates a clarification request rather than changing the candidate stage.",
    principle:
      "Conversational convenience must not remove operational safety.",
  },
  {
    title: "Current state and historical truth are separate",
    description:
      "Mutable application state answers where the candidate is now. Immutable events explain how the system reached that state.",
    nodes: [
      {
        label: "Domain action occurs",
        kind: "deterministic",
      },
      {
        label: "State transition stored",
        kind: "deterministic",
      },
      {
        label: "Audit event appended",
        kind: "deterministic",
      },
      {
        label: "Side effects observed",
        kind: "external",
      },
      {
        label: "Timeline reconstructed",
        kind: "deterministic",
      },
    ],
    writes: [
      "application.current_stage",
      "application_transition",
      "audit_event",
      "communication_attempt",
      "provider_event",
    ],
    failure:
      "Duplicate or out-of-order provider events are matched using identifiers and idempotency rules.",
    principle:
      "A status field says where something is. An event history explains why it is there.",
  },
];

function getNodeStyle(kind: EngineeringNodeKind) {
  if (kind === "ai") {
    return "border-cyan-500/40 bg-cyan-500/10";
  }

  if (kind === "external") {
    return "border-amber-500/40 bg-amber-500/10";
  }

  return "border-foreground/15 bg-background";
}

function getNodeLabel(kind: EngineeringNodeKind) {
  if (kind === "ai") {
    return "AI-assisted";
  }

  if (kind === "external") {
    return "External system";
  }

  return "Deterministic";
}

export default function InteractiveRecruitmentWalkthrough() {
  const [step, setStep] = useState(0);
  const [mode, setMode] =
    useState<WalkthroughMode>("product");
  const [selectedMetric, setSelectedMetric] =
    useState(0);
  const [callOutcome, setCallOutcome] =
    useState<CallOutcome>("completed");
  const [recruiterDecision, setRecruiterDecision] =
    useState<RecruiterDecision>(null);
  const [managerDecision, setManagerDecision] =
    useState<ManagerDecision>(null);

  const score =
    callOutcome === "completed" ? 81 : 77;

  const timeline = useMemo(() => {
    const events = [
      {
        time: "10:04",
        title: "Candidate application received",
        detail:
          "Resume and application data entered the recruitment workflow.",
      },
      {
        time: "10:05",
        title: "Resume parsed",
        detail:
          "Candidate fields were extracted and normalised.",
      },
      {
        time: "10:05",
        title: "Initial match score generated",
        detail:
          "Explainable score created: 77 / 100.",
      },
      {
        time: "10:18",
        title: "Recruiter approved AI screening",
        detail:
          "A screening session and first call attempt were created.",
      },
    ];

    if (callOutcome === "completed") {
      events.push(
        {
          time: "11:02",
          title: "Screening call completed",
          detail:
            "Consent, answers, and call outcome were recorded.",
        },
        {
          time: "11:04",
          title: "Structured intelligence generated",
          detail:
            "Answers, summary, discrepancy, and updated score: 81 / 100.",
        },
      );
    }

    if (callOutcome === "callback") {
      events.push({
        time: "11:02",
        title: "Candidate requested a callback",
        detail:
          "Preferred callback time stored for tomorrow at 11:00.",
      });
    }

    if (callOutcome === "no-answer") {
      events.push({
        time: "11:02",
        title: "First attempt: no answer",
        detail:
          "Attempt count updated and retry policy evaluated.",
      });
    }

    if (recruiterDecision === "approve") {
      events.push({
        time: "11:12",
        title: "Recruiter approved manager review",
        detail:
          "Candidate summary, manager task, and communication were created.",
      });

      if (managerDecision === "approve") {
        events.push({
          time: "14:42",
          title: "Hiring manager approved Round 1",
          detail:
            "Interview scheduling workflow started.",
        });
      }

      if (managerDecision === "hold") {
        events.push({
          time: "14:42",
          title: "Hiring manager placed candidate on hold",
          detail:
            "Candidate remains searchable without starting scheduling.",
        });
      }

      if (managerDecision === "reject") {
        events.push({
          time: "14:42",
          title: "Hiring manager rejected candidate",
          detail:
            "Application transition and decision evidence were recorded.",
        });
      }
    }

    if (recruiterDecision === "hold") {
      events.push({
        time: "11:12",
        title: "Recruiter placed candidate on hold",
        detail:
          "Follow-up task created; no manager communication sent.",
      });
    }

    if (recruiterDecision === "reject") {
      events.push({
        time: "11:12",
        title: "Recruiter rejected candidate",
        detail:
          "Application closed and audit event recorded.",
      });
    }

    return events;
  }, [
    callOutcome,
    recruiterDecision,
    managerDecision,
  ]);

  const resetWalkthrough = () => {
    setStep(0);
    setMode("product");
    setSelectedMetric(0);
    setCallOutcome("completed");
    setRecruiterDecision(null);
    setManagerDecision(null);
  };

  const chooseRecruiterDecision = (
    decision: Exclude<RecruiterDecision, null>,
  ) => {
    setRecruiterDecision(decision);
    setManagerDecision(null);
  };

  const canContinue =
    step === 3
      ? recruiterDecision !== null
      : step === 4 &&
          recruiterDecision === "approve"
        ? managerDecision !== null
        : true;

  const renderCandidateMatch = () => {
    const metric = SCORE_METRICS[selectedMetric];

    return (
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <div
            className="
              border border-foreground/15
              bg-background p-5 sm:p-6
            "
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p
                  className="
                    text-xs font-semibold uppercase
                    tracking-[0.15em]
                    text-foreground/40
                  "
                >
                  Fictional candidate
                </p>

                <h3
                  className="
                    mt-2 normal-case text-2xl
                    font-semibold tracking-[-0.03em]
                  "
                >
                  Aarav Mehta
                </h3>

                <p className="mt-1 text-sm text-foreground/55">
                  Production Engineer · Pune
                </p>
              </div>

              <div className="text-right">
                <p
                  className="
                    text-xs font-semibold uppercase
                    tracking-[0.14em]
                    text-foreground/35
                  "
                >
                  Match score
                </p>

                <p
                  className="
                    mt-1 text-4xl font-semibold
                    tracking-[-0.05em]
                  "
                >
                  77
                  <span className="text-lg text-foreground/35">
                    /100
                  </span>
                </p>
              </div>
            </div>

            <dl
              className="
                mt-6 grid gap-4 border-t
                border-foreground/10 pt-5
                sm:grid-cols-2
              "
            >
              <div>
                <dt className="text-xs text-foreground/40">
                  Total experience
                </dt>
                <dd className="mt-1 text-sm font-medium">
                  6 years
                </dd>
              </div>

              <div>
                <dt className="text-xs text-foreground/40">
                  Relevant experience
                </dt>
                <dd className="mt-1 text-sm font-medium">
                  BOPP production
                </dd>
              </div>

              <div>
                <dt className="text-xs text-foreground/40">
                  Notice period
                </dt>
                <dd className="mt-1 text-sm font-medium">
                  Not confirmed
                </dd>
              </div>

              <div>
                <dt className="text-xs text-foreground/40">
                  Relocation
                </dt>
                <dd className="mt-1 text-sm font-medium">
                  Unknown
                </dd>
              </div>
            </dl>
          </div>

          <div
            className="
              border border-foreground/15
              bg-foreground/[0.03] p-5
            "
          >
            <div className="flex items-center gap-3">
              <FileSearch
                size={19}
                strokeWidth={1.7}
                className="text-foreground/45"
                aria-hidden="true"
              />

              <h3 className="normal-case font-semibold">
                Top scoring dimensions
              </h3>
            </div>

            <div className="mt-5 space-y-2">
              {SCORE_METRICS.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setSelectedMetric(index)}
                  className={`
                    grid w-full grid-cols-[1fr_auto]
                    items-center gap-4 border px-4 py-3
                    text-left transition-colors
                    ${
                      selectedMetric === index
                        ? "border-foreground bg-foreground text-background"
                        : "border-foreground/10 bg-background hover:border-foreground/30"
                    }
                  `}
                >
                  <span className="text-sm font-medium">
                    {item.label}
                  </span>

                  <span className="text-sm">
                    {item.score}/{item.maximum}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          key={metric.label}
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            border border-cyan-500/35
            bg-cyan-500/[0.07]
            p-6 sm:p-8
          "
        >
          <div
            className="
              flex items-center justify-between gap-4
              border-b border-cyan-500/25 pb-5
            "
          >
            <div>
              <p
                className="
                  text-xs font-semibold uppercase
                  tracking-[0.15em] text-cyan-500
                "
              >
                Explainable score
              </p>

              <h3
                className="
                  mt-2 normal-case text-2xl
                  font-semibold tracking-[-0.03em]
                "
              >
                {metric.label}
              </h3>
            </div>

            <span
              className="
                border border-cyan-500/35
                px-3 py-1 text-sm font-semibold
              "
            >
              {metric.score}/{metric.maximum}
            </span>
          </div>

          <dl className="mt-6 space-y-6">
            <div>
              <dt
                className="
                  text-xs font-semibold uppercase
                  tracking-[0.14em] text-foreground/40
                "
              >
                Job requirement
              </dt>
              <dd className="mt-2 text-sm leading-6 text-foreground/70">
                {metric.requirement}
              </dd>
            </div>

            <div>
              <dt
                className="
                  text-xs font-semibold uppercase
                  tracking-[0.14em] text-foreground/40
                "
              >
                Candidate evidence
              </dt>
              <dd className="mt-2 text-sm leading-6 text-foreground/70">
                “{metric.evidence}”
              </dd>
            </div>

            <div>
              <dt
                className="
                  text-xs font-semibold uppercase
                  tracking-[0.14em] text-foreground/40
                "
              >
                Evidence source
              </dt>
              <dd className="mt-2 text-sm font-medium">
                {metric.source}
              </dd>
            </div>
          </dl>

          <p
            className="
              mt-7 border-t border-cyan-500/25
              pt-5 text-sm leading-6 text-foreground/55
            "
          >
            The screening conversation can add evidence that
            is absent from the resume and update the score
            without hiding why it changed.
          </p>
        </motion.div>
      </div>
    );
  };

  const renderScreening = () => {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-sm leading-6 text-foreground/60">
            Choose a call outcome to see how the same screening
            session creates different operational consequences.
          </p>

          <div
            className="
              mt-5 grid gap-3
              sm:grid-cols-3
            "
          >
            {[
              {
                value: "completed" as const,
                label: "Completed call",
                icon: CheckCircle2,
              },
              {
                value: "callback" as const,
                label: "Callback requested",
                icon: Clock3,
              },
              {
                value: "no-answer" as const,
                label: "No answer",
                icon: XCircle,
              },
            ].map((option) => {
              const Icon = option.icon;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setCallOutcome(option.value)}
                  className={`
                    flex min-h-14 items-center
                    justify-between gap-4 border
                    px-4 py-3 text-left
                    transition-colors
                    ${
                      callOutcome === option.value
                        ? "border-foreground bg-foreground text-background"
                        : "border-foreground/15 bg-background hover:border-foreground/40"
                    }
                  `}
                >
                  <span className="text-sm font-semibold">
                    {option.label}
                  </span>

                  <Icon
                    size={18}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {callOutcome === "completed" && (
            <motion.div
              key="completed"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="
                grid gap-6
                lg:grid-cols-[0.72fr_1.28fr]
              "
            >
              <div
                className="
                  border border-foreground/15
                  bg-foreground text-background
                  p-6
                "
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p
                      className="
                        text-xs font-semibold uppercase
                        tracking-[0.15em]
                        text-background/45
                      "
                    >
                      Agni screening
                    </p>

                    <h3
                      className="
                        mt-2 normal-case text-xl
                        font-semibold
                      "
                    >
                      Connected call
                    </h3>
                  </div>

                  <PhoneCall
                    size={22}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </div>

                <div className="mt-10 flex h-20 items-center justify-center gap-1">
                  {[
                    30, 52, 74, 40, 64, 86, 50, 70,
                    42, 82, 56, 34, 68, 48, 78,
                  ].map((height, index) => (
                    <motion.span
                      key={`${height}-${index}`}
                      initial={{
                        height: 8,
                      }}
                      animate={{
                        height,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.025,
                      }}
                      className="
                        block w-1.5 rounded-full
                        bg-background/70
                      "
                    />
                  ))}
                </div>

                <div
                  className="
                    mt-8 flex items-center
                    justify-between border-t
                    border-background/15 pt-5
                  "
                >
                  <span className="text-sm text-background/55">
                    04:18 elapsed
                  </span>

                  <span
                    className="
                      border border-emerald-400/40
                      bg-emerald-400/10
                      px-3 py-1 text-xs font-semibold
                      text-emerald-300
                    "
                  >
                    Completed
                  </span>
                </div>
              </div>

              <div
                className="
                  border border-foreground/15
                  bg-background p-6 sm:p-8
                "
              >
                <p
                  className="
                    text-xs font-semibold uppercase
                    tracking-[0.15em] text-foreground/40
                  "
                >
                  Call excerpt
                </p>

                <div className="mt-6 space-y-5">
                  <div
                    className="
                      border-l-2 border-cyan-500
                      pl-4
                    "
                  >
                    <p
                      className="
                        text-xs font-semibold uppercase
                        tracking-[0.13em] text-cyan-500
                      "
                    >
                      Agni
                    </p>

                    <p className="mt-2 text-sm leading-6 text-foreground/70">
                      Would you be open to relocating to the
                      plant location for this role?
                    </p>
                  </div>

                  <div
                    className="
                      border-l-2 border-foreground/25
                      pl-4
                    "
                  >
                    <p
                      className="
                        text-xs font-semibold uppercase
                        tracking-[0.13em]
                        text-foreground/40
                      "
                    >
                      Candidate
                    </p>

                    <p className="mt-2 text-sm leading-6 text-foreground/70">
                      Yes, provided housing support is available.
                      I would like to understand the relocation
                      policy before confirming.
                    </p>
                  </div>
                </div>

                <div
                  className="
                    mt-7 border border-cyan-500/30
                    bg-cyan-500/[0.07] p-4
                  "
                >
                  <p
                    className="
                      text-xs font-semibold uppercase
                      tracking-[0.13em] text-cyan-500
                    "
                  >
                    Extracted field
                  </p>

                  <p className="mt-2 text-sm font-medium">
                    Relocation willingness: Conditional yes
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {callOutcome === "callback" && (
            <motion.div
              key="callback"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="
                border border-amber-500/35
                bg-amber-500/[0.07]
                p-6 sm:p-8
              "
            >
              <Clock3
                size={25}
                strokeWidth={1.7}
                className="text-amber-500"
                aria-hidden="true"
              />

              <h3
                className="
                  mt-5 normal-case text-2xl
                  font-semibold tracking-[-0.03em]
                "
              >
                Candidate requested another time
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/65">
                The candidate answered but could not continue.
                Their preferred callback time was captured
                without losing the screening-session context.
              </p>

              <div
                className="
                  mt-7 grid gap-4
                  border-t border-amber-500/25 pt-6
                  sm:grid-cols-3
                "
              >
                <div>
                  <p className="text-xs text-foreground/40">
                    Session state
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    Callback requested
                  </p>
                </div>

                <div>
                  <p className="text-xs text-foreground/40">
                    Preferred time
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    Tomorrow · 11:00 AM
                  </p>
                </div>

                <div>
                  <p className="text-xs text-foreground/40">
                    Next action
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    Schedule call attempt
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {callOutcome === "no-answer" && (
            <motion.div
              key="no-answer"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="
                border border-foreground/15
                bg-foreground/[0.035]
                p-6 sm:p-8
              "
            >
              <XCircle
                size={25}
                strokeWidth={1.7}
                className="text-foreground/45"
                aria-hidden="true"
              />

              <h3
                className="
                  mt-5 normal-case text-2xl
                  font-semibold tracking-[-0.03em]
                "
              >
                First attempt received no answer
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/65">
                The system records the attempt instead of
                treating the call as an invisible failure.
                Outreach policy determines whether and when
                another attempt may be created.
              </p>

              <div
                className="
                  mt-7 grid gap-4
                  border-t border-foreground/10 pt-6
                  sm:grid-cols-3
                "
              >
                <div>
                  <p className="text-xs text-foreground/40">
                    Attempt
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    1 of 3
                  </p>
                </div>

                <div>
                  <p className="text-xs text-foreground/40">
                    Outcome
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    No answer
                  </p>
                </div>

                <div>
                  <p className="text-xs text-foreground/40">
                    Next action
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    Retry policy evaluation
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderIntelligence = () => {
    if (callOutcome !== "completed") {
      return (
        <div
          className="
            border border-amber-500/35
            bg-amber-500/[0.07]
            p-6 sm:p-8
          "
        >
          <CircleAlert
            size={25}
            strokeWidth={1.7}
            className="text-amber-500"
            aria-hidden="true"
          />

          <h3
            className="
              mt-5 normal-case text-2xl
              font-semibold tracking-[-0.03em]
            "
          >
            Full screening intelligence is not available yet
          </h3>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground/65">
            {callOutcome === "callback"
              ? "The candidate requested a callback. The system retains the partial interaction and waits for the resumed conversation."
              : "The candidate did not answer. The platform has a call-attempt record, but it does not invent screening answers or a qualification result."}
          </p>

          <div
            className="
              mt-7 border-t border-amber-500/25
              pt-6
            "
          >
            <p
              className="
                text-xs font-semibold uppercase
                tracking-[0.14em] text-foreground/40
              "
            >
              Current trusted evidence
            </p>

            <p className="mt-2 text-sm font-medium">
              Resume profile and initial score: 77 / 100
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div
          className="
            grid gap-px overflow-hidden
            border border-foreground/10
            bg-foreground/10
            sm:grid-cols-2 lg:grid-cols-4
          "
        >
          {[
            {
              label: "Notice period",
              value: "30 days",
            },
            {
              label: "Expected compensation",
              value: "₹12–14 LPA",
            },
            {
              label: "Relocation",
              value: "Conditional yes",
            },
            {
              label: "Candidate interest",
              value: "High",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-background p-5"
            >
              <p
                className="
                  text-xs font-semibold uppercase
                  tracking-[0.13em]
                  text-foreground/38
                "
              >
                {item.label}
              </p>

              <p className="mt-3 text-lg font-semibold">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div
            className="
              border border-cyan-500/35
              bg-cyan-500/[0.07]
              p-6 sm:p-7
            "
          >
            <div className="flex items-center gap-3">
              <BrainCircuit
                size={21}
                strokeWidth={1.7}
                className="text-cyan-500"
                aria-hidden="true"
              />

              <h3 className="normal-case text-xl font-semibold">
                AI-generated summary
              </h3>
            </div>

            <p className="mt-5 text-sm leading-7 text-foreground/68">
              Relevant BOPP production experience and strong
              interest in plant operations. Available within
              thirty days. Relocation is possible if housing
              support is available.
            </p>

            <div
              className="
                mt-6 border-t border-cyan-500/25
                pt-5
              "
            >
              <p className="text-xs text-foreground/40">
                Qualification suggestion
              </p>

              <p className="mt-2 text-sm font-semibold">
                Needs recruiter review
              </p>
            </div>
          </div>

          <div
            className="
              border border-amber-500/35
              bg-amber-500/[0.07]
              p-6 sm:p-7
            "
          >
            <div className="flex items-center gap-3">
              <CircleAlert
                size={21}
                strokeWidth={1.7}
                className="text-amber-500"
                aria-hidden="true"
              />

              <h3 className="normal-case text-xl font-semibold">
                Resume cross-check
              </h3>
            </div>

            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-foreground/40">
                  Resume
                </dt>
                <dd className="mt-1">
                  6 years of total experience
                </dd>
              </div>

              <div>
                <dt className="text-foreground/40">
                  Candidate statement
                </dt>
                <dd className="mt-1">
                  4 years full-time plus 2 years training
                  and internship
                </dd>
              </div>
            </dl>

            <div
              className="
                mt-6 border-t border-amber-500/25
                pt-5
              "
            >
              <p className="text-xs text-foreground/40">
                Review flag
              </p>

              <p className="mt-2 text-sm font-semibold">
                Potential experience discrepancy · Medium
              </p>
            </div>
          </div>
        </div>

        <div
          className="
            flex flex-col gap-5
            border border-emerald-500/35
            bg-emerald-500/[0.07]
            p-6
            sm:flex-row sm:items-center
            sm:justify-between
          "
        >
          <div>
            <p
              className="
                text-xs font-semibold uppercase
                tracking-[0.14em] text-emerald-500
              "
            >
              Score updated with call evidence
            </p>

            <p className="mt-2 text-sm text-foreground/60">
              Relocation, availability, interest, and screening
              evidence were added.
            </p>
          </div>

          <div className="flex items-baseline gap-3">
            <span
              className="
                text-2xl text-foreground/30
                line-through
              "
            >
              77
            </span>

            <ArrowRight
              size={18}
              strokeWidth={1.7}
              className="text-foreground/35"
              aria-hidden="true"
            />

            <span
              className="
                text-4xl font-semibold
                tracking-[-0.05em]
              "
            >
              81
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderRecruiterDecision = () => {
    const consequences =
      recruiterDecision === "approve"
        ? [
            "Application stage updated to Shared with hiring manager",
            "Manager-review task created",
            "Candidate brief generated",
            "Email delivery queued",
            "Audit event appended",
          ]
        : recruiterDecision === "hold"
          ? [
              "Application stage updated to On hold",
              "Recruiter follow-up task created",
              "No manager communication sent",
              "Reason recorded in application history",
            ]
          : recruiterDecision === "reject"
            ? [
                "Application stage updated to Rejected",
                "Rejection reason recorded",
                "Candidate communication can be reviewed",
                "Audit event appended",
              ]
            : [];

    return (
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div
          className="
            border border-foreground/15
            bg-background p-6 sm:p-7
          "
        >
          <p
            className="
              text-xs font-semibold uppercase
              tracking-[0.15em] text-foreground/40
            "
          >
            Recruiter review
          </p>

          <h3
            className="
              mt-3 normal-case text-2xl
              font-semibold tracking-[-0.03em]
            "
          >
            Decide using evidence, not an AI verdict
          </h3>

          <dl className="mt-6 space-y-5">
            <div>
              <dt className="text-xs text-foreground/40">
                Match score
              </dt>
              <dd className="mt-1 text-sm font-medium">
                {score} / 100
              </dd>
            </div>

            <div>
              <dt className="text-xs text-foreground/40">
                AI qualification
              </dt>
              <dd className="mt-1 text-sm font-medium">
                {callOutcome === "completed"
                  ? "Needs recruiter review"
                  : "Screening incomplete"}
              </dd>
            </div>

            <div>
              <dt className="text-xs text-foreground/40">
                Evidence requiring attention
              </dt>
              <dd className="mt-1 text-sm leading-6">
                {callOutcome === "completed"
                  ? "Experience classification and relocation support"
                  : "The screening conversation has not been completed"}
              </dd>
            </div>
          </dl>

          <div className="mt-7 space-y-3">
            {[
              {
                value: "approve" as const,
                label: "Approve for manager review",
                icon: UserCheck,
              },
              {
                value: "hold" as const,
                label: "Place on hold",
                icon: Clock3,
              },
              {
                value: "reject" as const,
                label: "Reject application",
                icon: XCircle,
              },
            ].map((option) => {
              const Icon = option.icon;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    chooseRecruiterDecision(option.value)
                  }
                  className={`
                    flex min-h-14 w-full
                    items-center justify-between
                    gap-4 border px-4 py-3
                    text-left transition-colors
                    ${
                      recruiterDecision === option.value
                        ? "border-foreground bg-foreground text-background"
                        : "border-foreground/15 hover:border-foreground/40"
                    }
                  `}
                >
                  <span className="text-sm font-semibold">
                    {option.label}
                  </span>

                  <Icon
                    size={18}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="
            border border-foreground/15
            bg-foreground/[0.035]
            p-6 sm:p-8
          "
        >
          <div className="flex items-center gap-3">
            <Workflow
              size={22}
              strokeWidth={1.7}
              className="text-foreground/45"
              aria-hidden="true"
            />

            <h3 className="normal-case text-xl font-semibold">
              Workflow consequences
            </h3>
          </div>

          {recruiterDecision ? (
            <motion.div
              key={recruiterDecision}
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mt-6"
            >
              <p className="text-sm leading-6 text-foreground/60">
                The decision changes domain state and creates
                explicit follow-up work.
              </p>

              <ol className="mt-6 space-y-3">
                {consequences.map((item, index) => (
                  <li
                    key={item}
                    className="
                      grid grid-cols-[2rem_1fr]
                      gap-3 border-t
                      border-foreground/10 pt-3
                    "
                  >
                    <span
                      className="
                        text-xs font-semibold
                        text-foreground/30
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-sm leading-6">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </motion.div>
          ) : (
            <div
              className="
                mt-6 flex min-h-64
                items-center justify-center
                border border-dashed
                border-foreground/15 p-6
                text-center
              "
            >
              <div>
                <BriefcaseBusiness
                  size={25}
                  strokeWidth={1.6}
                  className="mx-auto text-foreground/30"
                  aria-hidden="true"
                />

                <p className="mt-4 text-sm leading-6 text-foreground/45">
                  Select a recruiter decision to reveal the
                  resulting application transition and side
                  effects.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderManagerHandoff = () => {
    if (recruiterDecision !== "approve") {
      return (
        <div
          className="
            border border-foreground/15
            bg-foreground/[0.035]
            p-6 sm:p-8
          "
        >
          <ShieldCheck
            size={26}
            strokeWidth={1.7}
            className="text-foreground/40"
            aria-hidden="true"
          />

          <h3
            className="
              mt-5 normal-case text-2xl
              font-semibold tracking-[-0.03em]
            "
          >
            No manager handoff was created
          </h3>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground/62">
            The recruiter selected{" "}
            <strong>
              {recruiterDecision === "hold"
                ? "Place on hold"
                : "Reject application"}
            </strong>
            . The manager-review workflow is therefore not
            started. This is a deliberate consequence of the
            chosen state transition.
          </p>

          <button
            type="button"
            onClick={() => setStep(3)}
            className="
              mt-7 inline-flex min-h-11
              items-center gap-2
              border border-foreground/20
              px-4 py-2 text-sm font-semibold
              hover:border-foreground
            "
          >
            <ChevronLeft
              size={17}
              strokeWidth={1.8}
              aria-hidden="true"
            />
            Change recruiter decision
          </button>
        </div>
      );
    }

    return (
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div
          className="
            border border-foreground/15
            bg-background
          "
        >
          <div
            className="
              flex items-center justify-between
              gap-4 border-b
              border-foreground/10 p-5
            "
          >
            <div className="flex items-center gap-3">
              <Mail
                size={19}
                strokeWidth={1.7}
                className="text-foreground/45"
                aria-hidden="true"
              />

              <div>
                <p
                  className="
                    text-xs font-semibold uppercase
                    tracking-[0.14em]
                    text-foreground/38
                  "
                >
                  Secure manager brief
                </p>

                <p className="mt-1 text-sm font-medium">
                  Production Engineer shortlist
                </p>
              </div>
            </div>

            <span
              className="
                border border-emerald-500/35
                bg-emerald-500/10
                px-3 py-1 text-xs font-semibold
                text-emerald-500
              "
            >
              Delivered
            </span>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <h3
                  className="
                    normal-case text-2xl font-semibold
                    tracking-[-0.03em]
                  "
                >
                  Aarav Mehta
                </h3>

                <p className="mt-1 text-sm text-foreground/50">
                  Production Engineer candidate
                </p>
              </div>

              <p
                className="
                  text-3xl font-semibold
                  tracking-[-0.04em]
                "
              >
                81
                <span className="text-sm text-foreground/35">
                  /100
                </span>
              </p>
            </div>

            <div
              className="
                mt-7 grid gap-5
                border-y border-foreground/10
                py-6 sm:grid-cols-2
              "
            >
              <div>
                <p
                  className="
                    text-xs font-semibold uppercase
                    tracking-[0.13em]
                    text-foreground/38
                  "
                >
                  Strengths
                </p>

                <ul
                  className="
                    mt-3 space-y-2
                    text-sm leading-6
                    text-foreground/65
                  "
                >
                  <li>Relevant BOPP production experience</li>
                  <li>Available within 30 days</li>
                  <li>High interest in the role</li>
                </ul>
              </div>

              <div>
                <p
                  className="
                    text-xs font-semibold uppercase
                    tracking-[0.13em]
                    text-foreground/38
                  "
                >
                  Review required
                </p>

                <ul
                  className="
                    mt-3 space-y-2
                    text-sm leading-6
                    text-foreground/65
                  "
                >
                  <li>Relocation-support expectations</li>
                  <li>Experience classification discrepancy</li>
                </ul>
              </div>
            </div>

            <p className="mt-6 text-sm leading-7 text-foreground/60">
              Manager reply:
              <span className="ml-2 font-medium text-foreground">
                “Proceed with Aarav for Round 1.”
              </span>
            </p>
          </div>
        </div>

        <div
          className="
            border border-cyan-500/35
            bg-cyan-500/[0.07]
            p-6 sm:p-7
          "
        >
          <p
            className="
              text-xs font-semibold uppercase
              tracking-[0.14em] text-cyan-500
            "
          >
            Interpreted response
          </p>

          <h3
            className="
              mt-3 normal-case text-xl
              font-semibold
            "
          >
            Aarav Mehta — Approve for Round 1
          </h3>

          <div
            className="
              mt-6 flex items-center
              justify-between border-y
              border-cyan-500/25 py-4
            "
          >
            <span className="text-sm text-foreground/55">
              Interpretation confidence
            </span>

            <span className="text-sm font-semibold">
              94%
            </span>
          </div>

          <p className="mt-6 text-sm leading-6 text-foreground/58">
            The interpreted action is not committed until the
            authorised manager confirms it.
          </p>

          <div className="mt-7 space-y-3">
            {[
              {
                value: "approve" as const,
                label: "Confirm Round 1",
                icon: CheckCircle2,
              },
              {
                value: "hold" as const,
                label: "Place on hold",
                icon: Clock3,
              },
              {
                value: "reject" as const,
                label: "Reject candidate",
                icon: XCircle,
              },
            ].map((option) => {
              const Icon = option.icon;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    setManagerDecision(option.value)
                  }
                  className={`
                    flex min-h-12 w-full
                    items-center justify-between
                    gap-4 border px-4 py-3
                    text-left transition-colors
                    ${
                      managerDecision === option.value
                        ? "border-foreground bg-foreground text-background"
                        : "border-cyan-500/25 bg-background/60 hover:border-foreground/40"
                    }
                  `}
                >
                  <span className="text-sm font-semibold">
                    {option.label}
                  </span>

                  <Icon
                    size={17}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderTimeline = () => {
    return (
      <div>
        <div
          className="
            flex flex-col gap-5
            border-b border-foreground/15
            pb-6 sm:flex-row
            sm:items-end sm:justify-between
          "
        >
          <div>
            <p
              className="
                text-xs font-semibold uppercase
                tracking-[0.15em] text-foreground/40
              "
            >
              Complete activity history
            </p>

            <h3
              className="
                mt-2 normal-case text-2xl
                font-semibold tracking-[-0.03em]
              "
            >
              One candidate, reconstructed from events
            </h3>
          </div>

          <div className="text-sm text-foreground/50">
            Final visible score:{" "}
            <span className="font-semibold text-foreground">
              {score} / 100
            </span>
          </div>
        </div>

        <ol className="mt-8">
          {timeline.map((event, index) => (
            <motion.li
              key={`${event.time}-${event.title}`}
              initial={{
                opacity: 0,
                x: -8,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.05,
              }}
              className="
                grid grid-cols-[4rem_1.5rem_minmax(0,1fr)]
                gap-4
              "
            >
              <time
                className="
                  pt-1 text-xs font-semibold
                  text-foreground/35
                "
              >
                {event.time}
              </time>

              <div className="flex flex-col items-center">
                <span
                  className="
                    mt-1.5 block h-2.5 w-2.5
                    rounded-full bg-foreground
                  "
                />

                {index < timeline.length - 1 && (
                  <span
                    className="
                      block min-h-16 w-px grow
                      bg-foreground/15
                    "
                  />
                )}
              </div>

              <div className="pb-7">
                <h4 className="normal-case text-sm font-semibold">
                  {event.title}
                </h4>

                <p className="mt-1 text-sm leading-6 text-foreground/55">
                  {event.detail}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>

        <div
          className="
            mt-4 border border-emerald-500/35
            bg-emerald-500/[0.07]
            p-5
          "
        >
          <div className="flex items-start gap-3">
            <CheckCircle2
              size={20}
              strokeWidth={1.7}
              className="mt-0.5 shrink-0 text-emerald-500"
              aria-hidden="true"
            />

            <div>
              <p className="text-sm font-semibold">
                The current state can be read quickly.
              </p>

              <p className="mt-1 text-sm leading-6 text-foreground/55">
                The event history preserves how the system
                reached it, who acted, and which side effects
                followed.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProductStep = () => {
    switch (step) {
      case 0:
        return renderCandidateMatch();
      case 1:
        return renderScreening();
      case 2:
        return renderIntelligence();
      case 3:
        return renderRecruiterDecision();
      case 4:
        return renderManagerHandoff();
      case 5:
        return renderTimeline();
      default:
        return null;
    }
  };

  const renderEngineeringStep = () => {
    const engineering = ENGINEERING_STEPS[step];

    return (
      <div>
        <div className="max-w-3xl">
          <p
            className="
              text-xs font-semibold uppercase
              tracking-[0.15em] text-foreground/40
            "
          >
            Engineering view · Step {step + 1}
          </p>

          <h3
            className="
              mt-3 normal-case text-3xl
              font-semibold leading-tight
              tracking-[-0.035em]
            "
          >
            {engineering.title}
          </h3>

          <p className="mt-4 text-sm leading-7 text-foreground/62">
            {engineering.description}
          </p>
        </div>

        <div
          className="
            mt-9 flex flex-col
            lg:flex-row lg:items-stretch
          "
        >
          {engineering.nodes.map((node, index) => (
            <div
              key={`${node.label}-${node.kind}`}
              className="
                contents lg:flex
                lg:min-w-0 lg:flex-1
                lg:items-center
              "
            >
              <div
                className={`
                  flex min-h-28 flex-1
                  flex-col justify-between
                  border p-4
                  ${getNodeStyle(node.kind)}
                `}
              >
                <span
                  className="
                    text-[0.65rem] font-semibold uppercase
                    tracking-[0.13em]
                    text-foreground/40
                  "
                >
                  {getNodeLabel(node.kind)}
                </span>

                <span className="mt-7 text-sm font-semibold leading-5">
                  {node.label}
                </span>
              </div>

              {index < engineering.nodes.length - 1 && (
                <div
                  className="
                    flex h-9 items-center
                    justify-center
                    lg:h-auto lg:w-8
                  "
                >
                  <ArrowRight
                    size={16}
                    strokeWidth={1.6}
                    className="
                      rotate-90 text-foreground/30
                      lg:rotate-0
                    "
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          className="
            mt-8 grid gap-5
            lg:grid-cols-3
          "
        >
          <div
            className="
              border border-foreground/15
              bg-background p-5
            "
          >
            <p
              className="
                text-xs font-semibold uppercase
                tracking-[0.14em]
                text-foreground/38
              "
            >
              Records affected
            </p>

            <ul className="mt-4 space-y-2">
              {engineering.writes.map((write) => (
                <li
                  key={write}
                  className="
                    font-mono text-xs
                    text-foreground/65
                  "
                >
                  {write}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="
              border border-amber-500/35
              bg-amber-500/[0.07]
              p-5
            "
          >
            <p
              className="
                text-xs font-semibold uppercase
                tracking-[0.14em] text-amber-500
              "
            >
              Failure handling
            </p>

            <p className="mt-4 text-sm leading-6 text-foreground/62">
              {engineering.failure}
            </p>
          </div>

          <div
            className="
              border border-cyan-500/35
              bg-cyan-500/[0.07]
              p-5
            "
          >
            <p
              className="
                text-xs font-semibold uppercase
                tracking-[0.14em] text-cyan-500
              "
            >
              Design principle
            </p>

            <p className="mt-4 text-sm leading-6 text-foreground/62">
              {engineering.principle}
            </p>
          </div>
        </div>

        <div
          className="
            mt-7 flex flex-wrap gap-x-6 gap-y-3
            border-t border-foreground/10 pt-5
            text-xs text-foreground/45
          "
        >
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 bg-foreground" />
            Deterministic application logic
          </span>

          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 bg-cyan-500" />
            AI-assisted interpretation
          </span>

          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 bg-amber-500" />
            External provider or channel
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      id="walkthrough"
      className="
        overflow-hidden border
        border-foreground/15
        bg-background
      "
    >
      <div
        className="
          flex flex-col gap-5
          border-b border-foreground/15
          bg-foreground/[0.035]
          p-5 sm:p-6
          lg:flex-row lg:items-center
          lg:justify-between
        "
      >
        <div>
          <p
            className="
              text-xs font-semibold uppercase
              tracking-[0.16em] text-foreground/38
            "
          >
            Interactive product simulation
          </p>

          <h2
            className="
              mt-2 normal-case text-2xl
              font-semibold tracking-[-0.035em]
            "
          >
            Move one candidate through TalentStream
          </h2>

          <p className="mt-2 text-sm text-foreground/50">
            Fictional candidate and illustrative workflow.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div
            className="
              flex border border-foreground/15
              bg-background p-1
            "
          >
            <button
              type="button"
              onClick={() => setMode("product")}
              className={`
                min-h-9 px-3 text-xs font-semibold
                transition-colors
                ${
                  mode === "product"
                    ? "bg-foreground text-background"
                    : "text-foreground/55 hover:text-foreground"
                }
              `}
            >
              Product view
            </button>

            <button
              type="button"
              onClick={() => setMode("engineering")}
              className={`
                min-h-9 px-3 text-xs font-semibold
                transition-colors
                ${
                  mode === "engineering"
                    ? "bg-foreground text-background"
                    : "text-foreground/55 hover:text-foreground"
                }
              `}
            >
              Engineering view
            </button>
          </div>

          <button
            type="button"
            onClick={resetWalkthrough}
            className="
              inline-flex min-h-11
              items-center gap-2
              border border-foreground/15
              bg-background px-3
              text-xs font-semibold
              text-foreground/55
              transition-colors
              hover:border-foreground/40
              hover:text-foreground
            "
          >
            <RefreshCw
              size={15}
              strokeWidth={1.8}
              aria-hidden="true"
            />
            Reset
          </button>
        </div>
      </div>

      <div
        className="
          overflow-x-auto border-b
          border-foreground/10
        "
      >
        <ol
          className="
            grid min-w-[760px]
            grid-cols-6
          "
        >
          {STEPS.map((item, index) => (
            <li key={item.title}>
              <button
                type="button"
                onClick={() => setStep(index)}
                aria-current={
                  step === index ? "step" : undefined
                }
                className={`
                  flex min-h-20 w-full
                  items-center gap-3
                  border-r border-foreground/10
                  px-4 text-left
                  transition-colors
                  last:border-r-0
                  ${
                    step === index
                      ? "bg-foreground text-background"
                      : "bg-background hover:bg-foreground/[0.04]"
                  }
                `}
              >
                <span
                  className={`
                    text-xs font-semibold
                    ${
                      step === index
                        ? "text-background/45"
                        : "text-foreground/28"
                    }
                  `}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span>
                  <span className="block text-sm font-semibold">
                    {item.short}
                  </span>

                  <span
                    className={`
                      mt-1 hidden text-xs
                      sm:block
                      ${
                        step === index
                          ? "text-background/55"
                          : "text-foreground/40"
                      }
                    `}
                  >
                    {item.title}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="p-5 sm:p-7 lg:p-9">
        <div
          className="
            mb-7 flex flex-col gap-3
            sm:flex-row sm:items-end
            sm:justify-between
          "
        >
          <div>
            <p
              className="
                text-xs font-semibold uppercase
                tracking-[0.15em] text-foreground/38
              "
            >
              Step {step + 1} of {STEPS.length}
            </p>

            <h2
              className="
                mt-2 normal-case text-2xl
                font-semibold tracking-[-0.03em]
                sm:text-3xl
              "
            >
              {STEPS[step].title}
            </h2>
          </div>

          <p className="text-sm text-foreground/45">
            {mode === "product"
              ? "What the user experiences"
              : "What the system performs"}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${mode}-${step}`}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.22,
            }}
          >
            {mode === "product"
              ? renderProductStep()
              : renderEngineeringStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className="
          flex flex-col gap-4
          border-t border-foreground/15
          bg-foreground/[0.025]
          p-5
          sm:flex-row sm:items-center
          sm:justify-between
        "
      >
        <button
          type="button"
          onClick={() =>
            setStep((current) =>
              Math.max(0, current - 1),
            )
          }
          disabled={step === 0}
          className="
            inline-flex min-h-11
            items-center justify-center
            gap-2 border
            border-foreground/15
            px-4 text-sm font-semibold
            transition-colors
            hover:border-foreground
            disabled:cursor-not-allowed
            disabled:opacity-30
          "
        >
          <ChevronLeft
            size={17}
            strokeWidth={1.8}
            aria-hidden="true"
          />
          Previous
        </button>

        {!canContinue && (
          <p
            className="
              text-center text-xs
              text-amber-500
            "
          >
            {step === 3
              ? "Choose a recruiter decision to continue."
              : "Confirm the manager decision to continue."}
          </p>
        )}

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={() =>
              setStep((current) =>
                Math.min(
                  STEPS.length - 1,
                  current + 1,
                ),
              )
            }
            disabled={!canContinue}
            className="
              inline-flex min-h-11
              items-center justify-center
              gap-2 bg-foreground
              px-5 text-sm font-semibold
              text-background
              transition-opacity
              hover:opacity-80
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >
            Next step
            <ChevronRight
              size={17}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </button>
        ) : (
          <button
            type="button"
            onClick={resetWalkthrough}
            className="
              inline-flex min-h-11
              items-center justify-center
              gap-2 bg-foreground
              px-5 text-sm font-semibold
              text-background
              transition-opacity hover:opacity-80
            "
          >
            Run again
            <RefreshCw
              size={16}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </button>
        )}
      </div>
    </div>
  );
}