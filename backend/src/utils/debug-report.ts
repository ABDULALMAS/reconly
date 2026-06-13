import fs from "fs/promises";
import path from "path";

export const createDebugRun = async (
  identifier: string,
) => {
  const safeIdentifier = identifier
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-");

  const runId = `${Date.now()}-${safeIdentifier}`;

  const runPath = path.join(
    process.cwd(),
    "debug",
    runId,
  );

  await fs.mkdir(runPath, {
    recursive: true,
  });

  return {
    runId,
    runPath,
  };
};

export const saveDebugReport = async (
  runPath: string,
  fileName: string,
  data: unknown,
) => {
  await fs.writeFile(
    path.join(
      runPath,
      `${fileName}.json`,
    ),
    JSON.stringify(
      data,
      null,
      2,
    ),
  );
};