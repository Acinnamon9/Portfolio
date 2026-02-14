import "../global.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Abhijeet | Full Stack Developer",
  description:
    "Portfolio of Abhijeet, a passionate Full Stack Developer specializing in React, Node.js, and modern web technologies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
