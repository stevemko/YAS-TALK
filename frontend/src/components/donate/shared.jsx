import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export const inputClass =
  'w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-gold focus-visible:ring-2 focus-visible:ring-gold/40';
export const primaryBtn =
  'inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-base font-semibold text-ink transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100';
export const secondaryBtn =
  'inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/30 px-6 py-3 text-base font-semibold text-ink transition-colors hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink';

// Copy text to the clipboard, with a visible "Copied" confirmation.
export function CopyButton({ value, label = 'Copy', className = '' }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const el = document.createElement('textarea');
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex items-center gap-2 rounded-full border border-ink/25 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${className}`}
    >
      {done ? <Check size={16} className="text-teal" aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      <span aria-live="polite">{done ? 'Copied' : label}</span>
    </button>
  );
}

// "Choose an amount": quick buttons plus your own number.
export function AmountPicker({ presets, value, onChange, min, max, error }) {
  const isPreset = presets.includes(Number(value));
  return (
    <fieldset>
      <legend className="text-sm font-medium text-ink">Amount (KSh)</legend>
      <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5">
        {presets.map((a) => {
          const on = Number(value) === a;
          return (
            <button
              key={a}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(String(a))}
              className={`rounded-xl border px-2 py-3 font-semibold tabular-nums transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
                on ? 'border-ink bg-ink text-paper' : 'border-ink/20 bg-white text-ink hover:border-gold'
              }`}
            >
              {a.toLocaleString('en-KE')}
            </button>
          );
        })}
      </div>
      <label className="mt-3 block">
        <span className="sr-only">Or enter your own amount</span>
        <input
          inputMode="numeric"
          autoComplete="off"
          placeholder={`Or type your own amount (${min.toLocaleString('en-KE')} to ${max.toLocaleString('en-KE')})`}
          value={isPreset ? '' : value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, '').slice(0, 6))}
          className={inputClass}
          aria-invalid={Boolean(error)}
        />
      </label>
      {error && (
        <p role="alert" className="mt-2 text-sm text-rust">
          {error}
        </p>
      )}
    </fieldset>
  );
}

// Optional details. Email is required only for card payments.
export function DonorFields({ values, onChange, emailRequired = false, emailError }) {
  const set = (k) => (e) => onChange({ ...values, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-ink">Your name <span className="font-normal text-ink/50">(optional)</span></span>
          <input value={values.name} onChange={set('name')} maxLength={120} autoComplete="name" className={`${inputClass} mt-1.5`} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink">
            Email {emailRequired ? '' : <span className="font-normal text-ink/50">(optional, for a thank-you)</span>}
          </span>
          <input
            type="email"
            value={values.email}
            onChange={set('email')}
            autoComplete="email"
            required={emailRequired}
            aria-invalid={Boolean(emailError)}
            className={`${inputClass} mt-1.5`}
          />
          {emailError && <span role="alert" className="mt-1 block text-sm text-rust">{emailError}</span>}
        </label>
      </div>
      <label className="block">
        <span className="text-sm font-medium text-ink">A message for the team <span className="font-normal text-ink/50">(optional)</span></span>
        <textarea value={values.message} onChange={set('message')} maxLength={280} rows={2} className={`${inputClass} mt-1.5 resize-none`} />
      </label>
      <label className="flex items-start gap-3 text-sm text-ink/80">
        <input type="checkbox" checked={values.anonymous} onChange={set('anonymous')} className="mt-1 h-4 w-4 accent-[#1f6f64]" />
        <span>Keep my name private. Do not mention me publicly.</span>
      </label>
    </div>
  );
}
