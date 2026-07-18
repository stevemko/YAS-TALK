import { useLanguage } from '../context/LanguageContext';
import PhoneMockup from '../components/PhoneMockup';
import { ConversationScreen, VoiceScreen, CameraScreen } from '../components/AppScreens';
import StoreBadges from '../components/StoreBadges';

const STEP_NUMBERS = ['01', '02', '03'];

export default function AppShowcase() {
  const { t, languages } = useLanguage();
  const p = t.appPage;

  const screens = [
    { Screen: ConversationScreen, title: p.screen1Title, body: p.screen1Body },
    { Screen: VoiceScreen, title: p.screen2Title, body: p.screen2Body },
    { Screen: CameraScreen, title: p.screen3Title, body: p.screen3Body },
  ];

  const steps = [p.how1, p.how2, p.how3];

  const stats = [
    { value: '5', label: p.statLangs },
    { value: '4', label: p.statModes },
    { value: '✓', label: p.statOffline },
  ];

  return (
    <div>
      {/* Hero: hero phone + copy */}
      <section className="relative overflow-hidden bg-ink px-5 pb-20 pt-14 text-paper sm:px-8 sm:pb-28 sm:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full border border-teal/25"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">{p.eyebrow}</span>
            <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.1] sm:text-5xl">
              {p.title}
            </h1>
            <p className="mt-5 max-w-md leading-relaxed text-paper/75">{p.subtitle}</p>

            <StoreBadges className="mt-8" />

            <a
              href="/#cta"
              className="mt-6 inline-block rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-105"
            >
              {p.notifyMe}
            </a>
          </div>

          <div className="mx-auto">
            <PhoneMockup>
              <ConversationScreen />
            </PhoneMockup>
          </div>
        </div>
      </section>

      {/* Screens showcase */}
      <section className="bg-paper px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-xl">
            <h2 className="text-balance font-display text-3xl font-semibold sm:text-4xl">
              {p.screensTitle}
            </h2>
            <p className="mt-3 text-ink/70">{p.screensSubtitle}</p>
          </div>

          <div className="mt-14 grid gap-12 sm:grid-cols-3">
            {screens.map(({ Screen, title, body }, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <PhoneMockup className="mb-6">
                  <Screen />
                </PhoneMockup>
                <h3 className="font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-ink/65">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-ink-soft px-5 py-20 text-paper sm:px-8 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-display text-3xl font-semibold sm:text-4xl">{p.howTitle}</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <span className="font-mono text-3xl font-semibold text-gold/70">{STEP_NUMBERS[i]}</span>
                <p className="mt-3 text-sm leading-relaxed text-paper/80">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats + languages strip */}
      <section className="bg-teal px-5 py-16 text-paper sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-display text-2xl font-semibold sm:text-3xl">{p.statsTitle}</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-display text-4xl font-semibold text-gold">{s.value}</p>
                <p className="mt-1 text-sm text-paper/80">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {languages.map((l) => (
              <span
                key={l.code}
                className="rounded-full bg-ink/20 px-3 py-1.5 text-xs font-medium text-paper"
              >
                {l.native}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
