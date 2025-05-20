import type { SeverityLevel, ReportStatus } from './types';

// Updated colors for a playful, colorful aesthetic with good contrast.
// Using HSL variables from globals.css for badges to ensure theme consistency.
// For text color, we choose a color that contrasts well with the background.
// Using `text-black` or `text-white` as direct classes, or specific foreground HSLs.

export const SEVERITY_COLORS: Record<SeverityLevel, string> = {
  'Critical': 'bg-[hsl(var(--severity-critical))] text-[hsl(var(--primary-foreground))]', // Vibrant Red, White text
  'High': 'bg-[hsl(var(--severity-high))] text-black', // Bright Orange, Black text
  'Medium': 'bg-[hsl(var(--severity-medium))] text-black', // Duck Yellow, Black text
  'Low': 'bg-[hsl(var(--severity-low))] text-black', // Aqua Blue, Black text
  'Pending AI': 'bg-slate-400 text-black dark:bg-slate-500 dark:text-white', // Neutral Gray
};

export const STATUS_COLORS: Record<ReportStatus, string> = {
  'Submitted': 'bg-[#58CCED] text-black', // Aqua Blue
  'Under Review': 'bg-[#FF9EAA] text-black', // Bubblegum Pink
  'In Progress': 'bg-[#FFE15D] text-black', // Duck Yellow
  'Resolved': 'bg-[#50D890] text-black', // Playful Green
  'Closed': 'bg-[#B0C4DE] text-black', // Light Steel Blue (neutral but soft)
};

export const SEVERITY_LEVELS: SeverityLevel[] = ['Low', 'Medium', 'High', 'Critical'];
