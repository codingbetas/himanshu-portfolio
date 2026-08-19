"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Network,
  Cloud,
  Cpu,
  Brain,
  GraduationCap,
  MapPin,
  Quote,
  Sparkles,
} from "lucide-react";

interface QuoteType {
  text: string;
  author: string;
  profession: string;
}

const highlights = [
  {
    icon: <Network className="w-5 h-5 text-amber-400" />,
    title: "Microservices & Distributed Architecture",
    description:
      "What it is: Breaking down monolithic applications into smaller, independent services...",
  },
  {
    icon: <Cloud className="w-5 h-5 text-emerald-400" />,
    title: "Asynchronous Pipelines & Database Integrity",
    description:
      "What it is: Using robust relational databases alongside background worker queues...",
  },
  {
    icon: <Brain className="w-5 h-5 text-purple-400" />,
    title: "AI Model Integration & LLM Workflows",
    description:
      "What it is: Connecting backend APIs with machine learning libraries and LLM tools...",
  },
  {
    icon: <Cpu className="w-5 h-5 text-blue-400" />,
    title: "End-to-End Product Ownership",
    description:
      "What it is: Bridging deep backend logic with clean client-side interfaces...",
  },
];

export default function About() {
  const [quote, setQuote] = useState<QuoteType>({
    text: "Architecting the unseen digital core where scale, distribution, and resilience intersect.",
    author: "Himanshu Rathod",
    profession: "SYSTEM ARCHITECT",
  });

  /*
   * Keeps track of quotes already displayed during
   * the current browser session.
   */
  const seenQuotesRef = useRef<Set<string>>(new Set());

  /*
   * Prevents multiple quote requests from running
   * simultaneously.
   */
  const requestingRef = useRef(false);

  useEffect(() => {
    let mounted = true;

    const fetchLiveQuote = async () => {
      if (requestingRef.current) {
        return;
      }

      requestingRef.current = true;

      try {
        /*
         * Try several times if the API happens to return
         * a quote that has already been displayed.
         */
        for (let attempt = 0; attempt < 10; attempt++) {
          const response = await fetch("/api/quote", {
            cache: "no-store",
          });

          if (!response.ok) {
            throw new Error(
              `Quote API returned ${response.status}`
            );
          }

          const data: QuoteType = await response.json();

          if (!data || !data.text) {
            continue;
          }

          const normalizedKey = data.text
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase();

          /*
           * Never display the same quote twice
           * during this page session.
           */
          if (seenQuotesRef.current.has(normalizedKey)) {
            continue;
          }

          seenQuotesRef.current.add(normalizedKey);

          if (mounted) {
            setQuote(data);
          }

          return;
        }

        console.warn(
          "No new unseen quote was returned."
        );
      } catch (error) {
        console.error(
          "Failed to fetch live quote stream:",
          error
        );
      } finally {
        requestingRef.current = false;
      }
    };

    /*
     * Fetch immediately when About loads.
     */
    fetchLiveQuote();

    /*
     * Change quote every 10 seconds.
     */
    const interval = setInterval(
      fetchLiveQuote,
      10000
    );

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      id="about"
      className="py-16 z-10 border-t border-neutral-800/80"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* =====================================================
            BIO NARRATIVE
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="lg:col-span-7 space-y-5"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />

            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
              Engineering Narrative & Vision
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
            Architecting the unseen digital core where scale,
            distribution, and resilience intersect.
          </h2>

          <div className="text-neutral-300 text-sm leading-relaxed space-y-4">
            <p>
              My journey into software development started with
              a simple question:{" "}
              <em className="text-white font-medium">
                What happens behind the API response when
                thousands of requests hit a server simultaneously?
              </em>{" "}
              That curiosity evolved into a deep dedication to
              mastering backend systems, cloud architectures,
              and scalable design.
            </p>

            <p>
              I believe great software&apos;s true measure
              isn&apos;t just about making code run; it&apos;s
              about building fault-tolerant ecosystems. Whether
              it&apos;s decoupling services so they scale
              independently or engineering asynchronous pipelines
              that handle massive data loads without choking, my
              goal is to construct infrastructure businesses can
              completely rely on.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-3 text-xs font-mono text-neutral-300">

            <div className="flex items-center gap-1.5 bg-neutral-900/80 px-3 py-1.5 rounded border border-neutral-800">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mumbai, India</span>
            </div>

            <div className="flex items-center gap-1.5 bg-neutral-900/80 px-3 py-1.5 rounded border border-neutral-800">
              <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
              <span>B.Tech CSE (8.39 CGPA)</span>
            </div>

          </div>
        </motion.div>

        {/* =====================================================
            QUOTE + ARCHITECTURAL PILLARS
        ====================================================== */}

        <div className="lg:col-span-5 space-y-6">

          {/* LIVE QUOTE */}

          <div className="p-5 bg-neutral-900/80 border border-neutral-800/90 rounded-xl relative overflow-hidden">

            <Quote className="w-8 h-8 text-neutral-800 absolute -bottom-1 -right-1 rotate-12 pointer-events-none" />

            <div className="flex items-center justify-between mb-2">

              <span className="font-mono text-[10px] uppercase text-emerald-400/80 tracking-widest">
                • Live Global Mindset Stream
              </span>

              <span
                className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                title="Auto-fetching live quote stream"
              />

            </div>

            <div className="min-h-[80px] flex flex-col justify-center">

              <AnimatePresence mode="wait">

                <motion.div
                  key={quote.text}
                  initial={{
                    opacity: 0,
                    y: 4,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -4,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                >

                  <p className="text-xs text-neutral-200 italic leading-relaxed">
                    &quot;{quote.text}&quot;
                  </p>

                  <div className="flex justify-between items-center mt-2 pt-1 border-t border-neutral-800/60">

                    <span className="text-[10px] font-mono text-emerald-400/90 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/40">
                      {quote.profession}
                    </span>

                    <p className="text-[11px] font-mono text-neutral-400">
                      — {quote.author}
                    </p>

                  </div>

                </motion.div>

              </AnimatePresence>

            </div>
          </div>

          {/* ARCHITECTURAL PILLARS */}

          <div className="space-y-4">

            {highlights.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.1,
                }}
                viewport={{
                  once: true,
                }}
                className="p-4 bg-neutral-900/40 border border-neutral-800/60 rounded-xl hover:border-neutral-700/80 transition-colors"
              >

                <div className="flex items-start gap-3">

                  <div className="p-2 rounded-lg bg-neutral-800/70 mt-0.5 shrink-0">
                    {item.icon}
                  </div>

                  <div>

                    <h3 className="text-xs font-semibold text-white mb-1.5">
                      {item.title}
                    </h3>

                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      {item.description}
                    </p>

                  </div>

                </div>

              </motion.div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}