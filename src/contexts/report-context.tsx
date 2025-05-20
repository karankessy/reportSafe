'use client';

import type { VulnerabilityReport } from '@/lib/types';
import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useCallback } from 'react';

interface ReportContextType {
  reports: VulnerabilityReport[];
  addReport: (report: Omit<VulnerabilityReport, 'id' | 'submittedAt' | 'status' | 'severity'> & { severity: VulnerabilityReport['severity']}) => void;
  updateReportStatus: (reportId: string, status: VulnerabilityReport['status']) => void;
  updateReportSeverity: (reportId: string, severity: VulnerabilityReport['severity']) => void;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

const initialReports: VulnerabilityReport[] = [
  {
    id: '1',
    title: 'Cross-Site Scripting (XSS) in User Profile',
    targetAsset: 'WebApp Alpha - Profile Page',
    detailedDescription: 'A stored XSS vulnerability exists in the user profile page where the "bio" field is not properly sanitized.',
    supportingEvidenceUrls: ['https://example.com/xss_proof.png'],
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    status: 'Submitted',
    severity: 'High',
    aiSuggestedSeverity: 'High',
    aiJustification: 'XSS can lead to session hijacking and data theft.'
  },
  {
    id: '2',
    title: 'SQL Injection in Search Functionality',
    targetAsset: 'WebApp Alpha - Search API',
    detailedDescription: 'The search API endpoint /api/search is vulnerable to SQL injection via the "query" parameter.',
    submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    status: 'Under Review',
    severity: 'Critical',
  },
  {
    id: '3',
    title: 'Outdated jQuery Version',
    targetAsset: 'WebApp Alpha - All Pages',
    detailedDescription: 'The application uses an outdated version of jQuery (v1.8.3) which has known vulnerabilities.',
    supportingEvidenceUrls: ['https://snyk.io/vuln/jquery'],
    submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    status: 'Resolved',
    severity: 'Medium',
  },
];


export const ReportProvider = ({ children }: { children: ReactNode }) => {
  const [reports, setReports] = useState<VulnerabilityReport[]>(initialReports);

  const addReport = useCallback((reportData: Omit<VulnerabilityReport, 'id' | 'submittedAt' | 'status' | 'severity'> & { severity: VulnerabilityReport['severity']}) => {
    const newReport: VulnerabilityReport = {
      ...reportData,
      id: Date.now().toString(), // Simple ID generation
      submittedAt: new Date().toISOString(),
      status: 'Submitted', // Default status
    };
    setReports(prevReports => [newReport, ...prevReports]);
  }, []);

  const updateReportStatus = useCallback((reportId: string, status: VulnerabilityReport['status']) => {
    setReports(prevReports =>
      prevReports.map(report =>
        report.id === reportId ? { ...report, status } : report
      )
    );
  }, []);

  const updateReportSeverity = useCallback((reportId: string, severity: VulnerabilityReport['severity']) => {
     setReports(prevReports =>
      prevReports.map(report =>
        report.id === reportId ? { ...report, severity } : report
      )
    );
  }, []);

  return (
    <ReportContext.Provider value={{ reports, addReport, updateReportStatus, updateReportSeverity }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReports = () => {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error('useReports must be used within a ReportProvider');
  }
  return context;
};
