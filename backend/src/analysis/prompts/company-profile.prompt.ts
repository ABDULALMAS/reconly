export const buildCompanyProfilePrompt = (
  websiteContent: string,
) => `
You are an expert startup researcher.

Extract factual company information from the website content below and generate research queries.

EXTRACTION RULES

- Use only information supported by the website content
- Avoid marketing language and buzzwords
- If a field is unavailable use "" for strings or [] for arrays
- Do not invent facts

RESEARCH QUERY RULES

Generate exactly one search query per category.

Each query must:
- Be optimized for a web search engine
- Contain the company name
- Contain only keywords, not sentences
- Be maximum 12 words and 100 characters
- Avoid commas, punctuation, and quotation marks

Category objectives:

competitors — find direct alternatives a buyer would realistically evaluate
marketPosition — understand adoption, customer traction, differentiation, and market perception
recentSignals — find funding, acquisitions, partnerships, product launches from the last 24 months

Query examples for a company named Supabase:
competitors: "Supabase competitors backend as a service"
marketPosition: "Supabase adoption enterprise customers developer platform"
recentSignals: "Supabase funding launches partnerships"

OUTPUT SCHEMA

{
  "companyProfile": {
    "companyName": string,
    "companySummary": string,
    "industry": string,
    "targetAudience": string[],
    "valueProposition": string,
    "keywords": string[]
  },
  "researchQueries": {
    "competitors": string,
    "marketPosition": string,
    "recentSignals": string
  }
}

RULES

- Do not add, remove, or rename any fields
- Do not change any data types
- Return a single raw JSON object
- Do not include any text before or after the JSON

WEBSITE CONTENT:

${websiteContent}
`;