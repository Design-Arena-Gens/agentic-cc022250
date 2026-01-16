import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { I18nProvider } from '@/lib/i18n/I18nProvider';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display'
});

export const metadata: Metadata = {
  title: 'Storyboard Sync Lab',
  description:
    'Transform YouTube scripts into consistent visual storyboards with detailed prompts ready for generative image platforms.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <I18nProvider defaultLanguage="pt">{children}</I18nProvider>
      </body>
    </html>
  );
}
