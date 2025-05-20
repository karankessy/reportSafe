
export type SeverityLevel = 'Critical' | 'High' | 'Medium' | 'Low' | 'Pending AI';
export type ReportStatus = 'Submitted' | 'Under Review' | 'In Progress' | 'Resolved' | 'Closed';

export interface VulnerabilityReport {
  id: string;
  title: string;
  targetAsset: string;
  descriptionSummary?: string; // Optional, can be derived or entered separately
  detailedDescription: string;
  supportingEvidenceUrls?: string[];
  submittedAt: string; // ISO date string
  status: ReportStatus;
  severity: SeverityLevel;
  aiSuggestedSeverity?: SeverityLevel;
  aiJustification?: string;
  // reporterId: string; // Future use
}
