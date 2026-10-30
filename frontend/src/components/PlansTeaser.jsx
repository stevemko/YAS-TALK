import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useCopy } from '../i18n/homeCopy';
import { usePlans } from '../data/usePlans';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

// The subscriptions, right on the home page: pick one and go straight to paying for it.
export default function PlansTeaser() {
  const copy = useCopy();
  const c = copy.plans;
  const { plans, error } = usePlans();

  if (error) return null;      // never show a broken section; the Plans page has the retry button

  return (
    <section id="plans" className="relative isolate overflow-hidden bg-night px-5 py-20 text-paper sm:px-8 sm:py-28">
      <div aria-hidden="true" className="hero-glow absolute inset-0 -z-10 opacity-50" />
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading tone="dark" title={c.title} subtitle={c.subtitle} />
          <Reveal>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 whitespace-nowrap font-medium text-gold underline decoration-gold/50 underline-offset-[6px] hover:decoration-gold"
            >
              {c.compare} <ArrowRight size={16} aria-hidden="true" className="rtl:rotate-180" />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {!plans
            ? [0, 1, 2, 3].map((i) => <li key={i} className="h-72 animate-pulse rounded-3xl bg-paper/5" />)
            : plans.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.key}
                  delay={i * 0.07}
                  className={`flex flex-col rounded-3xl p-6 ${
                    p.featured
                      ? 'bg-gold text-ink shadow-2xl shadow-gold/10 lg:-translate-y-3'
                      : 'border border-paper/15 bg-paper/5'
                  }`}
                >
                  <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
                  <p className={`mt-1 text-sm ${p.featured ? 'text-ink/70' : 'text-paper/60'}`}>{p.tagline}</p>
                  <p className="mt-6 font-display leading-none">
                    <span className={`mr-1.5 text-base ${p.featured ? 'text-ink/70' : 'text-paper/60'}`}>KSh</span>
                    <span className="text-4xl font-semibold tabular-nums">{Number(p.amount).toLocaleString('en-KE')}</span>
                  </p>
                  <p className={`mt-1 text-sm ${p.featured ? 'text-ink/70' : 'text-paper/60'}`}>{c.per}</p>
                  <ul className="mt-6 flex-1 space-y-2 text-sm">
                    {p.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex gap-2">
                        <Check size={16} className={`mt-0.5 shrink-0 ${p.featured ? 'text-ink' : 'text-gold'}`} aria-hidden="true" />
                        <span className={p.featured ? 'text-ink/85' : 'text-paper/80'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/checkout/${p.key}`}
                    className={`mt-7 rounded-full px-5 py-3 text-center font-semibold transition-transform hover:scale-[1.03] ${
                      p.featured ? 'bg-ink text-paper' : 'bg-gold text-ink'
                    }`}
                  >
                    {c.cta} {p.name}
                  </Link>
                </Reveal>
              ))}
        </ul>
      </div>
    </section>
  );
}
