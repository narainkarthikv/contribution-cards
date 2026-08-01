import { createContext } from 'react';
import type { Language } from './translations';

export interface I18nContextValue {
  language: Language;
  changeLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

export const I18nContext = createContext<I18nContextValue | undefined>(undefined);