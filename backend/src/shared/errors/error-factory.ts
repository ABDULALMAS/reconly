import { AnalysisError } from "./analysis.error";
import { AnalysisErrorCode } from "./error-codes";

export const analysisErrors = {
  invalidUrl: (message?: string) =>
    new AnalysisError(
      AnalysisErrorCode.INVALID_URL,
      400,
      message ?? "Please enter a valid website URL.",
    ),

  scrapeFailed: (message?: string) =>
    new AnalysisError(
      AnalysisErrorCode.SCRAPE_FAILED,
      503,
      message ?? "Unable to access the website.",
    ),

  serviceUnavailable: (message?: string) =>
    new AnalysisError(
      AnalysisErrorCode.SERVICE_UNAVAILABLE,
      503,
      message ??
        "Analysis service is currently unavailable.",
    ),

  scrapeTemporarilyUnavailable: (
    message?: string,
  ) =>
    new AnalysisError(
      AnalysisErrorCode.SCRAPE_TEMPORARILY_UNAVAILABLE,
      503,
      message ??
        "Website analysis is temporarily unavailable.",
    ),

  insufficientContent: (message?: string) =>
    new AnalysisError(
      AnalysisErrorCode.INSUFFICIENT_CONTENT,
      422,
      message ??
        "We couldn't find enough information to generate a reliable report.",
    ),

  unsupportedWebsite: (reason?: string) =>
    new AnalysisError(
      AnalysisErrorCode.UNSUPPORTED_WEBSITE,
      422,
      reason ??
        "Reconly currently supports company and product websites.",
    ),

  aiGenerationFailed: (message?: string) =>
    new AnalysisError(
      AnalysisErrorCode.AI_GENERATION_FAILED,
      500,
      message ??
        "Failed to generate analysis.",
    ),

  aiSchemaValidationFailed: (
    message?: string,
  ) =>
    new AnalysisError(
      AnalysisErrorCode.AI_SCHEMA_VALIDATION_FAILED,
      500,
      message ??
        "Failed to generate a valid structured response.",
    ),

  researchFailed: (message?: string) =>
    new AnalysisError(
      AnalysisErrorCode.RESEARCH_FAILED,
      503,
      message ??
        "Unable to gather external research.",
    ),

    aiRateLimited: () =>
  new AnalysisError(
    AnalysisErrorCode.AI_RATE_LIMITED,
    429,
    "The AI service is temporarily rate limited. Please try again shortly.",
  ),
};