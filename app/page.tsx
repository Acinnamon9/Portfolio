import {
  ArrowUpRight,
  FileDown,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/sections/HeroSection";
import SelectedWorkSection from "../components/sections/SelectedWorkSection";
import ProductExperiencesSection from "../components/sections/ProductExperiencesSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <SelectedWorkSection />
      <ProductExperiencesSection />

      <section
        id="contact"
        className="
          border-t border-foreground/10
          bg-foreground px-4 py-20
          text-background
          sm:px-6 sm:py-24
          lg:px-12 lg:py-28
        "
      >
        <div
          className="
            mx-auto grid max-w-7xl gap-12
            lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.55fr)]
            lg:items-end
          "
        >
          <div>
            <p
              className="
                text-xs font-semibold uppercase
                tracking-[0.2em] text-background/45
              "
            >
              Contact
            </p>

            <h2
              className="
                mt-5 max-w-4xl
                text-4xl font-semibold leading-[1.02]
                tracking-[-0.045em]
                sm:text-5xl lg:text-6xl
              "
            >
              Open to product engineering, frontend
              engineering, and full-stack opportunities.
            </h2>

            <p
              className="
                mt-6 max-w-2xl text-lg leading-8
                text-background/65
              "
            >
              I am especially interested in teams building
              operational products where understanding the
              workflow matters as much as writing the code.
            </p>
          </div>

          <div className="space-y-3">
            <a
              href="mailto:abhisand30@gmail.com"
              className="
                flex min-h-14 items-center justify-between
                border border-background/20
                px-5 py-4 text-sm font-semibold
                transition-colors
                hover:border-background/60
              "
            >
              <span className="flex items-center gap-3">
                <Mail size={18} strokeWidth={1.8} />
                Email
              </span>

              <ArrowUpRight size={18} strokeWidth={1.8} />
            </a>

            <a
              href="/documents/abhijeet-resume.pdf"
              download
              className="
                flex min-h-14 items-center justify-between
                border border-background/20
                px-5 py-4 text-sm font-semibold
                transition-colors
                hover:border-background/60
              "
            >
              <span className="flex items-center gap-3">
                <FileDown size={18} strokeWidth={1.8} />
                Download resume
              </span>

              <ArrowUpRight size={18} strokeWidth={1.8} />
            </a>

            <a
              href="https://www.linkedin.com/in/abhijeet-sandhu"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex min-h-14 items-center justify-between
                border border-background/20
                px-5 py-4 text-sm font-semibold
                transition-colors
                hover:border-background/60
              "
            >
              <span className="flex items-center gap-3">
                <Linkedin size={18} strokeWidth={1.8} />
                LinkedIn
              </span>

              <ArrowUpRight size={18} strokeWidth={1.8} />
            </a>

            <a
              href="https://github.com/Acinnamon9"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex min-h-14 items-center justify-between
                border border-background/20
                px-5 py-4 text-sm font-semibold
                transition-colors
                hover:border-background/60
              "
            >
              <span className="flex items-center gap-3">
                <Github size={18} strokeWidth={1.8} />
                GitHub
              </span>

              <ArrowUpRight size={18} strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </section>

      <footer
        className="
          border-t border-background/10
          bg-foreground px-4 py-7
          text-background sm:px-6 lg:px-12
        "
      >
        <div
          className="
            mx-auto flex max-w-7xl flex-col gap-3
            text-sm text-background/45
            sm:flex-row sm:items-center
            sm:justify-between
          "
        >
          <p>
            © {new Date().getFullYear()} Abhijeet Singh
          </p>

          <p>
            Product-focused software engineer
          </p>
        </div>
      </footer>
    </main>
  );
}
