'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { storyboardRequestSchema, type StoryboardRequestInput } from '@/lib/validation';
import type { StoryboardResponse } from '@/lib/types';

const defaultValues: StoryboardRequestInput = {
  title: 'Projeto de Storyboard',
  script: '',
  scriptLanguage: 'pt',
  visualStyle: 'realistic',
  tone: 'neutral',
  shotPreference: 'balanced',
  characterGuide: ''
};

interface StoryboardFormProps {
  onResult: (result: StoryboardResponse) => void;
}

export function StoryboardForm({ onResult }: StoryboardFormProps) {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<StoryboardRequestInput>({
    resolver: zodResolver(storyboardRequestSchema),
    defaultValues
  });

  const submitHandler = handleSubmit((values) => {
    if (!values.script.trim()) {
      setErrorMessage(t('emptyScript'));
      return;
    }

    setErrorMessage(null);

    startTransition(async () => {
      try {
        const response = await fetch('/api/storyboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });

        if (!response.ok) {
          throw new Error('Failed request');
        }

        const data = (await response.json()) as StoryboardResponse;
        onResult(data);
      } catch (error) {
        console.error(error);
        setErrorMessage(t('errorGeneric'));
      }
    });
  });

  const handleReset = () => {
    reset(defaultValues);
    setErrorMessage(null);
  };

  return (
    <form onSubmit={submitHandler} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300" htmlFor="title">
          {t('inputSectionTitle')}
        </label>
        <input
          id="title"
          {...register('title')}
          className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-lg font-semibold text-slate-100 focus:border-accent focus:outline-none"
        />
        {errors.title && <p className="text-sm text-rose-400">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300" htmlFor="script">
          {t('scriptPlaceholder')}
        </label>
        <textarea
          id="script"
          rows={12}
          {...register('script')}
          className="w-full rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-3 text-base leading-relaxed text-slate-100 focus:border-accent focus:outline-none"
          placeholder={t('scriptPlaceholder')}
        />
        {errors.script && <p className="text-sm text-rose-400">{errors.script.message}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300" htmlFor="scriptLanguage">
            {t('scriptLanguageLabel')}
          </label>
          <select
            id="scriptLanguage"
            {...register('scriptLanguage')}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-base text-slate-100 focus:border-accent focus:outline-none"
          >
            <option value="pt">Português</option>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="it">Italiano</option>
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
            <option value="zh">中文</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300" htmlFor="visualStyle">
            {t('targetStyleLabel')}
          </label>
          <select
            id="visualStyle"
            {...register('visualStyle')}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-base text-slate-100 focus:border-accent focus:outline-none"
          >
            <option value="realistic">Cinematic Realistic</option>
            <option value="stylized">Stylized Illustration</option>
            <option value="motion_graphic">Motion Graphic</option>
            <option value="anime">Anime Frame</option>
            <option value="sketch">Pencil Sketch</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300" htmlFor="shotPreference">
            {t('shotPreferenceLabel')}
          </label>
          <select
            id="shotPreference"
            {...register('shotPreference')}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-base text-slate-100 focus:border-accent focus:outline-none"
          >
            <option value="compact">Compact</option>
            <option value="balanced">Balanced</option>
            <option value="cinematic">Cinematic</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300" htmlFor="tone">
            {t('toneLabel')}
          </label>
          <select
            id="tone"
            {...register('tone')}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-base text-slate-100 focus:border-accent focus:outline-none"
          >
            <option value="neutral">Neutral</option>
            <option value="uplifting">Uplifting</option>
            <option value="dramatic">Dramatic</option>
            <option value="dark">Dark</option>
            <option value="playful">Playful</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300" htmlFor="characterGuide">
          {t('characterGuideLabel')}
        </label>
        <textarea
          id="characterGuide"
          rows={4}
          {...register('characterGuide')}
          className="w-full rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-base text-slate-100 focus:border-accent focus:outline-none"
          placeholder={t('characterGuidePlaceholder')}
        />
      </div>

      {errorMessage && (
        <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-primary/30 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? '•••' : t('generateButton')}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
        >
          {t('resetButton')}
        </button>
      </div>
    </form>
  );
}
