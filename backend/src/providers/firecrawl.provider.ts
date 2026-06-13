import { env } from "../config/env";
import FirecrawlApp from "firecrawl";

import { analysisErrors } from "../shared/errors/error-factory";

const firecrawl = new FirecrawlApp({
  apiKey: env.FIRECRAWL_API_KEY!,
});

const RETRYABLE_STATUS_CODES = [
  408,
  429,
  500,
  502,
  503,
  504,
];

const sleep = (ms: number) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms),
  );

const scrapeWebsite = async (
  url: string,
) => {
  const maxAttempts = 3;

  for (
    let attempt = 1;
    attempt <= maxAttempts;
    attempt++
  ) {
    try {
      const response =
        await firecrawl.scrape(url, {
          formats: ["markdown"],
        });

      return response;
    } catch (error: any) {
      const status =
        error?.statusCode ??
        error?.response?.status;

      if (
        status &&
        RETRYABLE_STATUS_CODES.includes(
          status,
        ) &&
        attempt < maxAttempts
      ) {
        const delay =
          Math.pow(2, attempt) * 1000;

        console.warn(
          `[Firecrawl] Retry ${attempt}/${maxAttempts} (${status})`,
        );

        await sleep(delay);

        continue;
      }

      console.error(
        "[Firecrawl Error]",
        {
          url,
          status,
          error,
        },
      );

      switch (status) {
        case 400:
          throw analysisErrors.invalidUrl();

        case 401:
        case 402:
        case 403:
          throw analysisErrors.serviceUnavailable();

        case 408:
        case 429:
        case 500:
        case 502:
        case 503:
        case 504:
          throw analysisErrors.scrapeTemporarilyUnavailable();

        default:
          throw analysisErrors.scrapeFailed();
      }
    }
  }

  throw analysisErrors.scrapeFailed();
};

export const firecrawlProvider = {
  scrapeWebsite,
};