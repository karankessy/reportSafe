import type { ReportStatus } from '@/lib/types';
import { STATUS_COLORS } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Info, AlertCircle, Clock, RefreshCcw } from 'lucide-react';


interface StatusBadgeProps {
  status: ReportStatus;
  className?: string;
}

const STATUS_ICONS: Record<ReportStatus, React.ElementType> = {
  'Submitted': Info,
  'Under Review': Clock,
  'In Progress': RefreshCcw,
  'Resolved': CheckCircle,
  'Closed': XCircle,
};


export function StatusBadge({ status, className }: StatusBadgeProps) {
  const colorClass = STATUS_COLORS[status] || 'bg-gray-500 text-white';
  const Icon = STATUS_ICONS[status] || AlertCircle;
  
  const baseBadgeClass = "inline-flex items-center rounded-md border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  return (
    <div className={cn(baseBadgeClass, colorClass, 'gap-1', className)}>
       <Icon className="h-3 w-3" />
      {status}
    </div>
  );
}
