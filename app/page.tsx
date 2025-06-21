// app/page.tsx or pages/index.tsx
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-slate-100 to-white">
      <motion.div
        className="text-center space-y-8 max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Welcome to GearNest
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Your personalized space to add, explore, and manage fashion & gear
          items beautifully.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <img
            src="/landing.png"
            alt="Hero"
            className="w-full max-w-md mx-auto rounded-xl shadow-md"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link href="/add-item">
            <Button
              size="lg"
              className="mt-6 px-8 py-4 text-base font-semibold shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
            >
              Get Started
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
