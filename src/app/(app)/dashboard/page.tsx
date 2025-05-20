'use client';

import { ReportCard } from '@/components/dashboard/report-card';
import { useReports } from '@/contexts/report-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function DashboardPage() {
  const { reports } = useReports();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Vulnerability Dashboard</h1>
        <Link href="/submit-report" passHref>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> New Report
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 items-center p-4 border rounded-lg bg-card">
        <div className="relative flex-grow w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search reports..." className="pl-8 w-full" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>
      
      {reports.length === 0 ? (
        <div className="text-center py-12">
          <img src="https://placehold.co/300x200.png" alt="No reports" data-ai-hint="empty state illustration" className="mx-auto mb-4 rounded-md" />
          <p className="text-xl font-semibold text-muted-foreground">No vulnerability reports yet.</p>
          <p className="text-muted-foreground">Start by submitting a new report.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports.map(report => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
}
