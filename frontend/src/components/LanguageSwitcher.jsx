import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSwitcher({ variant = 'light' }) {
  const { lang, setLang, languages } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = languages.find((l) => l.code === lang);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const isDark = variant === 'dark';

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium font-mono tracking-wide transition-colors ${
          isDark
            ? 'border-paper/25 text-paper hover:border-gold hover:text-gold'
            : 'border-ink/20 text-ink hover:border-teal hover:text-teal'
        }`}
      >
        <span aria-hidden="true">{current.code.toUpperCase()}</span>
        <span className="sr-only">Change language, current: {current.label}</span>
        <svg width="10" height="6" viewBox="0 0 10 6" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 rtl:right-auto rtl:left-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-ink/10 bg-paper shadow-xl"
        >
          {languages.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={l.code === lang}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-teal/10 ${
                  l.code === lang ? 'font-semibold text-teal' : 'text-ink'
                }`}
              >
                <span>{l.label}</span>
                <span className="font-mono text-xs text-ink/50">{l.native}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
