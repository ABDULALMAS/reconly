import { CompanyAnalysis } from "../analysis.types";

export const buildEvidenceValidationPrompt = (
  analysis: CompanyAnalysis,
) => `
You are a research quality validator.

Determine whether the research results below contain sufficient and relevant evidence for the company.

EVALUATION CRITERIA

For each of the three categories assess:
- Is the evidence relevant to this specific company?
- Is the evidence sufficient to draw conclusions?
- Is the evidence likely trustworthy?

Set sufficient=false if:
- Results discuss unrelated companies
- Results are generic industry articles not specific to this company
- Results contain insufficient detail
- Results appear speculative or unsourced

CONFIDENCE LEVELS

high — strong direct evidence about this company
medium — some relevant evidence but gaps exist
low — weak, tangential, or missing evidence

OVERALL CONFIDENCE

Derive overallConfidence from the weakest of the three categories.

OUTPUT SCHEMA

{
  "competitorEvidence": {
    "sufficient": boolean,
    "confidence": "high" | "medium" | "low",
    "reason": string
  },
  "marketEvidence": {
    "sufficient": boolean,
    "confidence": "high" | "medium" | "low",
    "reason": string
  },
  "signalsEvidence": {
    "sufficient": boolean,
    "confidence": "high" | "medium" | "low",
    "reason": string
  },
  "overallConfidence": "high" | "medium" | "low",
  "coverageSummary": string
}

RULES

- Be conservative — prefer false negatives over false positives
- Do not invent evidence
- Return a single raw JSON object
- Do not include any text before or after the JSON

COMPANY PROFILE:

${JSON.stringify(analysis.companyProfile, null, 2)}

RESEARCH RESULTS:

${JSON.stringify(analysis.researchResults, null, 2)}
`;