import React, { useEffect, useMemo, useState } from 'react';
import { defaultLanguage, normalizeLanguage, type Language, translate } from './translations';
import { I18nContext, type I18nContextValue } from './i18nContext';

const STORAGE_KEY = 'contribution-cards-language';

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return defaultLanguage;
    const storedLanguage = window.localStorage.getItem(STORAGE_KEY);
    return normalizeLanguage(storedLanguage);
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, language);
    }
  }, [language]);

  const value = useMemo<I18nContextValue>(() => ({
    language,
    changeLanguage: setLanguage,
    t: (key, params) => translate(language, key, params),
  }), [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
