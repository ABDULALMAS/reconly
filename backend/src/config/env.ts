import dotenv from "dotenv";

dotenv.config();

export const env = {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY!,
  FIRECRAWL_API_KEY: process.env.FIRECRAWL_API_KEY!,
  TAVILY_API_KEY:process.env.TAVILY_API_KEY!,
};