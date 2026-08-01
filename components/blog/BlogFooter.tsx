import Link from "next/link";

export default function BlogFooter() {
  return (
    <footer
      className="
        border-t border-foreground/10
        bg-foreground px-4 py-8
        text-background
        sm:px-6 lg:px-12
      "
    >
      <div
        className="
          mx-auto flex max-w-7xl
          flex-col gap-4
          text-sm text-background/45
          sm:flex-row sm:items-center
          sm:justify-between
        "
      >
        <p>
          © {new Date().getFullYear()}{" "}
          Abhijeet Singh
        </p>

        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="
              transition-colors
              hover:text-background
            "
          >
            Portfolio
          </Link>

          <Link
            href="/blog"
            className="
              transition-colors
              hover:text-background
            "
          >
            Writing
          </Link>

          <a
            href="mailto:abhisand30@gmail.com"
            className="
              transition-colors
              hover:text-background
            "
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
