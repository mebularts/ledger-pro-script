// src/i18n/server.tsx
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';
import { LangProvider } from './lang';
import type { Locale } from './dict';

export default async function ServerLangProvider({
  children,
}: {
  children: ReactNode;
}) {
  const store = await cookies();               // <-- await eklendi
  const c = store.get('lang')?.value;
  const initialLocale = (c === 'tr' ? 'tr' : 'en') as Locale;

  return <LangProvider initialLocale={initialLocale}>{children}</LangProvider>;
}
