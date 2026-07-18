import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { subscribeToNewsletter } from '../api/client';

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
    <section id="cta" className="relative overflow-hidden bg-teal px-5 py-20 text-paper sm:px-8 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full border border-paper/15"
      />
      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="text-balance font-display text-3xl font-semibold sm:text-4xl">
          {t.cta.title}
        </h2>
        <p className="mt-3 text-paper/80">{t.cta.subtitle}</p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
        >
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
            className="w-full rounded-full border border-paper/30 bg-ink/20 px-5 py-3 text-paper placeholder:text-paper/50 outline-none focus:border-gold sm:w-80"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-105 disabled:opacity-60"
          >
            {status === 'loading' ? '…' : t.cta.button}
          </button>
        </form>

        <div className="mt-3 min-h-[1.25rem] text-sm">
          {status === 'success' && <p className="text-gold">{t.cta.success}</p>}
          {status === 'error' && (
            <p className="inline-block rounded bg-paper/90 px-2 py-0.5 text-rust">{errorMsg}</p>
          )}
        </div>

        <p className="mt-2 text-xs text-paper/55">{t.cta.privacy}</p>
      </div>
    </section>
  );
}
