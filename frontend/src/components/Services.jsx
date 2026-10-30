import { Camera, FileText, GraduationCap, Mic, MessagesSquare, Plane, Presentation, Store, Type, WifiOff } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import yasPosterImg from '../images/yas-poster.jpg';
import voiceDemoImg from '../images/voice-demo.jpg';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const ICONS = { mic: Mic, text: Type, camera: Camera, offline: WifiOff, chat: MessagesSquare, document: FileText };

const AUDIENCES = [
  { Icon: GraduationCap, title: 'Students and researchers', body: 'Reach global learning resources, work with international peers and study across language divides.' },
  { Icon: Store, title: 'Traders and entrepreneurs', body: 'Negotiate, chat with suppliers and close sales across borders with instant text and voice translation.' },
  { Icon: Presentation, title: 'Lecturers and educators', body: 'Teach in several languages and keep a diverse classroom connected.' },
  { Icon: Plane, title: 'Travellers and daily life', body: 'Find your way, speak naturally with locals and handle everyday errands with a pocket interpreter.' },
];

export default function Services({ services }) {
  const { t } = useLanguage();
  const list = services || [];

  return (
    <section id="services" className="bg-paper px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={t.services.title} subtitle={t.services.subtitle} />

        {/* The services: the first one leads, the rest sit around it */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:grid-flow-dense">
          {list.map((service, i) => {
            const Icon = ICONS[service.icon] || Type;
            const lead = i === 0;
            // Widths 2-1-1-2-1-2 fill every row of a 3-column grid when there are six services.
            const wide = [0, 3, 5].includes(i % 6);
            return (
              <Reveal
                key={service.id ?? service.title}
                delay={(i % 3) * 0.08}
                className={`group rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 ${
                  lead
                    ? 'bg-night text-paper lg:col-span-2 lg:p-9'
                    : `border border-ink/10 bg-white hover:border-gold/60 hover:shadow-lg hover:shadow-ink/5 ${
                        wide ? 'lg:col-span-2' : ''
                      }`
                }`}
              >
                <span
                  className={`grid h-12 w-12 place-items-center rounded-2xl ${
                    lead ? 'bg-gold text-ink' : 'bg-gold/20 text-[#8a5d00] group-hover:bg-gold group-hover:text-ink'
                  } transition-colors`}
                >
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className={`mt-6 font-display font-semibold ${lead ? 'text-3xl' : 'text-2xl'}`}>{service.title}</h3>
                <p className={`mt-3 leading-relaxed ${lead ? 'max-w-xl text-lg text-paper/75' : 'text-ink/70'}`}>
                  {service.description}
                </p>
              </Reveal>
            );
          })}
        </div>

        {/* Who it is for */}
        <Reveal className="mt-24 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="relative mx-auto w-full max-w-md">
            <div aria-hidden="true" className="absolute -inset-3 -rotate-2 rounded-[2rem] bg-gold/30" />
            <img
              src={yasPosterImg}
              alt="YasTalk overview poster"
              className="relative w-full rounded-[1.6rem] border-4 border-white object-cover shadow-xl"
            />
          </div>
          <div>
            <h3 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Built for every day, every profession</h3>
            <p className="mt-4 text-lg text-ink/70">
              Language barriers should not limit opportunity. YasTalk makes cross-border conversation effortless for everyone.
            </p>
            <ul className="mt-8 space-y-6">
              {AUDIENCES.map(({ Icon, title, body }) => (
                <li key={title} className="flex gap-4">
                  <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal/10 text-teal">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{title}</p>
                    <p className="mt-1 text-ink/70">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Voice */}
        <Reveal className="mt-20 grid items-center gap-10 rounded-[2rem] bg-paper-soft p-7 sm:p-12 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 lg:order-1">
            <h3 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Speak naturally. We translate instantly.</h3>
            <p className="mt-4 text-lg leading-relaxed text-ink/70">
              Never let translation lag slow you down. Whether you are on a call or talking face to face, YasTalk listens and speaks the translation out in real time.
            </p>
            <ul className="mt-6 space-y-3 text-ink/85">
              {['Real-time voice-to-voice translation', 'Live call translation support', 'Instant text message translation'].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-gold" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <img
            src={voiceDemoImg}
            alt="YasTalk voice translation"
            className="order-1 w-full rounded-3xl border-4 border-white object-cover shadow-lg lg:order-2"
          />
        </Reveal>
      </div>
    </section>
  );
}
