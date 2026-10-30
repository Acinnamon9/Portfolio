import {
  cache,
} from "react";

import type {
  Metadata,
} from "next";

import Link from "next/link";
import Image from "next/image";

import {
  notFound,
} from "next/navigation";

import {
  ArrowLeft,
} from "lucide-react";

import MarkdownArticle from "../../../components/blog/MarkdownArticle";

import {
  BlogPostNotFoundError,
} from "../../../lib/blog/errors";

import {
  getPublishedBlogPostBySlug,
} from "../../../lib/blog/repository";

import {
  formatBlogDate,
  getReadingTimeMinutes,
  toIsoDate,
} from "../../../lib/blog/presentation";

export const dynamic =
  "force-dynamic";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * React cache prevents generateMetadata() and the page component
 * from independently querying the same post during one render.
 */
const getPublicPost = cache(
  async (slug: string) => {
    try {
      return await getPublishedBlogPostBySlug(
        slug,
      );
    } catch (error) {
      if (
        error instanceof
        BlogPostNotFoundError
      ) {
        notFound();
      }

      throw error;
    }
  },
);

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } =
    await params;

  const post =
    await getPublicPost(slug);

  const canonicalPath =
    `/blog/${post.slug}`;

  return {
    title:
      `${post.title} | Abhijeet Singh`,

    description:
      post.description,

    alternates: {
      canonical:
        canonicalPath,
    },

    openGraph: {
      title:
        post.title,

      description:
        post.description,

      url:
        canonicalPath,

      type:
        "article",

      publishedTime:
        post.publishedAt
          ? post.publishedAt.toISOString()
          : undefined,

      modifiedTime:
        post.updatedAt.toISOString(),

      authors: [
        "Abhijeet Singh",
      ],

      images: post.coverImageUrl
        ? [post.coverImageUrl]
        : undefined,
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        post.title,

      description:
        post.description,

      images: post.coverImageUrl
        ? [post.coverImageUrl]
        : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { slug } =
    await params;

  const post =
    await getPublicPost(slug);

  const publicationDate =
    post.publishedAt ??
    post.updatedAt;

  const readingTime =
    getReadingTimeMinutes(
      post.contentMarkdown,
    );

  const wasUpdatedAfterPublication =
    Boolean(
      post.publishedAt &&
      post.updatedAt.getTime() >
        post.publishedAt.getTime() +
          1000,
    );

  return (
    <>
      <article
        className="
          px-4 pb-20
          sm:px-6 sm:pb-24
          lg:px-12 lg:pb-28
        "
        style={{
          paddingTop:
            "calc(var(--navbar-h, 5rem) + 3rem)",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <Link
            href="/blog"
            className="
              inline-flex items-center
              gap-2 text-sm font-medium
              text-foreground/50
              transition-colors
              hover:text-foreground
            "
          >
            <ArrowLeft
              size={17}
              strokeWidth={1.8}
              aria-hidden="true"
            />

            All writing
          </Link>

          <header
            className="
              mt-12 border-b
              border-foreground/15
              pb-12 sm:pb-16
            "
          >
            <p
              className="
                text-xs font-semibold uppercase
                tracking-[0.2em]
                text-foreground/38
              "
            >
              Engineering article
            </p>

            <h1
              className="
                mt-5 max-w-5xl
                text-[clamp(2.75rem,6vw,5.5rem)]
                font-semibold leading-[0.96]
                tracking-[-0.06em]
              "
            >
              {post.title}
            </h1>

            <p
              className="
                mt-7 max-w-3xl
                text-lg leading-8
                text-foreground/60
                sm:text-xl
              "
            >
              {post.description}
            </p>

            <div
              className="
                mt-8 flex flex-wrap
                items-center gap-x-3
                gap-y-2 text-sm
                text-foreground/42
              "
            >
              <span>
                Abhijeet Singh
              </span>

              <span
                aria-hidden="true"
                className="
                  h-1 w-1 rounded-full
                  bg-foreground/25
                "
              />

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
                  h-1 w-1 rounded-full
                  bg-foreground/25
                "
              />

              <span>
                {readingTime} min read
              </span>

              {wasUpdatedAfterPublication && (
                <>
                  <span
                    aria-hidden="true"
                    className="
                      h-1 w-1 rounded-full
                      bg-foreground/25
                    "
                  />

                  <span>
                    Updated{" "}
                    {formatBlogDate(
                      post.updatedAt,
                    )}
                  </span>
                </>
              )}
            </div>

            {post.coverImageUrl && (
              <div className="relative mt-10 aspect-[16/9] max-w-5xl overflow-hidden border border-foreground/10 bg-foreground/[0.03]">
                <Image
                  src={post.coverImageUrl}
                  alt={`Cover image for ${post.title}`}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </header>

          <div
            className="
              grid gap-12 pt-12
              lg:grid-cols-[minmax(0,46rem)_minmax(220px,1fr)]
              lg:gap-20
              lg:pt-16
            "
          >
            <MarkdownArticle
              markdown={
                post.contentMarkdown
              }
              title={
                post.title
              }
            />

            <aside
              className="
                border-t
                border-foreground/15
                pt-5
                lg:sticky lg:top-28
                lg:self-start
              "
            >
              <p
                className="
                  text-xs font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-foreground/35
                "
              >
                About this writing
              </p>

              <p
                className="
                  mt-4 text-sm leading-6
                  text-foreground/55
                "
              >
                Notes from hands-on work
                across product engineering,
                backend systems, data models,
                authorization, integrations,
                and operational workflows.
              </p>

              <Link
                href="/blog"
                className="
                  mt-6 inline-flex
                  items-center gap-2
                  border-b
                  border-foreground
                  pb-1 text-sm
                  font-semibold
                  transition-opacity
                  hover:opacity-60
                "
              >
                Browse all articles
              </Link>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
