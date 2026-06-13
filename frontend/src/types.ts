export type RecentSignal = {
  type: string;
  details: string;
};

export type CompanyReport = {
  analysisMode:
    | "full"
    | "limited";

  companySummary: string;

  targetAudience: string[];

  valueProposition: string;

  competitivePositioning: string;

  keyCompetitors: string[];

  recentSignals: RecentSignal[];

  opportunitiesAndRisks: {
    opportunities: string[];
    risks: string[];
  };

  researchConfidence:
    | "high"
    | "medium"
    | "low";

  finalAssessment: string;
};