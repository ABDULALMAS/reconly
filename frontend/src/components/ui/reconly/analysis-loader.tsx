"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Skeleton } from "@/src/components/ui/skeleton";

interface AnalysisLoaderProps {
  url: string;
}

const STAGES = [
  {
    id: "fetch",
    label: "Fetching website",
    description: "Reading the company's public-facing content",
    duration: 4000,
  },
  {
    id: "profile",
    label: "Building company profile",
    description: "Identifying product, audience, and value proposition",
    duration: 5000,
  },
  {
    id: "research",
    label: "Researching competitors",
    description: "Scanning the web for alternatives and market context",
    duration: 8000,
  },
  {
    id: "signals",
    label: "Gathering recent signals",
    description: "Looking for funding, launches, and strategic moves",
    duration: 7000,
  },
  {
    id: "evidence",
    label: "Validating evidence",
    description: "Checking research quality before drawing conclusions",
    duration: 4000,
  },
  {
    id: "report",
    label: "Writing your report",
    description: "Synthesising everything into a structured analysis",
    duration: 9000,
  },
];

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

export function AnalysisLoader({ url }: AnalysisLoaderProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setElapsed((e) => e + 100), 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stageStart = STAGES.slice(0, currentStage).reduce(
      (acc, s) => acc + s.duration,
      0,
    );
    const stageDuration = STAGES[currentStage]?.duration ?? 5000;
    if (
      elapsed >= stageStart + stageDuration &&
      currentStage < STAGES.length - 1
    ) {
      setCurrentStage((s) => s + 1);
    }
  }, [elapsed, currentStage]);

  const totalDuration = STAGES.reduce((acc, s) => acc + s.duration, 0);
  const progressPct = Math.min((elapsed / totalDuration) * 100, 95);
  const stage = STAGES[currentStage];

  return (
    <div className="flex min-h-[88vh] flex-col items-center justify-center px-6">
      <div className="w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex items-center gap-3"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle
                cx="6.5"
                cy="6.5"
                r="5.5"
                stroke="#71717a"
                strokeWidth="1.2"
              />
              <path
                d="M6.5 1C6.5 1 4.5 3.5 4.5 6.5s2 5.5 2 5.5"
                stroke="#71717a"
                strokeWidth="1.2"
              />
              <path d="M1 6.5h11" stroke="#71717a" strokeWidth="1.2" />
            </svg>
          </div>
          <span className="font-mono text-sm text-zinc-500">
            {getDomain(url)}
          </span>
        </motion.div>

        <div className="mb-1 h-12 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h2
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-3xl font-bold text-white"
            >
              {stage.label}
            </motion.h2>
          </AnimatePresence>
        </div>

        <div className="mb-8 h-5 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={stage.id + "-desc"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="text-sm text-zinc-500"
            >
              {stage.description}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="mb-8">
          <div className="h-px w-full overflow-hidden bg-zinc-800">
            <motion.div
              className="h-px bg-linear-to-r from-indigo-600 to-indigo-400"
              initial={{ width: "0%" }}
              animate={{ width: `${progressPct}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
          <div className="mt-2 flex justify-between">
            <span className="text-xs text-zinc-700">
              Step {currentStage + 1} of {STAGES.length}
            </span>
            <span className="tabular-nums text-xs text-zinc-700">
              {Math.round(progressPct)}%
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {STAGES.map((s, i) => {
            const isDone = i < currentStage;
            const isActive = i === currentStage;

            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                className={`relative flex items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 transition-all duration-500 ${
                  isActive
                    ? "border-zinc-700 bg-zinc-900/80"
                    : isDone
                      ? "border-zinc-800/40 bg-transparent"
                      : "border-transparent bg-transparent"
                }`}
              >
                {isActive && (
                  <motion.div
                    className="pointer-events-none absolute inset-0"
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 0.4,
                    }}
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(99,102,241,0.06), transparent)",
                    }}
                  />
                )}

                {/* Status dot */}
                <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                  {isDone ? (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M2.5 7l3 3 6-6"
                        stroke="#818cf8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  ) : isActive ? (
                    <motion.div
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="h-1.5 w-1.5 rounded-full bg-indigo-400"
                    />
                  ) : (
                    <div className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                  )}
                </div>

                <span
                  className={`text-sm transition-colors duration-300 ${
                    isActive
                      ? "text-white"
                      : isDone
                        ? "text-zinc-600"
                        : "text-zinc-700"
                  }`}
                >
                  {s.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 1 }}
          className="mt-10"
        >
          <p className="mb-4 text-xs uppercase tracking-widest text-zinc-700">
            Report preview
          </p>
          <div className="space-y-3 rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-5">
            <Skeleton className="h-4 w-3/4 bg-zinc-800" />
            <Skeleton className="h-4 w-full bg-zinc-800" />
            <Skeleton className="h-4 w-5/6 bg-zinc-800" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Skeleton className="h-16 rounded-xl bg-zinc-800" />
              <Skeleton className="h-16 rounded-xl bg-zinc-800" />
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
          className="mt-8 text-center text-xs text-zinc-700"
        >
          This typically takes 30–60 seconds. Don't close the tab.
        </motion.p>
      </div>
    </div>
  );
}
