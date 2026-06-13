export type ResolvedUrl = {
  originalUrl: string;
  normalizedUrl: string;
  hostname: string;
};

const ensureProtocol = (
  url: string
): string => {
  const trimmed = url.trim();

  if (
    !trimmed.startsWith("http://") &&
    !trimmed.startsWith("https://")
  ) {
    return `https://${trimmed}`;
  }

  return trimmed;
};

const resolve = (
  inputUrl: string
): ResolvedUrl => {
  const normalizedInput =
    ensureProtocol(inputUrl);

  const parsedUrl =
    new URL(normalizedInput);

  return {
    originalUrl: inputUrl,

    normalizedUrl:
      `${parsedUrl.protocol}//${parsedUrl.hostname}`,

    hostname:
      parsedUrl.hostname,
  };
};

export const urlResolver = {
  resolve,
};