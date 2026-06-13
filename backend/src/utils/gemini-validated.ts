import { ZodError, ZodType } from "zod";

import { geminiProvider } from "../providers/gemini.provider";

import { analysisErrors } from "../shared/errors/error-factory";

type GenerateValidatedJsonParams<T> = {
  prompt: string;
  schema: ZodType<T>;
  maxAttempts?: number;
};

const buildCorrectionPrompt = (
  originalPrompt: string,
  previousResponse: string,
  validationErrors: string,
) => `
Your previous JSON response had validation errors.

Errors:

${validationErrors}

Previous response:

${previousResponse}

Fix only the fields listed above.

Keep all other fields exactly as they were.

Return ONLY the corrected JSON object.

Do not include markdown, code fences, or any explanation.

Original task for reference:

${originalPrompt}
`;

const buildJsonParseRetryPrompt = (
  originalPrompt: string,
  previousResponse: string,
) => `
Your previous response was not valid JSON.

Previous response:

${previousResponse}

Return ONLY a raw JSON object.

Do not include markdown, code fences, or any explanation.

Start your response with { and end with }.

Original task for reference:

${originalPrompt}
`;

const getValidationErrors = (error: ZodError): string => {
  return error.issues
    .map(
      (issue) =>
        `${issue.path.join(".") || "root"}: ${issue.message}`,
    )
    .join("\n");
};

const cleanResponse = (text: string): string =>
  text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

const generateValidatedJson = async <T>({
  prompt,
  schema,
  maxAttempts = 3,
}: GenerateValidatedJsonParams<T>): Promise<T> => {
  let currentPrompt = prompt;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const text = await geminiProvider.generateJson(currentPrompt);

    let parsedResponse: unknown;

    try {
      parsedResponse = JSON.parse(cleanResponse(text));
    } catch {
      const isLastAttempt = attempt === maxAttempts;

      if (!isLastAttempt) {
        console.warn(
          `[JSON Parse] Attempt ${attempt}/${maxAttempts} failed`,
        );

        currentPrompt = buildJsonParseRetryPrompt(prompt, text);

        continue;
      }

      console.error("[JSON Parse Failed] Exhausted all attempts");

      throw analysisErrors.aiSchemaValidationFailed();
    }

    try {
      return schema.parse(parsedResponse);
    } catch (error) {
      const isLastAttempt = attempt === maxAttempts;

      if (error instanceof ZodError && !isLastAttempt) {
        const validationErrors = getValidationErrors(error);

        console.warn(
          `[Schema Validation] Attempt ${attempt}/${maxAttempts} failed:\n${validationErrors}`,
        );

        currentPrompt = buildCorrectionPrompt(
          prompt,
          text,
          validationErrors,
        );

        continue;
      }

      if (error instanceof ZodError) {
        console.error(
          "[Schema Validation Failed] Exhausted all attempts",
          error.issues,
        );

        throw analysisErrors.aiSchemaValidationFailed();
      }

      throw error;
    }
  }

  throw analysisErrors.aiSchemaValidationFailed();
};

export const geminiValidated = {
  generateJson: generateValidatedJson,
};