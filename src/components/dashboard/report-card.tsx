
'use client';

import type { VulnerabilityReport } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { SeverityBadge } from './severity-badge';
import { StatusBadge } from './status-badge';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';
import { ExternalLink, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ReportCardProps {
  report: VulnerabilityReport;
}

export function ReportCard({ report }: ReportCardProps) {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    if (report.submittedAt) {
      // Ensure this runs only on the client after hydration
      setFormattedDate(format(parseISO(report.submittedAt), 'MMM d, yyyy p'));
    }
  }, [report.submittedAt]);

  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-300">
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
          Submitted: {formattedDate || 'Loading date...'}
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
