import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ReportProvider } from '@/contexts/report-context';
import { ThemeProvider } from "@/components/theme-provider";

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
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReportProvider>
            {children}
            <Toaster />
          </ReportProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
