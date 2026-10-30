import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const LIST = [
  { name: 'English', native: 'English', region: 'Global and East Africa', body: 'The global bridge of business, technology and international diplomacy.', dot: 'bg-sky' },
  { name: 'French', native: 'Français', region: 'Central and West Africa, global', body: 'Connecting Francophone communities, commerce and culture worldwide.', dot: 'bg-leaf' },
  { name: 'Lingala', native: 'Lingála', region: 'DRC and the Congo Basin', body: 'The heartbeat of Central African music, storytelling, trade and unity.', dot: 'bg-lagoon' },
  { name: 'Swahili', native: 'Kiswahili', region: 'East Africa and beyond', body: 'A fast-growing lingua franca joining millions across East African markets.', dot: 'bg-gold' },
  { name: 'Arabic', native: 'العربية', region: 'Middle East and North Africa', body: 'A historic language linking trade routes, scholarship and modern networks.', dot: 'bg-[#e0712e]', rtl: true },
];

export default function Languages() {
  const { t } = useLanguage();
  return (
    <section id="languages" className="bg-paper px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={t.languages.title} subtitle={t.languages.subtitle} />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {LIST.map((l, i) => (
            <Reveal
              as="li"
              key={l.name}
              delay={i * 0.07}
              className={`group flex flex-col rounded-3xl border border-ink/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/70 hover:shadow-lg hover:shadow-ink/5 ${
                i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'
              }`}
            >
              <span className="flex items-center gap-2 text-sm text-ink/60">
                <span className={`h-2.5 w-2.5 rounded-full ${l.dot}`} aria-hidden="true" />
                {l.region}
              </span>
              <p className="mt-5 font-display text-4xl font-semibold text-ink">
                <span dir={l.rtl ? 'rtl' : 'ltr'} lang={l.rtl ? 'ar' : undefined}>
                  {l.native}
                </span>
              </p>
              {l.native !== l.name && <p className="mt-1 text-sm font-medium text-ink/55">{l.name}</p>}
              <p className="mt-4 leading-relaxed text-ink/70">{l.body}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-medium text-ink underline decoration-gold decoration-2 underline-offset-[6px] transition-colors hover:text-teal"
          >
            Missing your language? Tell us <ArrowRight size={16} aria-hidden="true" className="rtl:rotate-180" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
