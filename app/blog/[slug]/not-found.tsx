import Link from "next/link";

import {
  ArrowLeft,
  FileQuestion,
} from "lucide-react";

export default function BlogPostNotFound() {
  return (
    <section
      className="
        flex min-h-[75vh]
        items-center justify-center
        px-4 py-20
        sm:px-6 lg:px-12
      "
      style={{
        paddingTop:
          "calc(var(--navbar-h, 5rem) + 5rem)",
      }}
    >
      <div
        className="
          w-full max-w-2xl
          border border-foreground/15
          bg-foreground/[0.025]
          px-6 py-14 text-center
          sm:px-10
        "
      >
        <FileQuestion
          size={32}
          strokeWidth={1.5}
          className="
            mx-auto
            text-foreground/30
          "
          aria-hidden="true"
        />

        <h1
          className="
            mt-6 text-4xl font-semibold
            tracking-[-0.045em]
            sm:text-5xl
          "
        >
          Article not found.
        </h1>

        <p
          className="
            mx-auto mt-5 max-w-lg
            text-base leading-7
            text-foreground/55
          "
        >
          This article may not exist, may still
          be a private draft, or may have been
          archived.
        </p>

        <Link
          href="/blog"
          className="
            mt-8 inline-flex
            min-h-12 items-center
            justify-center gap-2
            bg-foreground px-5 py-3
            text-sm font-semibold
            text-background
            transition-opacity
            hover:opacity-80
          "
        >
          <ArrowLeft
            size={17}
            strokeWidth={1.8}
            aria-hidden="true"
          />

          Back to writing
        </Link>
      </div>
    </section>
  );
}
