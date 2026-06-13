import { firecrawlProvider } from "../providers/firecrawl.provider";
import { tavilyProvider } from "../providers/tavily.provider";

import { CompanyAnalysis, TavilyResult } from "./analysis.types";

import { buildCompanyProfilePrompt } from "./prompts/company-profile.prompt";
import { buildFinalReportPrompt } from "./prompts/final-report.prompt";
import { buildQualificationPrompt } from "./prompts/build-qualification.prompt";
import { buildEvidenceValidationPrompt } from "./prompts/build-evidence-validation.prompt";

import { urlResolver } from "../utils/url-resolver";
import { geminiValidated } from "../utils/gemini-validated";

import { validateScrapeResult } from "./firecrawl/firecrawl-validation";

import { QualificationSchema } from "./schemas/qualification.schema";
import { CompanyProfileSchema } from "./schemas/company-profile.schema";
import { EvidenceAssessmentSchema } from "./schemas/evidence-assessment.schema";
import { FinalReportSchema } from "./schemas/final-report.schema";

import { analysisErrors } from "../shared/errors/error-factory";

const simplifyResults = (results: TavilyResult[] = []): TavilyResult[] => {
  return results.map((result) => ({
    title: result.title,
    url: result.url,
    content: result.content,
  }));
};

const safeSearch = async (query: string): Promise<TavilyResult[]> => {
  try {
    const result = await tavilyProvider.search(query);

    return simplifyResults(result.results ?? []);
  } catch (error) {
    console.error("[Research Failed]", {
      query,
      error,
    });

    return [];
  }
};

const sanitizeQuery = (query: string) =>
  query.replace(/\s+/g, " ").trim().slice(0, 300);

const analyzeCompany = async (url: string): Promise<CompanyAnalysis> => {
  const resolvedUrl = urlResolver.resolve(url);

  // Step 1: Website Scraping

  const scrapeResult = await firecrawlProvider.scrapeWebsite(
    resolvedUrl.normalizedUrl,
  );

  const content = validateScrapeResult(scrapeResult);

  // Step 2: Qualification

  const qualificationPrompt = buildQualificationPrompt(
    resolvedUrl.normalizedUrl,
    content,
  );

  const qualification = await geminiValidated.generateJson({
    prompt: qualificationPrompt,

    schema: QualificationSchema,
  });

  if (!qualification.qualified) {
    throw analysisErrors.unsupportedWebsite(qualification.reason);
  }

  // Step 3: Company Profile

  const companyProfilePrompt = buildCompanyProfilePrompt(content);

  const companyProfile = await geminiValidated.generateJson({
    prompt: companyProfilePrompt,

    schema: CompanyProfileSchema,
  });

  const analysis: CompanyAnalysis = {
    qualification,

    companyProfile: companyProfile.companyProfile,

    researchQueries: companyProfile.researchQueries,
  };

  // Step 4: Research

  const [competitors, marketPosition, recentSignals] = await Promise.all([
    safeSearch(sanitizeQuery(analysis.researchQueries.competitors)),

    safeSearch(sanitizeQuery(analysis.researchQueries.marketPosition)),

    safeSearch(sanitizeQuery(analysis.researchQueries.recentSignals)),
  ]);

  analysis.researchResults = {
    competitors,
    marketPosition,
    recentSignals,
  };

  // Step 5: Evidence Validation

  const evidencePrompt = buildEvidenceValidationPrompt(analysis);

  const evidenceAssessment = await geminiValidated.generateJson({
    prompt: evidencePrompt,

    schema: EvidenceAssessmentSchema,
  });

  analysis.evidenceAssessment = evidenceAssessment;

  // Step 6: Analysis Mode

  const evidenceScore = [
    evidenceAssessment.competitorEvidence.sufficient,

    evidenceAssessment.marketEvidence.sufficient,

    evidenceAssessment.signalsEvidence.sufficient,
  ].filter(Boolean).length;

  const analysisMode = evidenceScore >= 2 ? "full" : "limited";

  analysis.analysisMode = analysisMode;

  // Step 7: Final Report

  const finalReportPrompt = buildFinalReportPrompt(analysis);

  const report = await geminiValidated.generateJson({
    prompt: finalReportPrompt,

    schema: FinalReportSchema,
  });

  analysis.finalReport = {
    ...report,
    analysisMode,
  };

  console.info("[Analysis Completed]", {
    company: analysis.companyProfile.companyName,

    mode: analysisMode,
  });

  return analysis;
};

export const analysisService = {
  analyzeCompany,
};
