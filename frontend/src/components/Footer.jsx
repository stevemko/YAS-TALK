import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-soft px-5 py-10 text-paper/60 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-display text-lg font-semibold text-paper">
            Yas<span className="text-gold">Talk</span>
          </p>
          <p className="text-sm">{t.footer.tagline}</p>
        </div>
        <div className="text-center text-xs sm:text-right">
          <p>© {year} YasTalk. {t.footer.rights}</p>
          <p>{t.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
