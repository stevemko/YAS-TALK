import { useState } from 'react';
import { Lock } from 'lucide-react';
import { donateCard, parseApiError } from '../../api/client';
import { formatKsh } from '../../data/plans';
import { AmountPicker, DonorFields, primaryBtn } from './shared';

// Give by card: we hand the donor to Paystack's secure page, so card details never touch our site.
export default function CardPanel({ config, amount, setAmount, donor, setDonor }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [amountError, setAmountError] = useState('');
  const [emailError, setEmailError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setAmountError('');
    setEmailError('');
    const n = Number(amount);
    if (!n || n < config.min_amount || n > config.max_amount) {
      setAmountError(`Enter an amount between ${formatKsh(config.min_amount)} and ${formatKsh(config.max_amount)}.`);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(donor.email.trim())) {
      setEmailError('Enter your email so the payment page can send your receipt.');
      return;
    }
    setBusy(true);
    try {
      const data = await donateCard({
        amount: n,
        email: donor.email.trim(),
        name: donor.name,
        message: donor.message,
        anonymous: donor.anonymous,
      });
      window.location.assign(data.authorization_url);
    } catch (err) {
      setBusy(false);
      setError(parseApiError(err).message);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      {error && (
        <p role="alert" className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}
      <AmountPicker presets={config.presets} value={amount} onChange={setAmount} min={config.min_amount} max={config.max_amount} error={amountError} />
      <DonorFields values={donor} onChange={setDonor} emailRequired emailError={emailError} />
      <button type="submit" disabled={busy} className={primaryBtn}>
        <Lock size={17} aria-hidden="true" />
        {busy ? 'Opening secure page...' : `Continue to pay ${amount ? formatKsh(amount) : ''}`.trim()}
      </button>
      <p className="text-center text-sm text-ink/55">
        You will pay on Paystack&rsquo;s secure page with Visa or Mastercard. We never see your card details.
      </p>
    </form>
  );
}
