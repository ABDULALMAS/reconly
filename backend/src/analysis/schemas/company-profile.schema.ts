import { z } from "zod";

export const CompanyProfileSchema = z.object({
  companyProfile: z.object({
    companyName: z
      .string()
      .min(1),

    companySummary: z
      .string()
      .min(1),

    industry: z
      .string()
      .min(1),

    targetAudience: z.array(
      z.string(),
    ),

    valueProposition: z
      .string()
      .min(1),

    keywords: z.array(
      z.string(),
    ),
  }),

  researchQueries: z.object({
    competitors: z
      .string()
      .min(1)
      .max(100),

    marketPosition: z
      .string()
      .min(1)
      .max(100),

    recentSignals: z
      .string()
      .min(1)
      .max(100),
  }),
});

export type CompanyProfileSchema =
  z.infer<
    typeof CompanyProfileSchema
  >;