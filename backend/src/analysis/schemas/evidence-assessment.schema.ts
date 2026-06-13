import { z } from "zod";

export const EvidenceAssessmentSchema = z.object({
  competitorEvidence: z.object({
    sufficient: z.boolean(),
    confidence: z.enum([
      "high",
      "medium",
      "low",
    ]),
    reason: z.string(),
  }),

  marketEvidence: z.object({
    sufficient: z.boolean(),
    confidence: z.enum([
      "high",
      "medium",
      "low",
    ]),
    reason: z.string(),
  }),

  signalsEvidence: z.object({
    sufficient: z.boolean(),
    confidence: z.enum([
      "high",
      "medium",
      "low",
    ]),
    reason: z.string(),
  }),

  overallConfidence: z.enum([
    "high",
    "medium",
    "low",
  ]),

  coverageSummary: z.string(),
});

export type EvidenceAssessment =
  z.infer<
    typeof EvidenceAssessmentSchema
  >;