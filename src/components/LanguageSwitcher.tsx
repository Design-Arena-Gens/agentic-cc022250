'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/lib/i18n/I18nProvider';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const languageOptions = [
  { value: 'pt', label: 'Português' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' }
] as const;

export function LanguageSwitcher() {
  const { t } = useTranslation();
  const { setLanguage } = useLanguage();
  const [stored, setStored] = useLocalStorage<'pt' | 'en' | 'es'>('ui-language', 'pt');

  useEffect(() => {
    setLanguage(stored);
  }, [setLanguage, stored]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const choice = event.target.value as 'pt' | 'en' | 'es';
    setStored(choice);
    setLanguage(choice);
  };

  return (
    <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
      <span>{t('languageSwitcherLabel')}</span>
      <select
        className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:border-accent focus:outline-none"
        value={stored}
        onChange={handleChange}
      >
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
