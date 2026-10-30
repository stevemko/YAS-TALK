import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useCopy } from '../i18n/homeCopy';
import { LogoMark } from './Logo';
import Reveal from './Reveal';

const AMOUNTS = [200, 500, 1000, 2500];

// A warm, plain appeal. Clicking an amount opens the donate page with that amount chosen.
export default function DonateBand() {
  const c = useCopy().donate;
  return (
    <section id="donate" className="relative isolate overflow-hidden bg-teal px-5 py-20 text-paper sm:px-8 sm:py-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_85%_20%,rgba(242,182,50,0.22),transparent_70%),radial-gradient(50%_70%_at_10%_90%,rgba(11,23,21,0.55),transparent_70%)]" />
      <LogoMark className="pointer-events-none absolute -bottom-16 -right-24 -z-10 h-[26rem] opacity-[0.14] sm:h-[34rem]" />

      <Reveal className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold text-ink">
            <Heart size={22} className="fill-ink" aria-hidden="true" />
          </span>
          <h2 className="mt-6 font-display text-3xl font-semibold leading-tight text-balance sm:text-5xl">{c.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-paper/85">{c.body}</p>

          <p className="mt-9 text-sm text-paper/70">{c.pick}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {AMOUNTS.map((a) => (
              <Link
                key={a}
                to={`/donate?amount=${a}`}
                className="rounded-full border border-paper/35 px-6 py-3 font-semibold tabular-nums transition-colors hover:border-gold hover:bg-gold hover:text-ink"
              >
                KSh {a.toLocaleString('en-KE')}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-lg font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              <Heart size={18} className="fill-ink" aria-hidden="true" /> {c.cta}
            </Link>
            <span className="text-sm text-paper/75">{c.ways}</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
