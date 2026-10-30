import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { changePassword, getMe, resendVerification } from '../api/auth';
import { fetchPayments, parseApiError } from '../api/client';
import { formatKsh, planName } from '../data/plans';
import { useAuth } from '../context/AuthContext';
import { Field, FormError, SubmitButton } from '../components/auth/AuthLayout';

const STATUS_STYLE = {
  success: 'bg-teal/10 text-teal',
  pending: 'bg-gold/20 text-ink',
  failed: 'bg-rust/10 text-rust',
};
const STATUS_LABEL = { success: 'Paid', pending: 'Waiting', failed: 'Not completed' };

function PlanCard({ subscription }) {
  const active = subscription?.active;
  const until = subscription
    ? new Date(subscription.active_until).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';
  return (
    <section aria-labelledby="plan-heading" className="rounded-2xl border border-ink/10 bg-white p-6">
      <h2 id="plan-heading" className="font-display text-xl font-semibold text-ink">
        Your plan
      </h2>
      {subscription ? (
        <>
          <p className="mt-3 text-ink/80">
            <span className="font-medium text-ink">{planName(subscription.plan)}</span>
            {active ? <> is active until <strong>{until}</strong>.</> : <> ended on <strong>{until}</strong>.</>}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to={`/checkout/${subscription.plan}`} className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink hover:scale-105">
              {active ? 'Add 30 days' : 'Renew'}
            </Link>
            <Link to="/pricing" className="rounded-full border border-ink/30 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-ink/5">
              Change plan
            </Link>
          </div>
        </>
      ) : (
        <p className="mt-3 text-ink/70">
          You do not have a plan yet.{' '}
          <Link to="/pricing" className="font-medium text-ink underline decoration-gold underline-offset-4">See the plans</Link>.
        </p>
      )}
    </section>
  );
}

function PaymentHistory() {
  const [rows, setRows] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchPayments()
      .then((data) => {
        if (!cancelled) setRows(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="payments"
      aria-labelledby="payments-heading"
      className="rounded-2xl border border-ink/10 bg-white p-6"
    >
      <h2 id="payments-heading" className="font-display text-xl font-semibold text-ink">
        Payments
      </h2>

      {failed ? (
        <p role="alert" className="mt-3 text-red-800">
          We could not load your payments. Refresh the page to try again.
        </p>
      ) : !rows ? (
        <p role="status" className="mt-3 text-ink/60">
          Loading...
        </p>
      ) : rows.length === 0 ? (
        <p className="mt-3 text-ink/70">
          You have not paid for a plan yet.{' '}
          <Link to="/pricing" className="font-medium text-ink underline decoration-gold underline-offset-4">
            See the plans
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-ink/10">
          {rows.map((p) => (
            <li key={p.id} className="flex items-start justify-between gap-4 py-4">
              <div>
                <p className="font-medium text-ink">{planName(p.plan)}</p>
                <p className="text-sm text-ink/60">
                  {new Date(p.paid_at || p.created_at).toLocaleDateString('en-KE', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
                {p.receipt && <p className="mt-1 font-mono text-sm text-ink/70">{p.receipt}</p>}
              </div>
              <div className="text-right">
                <p className="font-medium tabular-nums text-ink">{formatKsh(p.amount)}</p>
                <span
                  className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    STATUS_STYLE[p.status] || ''
                  }`}
                >
                  {STATUS_LABEL[p.status] || p.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function Account() {
  const { user, login, updateUser } = useAuth();

  // Pick up changes made elsewhere, e.g. confirming the email in another tab.
  useEffect(() => {
    let cancelled = false;
    getMe()
      .then((fresh) => {
        if (!cancelled) updateUser(fresh);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [updateUser]);

  const [verifyNote, setVerifyNote] = useState('');
  const [verifyError, setVerifyError] = useState('');
  const [sending, setSending] = useState(false);

  const [form, setForm] = useState({ current: '', next: '', confirm: '' });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleResend = async () => {
    setVerifyNote('');
    setVerifyError('');
    setSending(true);
    try {
      const data = await resendVerification();
      setVerifyNote(data.detail);
    } catch (err) {
      setVerifyError(parseApiError(err).message);
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    setSuccess('');

    if (form.next !== form.confirm) {
      setFieldErrors({ confirm: 'The two new passwords do not match.' });
      return;
    }

    setSaving(true);
    try {
      const data = await changePassword({
        currentPassword: form.current,
        newPassword: form.next,
      });
      login(data); // keeps this device logged in with the fresh tokens
      setForm({ current: '', next: '', confirm: '' });
      setSuccess(data.detail || 'Password changed.');
    } catch (err) {
      const { message, fields } = parseApiError(err);
      setFieldErrors({
        current: fields.current_password,
        next: fields.new_password,
      });
      setError(Object.keys(fields).length ? '' : message);
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;
  const name = [user.first_name, user.last_name].filter(Boolean).join(' ');

  return (
    <div className="bg-paper px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-xl space-y-10">
        <header>
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Your account</h1>
          <p className="mt-2 text-ink/70">
            {name && <span className="font-medium text-ink">{name} - </span>}
            {user.email}
          </p>
        </header>

        <section aria-labelledby="verify-heading" className="rounded-2xl border border-ink/10 bg-white p-6">
          <h2 id="verify-heading" className="font-display text-xl font-semibold text-ink">
            Email confirmation
          </h2>
          {user.email_verified ? (
            <p className="mt-2 text-ink/70">
              Your email is confirmed. You can make payments, and password reset links will
              reach you.
            </p>
          ) : (
            <>
              <p className="mt-2 text-ink/70">
                Confirm your email to make payments and to be sure you can recover your
                account. We sent a link to {user.email}. Check spam if you cannot find it.
              </p>
              <div className="mt-4 space-y-3">
                <FormError message={verifyError} />
                {verifyNote && (
                  <p
                    role="status"
                    className="rounded-xl border border-gold/50 bg-gold/10 px-4 py-3 text-sm text-ink"
                  >
                    {verifyNote}
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={sending}
                  className="rounded-full border border-ink/30 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-ink/5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? 'Sending...' : 'Send a new confirmation link'}
                </button>
              </div>
            </>
          )}
        </section>

        <PlanCard subscription={user.subscription} />

        <PaymentHistory />

        <section aria-labelledby="password-heading" className="rounded-2xl border border-ink/10 bg-white p-6">
          <h2 id="password-heading" className="font-display text-xl font-semibold text-ink">
            Change password
          </h2>
          <p className="mt-2 text-ink/70">
            Changing it logs you out on every other device.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <FormError message={error} />
            {success && (
              <p
                role="status"
                className="rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800"
              >
                {success}
              </p>
            )}
            <Field
              label="Current password"
              name="current"
              type="password"
              autoComplete="current-password"
              value={form.current}
              onChange={handleChange}
              error={fieldErrors.current}
              required
            />
            <Field
              label="New password"
              name="next"
              type="password"
              autoComplete="new-password"
              hint="At least 10 characters. Avoid common passwords and all-number passwords."
              value={form.next}
              onChange={handleChange}
              error={fieldErrors.next}
              required
            />
            <Field
              label="Repeat new password"
              name="confirm"
              type="password"
              autoComplete="new-password"
              value={form.confirm}
              onChange={handleChange}
              error={fieldErrors.confirm}
              required
            />
            <SubmitButton loading={saving} loadingText="Saving...">
              Change password
            </SubmitButton>
          </form>
        </section>
      </div>
    </div>
  );
}
