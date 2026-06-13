"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Skeleton } from "@/src/components/ui/skeleton";
import { CompanyReport } from "../../../types";

interface Props {
  report: CompanyReport;
}

const SECTIONS = [
  { id: "summary", label: "Summary" },
  { id: "positioning", label: "Positioning" },
  { id: "competitors", label: "Competitors" },
  { id: "signals", label: "Signals" },
  { id: "opportunities", label: "Opportunities" },
  { id: "risks", label: "Risks" },
  { id: "assessment", label: "Assessment" },
];

function ConfidenceBadge({ level }: { level: string }) {
  const styles: Record<string, string> = {
    high: "border-emerald-500/25 bg-emerald-500/8 text-emerald-400",
    medium: "border-amber-500/25 bg-amber-500/8 text-amber-400",
    low: "border-red-500/25 bg-red-500/8 text-red-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${styles[level] ?? styles.medium}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {level.charAt(0).toUpperCase() + level.slice(1)} confidence
    </span>
  );
}

function SectionCard({
  id,
  title,
  index,
  children,
}: {
  id: string;
  title: string;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.1 + index * 0.06,
        duration: 0.45,
        ease: "easeOut",
      }}
      className="scroll-mt-8 group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6 transition-colors duration-300 hover:border-zinc-700/80"
    >
      {/* Hover shimmer sweep */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99,102,241,0.04), transparent 40%)",
        }}
      />

      <div className="mb-4 flex items-center gap-3">
        <span className="font-mono text-xs text-zinc-700">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          {title}
        </h3>
      </div>

      <div className="text-zinc-300">{children}</div>
    </motion.div>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-sm text-zinc-300"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function BulletList({
  items,
  accent = false,
}: {
  items: string[];
  accent?: boolean;
}) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            className={`mt-1.75 h-1.5 w-1.5 shrink-0 rounded-full ${
              accent ? "bg-indigo-500" : "bg-zinc-600"
            }`}
          />
          <span className="text-sm leading-relaxed text-zinc-300">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ReportView({ report }: Props) {
  const [activeSection, setActiveSection] = useState("summary");

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-4">
      {/* Report header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 border-b border-zinc-800/60 pb-8"
      >
        <div className="mb-2 text-xs uppercase tracking-[0.3em] text-zinc-600">
          Intelligence Report
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-3xl text-3xl font-bold text-white md:text-4xl">
            {report.companySummary?.split(".")[0].trim()}.
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <ConfidenceBadge level={report.researchConfidence} />
            {report.analysisMode === "limited" && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/8 px-3 py-1 text-xs text-amber-400">
                Limited data
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Limited mode notice */}
      {report.analysisMode === "limited" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 rounded-2xl border border-amber-500/15 bg-amber-500/5 px-5 py-4"
        >
          <p className="text-sm text-amber-300/80">
            Limited public information was found. This report relies primarily
            on the company's website rather than external research.
          </p>
        </motion.div>
      )}

      <div className="flex gap-12">
        {/* Sticky sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="hidden shrink-0 lg:block"
        >
          <div className="sticky top-8 w-40">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-700">
              Sections
            </p>
            <nav className="space-y-0.5">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-all duration-200 ${
                    activeSection === s.id
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-600 hover:text-zinc-400"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </div>
        </motion.aside>

        {/* Main sections */}
        <div className="min-w-0 flex-1 space-y-6">
          {/* Summary */}
          <SectionCard id="summary" title="Company Summary" index={0}>
            <p className="text-base leading-relaxed text-zinc-200">
              {report.companySummary}
            </p>
            {report.targetAudience?.length > 0 && (
              <div className="mt-5">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Target Audience
                </p>
                <TagList items={report.targetAudience} />
              </div>
            )}
          </SectionCard>

          {/* Positioning */}
          <SectionCard id="positioning" title="Market Positioning" index={1}>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Value Proposition
                </p>
                <p className="text-sm leading-relaxed text-zinc-300">
                  {report.valueProposition}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Competitive Position
                </p>
                <p className="text-sm leading-relaxed text-zinc-300">
                  {report.competitivePositioning}
                </p>
              </div>
            </div>
          </SectionCard>

          {/* Competitors */}
          <SectionCard id="competitors" title="Key Competitors" index={2}>
            {report.keyCompetitors?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {report.keyCompetitors.map((c) => (
                  <span
                    key={c}
                    className="rounded-xl border border-zinc-700/60 bg-zinc-800/40 px-4 py-2 text-sm font-medium text-zinc-200"
                  >
                    {c}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-600">
                No reliable competitor data found in public sources.
              </p>
            )}
          </SectionCard>

          {/* Signals */}
          <SectionCard id="signals" title="Recent Signals" index={3}>
            {report.recentSignals?.length > 0 ? (
              <div className="space-y-3">
                {report.recentSignals.map((signal, i) => (
                  <div
                    key={i}
                    className="flex gap-4 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4"
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800 text-[10px] font-bold text-zinc-400">
                      {signal.type?.[0]?.toUpperCase() ?? "S"}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        {signal.type}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                        {signal.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-600">
                No notable public signals found in the last 24 months.
              </p>
            )}
          </SectionCard>

          {/* Opportunities + Risks */}
          <div className="grid gap-6 md:grid-cols-2">
            <SectionCard id="opportunities" title="Opportunities" index={4}>
              <BulletList
                items={report.opportunitiesAndRisks?.opportunities ?? []}
                accent
              />
            </SectionCard>

            <SectionCard id="risks" title="Risks" index={5}>
              <BulletList items={report.opportunitiesAndRisks?.risks ?? []} />
            </SectionCard>
          </div>

          {/* Final Assessment */}
          <SectionCard id="assessment" title="Final Assessment" index={6}>
            <p className="text-base leading-relaxed text-zinc-200">
              {report.finalAssessment}
            </p>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
