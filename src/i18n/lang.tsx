"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { dict, type Locale } from './dict';

type Ctx = { locale: Locale; t: (k: keyof typeof dict['en']) => string; setLocale: (l: Locale) => void; };

const C = createContext<Ctx | null>(null);

export function LangProvider({ children, initialLocale }: { children: ReactNode; initialLocale: Locale }) {
  const [locale, setLocale] = useState<Locale>(initialLocale); // <-- SSR ile aynı başlar
  useEffect(() => {
    document.cookie = `lang=${locale}; path=/; max-age=31536000`;
  }, [locale]);
  const t = (k: keyof typeof dict['en']) => dict[locale][k] ?? String(k);
  return <C.Provider value={{ locale, t, setLocale }}>{children}</C.Provider>;
}

export function useLang() {
  const ctx = useContext(C);
  if (!ctx) throw new Error('LangProvider missing');
  return ctx;
}
