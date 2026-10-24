import { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitContactMessage, parseApiError } from '../api/client';
import { useAuth } from '../context/AuthContext';

const inputClass =
  'w-full rounded-xl border border-white/15 bg-[#12211d] px-4 py-3.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30';
const labelClass = 'mb-2 block text-sm font-medium text-white';

// Guests land back on this section after logging in.
const GATE_STATE = {
  from: { pathname: '/', search: '', hash: '#contact' },
  reason: 'Log in or create an account to send a message to the YasTalk team.',
};

export default function Contact() {
  const { user, isAuthenticated } = useAuth();
  const [form, setForm] = useState({ subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSending(true);
    try {
      await submitContactMessage({
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      setSent(true);
      setForm({ subject: '', message: '' });
    } catch (err) {
      const { message, fields } = parseApiError(err);
      setError(fields.message || fields.subject || message);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid items-center gap-12 rounded-3xl border border-white/10 bg-[#0b1714] p-8 shadow-2xl sm:p-16 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Questions, ideas, or want to build with us?
          </h2>
          <p className="text-sm font-light leading-relaxed text-gray-300 sm:text-base">
            Whether you are a developer, partner, educator or early user, we would love to hear
            from you. Send us a message and the team will get back to you.
          </p>
          <p className="border-t border-white/10 pt-6 text-sm text-gray-300">
            Prefer email? Write to{' '}
            <a
              href="mailto:Yastalk@gmail.com"
              className="font-medium text-gold underline underline-offset-4"
            >
              Yastalk@gmail.com
            </a>
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md sm:p-8 lg:col-span-7">
          {!isAuthenticated ? (
            <div className="space-y-5 py-4">
              <h3 className="font-display text-2xl font-semibold text-white">
                Log in to send a message
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-gray-300">
                An account lets us reply to you and keeps your messages and payments in one
                place. Browsing the site never needs one.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/login"
                  state={GATE_STATE}
                  className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-[#d49622]"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  state={GATE_STATE}
                  className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-gold hover:text-gold"
                >
                  Create account
                </Link>
              </div>
            </div>
          ) : sent ? (
            <div className="space-y-4 py-10 text-center">
              <h3 className="font-display text-2xl font-bold text-white">Message sent</h3>
              <p className="mx-auto max-w-md text-sm text-gray-300">
                Thank you. We have your message and will reply to{' '}
                <span className="font-medium text-gold">{user.email}</span>.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-2 text-sm font-semibold text-gold underline underline-offset-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-sm text-gray-300">
                Sending as{' '}
                <span className="font-medium text-white">
                  {[user.first_name, user.last_name].filter(Boolean).join(' ') || user.email}
                </span>{' '}
                ({user.email})
              </p>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                >
                  {error}
                </p>
              )}

              <div>
                <label htmlFor="contact-subject" className={labelClass}>
                  Subject (optional)
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  maxLength={150}
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className={labelClass}>
                  Your message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us what is on your mind or how you would like to work together."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-full bg-gold py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-[#d49622] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? 'Sending...' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
