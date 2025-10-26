import './globals.css';
import type { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import ThemeToggle from '@/components/ThemeToggle';
import LangToggle from '@/components/LangToggle';
import { ThemeProvider } from 'next-themes';
import ServerLangProvider from '@/i18n/server';

export const metadata = { title: 'LedgerPro', description: 'Pre-accounting app' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ServerLangProvider>
            <div className="min-h-screen flex">
              <Sidebar />
              <main className="flex-1 p-6">
                <div className="flex justify-end gap-2 mb-4">
                  <LangToggle />
                  <ThemeToggle />
                </div>
                {children}
              </main>
            </div>
          </ServerLangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
