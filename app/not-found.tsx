"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "../components/ui/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center space-y-10 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-[12rem] md:text-[16rem] font-black leading-none tracking-tighter text-foreground/10">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">
            PAGE NOT FOUND.
          </h2>
          <p className="text-xl md:text-2xl font-bold uppercase text-foreground/60">
            THIS ROUTE DOESN'T EXIST. MAYBE IT NEVER DID.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Link href="/">
            <Button className="brutalist-button h-16 text-xl px-10 flex items-center gap-3">
              <Home size={24} strokeWidth={3} /> GO HOME
            </Button>
          </Link>
          <Link href="/#projects">
            <Button
              variant="outline"
              className="h-16 text-xl px-10 border-4 font-black flex items-center gap-3"
            >
              VIEW PROJECTS
            </Button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
