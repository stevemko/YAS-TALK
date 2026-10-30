import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Heart, Languages, MessagesSquare, WifiOff } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCopy } from '../i18n/homeCopy';
import PhoneMockup from './PhoneMockup';
import StoreBadges from './StoreBadges';
import { CameraScreen, ConversationScreen, VoiceScreen } from './AppScreens';

const SCREENS = [ConversationScreen, VoiceScreen, CameraScreen];

// Little translation bubbles that hover around the phone: the five languages, at a glance.
const CHIPS = [
  { text: 'Mbote!', lang: 'Lingála', dot: 'bg-leaf', pos: 'left-0 top-[14%] sm:-left-10', delay: '0s' },
  { text: 'Habari yako?', lang: 'Kiswahili', dot: 'bg-gold', pos: 'right-0 top-[40%] sm:-right-14', delay: '1.2s' },
  { text: 'Bonjour !', lang: 'Français', dot: 'bg-sky', pos: 'left-1 bottom-[16%] sm:-left-12', delay: '2.4s' },
  { text: 'مرحباً', lang: 'العربية', dot: 'bg-lagoon', pos: 'right-2 top-[6%] sm:-right-6', delay: '3.6s', rtl: true },
];

export default function Hero() {
  const { t } = useLanguage();
  const copy = useCopy();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % SCREENS.length), 5200);
    return () => clearInterval(id);
  }, [reduce, paused]);

  const Screen = SCREENS[index];
  const captions = [t.appPage.screen1Title, t.appPage.screen2Title, t.appPage.screen3Title];

  // "Say it once. Be understood everywhere." -> the second sentence gets the brand gradient.
  const sentences = t.hero.title.split(/(?<=[.!?。])\s+/);
  const first = sentences.length > 1 ? sentences[0] : t.hero.title;
  const rest = sentences.length > 1 ? sentences.slice(1).join(' ') : '';

  const trustIcons = [Languages, MessagesSquare, WifiOff];

  return (
    <section className="relative isolate overflow-hidden bg-night text-paper">
      <div className="hero-glow absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 lg:pb-28 lg:pt-20">
        {/* ---------- copy ---------- */}
        <div>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-paper/15 bg-paper/5 px-4 py-1.5 text-sm text-paper/85">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            {copy.hero.badge}
          </p>

          <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.04] text-balance sm:text-6xl lg:text-[4.4rem]">
            <span className="block">{first}</span>
            {rest && <span className="text-logo-gradient block">{rest}</span>}
          </h1>

          {/* The relay: one phrase, five languages */}
          <div className="mt-5" role="img" aria-label={t.hero.relayLabel}>
            <div className="relative h-9 font-display text-xl text-paper/90 sm:text-2xl" aria-hidden="true">
              {t.hero.relayWords.map((word, i) => (
                <span
                  key={word}
                  className="relay-word absolute inset-0 whitespace-nowrap opacity-0 rtl:text-right"
                  dir={i === t.hero.relayWords.length - 1 ? 'rtl' : 'ltr'}
                >
                  {word}
                </span>
              ))}
            </div>
            <p className="text-sm text-paper/55">{t.hero.relayLabel}</p>
          </div>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">{t.hero.subtitle}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-base font-semibold text-ink transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
            >
              {t.hero.ctaPrimary} <ArrowRight size={18} aria-hidden="true" className="rtl:rotate-180" />
            </a>
            <Link
              to="/pricing"
              className="rounded-full border border-paper/30 px-7 py-3.5 text-base font-semibold text-paper transition-colors hover:border-gold hover:text-gold"
            >
              {copy.hero.plans}
            </Link>
          </div>
          <Link
            to="/donate"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-paper/70 underline decoration-gold/60 underline-offset-4 transition-colors hover:text-gold"
          >
            <Heart size={15} aria-hidden="true" /> {copy.hero.support}
          </Link>

          <StoreBadges className="mt-9" />

          <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3 border-t border-paper/10 pt-6 text-sm text-paper/70">
            {copy.hero.trust.map((item, i) => {
              const Icon = trustIcons[i];
              return (
                <li key={item} className="flex items-center gap-2">
                  <Icon size={16} className="text-gold" aria-hidden="true" /> {item}
                </li>
              );
            })}
          </ul>
        </div>

        {/* ---------- phone slider ---------- */}
        <div
          className="relative mx-auto w-full max-w-[22rem] sm:max-w-md"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {CHIPS.map((c) => (
            <div
              key={c.text}
              aria-hidden="true"
              className={`float-y absolute z-20 flex items-center gap-2.5 rounded-2xl border border-paper/15 bg-night/70 px-3.5 py-2 shadow-xl shadow-black/30 backdrop-blur ${c.pos} ${
                c.rtl ? 'hidden sm:flex' : ''
              }`}
              style={{ animationDelay: c.delay }}
            >
              <span className={`h-2 w-2 rounded-full ${c.dot}`} />
              <span>
                <span className="block text-sm font-semibold leading-tight text-paper" dir={c.rtl ? 'rtl' : 'ltr'}>
                  {c.text}
                </span>
                <span className="block text-[11px] leading-tight text-paper/55">{c.lang}</span>
              </span>
            </div>
          ))}

          <PhoneMockup className="sm:w-[290px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                className="h-full"
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <Screen />
              </motion.div>
            </AnimatePresence>
          </PhoneMockup>

          <div className="mt-7 flex flex-col items-center gap-3">
            <p className="text-sm text-paper/70" aria-live="polite">
              {captions[index]}
            </p>
            <div className="flex gap-2" role="group" aria-label="App screens">
              {SCREENS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={captions[i]}
                  aria-current={i === index}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? 'w-8 bg-gold' : 'w-2 bg-paper/30 hover:bg-paper/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
