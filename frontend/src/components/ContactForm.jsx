import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { submitContactMessage } from '../api/client';

const initialForm = { name: '', email: '', message: '' };

export default function ContactForm() {
  const { t } = useLanguage();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setErrors({});
    try {
      await submitContactMessage(form);
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setErrors(err?.response?.data || {});
    }
  }

  return (
    <section id="contact" className="bg-ink px-5 py-20 text-paper sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1fr]">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
            {t.contact.eyebrow}
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold sm:text-4xl">
            {t.contact.title}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm text-paper/70">
              {t.contact.name}
            </label>
            <input
              id="name"
              required
              value={form.name}
              onChange={update('name')}
              className="w-full rounded-xl border border-paper/20 bg-ink-soft px-4 py-3 text-paper outline-none focus:border-gold"
            />
            {errors.name && <p className="mt-1 text-xs text-rust">{errors.name[0]}</p>}
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm text-paper/70">
              {t.contact.email}
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={update('email')}
              className="w-full rounded-xl border border-paper/20 bg-ink-soft px-4 py-3 text-paper outline-none focus:border-gold"
            />
            {errors.email && <p className="mt-1 text-xs text-rust">{errors.email[0]}</p>}
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm text-paper/70">
              {t.contact.message}
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={form.message}
              onChange={update('message')}
              className="w-full rounded-xl border border-paper/20 bg-ink-soft px-4 py-3 text-paper outline-none focus:border-gold"
            />
            {errors.message && <p className="mt-1 text-xs text-rust">{errors.message[0]}</p>}
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="mt-2 self-start rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-105 disabled:opacity-60"
          >
            {status === 'loading' ? '…' : t.contact.button}
          </button>

          {status === 'success' && <p className="text-sm text-gold">{t.contact.success}</p>}
        </form>
      </div>
    </section>
  );
}
