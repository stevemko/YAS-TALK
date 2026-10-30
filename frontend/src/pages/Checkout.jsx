import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { fetchPaymentStatus, initiatePayment, parseApiError } from '../api/client';
import { getMe, resendVerification } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { Field, FormError, SubmitButton } from '../components/auth/AuthLayout';
import PhonePrompt from '../components/payments/PhonePrompt';
import ReceiptSlip from '../components/payments/ReceiptSlip';
import { usePlans } from '../data/usePlans';
import { BILLING_LABEL, formatKsh } from '../data/plans';

const WAIT_SECONDS = 90; // how long we wait for the PIN before asking the person to check again
const POLL_MS = 3000;

// 254712345678 -> 0712345678 (what people type and recognise)
function toLocalPhone(value) {
  const digits = String(value || '').replace(/\D/g, '');
  return digits.startsWith('254') ? `0${digits.slice(3)}` : digits;
}

// Mirrors the server: returns 2547XXXXXXXX / 2541XXXXXXXX, or null if it is not a Kenyan mobile.
function normalizePhone(value) {
  let digits = String(value || '').replace(/\D/g, '');
  if (digits.startsWith('0')) digits = `254${digits.slice(1)}`;
  else if (digits[0] === '7' || digits[0] === '1') digits = `254${digits}`;
  return /^254[17]\d{8}$/.test(digits) ? digits : null;
}

// Safaricom's own wording is technical. Say what happened and what to do.
function friendlyFailure(description = '') {
  const d = description.toLowerCase();
  if (d.includes('cancel')) {
    return { title: 'Payment cancelled', body: 'You cancelled the M-Pesa prompt, so nothing was charged.' };
  }
  if (d.includes('insufficient') || d.includes('balance')) {
    return { title: 'Not enough M-Pesa balance', body: 'Top up your M-Pesa, then try again. Nothing was charged.' };
  }
  if (d.includes('initiator') || d.includes('pin')) {
    return { title: 'M-Pesa did not accept the PIN', body: 'Check your PIN and try again. Nothing was charged.' };
  }
  if (d.includes('timeout') || d.includes('timed out') || d.includes('reached')) {
    return {
      title: 'The prompt timed out',
      body: 'Make sure your phone has network and is switched on, then try again. Nothing was charged.',
    };
  }
  return { title: 'The payment did not go through', body: 'M-Pesa could not complete it. Nothing was charged. You can try again.' };
}

function Card({ children }) {
  return <div className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">{children}</div>;
}

const secondaryBtn =
  'block w-full rounded-full border border-ink/30 px-5 py-3 text-center text-base font-semibold text-ink hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-60';
const primaryBtn =
  'block w-full rounded-full bg-gold px-5 py-3 text-center text-base font-semibold text-ink hover:bg-[#d49622] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink';

