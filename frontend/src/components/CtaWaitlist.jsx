import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { subscribeToNewsletter } from '../api/client';
import { LogoMark } from './Logo';
import StoreBadges from './StoreBadges';

export default function CtaWaitlist() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      await subscribeToNewsletter(email.trim());
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err?.response?.data?.email?.[0] || 'Something went wrong. Please try again.'
      );
    }
  }

  return (
    <section id="cta" className="relative isolate overflow-hidden bg-night px-5 py-24 text-paper sm:px-8 sm:py-32">
      <div aria-hidden="true" className="hero-glow absolute inset-0 -z-10" />
      <div className="mx-auto max-w-2xl text-center">
        <LogoMark className="mx-auto h-16" />
        <h2 className="mt-8 text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl">
          {t.cta.title}
        </h2>
        <p className="mt-4 text-lg text-paper/75">{t.cta.subtitle}</p>

        <form onSubmit={handleSubmit} className="mx-auto mt-9 flex max-w-xl flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            {t.cta.placeholder}
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.cta.placeholder}
            className="w-full flex-1 rounded-full border border-paper/25 bg-paper/10 px-6 py-3.5 text-paper outline-none placeholder:text-paper/50 focus:border-gold"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-full bg-gold px-8 py-3.5 font-semibold text-ink transition-transform hover:scale-105 disabled:opacity-60"
          >
            {status === 'loading' ? '…' : t.cta.button}
          </button>
        </form>

        <div className="mt-3 min-h-[1.5rem] text-sm" role="status">
          {status === 'success' && <p className="text-gold">{t.cta.success}</p>}
          {status === 'error' && <p className="text-[#ff9d84]">{errorMsg}</p>}
        </div>

        <p className="mt-1 text-xs text-paper/50">{t.cta.privacy}</p>
        <StoreBadges className="mt-10 justify-center" />
      </div>
    </section>
  );
}
