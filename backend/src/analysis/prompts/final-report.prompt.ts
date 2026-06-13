import { CompanyAnalysis } from "../analysis.types";

export const buildFinalReportPrompt = (
  analysis: CompanyAnalysis,
) => `
You are a senior startup analyst.

Generate a company intelligence report from the data below.

ANALYSIS MODE: ${analysis.analysisMode}

FULL MODE — use website information and research results freely
LIMITED MODE — use website as primary source only, do not speculate, set researchConfidence to "low", note limited public information in finalAssessment

FIELD RULES

companySummary
- Maximum 3 sentences
- Explain what the company does

targetAudience
- Array of strings
- Maximum 5 items

valueProposition
- Maximum 2 sentences
- Explain the primary value delivered

competitivePositioning
- Cover: product category, differentiation, and customer reason to choose
- If evidence is weak rely on website positioning only

keyCompetitors
- Array of 3 to 5 direct competitor names
- Use [] if evidence is insufficient

recentSignals
- Array of at most 5 objects with "type" and "details" fields
- Use [] if evidence is insufficient

opportunitiesAndRisks.opportunities
- Array of exactly 3 strings
- Must be specific to this company
- Based on market, product, customer, or industry evidence
- Avoid generic recommendations

opportunitiesAndRisks.risks
- Array of exactly 3 strings
- Must be specific to this company
- Explain why each risk matters

researchConfidence
- "high" — strong website information and strong external research
- "medium" — some evidence gaps
- "low" — limited public information or weak external evidence

finalAssessment
- Maximum 5 sentences
- Cover: core strength, core weakness, biggest opportunity, biggest risk
- Avoid marketing language

OUTPUT SCHEMA

{
  "companySummary": string,
  "targetAudience": string[],
  "valueProposition": string,
  "competitivePositioning": string,
  "keyCompetitors": string[],
  "recentSignals": [
    {
      "type": string,
      "details": string
    }
  ],
  "opportunitiesAndRisks": {
    "opportunities": string[],
    "risks": string[]
  },
  "researchConfidence": "high" | "medium" | "low",
  "finalAssessment": string
}

RULES

- Do not invent facts
- Only use evidence from the data provided below
- Return a single raw JSON object
- Do not include any text before or after the JSON

EVIDENCE ASSESSMENT:

${JSON.stringify(analysis.evidenceAssessment, null, 2)}

ANALYSIS DATA:

${JSON.stringify(analysis, null, 2)}
`;