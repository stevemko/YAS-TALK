import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Coins, CreditCard, Globe, Landmark, Languages, Server, Smartphone } from 'lucide-react';
import { fetchDonationConfig } from '../api/client';
import CardPanel from '../components/donate/CardPanel';
import CryptoPanel from '../components/donate/CryptoPanel';
import MpesaPanel from '../components/donate/MpesaPanel';
import PaybillPanel from '../components/donate/PaybillPanel';
import { LogoMark } from '../components/Logo';
import Reveal from '../components/Reveal';

const METHODS = [
  { key: 'mpesa', label: 'M-Pesa', Icon: Smartphone },
  { key: 'card', label: 'Card', Icon: CreditCard },
  { key: 'paybill', label: 'Paybill', Icon: Landmark },
  { key: 'crypto', label: 'Crypto', Icon: Coins },
];

// EDIT these three if your plans for the money are different. Keep them true.
const WHY = [
  { Icon: Languages, title: 'Native-speaker reviewers', body: 'People who grew up speaking these languages check every translation, so it sounds natural, not just correct.' },
  { Icon: Server, title: 'Servers that keep up', body: 'Real-time voice translation costs money to run for every conversation we carry.' },
  { Icon: Globe, title: 'The next languages', body: 'Each new language opens the door to a whole community that big tools overlook.' },
];

export default function Donate() {
  const [params] = useSearchParams();
  const [config, setConfig] = useState(null);
  const [failed, setFailed] = useState(false);
  const [method, setMethod] = useState(null);
  const [amount, setAmount] = useState(() => (/^\d{2,6}$/.test(params.get('amount') || '') ? params.get('amount') : '500'));
  const [donor, setDonor] = useState({ name: '', email: '', message: '', anonymous: false });

  useEffect(() => {
    let cancelled = false;
    fetchDonationConfig()
      .then((c) => {
        if (cancelled) return;
        setConfig(c);
        setMethod(METHODS.find((m) => c.methods[m.key])?.key || null);
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, []);

  const anyOn = useMemo(() => config && Object.values(config.methods).some(Boolean), [config]);

  const onKey = (e) => {
    const enabled = METHODS.filter((m) => config.methods[m.key]).map((m) => m.key);
    const i = enabled.indexOf(method);
    if (e.key === 'ArrowRight') setMethod(enabled[(i + 1) % enabled.length]);
    if (e.key === 'ArrowLeft') setMethod(enabled[(i - 1 + enabled.length) % enabled.length]);
  };

  return (
    <div className="bg-night text-paper">
      <section className="relative isolate overflow-hidden px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
        <div aria-hidden="true" className="hero-glow absolute inset-0 -z-10" />
        <LogoMark className="pointer-events-none absolute -left-24 top-1/2 -z-10 h-[30rem] -translate-y-1/2 opacity-[0.07]" />

        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* ---------- the appeal ---------- */}
          <div className="lg:pt-6">
            <h1 className="font-display text-4xl font-semibold leading-[1.08] text-balance sm:text-5xl lg:text-6xl">
              Help every conversation <span className="text-logo-gradient">find its language</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/80">
              Most translation tools were not built for Lingala or Swahili, and it shows. YasTalk is. Your gift keeps us
              building it, and keeps it within reach of the people who need it most.
            </p>

            <ul className="mt-10 space-y-6">
              {WHY.map(({ Icon, title, body }) => (
                <li key={title} className="flex gap-4">
                  <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-xl font-semibold">{title}</p>
                    <p className="mt-1 text-paper/70">{body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-10 border-l-2 border-gold pl-4 font-display text-xl italic text-paper/90">
              A gift of any size helps. Thank you for believing in this.
            </p>
          </div>

          {/* ---------- the form ---------- */}
          <Reveal className="rounded-[2rem] bg-paper p-5 text-ink shadow-2xl shadow-black/40 sm:p-8">
            <h2 className="font-display text-2xl font-semibold">Choose how to give</h2>

            {failed && (
              <p role="alert" className="mt-4 rounded-xl border border-red-300 bg-red-50 p-4 text-red-800">
                We could not load the donation options. Please refresh the page.
              </p>
            )}
            {!config && !failed && <div className="mt-6 h-72 animate-pulse rounded-2xl bg-ink/5" />}

            {config && !anyOn && (
              <p className="mt-4 rounded-xl border border-gold/50 bg-gold/10 p-4">
                Donations are opening very soon. Thank you for wanting to help. Join the waitlist on the home page and we will let you know.
              </p>
            )}

            {config && anyOn && (
              <>
                <div role="tablist" aria-label="Ways to give" onKeyDown={onKey} className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {METHODS.map(({ key, label, Icon }) => {
                    const on = config.methods[key];
                    const selected = method === key;
                    return (
                      <button
                        key={key}
                        role="tab"
                        type="button"
                        id={`tab-${key}`}
                        aria-selected={selected}
                        aria-controls={`panel-${key}`}
                        aria-disabled={!on}
                        tabIndex={selected ? 0 : -1}
                        onClick={() => on && setMethod(key)}
                        className={`flex flex-col items-center gap-1.5 rounded-2xl border px-2 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
                          selected
                            ? 'border-ink bg-ink text-paper'
                            : on
                              ? 'border-ink/20 bg-white text-ink hover:border-gold'
                              : 'cursor-not-allowed border-dashed border-ink/20 bg-transparent text-ink/40'
                        }`}
                      >
                        <Icon size={20} aria-hidden="true" />
                        {label}
                        {!on && <span className="-mt-1 text-xs font-normal">Soon</span>}
                      </button>
                    );
                  })}
                </div>

                <div
                  role="tabpanel"
                  id={`panel-${method}`}
                  aria-labelledby={`tab-${method}`}
                  className="mt-7 border-t border-ink/10 pt-7"
                >
                  {method === 'mpesa' && (
                    <MpesaPanel config={config} amount={amount} setAmount={setAmount} donor={donor} setDonor={setDonor} />
                  )}
                  {method === 'card' && (
                    <CardPanel config={config} amount={amount} setAmount={setAmount} donor={donor} setDonor={setDonor} />
                  )}
                  {method === 'paybill' && config.paybill && <PaybillPanel paybill={config.paybill} />}
                  {method === 'crypto' && config.crypto && (
                    <CryptoPanel crypto={config.crypto} donor={donor} setDonor={setDonor} />
                  )}
                </div>
              </>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
