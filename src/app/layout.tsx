import type { Metadata } from 'next';
import { GeistSans } from 'next/font/google';
import { GeistMono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ReportProvider } from '@/contexts/report-context';

const geistSans = GeistSans({ 
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = GeistMono({ 
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

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
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ReportProvider>
          {children}
          <Toaster />
        </ReportProvider>
      </body>
    </html>
  );
}
