import { analysisErrors } from "../../shared/errors/error-factory";

const INVALID_PATTERNS = ["page not found", "404 not found", "access denied"];

const MIN_CONTENT_LENGTH = 300;

export const validateScrapeResult = (scrapeResult: {
  markdown?: string | null;
}) => {
  const content = scrapeResult.markdown?.trim() ?? "";

  if (!content) {
    throw analysisErrors.insufficientContent(
      "No content could be extracted from the website.",
    );
  }

  if (content.length < MIN_CONTENT_LENGTH) {
    throw analysisErrors.insufficientContent(
      "The website does not contain enough information for analysis.",
    );
  }

  const normalizedContent = content.toLowerCase();

  const containsInvalidPattern = INVALID_PATTERNS.some((pattern) =>
    normalizedContent.includes(pattern),
  );

  if (containsInvalidPattern) {
    throw analysisErrors.insufficientContent(
      "The website content appears invalid or inaccessible.",
    );
  }

  return content;
};
