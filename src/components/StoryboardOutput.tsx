'use client';

import { useState } from 'react';
import { ClipboardDocumentCheckIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { StoryboardResponse } from '@/lib/types';

interface StoryboardOutputProps {
  data: StoryboardResponse | null;
}

export function StoryboardOutput({ data }: StoryboardOutputProps) {
  const { t } = useTranslation();
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  if (!data) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-12 text-center text-slate-500">
        <p>{t('storyboardOverview')}</p>
      </div>
    );
  }

  const handleCopy = async (prompt: string, id: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedPromptId(id);
      setTimeout(() => setCopiedPromptId(null), 2200);
    } catch (error) {
      console.error('Clipboard copy failed', error);
    }
  };

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-slate-900/30">
        <header className="mb-6 flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-slate-100">{t('globalContinuity')}</h2>
          <p className="text-sm text-slate-400">{data.globalContinuity.styleGuidance}</p>
        </header>
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              {t('characters')}
            </h3>
            <div className="mt-4 space-y-4">
              {data.globalContinuity.characters.length === 0 && (
                <p className="text-sm text-slate-500">{t('noCharacters')}</p>
              )}
              {data.globalContinuity.characters.map((character) => (
                <div key={character.id} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-slate-100">{character.name}</span>
                    <div className="flex gap-2">
                      {character.colorPalette.map((color) => (
                        <span
                          key={color}
                          style={{ backgroundColor: color }}
                          className="h-4 w-4 rounded-full border border-slate-900"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{character.description}</p>
                  {character.recurringProps.length > 0 && (
                    <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">
                      Props: {character.recurringProps.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                {t('environments')}
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-400">
                {data.globalContinuity.environments.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                {t('visualMotifs')}
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-400">
                {data.globalContinuity.visualMotifs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                {t('palette')}
              </h3>
              <div className="mt-3 flex gap-2">
                {data.globalContinuity.palette.map((color) => (
                  <span
                    key={color}
                    style={{ backgroundColor: color }}
                    className="h-8 flex-1 rounded-full border border-slate-900"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        {data.scenes.map((scene, sceneIndex) => (
          <motion.article
            key={scene.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sceneIndex * 0.05 }}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-slate-900/30"
          >
            <header className="mb-6 flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-500">
                <span>
                  {t('scene')} {sceneIndex + 1} • {t('duration')}: {scene.approxDuration}
                </span>
                <span>{scene.cameraStyle}</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-100">{scene.title}</h3>
              <p className="text-sm text-slate-400">{scene.narrativeSummary}</p>
            </header>

            <div className="space-y-6">
              {scene.beats.map((beat, beatIndex) => (
                <div
                  key={beat.beatId}
                  className="rounded-xl border border-slate-800 bg-slate-950/70 p-5 shadow-inner shadow-slate-900/40"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-wide text-slate-500">
                    <span>
                      {t('beat')} {sceneIndex + 1}.{beatIndex + 1}
                    </span>
                    <span>{beat.timecode}</span>
                  </div>
                  <div className="mt-3 grid gap-4 lg:grid-cols-2">
                    <div className="space-y-3 text-sm text-slate-300">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {t('narration')}
                        </h4>
                        <p className="mt-1 leading-relaxed text-slate-200">{beat.narration}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {t('visualIdea')}
                        </h4>
                        <p className="mt-1 text-slate-300">{beat.visualIdea}</p>
                      </div>
                      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-xs text-slate-400">
                        <p>
                          {t('continuityNotes')}: {beat.continuity.characters.join(', ') || '—'} • {t('lighting')}:{' '}
                          {beat.continuity.lighting}
                        </p>
                        <p>
                          {t('mood')}: {beat.continuity.mood} • {t('camera')}: {beat.continuity.camera}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {t('prompt')}
                        </h4>
                        <button
                          type="button"
                          onClick={() => handleCopy(beat.prompt, beat.beatId)}
                          className="flex items-center gap-1 rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:bg-slate-800"
                        >
                          {copiedPromptId === beat.beatId ? (
                            <>
                              <ClipboardDocumentCheckIcon className="h-4 w-4" />
                              {t('copied')}
                            </>
                          ) : (
                            <>
                              <ClipboardDocumentIcon className="h-4 w-4" />
                              {t('copyPrompt')}
                            </>
                          )}
                        </button>
                      </div>
                      <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-xs leading-relaxed text-slate-200">
                        <p>{beat.prompt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <AnimatePresence>
              {scene.consistencyNotes.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-6 list-disc space-y-2 rounded-xl border border-slate-800 bg-slate-950/60 p-4 pl-6 text-xs text-slate-400"
                >
                  {scene.consistencyNotes.map((note, index) => (
                    <li key={`${scene.id}-note-${index}`}>{note}</li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.article>
        ))}
      </section>
    </div>
  );
}
