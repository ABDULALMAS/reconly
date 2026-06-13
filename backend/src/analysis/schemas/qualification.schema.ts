import { z } from "zod";

export const QualificationSchema = z.object({
  qualified: z.boolean(),

  entityType: z.enum([
    "company",
    "startup",
    "product",
    "portfolio",
    "repository",
    "documentation",
    "blog",
    "unknown",
  ]),

  classificationConfidence: z.enum(["high", "medium", "low"]),

  reason: z.string(),
});

export type QualificationResult = z.infer<typeof QualificationSchema>;
