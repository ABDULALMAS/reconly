import "./config/env";
import express from "express";
import cors from "cors";

import analysisRouter from "./analysis/analysis.routes";

const app = express();

app.use(
  cors({
    origin: [
      "https://reconalyst.com",
      "https://www.reconalyst.com",
      "http://localhost:3000",
    ],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api", analysisRouter);

app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Reconalyst API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
