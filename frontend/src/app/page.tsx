"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { AnimatedGridPattern } from "@/src/components/ui/animated-grid-pattern";
import { Spotlight } from "@/src/components/ui/spotlight";

import { CompanyForm } from "@/src/components/ui/reconly/company-form";
import { AnalysisLoader } from "@/src/components/ui/reconly/analysis-loader";
import { ReportView } from "@/src/components/ui/reconly/report-view";

import { CompanyReport } from "@/src/types";
import { analyzeCompany } from "@/src/lib/api";

type AppState = "idle" | "loading" | "report";

type ApiError = {
  code: string;
  message: string;
};

export default function Home() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [report, setReport] = useState<CompanyReport | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [analyzedUrl, setAnalyzedUrl] = useState("");

  const handleAnalyze = async (url: string) => {
    setAppState("loading");
    setReport(null);
    setError(null);
    setAnalyzedUrl(url);

    try {
      const result = await analyzeCompany(url);
      setReport(result.finalReport);
      setAppState("report");
    } catch (error: any) {
      setError({
        code: error?.code ?? "UNKNOWN_ERROR",
        message: error?.message ?? "Something went wrong.",
      });
      setAppState("idle");
    }
  };

  const handleReset = () => {
    setAppState("idle");
    setReport(null);
    setError(null);
    setAnalyzedUrl("");
  };

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      <AnimatedGridPattern
        className="absolute inset-0 z-0 opacity-20 transition-opacity duration-700"
        maxOpacity={0.4}
      />

      <AnimatePresence>
        {appState === "idle" && (
          <motion.div
            key="spotlight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="white"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="relative z-20 flex items-center justify-between px-8 py-6">
        <button
          onClick={handleReset}
          className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-300 hover:text-white transition-colors"
        >
          Reconly
        </button>

        <AnimatePresence>
          {appState === "report" && (
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              onClick={handleReset}
              className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-sm text-zinc-400 backdrop-blur transition-colors hover:border-zinc-600 hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M11 7H3M6 4L3 7l3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              New analysis
            </motion.button>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence mode="wait">

        {appState === "idle" && (
          <motion.section
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative z-10 flex min-h-[88vh] flex-col items-center justify-center px-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-xs tracking-widest text-zinc-400 backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
              COMPANY INTELLIGENCE
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="max-w-5xl text-center text-6xl font-bold tracking-tight md:text-8xl"
            >
              Understand any company
              <br />
              <span className="text-zinc-500">in minutes.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-6 max-w-xl text-center text-lg leading-relaxed text-zinc-400"
            >
              Paste a URL. Get positioning, competitors, market signals,
              opportunities, and risks — in one report.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="w-full"
            >
              <CompanyForm onAnalyze={handleAnalyze} isLoading={false} />
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/8 px-6 py-4 text-center"
              >
                <p className="text-sm font-medium text-red-400">{error.code}</p>
                <p className="mt-1 text-sm text-red-300/70">{error.message}</p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-16 flex flex-wrap items-center justify-center gap-8 text-zinc-600"
            >
              {[
                "Website analysis",
                "External research",
                "AI synthesis",
                "Competitor mapping",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2 text-sm">
                  <span className="h-px w-4 bg-zinc-700" />
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.section>
        )}

        {appState === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10"
          >
            <AnalysisLoader url={analyzedUrl} />
          </motion.div>
        )}

        {appState === "report" && report && (
          <motion.div
            key="report"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10"
          >
            <ReportView report={report} />
          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}