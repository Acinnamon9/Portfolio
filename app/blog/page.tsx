import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  ArrowUpRight,
  BookOpen,
} from "lucide-react";

import {
  listPublishedBlogPosts,
} from "../../lib/blog/repository";

import {
  formatBlogDate,
  getReadingTimeMinutes,
  toIsoDate,
} from "../../lib/blog/presentation";

/**
 * Always read the latest published state from Neon.
 *
 * Without this, a database-backed page may be generated ahead of
 * time and not immediately reflect publications made by the GPT.
 */
export const dynamic =
  "force-dynamic";

export const metadata: Metadata = {
  title:
    "Technical Writing | Abhijeet Singh",

  description:
    "Technical writing about backend architecture, product engineering, operational workflows, authorization, databases, and AI-assisted systems.",

  alternates: {
    canonical: "/blog",
  },

  openGraph: {
    title:
      "Technical Writing | Abhijeet Singh",

    description:
      "Engineering notes about backend architecture, workflows, authorization, databases, and AI-assisted systems.",

    url: "/blog",
    type: "website",
  },
};

export default async function BlogPage() {
  const posts =
    await listPublishedBlogPosts();

  return (
    <>
      <header
        className="
          border-b border-foreground/10
          px-4 sm:px-6 lg:px-12
        "
        style={{
          paddingTop:
            "var(--navbar-h, 5rem)",
        }}
      >
        <div
          className="
            mx-auto max-w-7xl
            py-16 sm:py-20 lg:py-24
          "
        >
          <p
            className="
              text-xs font-semibold uppercase
              tracking-[0.2em]
              text-foreground/40
            "
          >
            Engineering writing
          </p>

          <div
            className="
              mt-5 grid gap-8
              lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.55fr)]
              lg:items-end
            "
          >
            <h1
              className="
                max-w-4xl
                text-[clamp(3rem,7vw,6rem)]
                font-semibold leading-[0.94]
                tracking-[-0.06em]
              "
            >
              Notes from building real software systems.
            </h1>

            <div>
              <p
                className="
                  max-w-xl text-lg leading-8
                  text-foreground/60
                "
              >
                Articles about backend architecture,
                product decisions, operational workflows,
                debugging, authorization, data modelling,
                and AI-assisted engineering.
              </p>

              <p
                className="
                  mt-5 text-sm
                  text-foreground/38
                "
              >
                {posts.length} published{" "}
                {posts.length === 1
                  ? "article"
                  : "articles"}
              </p>
            </div>
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
          {posts.length === 0 ? (
            <div
              className="
                flex min-h-96
                items-center justify-center
                border border-foreground/15
                bg-foreground/[0.025]
                px-6 py-16 text-center
              "
            >
              <div className="max-w-xl">
                <BookOpen
                  size={30}
                  strokeWidth={1.5}
                  className="
                    mx-auto
                    text-foreground/30
                  "
                  aria-hidden="true"
                />

                <h2
                  className="
                    mt-6 text-3xl
                    font-semibold
                    tracking-[-0.035em]
                  "
                >
                  No published articles yet.
                </h2>

                <p
                  className="
                    mt-4 text-base leading-7
                    text-foreground/52
                  "
                >
                  Drafts remain private. Articles will
                  appear here automatically after they
                  are explicitly published.
                </p>
              </div>
            </div>
          ) : (
            <div>
              {posts.map(
                (post, index) => {
                  const publicationDate =
                    post.publishedAt ??
                    post.updatedAt;

                  const readingTime =
                    getReadingTimeMinutes(
                      post.contentMarkdown,
                    );

                  return (
                    <article
                      key={post.id}
                      className="
                        grid gap-7
                        border-b
                        border-foreground/15
                        py-10 first:pt-0
                        sm:py-12
                        lg:grid-cols-[4rem_minmax(0,1fr)_auto]
                        lg:gap-10
                      "
                    >
                      <span
                        className="
                          text-xs font-semibold
                          tracking-[0.15em]
                          text-foreground/28
                        "
                      >
                        {String(
                          index + 1,
                        ).padStart(2, "0")}
                      </span>

                      <div>
                        <div
                          className="
                            flex flex-wrap
                            items-center gap-x-3
                            gap-y-2
                            text-xs font-medium
                            text-foreground/42
                          "
                        >
                          <time
                            dateTime={toIsoDate(
                              publicationDate,
                            )}
                          >
                            {formatBlogDate(
                              publicationDate,
                            )}
                          </time>

                          <span
                            aria-hidden="true"
                            className="
                              h-1 w-1
                              rounded-full
                              bg-foreground/25
                            "
                          />

                          <span>
                            {readingTime} min read
                          </span>
                        </div>

                        <h2
                          className="
                            mt-4 max-w-4xl
                            text-3xl font-semibold
                            leading-tight
                            tracking-[-0.04em]
                            sm:text-4xl
                          "
                        >
                          <Link
                            href={
                              `/blog/${post.slug}`
                            }
                            className="
                              transition-opacity
                              hover:opacity-60
                            "
                          >
                            {post.title}
                          </Link>
                        </h2>

                        <p
                          className="
                            mt-5 max-w-3xl
                            text-base leading-7
                            text-foreground/60
                            sm:text-lg
                            sm:leading-8
                          "
                        >
                          {post.description}
                        </p>
                      </div>

                      <Link
                        href={
                          `/blog/${post.slug}`
                        }
                        aria-label={
                          `Read ${post.title}`
                        }
                        className="
                          inline-flex h-12 w-12
                          items-center justify-center
                          border border-foreground/15
                          text-foreground/55
                          transition-colors
                          hover:border-foreground
                          hover:text-foreground
                          lg:self-center
                        "
                      >
                        <ArrowUpRight
                          size={19}
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      </Link>
                    </article>
                  );
                },
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
