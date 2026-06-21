import { env } from "../config/env";
import { GoogleGenAI } from "@google/genai";
import { GoogleAuth } from "google-auth-library";

import { analysisErrors } from "../shared/errors/error-factory";

const auth = new GoogleAuth({
  keyFilename: env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ["https://www.googleapis.com/auth/cloud-platform"],
});

const ai = new GoogleGenAI({
  vertexai: true,
  project: env.GOOGLE_CLOUD_PROJECT!,
  location: env.GOOGLE_CLOUD_LOCATION!,
  googleAuthOptions: {
    keyFilename: env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  },
});

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const generateJson = async (prompt: string): Promise<string> => {
  const maxRetries = 5;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.1,
        },
      });

      return response.text ?? "";
    } catch (error: any) {
      const status = error?.status ?? error?.statusCode;

      const isLastAttempt = attempt === maxRetries;

      if (status === 429 && !isLastAttempt) {
        const baseDelay = 1000 * Math.pow(2, attempt);
        const jitter = Math.random() * 1000;

        const delay = Math.min(baseDelay + jitter, 30000);

        console.warn(
          `[Gemini Rate Limited] Retry ${attempt + 1}/${maxRetries} in ${Math.round(delay)}ms`,
        );

        await sleep(delay);

        continue;
      }

      console.error("[Gemini Generation Failed]", error);

      if (status === 429) {
        throw analysisErrors.aiRateLimited();
      }

      throw analysisErrors.aiGenerationFailed();
    }
  }

  throw analysisErrors.aiGenerationFailed();
};

export const geminiProvider = {
  generateJson,
};
