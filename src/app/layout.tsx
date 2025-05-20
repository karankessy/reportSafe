import type { Metadata } from 'next';
// Removed GeistSans and GeistMono imports from 'next/font/google'
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ReportProvider } from '@/contexts/report-context';

// Removed geistSans and geistMono font initializations

export const metadata: Metadata = {
  title: 'ReportSafe - Vulnerability Reporting',
  description: 'Securely report and manage vulnerabilities.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/*
        The className will now use Tailwind's default font-sans.
        The var(--font-geist-sans) and var(--font-geist-mono) from the original body className
        are removed as they are no longer defined by next/font.
        globals.css still has `font-family: var(--font-geist-sans), Arial, Helvetica, sans-serif;`
        so it will fall back to Arial, Helvetica, sans-serif.
      */}
      <body className="font-sans antialiased">
        <ReportProvider>
          {children}
          <Toaster />
        </ReportProvider>
      </body>
    </html>
  );
}
