import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "../../lib/db/schema";
import {
  formatBlogDate,
  getReadingTimeMinutes,
  toIsoDate,
} from "../../lib/blog/presentation";

type LatestBlogsSectionProps = {
  posts: BlogPost[];
};

export default function LatestBlogsSection({
  posts,
}: LatestBlogsSectionProps) {
  return (
    <section
      id="latest-writing"
      className="snap-center border-t border-foreground/10 bg-background px-4 py-20 sm:px-6 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 border-b border-foreground/15 pb-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          <div>
            <h2 className="max-w-xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-5xl">
              Latest writing.
            </h2>
          </div>

          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-lg leading-8 text-foreground/65">
              Notes on product engineering, backend systems, and the work of
              building reliable software.
            </p>
            <Link
              href="/blog"
              className="mt-5 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-semibold text-foreground transition-opacity hover:opacity-60"
            >
              View all articles
              <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {posts.length > 0 ? (
          <div>
            {posts.map((post, index) => {
              const publicationDate = post.publishedAt ?? post.updatedAt;

              return (
                <article
                  key={post.id}
                  className="grid gap-5 border-b border-foreground/15 py-8 sm:py-10 lg:grid-cols-[4rem_minmax(0,1fr)_auto] lg:items-center lg:gap-10"
                >
                  <span className="text-xs font-semibold tracking-[0.15em] text-foreground/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-foreground/45">
                      <time dateTime={toIsoDate(publicationDate)}>
                        {formatBlogDate(publicationDate)}
                      </time>
                      <span aria-hidden="true" className="size-1 rounded-full bg-foreground/25" />
                      <span>{getReadingTimeMinutes(post.contentMarkdown)} min read</span>
                    </div>

                    <h3 className="mt-3 max-w-4xl text-2xl font-semibold leading-tight tracking-[-0.035em] text-foreground sm:text-3xl">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="transition-opacity hover:opacity-60"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-foreground/60 sm:text-base sm:leading-7">
                      {post.description}
                    </p>
                    {post.coverImageUrl && (
                      <div className="relative mt-5 aspect-[16/9] max-w-xl overflow-hidden border border-foreground/10 bg-foreground/[0.03]">
                        <Image
                          src={post.coverImageUrl}
                          alt={`Cover image for ${post.title}`}
                          fill
                          unoptimized
                          sizes="(max-width: 672px) 100vw, 576px"
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    aria-label={`Read ${post.title}`}
                    className="inline-flex h-11 w-11 items-center justify-center border border-foreground/15 text-foreground/55 transition-colors hover:border-foreground hover:text-foreground lg:self-center"
                  >
                    <ArrowUpRight size={19} strokeWidth={1.8} aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="border-b border-foreground/15 py-10 text-base text-foreground/55">
            New articles will appear here when published.
          </p>
        )}
      </div>
    </section>
  );
}
