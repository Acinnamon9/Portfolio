"use client";

export default function Footer() {
  return (
    <footer className="py-20 border-t-8 border-foreground text-center bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 font-black text-2xl uppercase italic">
        <p>© {new Date().getFullYear()} ABHIJEET // BUILT FOR RESULTS</p>
        <div className="flex gap-16">
          <a href="#" className="hover:text-brand-primary">
            TWITTER
          </a>
          <a
            href="https://github.com/Acinnamon9"
            className="hover:text-brand-primary"
          >
            GITHUB
          </a>
          <a href="#" className="hover:text-brand-primary">
            LINKEDIN
          </a>
        </div>
      </div>
    </footer>
  );
}
