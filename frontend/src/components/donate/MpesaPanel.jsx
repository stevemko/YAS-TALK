import { useCallback, useEffect, useRef, useState } from 'react';
import { donateMpesa, fetchDonationStatus, parseApiError } from '../../api/client';
import PhonePrompt from '../payments/PhonePrompt';
import DonationThanks from './DonationThanks';
import { formatKsh } from '../../data/plans';
import { AmountPicker, DonorFields, primaryBtn, inputClass } from './shared';

const WAIT_SECONDS = 90;
const POLL_MS = 3000;

function friendly(desc = '') {
  const d = desc.toLowerCase();
  if (d.includes('cancel')) return 'You cancelled the M-Pesa prompt, so nothing was charged.';
  if (d.includes('insufficient') || d.includes('balance')) return 'Not enough M-Pesa balance. Nothing was charged.';
  if (d.includes('initiator') || d.includes('pin')) return 'M-Pesa did not accept the PIN. Nothing was charged.';
  if (d.includes('timeout') || d.includes('timed out') || d.includes('reached')) return 'The prompt timed out. Nothing was charged.';
  return 'M-Pesa could not complete it. Nothing was charged.';
}

function normalizePhone(value) {
  let digits = String(value || '').replace(/\D/g, '');
  if (digits.startsWith('0')) digits = `254${digits.slice(1)}`;
  else if (digits[0] === '7' || digits[0] === '1') digits = `254${digits}`;
  return /^254[17]\d{8}$/.test(digits) ? digits : null;
}

// Give by M-Pesa: enter an amount and number, approve the prompt on your phone.
export default function MpesaPanel({ config, amount, setAmount, donor, setDonor }) {
  const [phase, setPhase] = useState('form'); // form | sending | waiting | success | failed | timeout
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [amountError, setAmountError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [donationId, setDonationId] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [result, setResult] = useState({ receipt: '', message: '' });
  const headingRef = useRef(null);
  const prev = useRef('form');

  useEffect(() => {
    if (prev.current !== phase) {
      prev.current = phase;
      headingRef.current?.focus();
    }
  }, [phase]);

  const apply = useCallback((s) => {
    if (s.status === 'success') {
      setResult({ receipt: s.receipt, message: '' });
      setPhase('success');
      return true;
    }
    if (s.status === 'failed') {
      setResult({ receipt: '', message: friendly(s.message) });
      setPhase('failed');
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    if (phase !== 'waiting') return undefined;
    const id = setInterval(() => setElapsed((e) => Math.min(e + 1, WAIT_SECONDS)), 1000);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'waiting' || !donationId) return undefined;
    let cancelled = false;
    let timer;
    const startedAt = Date.now();
    const tick = async () => {
      try {
        const s = await fetchDonationStatus(donationId);
        if (cancelled) return;
        if (apply(s)) return;
      } catch {
        /* a dropped connection should not end the wait */
      }
      if (cancelled) return;
      if (Date.now() - startedAt > WAIT_SECONDS * 1000) {
        setPhase('timeout');
        return;
      }
      timer = setTimeout(tick, POLL_MS);
    };
    timer = setTimeout(tick, 2500);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [phase, donationId, apply]);

  const begin = (id) => {
    setDonationId(id);
    setElapsed(0);
    setPhase('waiting');
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setAmountError('');
    setPhoneError('');
    const n = Number(amount);
    if (!n || n < config.min_amount || n > config.max_amount) {
      setAmountError(`Enter an amount between ${formatKsh(config.min_amount)} and ${formatKsh(config.max_amount)}.`);
      return;
    }
    const normalized = normalizePhone(phone);
    if (!normalized) {
      setPhoneError('Enter a Safaricom number, for example 0712 345 678.');
      return;
    }
    setPhase('sending');
    try {
      const data = await donateMpesa({
        amount: n,
        phone: normalized,
        name: donor.name,
        email: donor.email,
        message: donor.message,
        anonymous: donor.anonymous,
      });
      begin(data.donation_id);
    } catch (err) {
      const status = err.response?.status;
      const data = err.response?.data;
      if (status === 409 && data?.donation_id) {
        begin(data.donation_id);
        return;
      }
      setPhase('form');
      setError(parseApiError(err).message);
    }
  };

  if (phase === 'success') {
    return <DonationThanks bare headingRef={headingRef} name={donor.name} amount={Number(amount)} receipt={result.receipt} />;
  }

  if (phase === 'waiting') {
    return (
      <div>
        <h3 ref={headingRef} tabIndex={-1} className="font-display text-2xl font-semibold text-ink outline-none">
          Check your phone
        </h3>
        <p className="mt-2 text-ink/70">
          We sent a prompt to <span className="font-medium text-ink">{phone}</span>. Enter your M-Pesa PIN to give {formatKsh(amount)}.
        </p>
        <div className="mt-8">
          <PhonePrompt amountLabel={formatKsh(amount)} secondsLeft={WAIT_SECONDS - elapsed} totalSeconds={WAIT_SECONDS} />
        </div>
        <p className="mt-6 text-sm text-ink/60">Keep this page open. It updates when your gift goes through.</p>
      </div>
    );
  }

  if (phase === 'failed' || phase === 'timeout') {
    return (
      <div>
        <h3 ref={headingRef} tabIndex={-1} className="font-display text-2xl font-semibold text-ink outline-none">
          {phase === 'failed' ? 'The gift did not go through' : 'We have not heard back yet'}
        </h3>
        <p role="alert" className="mt-3 text-ink/75">
          {phase === 'failed'
            ? result.message
            : 'If you entered your PIN the gift may still arrive. Please wait a minute before trying again, so you are not charged twice.'}
        </p>
        <div className="mt-6 space-y-3">
          <button type="button" onClick={() => setPhase('form')} className={primaryBtn}>
            {phase === 'failed' ? 'Try again' : 'Back'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      {error && (
        <p role="alert" className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}
      <AmountPicker presets={config.presets} value={amount} onChange={setAmount} min={config.min_amount} max={config.max_amount} error={amountError} />
      <label className="block">
        <span className="text-sm font-medium text-ink">M-Pesa phone number</span>
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="0712 345 678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          aria-invalid={Boolean(phoneError)}
          className={`${inputClass} mt-1.5`}
        />
        {phoneError && <span role="alert" className="mt-1 block text-sm text-rust">{phoneError}</span>}
        <span className="mt-1 block text-sm text-ink/55">The Safaricom number that will get the prompt.</span>
      </label>
      <DonorFields values={donor} onChange={setDonor} />
      <button type="submit" disabled={phase === 'sending'} className={primaryBtn}>
        {phase === 'sending' ? 'Sending prompt...' : `Give ${amount ? formatKsh(amount) : ''}`.trim()}
      </button>
      <p className="text-center text-sm text-ink/55">We never see your PIN. M-Pesa asks for it on your phone only.</p>
    </form>
  );
}
