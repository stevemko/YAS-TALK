import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import translations, { LANGUAGES } from '../i18n/translations';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'yastalk-lang';

function getInitialLanguage() {
  if (typeof window === 'undefined') return 'en';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved && translations[saved]) return saved;
  const browserLang = (navigator.language || 'en').slice(0, 2);
  return translations[browserLang] ? browserLang : 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage);

  const meta = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = meta.rtl ? 'rtl' : 'ltr';
  }, [lang, meta.rtl]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      isRtl: meta.rtl,
      t: translations[lang],
      languages: LANGUAGES,
    }),
    [lang, meta.rtl]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
