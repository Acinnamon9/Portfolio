import type {
  ReactNode,
} from "react";

import Navbar from "../../components/Navbar";
import BlogFooter from "../../components/blog/BlogFooter";

type BlogLayoutProps = {
  children: ReactNode;
};

export default function BlogLayout({
  children,
}: BlogLayoutProps) {
  return (
    <main
      className="
        min-h-screen
        bg-background text-foreground
      "
    >
      <Navbar />

      {children}

      <BlogFooter />
    </main>
  );
}
