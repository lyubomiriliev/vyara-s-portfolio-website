'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Locale, translations, Translations } from './i18n'

interface LangContextValue {
  locale: Locale
  t: Translations
  setLocale: (l: Locale) => void
}

const LangContext = createContext<LangContextValue>({
  locale: 'bg',
  t: translations.bg,
  setLocale: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('bg')

  useEffect(() => {
    const saved = localStorage.getItem('aviva-lang') as Locale | null
    if (saved === 'bg' || saved === 'en') setLocaleState(saved)
  }, [])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    localStorage.setItem('aviva-lang', l)
  }

  return (
    <LangContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