// Shown when the account's email is not confirmed yet. Payments need it (receipts, recovery).
function VerifyGate({ email, onChecked }) {
  const [busy, setBusy] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const send = async () => {
    setBusy('send');
    setNote('');
    setError('');
    try {
      const data = await resendVerification();
      setNote(data.detail);
    } catch (err) {
      setError(parseApiError(err).message);
    } finally {
      setBusy('');
    }
  };

  const check = async () => {
    setBusy('check');
    setNote('');
    setError('');
    try {
      const confirmed = await onChecked();
      if (!confirmed) setNote('Not confirmed yet. Open the link in your email, then check again.');
    } catch (err) {
      setError(parseApiError(err).message);
    } finally {
      setBusy('');
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <p className="rounded-xl border border-gold/50 bg-gold/10 px-4 py-3 text-ink">
        Confirm your email before you pay. We sent a link to <strong>{email}</strong>. This makes sure
        your receipt, and any password reset, reach you.
      </p>
      <FormError message={error} />
      {note && (
        <p role="status" className="text-sm text-ink/70">
          {note}
        </p>
      )}
      <button type="button" onClick={check} disabled={busy !== ''} className={primaryBtn}>
        {busy === 'check' ? 'Checking...' : 'I have confirmed my email'}
      </button>
      <button type="button" onClick={send} disabled={busy !== ''} className={secondaryBtn}>
        {busy === 'send' ? 'Sending...' : 'Send a new confirmation link'}
      </button>
    </div>
  );
}

export default function Checkout() {
  const { plan: planKey } = useParams();
  const { user, updateUser } = useAuth();
  const { plans, error: plansError, reload } = usePlans();
  const plan = plans?.find((p) => p.key === planKey);

  const [phase, setPhase] = useState('form'); // form | sending | waiting | success | failed | timeout
  const [phone, setPhone] = useState(() => toLocalPhone(user?.phone));
  const [formError, setFormError] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [paymentId, setPaymentId] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [receipt, setReceipt] = useState({ code: '', at: null });
  const [failure, setFailure] = useState({ title: '', body: '' });
  const [needsVerify, setNeedsVerify] = useState(user?.email_verified === false);
  const [checking, setChecking] = useState(false);
  const [checkNote, setCheckNote] = useState('');

  const headingRef = useRef(null);
  const prevPhase = useRef('form');

  // Make sure we know the current confirmation status (it may have changed in another tab).
  useEffect(() => {
    let cancelled = false;
    getMe()
      .then((fresh) => {
        if (cancelled) return;
        updateUser(fresh);
        setNeedsVerify(fresh.email_verified === false);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [updateUser]);

  // Move focus to the new heading whenever the step changes, so screen readers follow along.
  useEffect(() => {
    if (prevPhase.current !== phase) {
      prevPhase.current = phase;
      headingRef.current?.focus();
    }
  }, [phase]);

  const applyStatus = useCallback((status) => {
    if (status.status === 'success') {
      setReceipt({ code: status.receipt, at: new Date() });
      setPhase('success');
      return true;
    }
    if (status.status === 'failed') {
      setFailure(friendlyFailure(status.message));
      setPhase('failed');
      return true;
    }
    return false;
  }, []);

  // Countdown shown on screen.
  useEffect(() => {
    if (phase !== 'waiting') return undefined;
    const id = setInterval(() => setElapsed((e) => Math.min(e + 1, WAIT_SECONDS)), 1000);
    return () => clearInterval(id);
  }, [phase]);

  // Ask the server every few seconds whether the payment went through.
  useEffect(() => {
    if (phase !== 'waiting' || !paymentId) return undefined;
    let cancelled = false;
    let timer;
    const startedAt = Date.now();

    const tick = async () => {
      try {
        const status = await fetchPaymentStatus(paymentId);
        if (cancelled) return;
        if (applyStatus(status)) return;
      } catch {
        /* a dropped connection should not end the wait; try again */
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
  }, [phase, paymentId, applyStatus]);

  const beginWaiting = (id) => {
    setPaymentId(id);
    setElapsed(0);
    setCheckNote('');
    setPhase('waiting');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFieldError('');

    const normalized = normalizePhone(phone);
    if (!normalized) {
      setFieldError('Enter a Safaricom number, for example 0712 345 678.');
      return;
    }

    setPhase('sending');
    try {
      const data = await initiatePayment({ plan: plan.key, phone: normalized });
      beginWaiting(data.payment_id);
    } catch (err) {
      const status = err.response?.status;
      const data = err.response?.data;
      if (status === 409 && data?.payment_id) {
        beginWaiting(data.payment_id); // a prompt for this plan is already out: keep waiting on it
        return;
      }
      setPhase('form');
      if (status === 403 && data?.code === 'email_not_verified') {
        setNeedsVerify(true);
        return;
      }
      setFormError(parseApiError(err).message);
    }
  };

  const checkAgain = async () => {
    setChecking(true);
    setCheckNote('');
    try {
      const status = await fetchPaymentStatus(paymentId);
      if (!applyStatus(status)) {
        setCheckNote('Still waiting for M-Pesa. Give it a minute, then check again.');
      }
    } catch (err) {
      setCheckNote(parseApiError(err).message);
    } finally {
      setChecking(false);
    }
  };

  const checkVerified = async () => {
    const fresh = await getMe();
    updateUser(fresh);
    const confirmed = fresh.email_verified !== false;
    setNeedsVerify(!confirmed);
    return confirmed;
  };

  /* ---------- loading / unknown plan ---------- */
  if (plansError) {
    return (
      <div className="bg-paper px-5 py-16 sm:px-8">
        <div role="alert" className="mx-auto max-w-lg rounded-2xl border border-red-300 bg-red-50 p-6 text-red-800">
          <p className="font-medium">We could not load this plan.</p>
          <button type="button" onClick={reload} className="mt-4 rounded-full border border-red-400 px-5 py-2 text-sm font-semibold hover:bg-red-100">
            Try again
          </button>
        </div>
      </div>
    );
  }
  if (!plans) {
    return (
      <div role="status" className="grid min-h-[50vh] place-items-center bg-paper text-ink/60">
        Loading...
      </div>
    );
  }
  if (!plan) return <Navigate to="/pricing" replace />;

  const amountLabel = formatKsh(plan.amount);
  const showForm = phase === 'form' || phase === 'sending';

  return (
    <div className="bg-paper px-5 pb-20 pt-10 sm:px-8 sm:pt-14">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-12">
        {/* What you are buying */}
        <aside className="self-start rounded-3xl bg-ink p-7 text-paper">
          <Link
            to="/pricing"
            className="text-sm text-paper/70 underline decoration-paper/30 underline-offset-4 hover:text-gold"
          >
            Change plan
          </Link>
          <h2 className="mt-5 font-display text-3xl font-semibold">{plan.name}</h2>
          <p className="mt-1 text-paper/70">{plan.tagline}</p>
          <p className="mt-6 font-display leading-none">
            <span className="mr-1.5 text-lg text-paper/70">KSh</span>
            <span className="text-5xl font-semibold tabular-nums text-gold">
              {Number(plan.amount).toLocaleString('en-KE')}
            </span>
            <span className="mt-2 block font-body text-sm text-paper/70">{BILLING_LABEL}</span>
          </p>
          <ul className="mt-6 hidden space-y-2 border-t border-paper/15 pt-6 lg:block">
            {plan.features.map((feature) => (
              <li key={feature} className="flex gap-2.5">
                <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className="mt-1 shrink-0 text-gold" fill="none">
                  <path d="M3 8.5l3.2 3L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* The payment steps */}
        <section>
          {showForm && (
            <Card>
              <h1 ref={headingRef} tabIndex={-1} className="font-display text-3xl font-semibold text-ink outline-none">
                Pay with M-Pesa
              </h1>
              <p className="mt-2 text-ink/70">
                We will send a payment prompt to your phone. Enter your M-Pesa PIN there to finish.
              </p>

              {needsVerify ? (
                <VerifyGate email={user?.email} onChecked={checkVerified} />
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                  <FormError message={formError} />
                  <Field
                    label="M-Pesa phone number"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="0712 345 678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={fieldError}
                    hint="The Safaricom number that will receive the prompt. It can be different from your account number."
                    required
                  />
                  <SubmitButton loading={phase === 'sending'} loadingText="Sending prompt...">
                    Pay {amountLabel}
                  </SubmitButton>
                  <p className="text-sm text-ink/60">
                    We never see your PIN. M-Pesa asks for it on your phone only.
                  </p>
                </form>
              )}
            </Card>
          )}

          {phase === 'waiting' && (
            <Card>
              <h1 ref={headingRef} tabIndex={-1} className="font-display text-3xl font-semibold text-ink outline-none">
                Check your phone
              </h1>
              <p className="mt-2 text-ink/70">
                We sent a prompt to <span className="font-medium text-ink">{phone}</span>. Enter your
                M-Pesa PIN to pay {amountLabel}.
              </p>
              <div className="mt-8">
                <PhonePrompt
                  amountLabel={amountLabel}
                  secondsLeft={WAIT_SECONDS - elapsed}
                  totalSeconds={WAIT_SECONDS}
                />
              </div>
              <p className="mt-8 text-sm text-ink/60">
                Keep this page open. It updates by itself when your payment goes through.
              </p>
            </Card>
          )}

          {phase === 'success' && (
            <ReceiptSlip
              headingRef={headingRef}
              planName={plan.name}
              amountLabel={amountLabel}
              receipt={receipt.code}
              email={user?.email}
              paidAt={receipt.at}
            >
              <p className="text-center text-sm text-ink/65">
                We recorded your payment and a receipt is on its way to your email.
              </p>
              <Link to="/account#payments" className={primaryBtn}>
                View my payments
              </Link>
              <Link to="/" className={secondaryBtn}>
                Back to home
              </Link>
            </ReceiptSlip>
          )}

          {phase === 'failed' && (
            <Card>
              <h1 ref={headingRef} tabIndex={-1} className="font-display text-3xl font-semibold text-ink outline-none">
                {failure.title}
              </h1>
              <p role="alert" className="mt-3 text-ink/75">
                {failure.body}
              </p>
              <div className="mt-8 space-y-3">
                <button type="button" onClick={() => setPhase('form')} className={primaryBtn}>
                  Try again
                </button>
                <Link to="/pricing" className={secondaryBtn}>
                  Back to plans
                </Link>
              </div>
            </Card>
          )}

          {phase === 'timeout' && (
            <Card>
              <h1 ref={headingRef} tabIndex={-1} className="font-display text-3xl font-semibold text-ink outline-none">
                We have not heard back yet
              </h1>
              <p className="mt-3 text-ink/75">
                If you entered your PIN, the payment may still be on its way. Check again before you
                pay a second time, so you are not charged twice.
              </p>
              {checkNote && (
                <p role="status" className="mt-4 text-sm text-ink/70">
                  {checkNote}
                </p>
              )}
              <div className="mt-8 space-y-3">
                <button type="button" onClick={checkAgain} disabled={checking} className={primaryBtn}>
                  {checking ? 'Checking...' : 'Check again'}
                </button>
                <Link to="/account#payments" className={secondaryBtn}>
                  View my payments
                </Link>
              </div>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
}
