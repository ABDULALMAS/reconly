import { tavily } from "@tavily/core";

import { env } from "../config/env";

import { analysisErrors } from "../shared/errors/error-factory";

const client = tavily({
  apiKey: env.TAVILY_API_KEY!,
});

const sleep = (ms: number) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms),
  );

const search = async (
  query: string,
) => {
  const maxAttempts = 3;

  for (
    let attempt = 1;
    attempt <= maxAttempts;
    attempt++
  ) {
    try {
      const response =
        await client.search(query, {
          maxResults: 5,
          searchDepth: "advanced",
        });

      return response;
    } catch (error: any) {
      const status =
        error?.statusCode ??
        error?.response?.status;

      const isRetryable =
        status === 408 ||
        status === 429 ||
        status === 500 ||
        status === 502 ||
        status === 503 ||
        status === 504;

      if (
        isRetryable &&
        attempt < maxAttempts
      ) {
        const delay =
          Math.pow(2, attempt) * 1000;

        console.warn(
          `[Tavily] Retry ${attempt}/${maxAttempts} (${status})`,
        );

        await sleep(delay);

        continue;
      }

      console.error(
        "[Tavily Search Failed]",
        {
          query,
          status,
          error,
        },
      );

      throw analysisErrors.researchFailed();
    }
  }

  throw analysisErrors.researchFailed();
};

export const tavilyProvider = {
  search,
};