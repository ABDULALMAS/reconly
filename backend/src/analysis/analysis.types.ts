export type TavilyResult = {
  title: string;
  url: string;
  content: string;
};

export type ResearchResults = {
  competitors: TavilyResult[];
  marketPosition: TavilyResult[];
  recentSignals: TavilyResult[];
};

export type ConfidenceLevel = "high" | "medium" | "low";

export type AnalysisMode = "full" | "limited";

export type QualificationResult = {
  qualified: boolean;

  entityType:
    | "company"
    | "startup"
    | "product"
    | "portfolio"
    | "repository"
    | "documentation"
    | "blog"
    | "unknown";

  classificationConfidence: ConfidenceLevel;

  reason: string;
};

export type EvidenceAssessment = {
  competitorEvidence: {
    sufficient: boolean;
    confidence: "high" | "medium" | "low";
    reason: string;
  };

  marketEvidence: {
    sufficient: boolean;
    confidence: "high" | "medium" | "low";
    reason: string;
  };

  signalsEvidence: {
    sufficient: boolean;
    confidence: "high" | "medium" | "low";
    reason: string;
  };

  overallConfidence: ConfidenceLevel;

  coverageSummary: string;
};

export type RecentSignal = {
  type: string;
  details: string;
};

export type FinalReport = {
  analysisMode: AnalysisMode;

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

  researchConfidence: ConfidenceLevel;

  finalAssessment: string;
};

export type CompanyProfile = {
  companyName: string;
  companySummary: string;
  industry: string;
  targetAudience: string[];
  valueProposition: string;
  keywords: string[];
};

export type ResearchQueries = {
  competitors: string;
  marketPosition: string;
  recentSignals: string;
};

export type CompanyAnalysis = {
  qualification: QualificationResult;

  companyProfile: CompanyProfile;

  researchQueries: ResearchQueries;

  researchResults?: ResearchResults;

  evidenceAssessment?: EvidenceAssessment;

  analysisMode?: AnalysisMode;

  finalReport?: FinalReport;
};
