import { z } from "zod";

export const FinalReportSchema = z.object({
  companySummary: z.string(),

  targetAudience: z.array(
    z.string(),
  ),

  valueProposition: z.string(),

  competitivePositioning: z.string(),

  keyCompetitors: z.array(
    z.string(),
  ),

  recentSignals: z.array(
    z.object({
      type: z.string(),
      details: z.string(),
    }),
  ),

  opportunitiesAndRisks: z.object({
    opportunities: z.array(
      z.string(),
    ),

    risks: z.array(
      z.string(),
    ),
  }),

  researchConfidence: z.enum([
    "high",
    "medium",
    "low",
  ]),

  finalAssessment: z.string(),
});

export type FinalReportResult = z.infer<
  typeof FinalReportSchema
>;