'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StoryboardForm } from '@/components/StoryboardForm';
import { StoryboardOutput } from '@/components/StoryboardOutput';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import type { StoryboardResponse } from '@/lib/types';

export default function HomePage() {
  const { t } = useTranslation();
  const [result, setResult] = useState<StoryboardResponse | null>(null);

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-10 px-5 pb-20 pt-12">
      <header className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-10 shadow-2xl shadow-slate-900/30">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-100 md:text-4xl">
              {t('appTitle')}
            </h1>
            <p className="mt-2 max-w-2xl text-base text-slate-400">{t('appSubtitle')}</p>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-slate-900/30">
          <StoryboardForm onResult={setResult} />
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-8 shadow-inner shadow-slate-900/50">
          <StoryboardOutput data={result} />
        </div>
      </section>
    </main>
  );
}
