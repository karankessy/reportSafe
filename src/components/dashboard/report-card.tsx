import type { VulnerabilityReport } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { SeverityBadge } from './severity-badge';
import { StatusBadge } from './status-badge';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';
import { ExternalLink, MessageSquare } from 'lucide-react';

interface ReportCardProps {
  report: VulnerabilityReport;
}

export function ReportCard({ report }: ReportCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{report.title}</CardTitle>
          <SeverityBadge severity={report.severity} />
        </div>
        <CardDescription className="text-sm text-muted-foreground">{report.targetAsset}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm line-clamp-3 mb-2">
          {report.descriptionSummary || report.detailedDescription}
        </p>
        <div className="text-xs text-muted-foreground">
          Submitted: {format(parseISO(report.submittedAt), 'MMM d, yyyy p')}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <StatusBadge status={report.status} />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" aria-label="View Details">
            <ExternalLink className="h-4 w-4 mr-1" />
            Details
          </Button>
           {/* Placeholder for future communication feature */}
          <Button variant="ghost" size="sm" disabled aria-label="Comments">
            <MessageSquare className="h-4 w-4 mr-1" />
            Discuss
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
