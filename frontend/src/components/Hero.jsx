import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t, languages } = useLanguage();

  return (
    <section id="top" className="relative overflow-hidden bg-ink text-paper">
      {/* Ambient backdrop: faint concentric arcs suggesting a signal / relay */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -right-32 -top-32 h-[36rem] w-[36rem] rounded-full border border-gold/20" />
        <div className="absolute -right-16 -top-16 h-[26rem] w-[26rem] rounded-full border border-teal/30" />
        <div className="absolute right-8 top-8 h-[16rem] w-[16rem] rounded-full border border-gold/20" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-20">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
          {t.hero.eyebrow}
        </span>

        <h1 className="mt-6 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.08] sm:text-6xl">
          {t.hero.title}
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">
          {t.hero.subtitle}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#cta"
            className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-105"
          >
            {t.hero.ctaPrimary}
          </a>
          <a
            href="#services"
            className="rounded-full border border-paper/25 px-6 py-3 text-sm font-semibold text-paper transition-colors hover:border-paper"
          >
            {t.hero.ctaSecondary}
          </a>
        </div>

        {/* Signature element: one phrase relayed through all five languages */}
        <div className="mt-16 max-w-md rounded-2xl border border-paper/15 bg-ink-soft/60 px-6 py-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-paper/50">
            {t.hero.relayLabel}
          </p>
          <div className="relative mt-3 h-8 overflow-hidden">
            {t.hero.relayWords.map((word, i) => {
              const isArabic = languages[i]?.code === 'ar';
              return (
                <span
                  key={i}
                  className={`relay-word absolute inset-0 flex items-center text-xl font-medium text-paper ${
                    isArabic ? 'font-arabic' : 'font-display'
                  }`}
                  dir={isArabic ? 'rtl' : 'ltr'}
                >
                  {word}
                </span>
              );
            })}
          </div>
          <div className="mt-4 flex gap-2">
            {languages.map((l) => (
              <span
                key={l.code}
                className="rounded-full bg-paper/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-paper/60"
              >
                {l.code}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
