import { Response } from "express";

import { AnalysisError } from "./analysis.error";

export const handleError = (
  error: unknown,
  res: Response,
) => {
  if (error instanceof AnalysisError) {
    return res.status(error.statusCode).json({
      success: false,
      code: error.code,
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    success: false,
    code: "INTERNAL_ERROR",
    message:
      "Something went wrong while analyzing the website.",
  });
};