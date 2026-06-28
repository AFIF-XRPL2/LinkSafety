export type AnalysisStatus =
  | "safe"
  | "suspicious"
  | "dangerous";

export type AnalysisResult = {
  status: AnalysisStatus;
  score: number;
  reasons: string[];
};