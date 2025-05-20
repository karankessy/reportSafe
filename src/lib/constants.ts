import type { SeverityLevel, ReportStatus } from './types';

export const SEVERITY_COLORS: Record<SeverityLevel, string> = {
  'Critical': 'bg-[#dc3545] text-white',
  'High': 'bg-[#fd7e14] text-white',
  'Medium': 'bg-[#ffc107] text-black',
  'Low': 'bg-[#0dcaf0] text-white',
  'Pending AI': 'bg-gray-400 text-black', // Default, as no specific hex provided for this state
};

export const STATUS_COLORS: Record<ReportStatus, string> = {
  'Submitted': 'bg-blue-500 text-white',
  'Under Review': 'bg-purple-500 text-white',
  'In Progress': 'bg-yellow-500 text-black',
  'Resolved': 'bg-green-500 text-white',
  'Closed': 'bg-gray-600 text-white',
};

export const SEVERITY_LEVELS: SeverityLevel[] = ['Low', 'Medium', 'High', 'Critical'];
