// "Stories": real-world scenarios YasTalk is built for, plus the beta cohort call-out.
import { Globe, Handshake, Package } from 'lucide-react';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const CASES = [
  {
    Icon: Package,
    tag: 'Cross-border trade',
    title: 'Connecting Kinshasa & Nairobi',
    body: 'Enables merchants and suppliers to negotiate terms, manage logistics, and close deals instantly without either party needing to switch to a secondary language.',
    route: 'Lingala ⇄ Swahili ⇄ English',
  },
  {
    Icon: Globe,
    tag: 'Francophone & global',
    title: 'Unifying Francophone Networks',
    body: 'Bridging Central and West African communities with international markets, keeping cultural expressions and professional dialogue clear and fluid.',
    route: 'French ⇄ English ⇄ Arabic',
  },
  {
    Icon: Handshake,
    tag: 'MENA partnership',
    title: 'Bridging North Africa & the Gulf',
    body: 'Ensuring real-time voice and text accuracy for businesses, travelers, and remote collaborators interacting across Arabic-speaking trade corridors.',
    route: 'Arabic ⇄ English ⇄ French',
  },
];

export default function Stories() {
  return (
    <section id="stories" className="bg-paper px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Built for how the world actually talks"
          subtitle="YasTalk is not just a translation tool. It is a bridge for traders, creators and distributed teams connecting across East Africa, Central Africa and the Middle East."
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {CASES.map(({ Icon, tag, title, body, route }, i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 0.08}
              className="flex flex-col justify-between rounded-3xl bg-night p-8 text-paper shadow-xl shadow-ink/10"
            >
              <div>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/15 text-gold">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <p className="mt-6 text-sm font-medium text-gold">{tag}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-snug">{title}</h3>
                <p className="mt-3 leading-relaxed text-paper/70">{body}</p>
              </div>
              <p className="mt-8 border-t border-paper/10 pt-5 text-sm font-semibold text-gold">{route}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="relative mt-16 overflow-hidden rounded-[2rem] border border-gold/30 bg-night p-10 text-center text-paper sm:p-14">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold/10 blur-3xl" />
          <h3 className="relative font-display text-3xl font-semibold text-balance sm:text-4xl">
            Join our upcoming beta testing cohort
          </h3>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-paper/70">
            We are onboarding select early testers, traders and community leaders to try the YasTalk live voice and translation engine first.
          </p>
          <a
            href="#cta"
            className="relative mt-8 inline-block rounded-full bg-gold px-8 py-4 font-semibold text-ink transition-transform hover:scale-105"
          >
            Secure your beta spot
          </a>
        </Reveal>
      </div>
    </section>
  );
}
