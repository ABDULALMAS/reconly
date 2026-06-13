import "./config/env";
import express from "express";
import cors from "cors";
import { geminiProvider } from "./providers/gemini.provider";
import { firecrawlProvider } from "./providers/firecrawl.provider";
import { tavilyProvider } from "./providers/tavily.provider";
import { analysisService } from "./analysis/analysis.service";
import analysisRouter from "../src/analysis/analysis.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", analysisRouter);

app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Reconly API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
