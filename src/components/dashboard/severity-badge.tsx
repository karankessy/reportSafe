import type { SeverityLevel } from '@/lib/types';
import { SEVERITY_COLORS } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ShieldAlert, ShieldCheck, ShieldQuestion, ShieldX, AlertTriangle, Info } from 'lucide-react';

interface SeverityBadgeProps {
  severity: SeverityLevel;
  className?: string;
}

const SEVERITY_ICONS: Record<SeverityLevel, React.ElementType> = {
  'Critical': ShieldAlert,
  'High': AlertTriangle,
  'Medium': ShieldCheck,
  'Low': Info,
  'Pending AI': ShieldQuestion,
};

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  const colorClass = SEVERITY_COLORS[severity] || 'bg-gray-500 text-white';
  const Icon = SEVERITY_ICONS[severity] || ShieldQuestion;

  // Override Shadcn badge variants for custom background/text colors
  // by removing default variant classes and applying custom ones.
  // This approach avoids "!important" or complex CSS overrides.
  const baseBadgeClass = "inline-flex items-center rounded-md border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";


  return (
    <div className={cn(baseBadgeClass, colorClass, 'gap-1', className)}>
      <Icon className="h-3 w-3" />
      {severity}
    </div>
  );
}
