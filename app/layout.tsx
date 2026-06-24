import "../global.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://abhijeet.dev"),
  title: "Abhijeet Singh | Product-Focused Software Engineer",
  description:
    "Product-focused software engineer working across frontend systems, backend services, data models, permissions, and AI integrations.",
  openGraph: {
    title: "Abhijeet Singh | Product-Focused Software Engineer",
    description:
      "Building operational software across product flows, frontend interfaces, backend systems, and AI integrations.",
    url: "https://abhijeet.dev",
    siteName: "Abhijeet Singh — Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abhijeet Singh — Product-Focused Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhijeet Singh | Product-Focused Software Engineer",
    description:
      "Building operational software across product flows, frontend interfaces, backend systems, and AI integrations.",
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