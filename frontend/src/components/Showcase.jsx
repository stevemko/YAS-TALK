import { useLanguage } from '../context/LanguageContext';
import PhoneMockup from './PhoneMockup';
import { CameraScreen, ConversationScreen, VoiceScreen } from './AppScreens';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

// "A closer look": three app screens (swipeable on a phone) and the three-step how-it-works.
export default function Showcase() {
  const { t } = useLanguage();
  const a = t.appPage;
  const screens = [
    { Screen: ConversationScreen, title: a.screen1Title, body: a.screen1Body },
    { Screen: VoiceScreen, title: a.screen2Title, body: a.screen2Body },
    { Screen: CameraScreen, title: a.screen3Title, body: a.screen3Body },
  ];
  const steps = [a.how1, a.how2, a.how3];

  return (
    <section id="preview" className="relative isolate overflow-hidden bg-night px-5 py-20 text-paper sm:px-8 sm:py-28">
      <div aria-hidden="true" className="hero-glow absolute inset-0 -z-10 opacity-60" />
      <div className="mx-auto max-w-6xl">
        <SectionHeading tone="dark" title={a.screensTitle} subtitle={a.screensSubtitle} />

        <div className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-10 lg:overflow-visible lg:px-0">
          {screens.map(({ Screen, title, body }, i) => (
            <Reveal
              key={title}
              delay={i * 0.1}
              className={`w-[17rem] shrink-0 snap-center text-center lg:w-auto ${i === 1 ? 'lg:mt-14' : ''}`}
            >
              <PhoneMockup>
                <Screen />
              </PhoneMockup>
              <h3 className="mt-7 font-display text-2xl font-semibold">{title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-paper/70">{body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 rounded-[2rem] border border-paper/10 bg-paper/5 p-7 sm:p-10">
          <h3 className="font-display text-2xl font-semibold sm:text-3xl">{a.howTitle}</h3>
          <ol className="mt-8 grid gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span aria-hidden="true" className="font-display text-5xl font-semibold leading-none text-gold">
                  {i + 1}
                </span>
                <p className="pt-1 text-lg text-paper/85">{step}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
