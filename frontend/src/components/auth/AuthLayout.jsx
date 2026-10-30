import { useState } from 'react';

// "Welcome" in the languages YasTalk translates between.
// Escapes keep the file safe from text-encoding problems.
const WELCOMES = [
  { code: 'en', text: 'Welcome', lang: 'English' },
  { code: 'fr', text: 'Bienvenue', lang: 'Fran\u00E7ais' },
  { code: 'ln', text: 'Boyei malamu', lang: 'Ling\u00E1la' },
  { code: 'sw', text: 'Karibu', lang: 'Kiswahili' },
  {
    code: 'ar',
    text: '\u0645\u0631\u062D\u0628\u064B\u0627',
    lang: '\u0627\u0644\u0639\u0631\u0628\u064A\u0629',
    dir: 'rtl',
  },
];

const AUTH_PATHS = ['/login', '/signup', '/forgot-password', '/reset-password', '/verify-email'];

// Where to go after logging in: back to where the visitor came from.
export function afterAuthPath(state) {
  const from = state?.from;
  if (!from || AUTH_PATHS.includes(from.pathname)) return '/';
  return `${from.pathname}${from.search || ''}${from.hash || ''}`;
}

export const authLink =
  'font-semibold text-ink underline decoration-gold decoration-2 underline-offset-4 hover:text-ink/70';

export default function AuthLayout({ title, subtitle, notice, children, footer }) {
  return (
    <div className="grid min-h-[calc(100vh-4.25rem)] lg:grid-cols-[5fr_6fr]">
      <aside className="hidden bg-ink px-12 py-16 text-paper lg:flex lg:flex-col lg:justify-between xl:px-16">
        <ul className="divide-y divide-paper/10" aria-hidden="true">
          {WELCOMES.map((w) => (
            <li key={w.code} className="flex items-baseline justify-between gap-6 py-5">
              <span lang={w.code} dir={w.dir} className="font-display text-4xl xl:text-5xl">
                {w.text}
              </span>
              <span className="shrink-0 text-sm text-paper/50">{w.lang}</span>
            </li>
          ))}
        </ul>
        <p className="max-w-sm leading-relaxed text-paper/70">
          One account for your subscription, your payments and your messages to the YasTalk
          team.
        </p>
      </aside>

      <section className="flex items-center justify-center bg-paper px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{title}</h1>
          {subtitle && <p className="mt-2 text-ink/70">{subtitle}</p>}
          {notice && (
            <p
              role="status"
              className="mt-6 rounded-xl border border-gold/50 bg-gold/10 px-4 py-3 text-sm text-ink"
            >
              {notice}
            </p>
          )}
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-8 text-sm text-ink/70">{footer}</div>}
        </div>
      </section>
    </div>
  );
}

export function Field({ label, name, type = 'text', error, hint, ...props }) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  const id = `field-${name}`;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={isPassword && show ? 'text' : type}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-base text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 ${
            error
              ? 'border-red-500 focus:ring-red-200'
              : 'border-ink/20 focus:border-gold focus:ring-gold/40'
          } ${isPassword ? 'pr-16' : ''}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-pressed={show}
            className="absolute inset-y-0 right-0 rounded-r-xl px-4 text-sm font-medium text-ink/60 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            {show ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink/60">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function FormError({ message }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
    >
      {message}
    </p>
  );
}

export function SubmitButton({ loading, loadingText, children }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-full bg-gold px-5 py-3 text-base font-semibold text-ink transition-colors hover:bg-[#d49622] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? loadingText : children}
    </button>
  );
}
