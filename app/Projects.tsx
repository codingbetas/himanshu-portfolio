"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Code2, Cpu, Lock, Workflow, BarChart3, Bot, ShieldCheck } from "lucide-react";

const projects = [
  {
    title: "SupportFlow CRM",
    category: "Full-Stack • Ticket Management",
    description:
      "Customer support ticket management platform featuring real-time state synchronization, RBAC authorization, and automated ticket lifecycle tracking.",
    metric: "Live Railway App & Full-Stack Workflow",
    tech: ["FastAPI", "SQLAlchemy", "SQLite", "JavaScript", "HTML/CSS"],
    liveUrl: "https://supportflow-crm-production.up.railway.app/",
    githubUrl: "https://github.com/codingbetas/supportflow-crm",
    colSpan: "col-span-1 md:col-span-2",
    icon: <Workflow className="w-5 h-5 text-emerald-400" />,
  },
  {
    title: "Mason Home Dashboard",
    category: "Data Analytics & Streamlit",
    description:
      "Interactive analytics dashboard providing product categorization, price distribution analysis, and real-time inventory tracking for Mason Home.",
    metric: "Interactive Python Analytics Engine",
    tech: ["Python", "Streamlit", "Pandas", "Data Visualization"],
    githubUrl: "https://github.com/codingbetas/mason-home-dashboard",
    colSpan: "col-span-1",
    icon: <BarChart3 className="w-5 h-5 text-amber-400" />,
  },
  {
    title: "SnapURL Analytics Platform",
    category: "Full-Stack System",
    description:
      "URL shortener engine with custom alias reservation, fast route redirection, link expiration, and real-time click analytics.",
    metric: "Live Vercel App & Next.js + FastAPI",
    tech: ["Next.js", "TypeScript", "FastAPI", "SQLite", "Tailwind"],
    liveUrl: "https://snapurl-url-shortener.vercel.app/",
    githubUrl: "https://github.com/codingbetas/snapurl-url-shortener",
    colSpan: "col-span-1",
    icon: <ExternalLink className="w-5 h-5 text-purple-400" />,
  },
  {
    title: "SaaS Subscription System",
    category: "Backend Architecture & Auth",
    description:
      "SaaS backend platform featuring JWT user authentication, subscription plan tier management, and active customer billing status tracking.",
    metric: "Live Vercel Frontend & FastAPI Tier Engine",
    tech: ["FastAPI", "TypeScript", "SQLite", "SQLAlchemy", "JWT"],
    liveUrl: "https://saas-subscription-system.vercel.app/",
    githubUrl: "https://github.com/codingbetas/saas-subscription-system",
    colSpan: "col-span-1",
    icon: <Cpu className="w-5 h-5 text-indigo-400" />,
  },
  {
    title: "AI Resume Matcher API",
    category: "AI / ML Backend",
    description:
      "FastAPI backend service evaluating candidate resumes against job descriptions using TF-IDF vectorization and cosine similarity scoring.",
    metric: "Live Interactive Swagger Docs on Render",
    tech: ["Python", "FastAPI", "Scikit-learn", "TF-IDF", "REST API"],
    liveUrl: "https://ai-powered-resume-matching.onrender.com/docs",
    githubUrl: "https://github.com/codingbetas/ai-powered-resume-matching",
    colSpan: "col-span-1",
    icon: <Bot className="w-5 h-5 text-cyan-400" />,
  },
  {
    title: "FraudShield AI Engine",
    category: "Machine Learning & Security",
    description:
      "Machine learning backend API built with FastAPI and Scikit-learn for predicting financial transaction fraud in real-time.",
    metric: "Real-Time ML Fraud Prediction API",
    tech: ["Python", "FastAPI", "Scikit-learn", "Uvicorn"],
    githubUrl: "https://github.com/codingbetas/fraudshield-ai",
    colSpan: "col-span-1 md:col-span-2",
    icon: <ShieldCheck className="w-5 h-5 text-rose-400" />,
  },
  {
    title: "Beautician Booking Engine",
    category: "Concurrency & Access Control",
    description:
      "RESTful booking management system built with FastAPI featuring role-based admin controls, user authentication, and appointment slot reservations.",
    metric: "Role-Based Control & Slot Booking System",
    tech: ["FastAPI", "Python", "SQLAlchemy", "JWT"],
    githubUrl: "https://github.com/codingbetas/beautician-booking",
    colSpan: "col-span-1",
    icon: <Lock className="w-5 h-5 text-blue-400" />,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-16 z-10">
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Featured Architecture & Projects
        </h2>
        <p className="text-neutral-400 text-sm mt-1">
          Production-focused backend systems, AI/ML pipelines, and full-stack applications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            viewport={{ once: true }}
            className={`group relative p-6 bg-neutral-900/60 border border-neutral-800 hover:border-emerald-500/50 rounded-xl transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-emerald-950/20 ${project.colSpan}`}
          >
            {/* Subtle Gradient Glow Effect on Hover */}
            <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-emerald-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-lg bg-neutral-800/80 border border-neutral-700/50 group-hover:border-emerald-500/40 transition-colors">
                  {project.icon}
                </div>
                <div className="flex gap-3 text-neutral-400">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white transition-colors"
                      title="View Repository"
                    >
                      <Code2 className="w-4.5 h-4.5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4.5 h-4.5" />
                    </a>
                  )}
                </div>
              </div>

              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                {project.category}
              </span>
              <h3 className="text-lg font-semibold text-white mt-1 mb-2 group-hover:text-emerald-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                {project.description}
              </p>
              
              {/* Impact Metric Badge */}
              <div className="inline-block mb-6 px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/40 text-[11px] font-mono text-emerald-400">
                ⚡ {project.metric}
              </div>
            </div>

            <div className="relative z-10 flex flex-wrap gap-2 pt-4 border-t border-neutral-800/60">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-2.5 py-1 rounded bg-neutral-800/80 text-neutral-300 border border-neutral-700/30"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}