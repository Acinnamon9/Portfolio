"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  FileText,
  ChevronRight,
  Lock,
  ArrowLeft,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

interface Doc {
  filename: string;
  name: string;
  content: string;
}

export default function InternalPage() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [activeDoc, setActiveDoc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  useEffect(() => {
    fetch("/api/docs")
      .then((res) => res.json())
      .then((data: Doc[]) => {
        setDocs(data);
        if (data.length > 0) setActiveDoc(data[0].filename);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const currentDoc = docs.find((d) => d.filename === activeDoc);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-foreground text-background border-b-8 border-brand-primary px-6 py-4">
        <div className="max-w-full mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 border-4 border-background"
            >
              {sidebarOpen ? (
                <X size={24} strokeWidth={3} />
              ) : (
                <Menu size={24} strokeWidth={3} />
              )}
            </button>
            <div className="flex items-center gap-3">
              <Lock size={20} strokeWidth={3} className="text-brand-primary" />
              <h1 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">
                INTERNAL // DOCS
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 border-4 border-background text-background hover:text-brand-primary transition-colors"
              title="Toggle Theme"
            >
              {theme === "light" ? (
                <Moon size={20} strokeWidth={3} />
              ) : (
                <Sun size={20} strokeWidth={3} />
              )}
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 font-black uppercase text-sm hover:text-brand-primary transition-colors"
            >
              <ArrowLeft size={16} strokeWidth={3} /> BACK TO SITE
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-20 flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:fixed top-20 left-0 h-[calc(100vh-5rem)] w-72 bg-background border-r-8 border-foreground z-40 overflow-y-auto transition-transform duration-300",
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0",
          )}
        >
          <div className="p-6 space-y-2">
            <p className="text-xs font-black uppercase tracking-widest text-foreground/50 mb-4">
              {docs.length} DOCUMENTS
            </p>
            {docs.map((doc) => (
              <button
                key={doc.filename}
                onClick={() => {
                  setActiveDoc(doc.filename);
                  setSidebarOpen(false);
                }}
                className={cn(
                  "w-full text-left p-4 border-4 font-black uppercase text-sm tracking-tight flex items-center gap-3 transition-all",
                  activeDoc === doc.filename
                    ? "bg-foreground text-background border-foreground shadow-[4px_4px_0px_0px_#ffeb3b]"
                    : "border-transparent hover:border-foreground hover:bg-foreground/5",
                )}
              >
                <FileText size={18} strokeWidth={3} className="shrink-0" />
                <span className="truncate">{doc.name}</span>
                {activeDoc === doc.filename && (
                  <ChevronRight
                    size={16}
                    strokeWidth={3}
                    className="ml-auto shrink-0"
                  />
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Content */}
        <div className="lg:ml-72 flex-1 min-h-[calc(100vh-5rem)]">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-2xl font-black uppercase animate-pulse">
                LOADING DOCS...
              </div>
            </div>
          ) : currentDoc ? (
            <AnimatePresence mode="wait">
              <motion.article
                key={currentDoc.filename}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="max-w-4xl mx-auto px-6 md:px-12 py-10 md:py-16"
              >
                {/* Document header */}
                <div className="mb-10 pb-8 border-b-8 border-foreground">
                  <span className="text-xs font-black uppercase tracking-widest text-foreground/50">
                    {currentDoc.filename}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mt-2">
                    {currentDoc.name}
                  </h2>
                </div>

                {/* Markdown content */}
                <div className="docs-prose">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {currentDoc.content}
                  </ReactMarkdown>
                </div>
              </motion.article>
            </AnimatePresence>
          ) : (
            <div className="flex items-center justify-center h-96">
              <p className="text-2xl font-black uppercase text-foreground/30">
                NO DOCUMENTS FOUND
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
