import { useLanguage } from '../context/LanguageContext';

export default function Languages({ languages }) {
  const { t } = useLanguage();

  return (
    <section id="languages" className="bg-ink px-5 py-20 text-paper sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
            {t.languages.eyebrow}
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold sm:text-4xl">
            {t.languages.title}
          </h2>
          <p className="mt-4 text-paper/70">{t.languages.subtitle}</p>
        </div>

        {/* The relay: five nodes connected by a line, evoking hand-to-hand translation */}
        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-paper/20 to-transparent sm:block"
          />
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-5 sm:gap-4">
            {languages.map((lang) => (
              <div key={lang.code ?? lang.id} className="relative flex flex-col items-center text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full border border-paper/20 bg-ink-soft text-2xl">
                  <span aria-hidden="true">{lang.flag_emoji}</span>
                </div>
                <p className="mt-3 font-display text-base font-medium">{lang.name_en}</p>
                <p
                  className={`mt-0.5 text-sm text-paper/55 ${lang.is_rtl ? 'font-arabic' : ''}`}
                  dir={lang.is_rtl ? 'rtl' : 'ltr'}
                >
                  {lang.native_name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
