import "../global.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://abhijeet.dev"),
  title: "Abhijeet | Frontend Developer",
  description:
    "Frontend Developer with full-stack foundations. Building responsive, interactive web experiences with React, TypeScript, and clean, user-first code.",
  openGraph: {
    title: "Abhijeet | Frontend Developer",
    description:
      "Frontend Developer with full-stack foundations. Building responsive, interactive web experiences with React, TypeScript, and clean, user-first code.",
    url: "https://abhijeet.dev",
    siteName: "Abhijeet — Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abhijeet — Frontend Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhijeet | Frontend Developer",
    description:
      "Frontend Developer with full-stack foundations. React, TypeScript, and clean, user-first code.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
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
