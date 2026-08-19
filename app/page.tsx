"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  ArrowRight,
  Code2,
  Mail,
} from "lucide-react";

import Projects from "./Projects";
import About from "./About";

const logs = [
  "GET /api/v1/auth/jwt 200 OK - 12ms",
  "REDIS: SET lock:beautician_slot_42 NX EX 30",
  "CELERY: Executing task calculate_fraud_risk[#4921]",
  "POSTGRES: SELECT * FROM tickets WHERE status='OPEN'",
  "DOCKER: Container backend-api healthy on :8000",
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [logIndex, setLogIndex] = useState(0);

  // Splash Screen Timer (1.5 Seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // System Log Interval
  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % logs.length);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ⚡ FLASH NAME INTRO ANIMATION */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="fixed inset-0 z-50 bg-neutral-950 flex flex-col items-center justify-center font-mono"
          >
            <motion.div
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: [0.8, 1.1, 1],
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                times: [0, 0.6, 1],
              }}
              className="flex items-center gap-3"
            >
              <Terminal className="w-8 h-8 text-emerald-400 animate-pulse" />

              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-widest uppercase">
                HIMANSHU RATHOD
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs text-emerald-500 mt-4 tracking-widest uppercase"
            >
              [ INITIALIZING SYSTEM CORE... ]
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN WEBSITE CONTENT */}
      <main className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between p-6 md:p-16 relative overflow-hidden font-sans">

        {/* Background Gradients */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"
        />

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"
        />

        {/* Top Header */}
        <header className="flex justify-between items-center z-10 border-b border-neutral-800/80 pb-4 mb-8">

          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-emerald-400" />

            <span className="font-mono text-sm tracking-wider text-neutral-300 uppercase">
              Himanshu Rathod
            </span>
          </div>

          <div className="flex items-center space-x-4">

            <div className="hidden sm:flex items-center space-x-2 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1 rounded-full text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                Available for Backend / Software Engineer Roles
              </span>
            </div>

            <a
              href="https://github.com/codingbetas"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
              title="GitHub Profile"
            >
              <Code2 className="w-4 h-4" />
            </a>

            <a
              href="https://linkedin.com/in/himanshu-rathod-5815991bb"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
              title="LinkedIn Profile"
            >
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>

          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl">

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            className="lg:col-span-7"
          >
            <p className="font-mono text-xs md:text-sm text-emerald-400 uppercase tracking-widest mb-3">
              Software Developer • AI & Machine Learning
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Designing backend systems & AI-powered web applications.
            </h1>

            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-8 leading-relaxed">
              Specialized in Python (FastAPI), ML predictive pipelines,
              Next.js, and concurrent API design to solve real-world
              problems.
            </p>

            <div className="flex flex-wrap gap-4 items-center">

              <a
                href="#projects"
                className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-neutral-200 transition-all text-sm"
              >
                <span>View Projects & Code</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="mailto:codewithhr@gmail.com"
                className="flex items-center gap-2 border border-neutral-700 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 font-medium px-6 py-3 rounded-lg transition-all text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Get in Touch</span>
              </a>

            </div>
          </motion.div>

          {/* Terminal Widget */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.4,
            }}
            className="lg:col-span-5 bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 font-mono text-xs shadow-2xl"
          >

            <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800">

              <div className="flex space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>

              <span className="text-neutral-500 text-[10px] uppercase tracking-wider">
                System Execution Monitor
              </span>

            </div>

            <div className="space-y-2 text-neutral-400 min-h-[120px] flex flex-col justify-center">

              <p className="text-neutral-500">
                $ systemctl status backend.service
              </p>

              <p className="text-emerald-400">
                ● Active: running (high-throughput mode)
              </p>

              <motion.p
                key={logIndex}
                initial={{
                  opacity: 0,
                  y: 4,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="text-neutral-200 bg-neutral-950 p-2 rounded border border-neutral-800/60"
              >
                &gt; {logs[logIndex]}
              </motion.p>

            </div>
          </motion.div>

        </section>

        {/* About Section */}
        <About />

        {/* Projects Grid Section */}
        <Projects />

      </main>
    </>
  );
}