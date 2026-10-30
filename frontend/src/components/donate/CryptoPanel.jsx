import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { AlertTriangle } from 'lucide-react';
import { donateCrypto, parseApiError } from '../../api/client';
import { CopyButton, DonorFields, inputClass, primaryBtn } from './shared';

// Give crypto on BNB Smart Chain (BEP-20): scan the QR code or copy the address.
export default function CryptoPanel({ crypto, donor, setDonor }) {
  const [qr, setQr] = useState('');
  const [hash, setHash] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState('');

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(crypto.address, { margin: 1, width: 280, color: { dark: '#12211d', light: '#ffffff' } })
      .then((url) => !cancelled && setQr(url))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [crypto.address]);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const data = await donateCrypto({
        tx_hash: hash.trim(),
        name: donor.name,
        email: donor.email,
        message: donor.message,
        anonymous: donor.anonymous,
      });
      setDone(data.detail);
    } catch (err) {
      setError(parseApiError(err).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div role="note" className="flex gap-3 rounded-2xl border border-gold/60 bg-gold/15 p-4 text-ink">
        <AlertTriangle size={20} className="mt-0.5 shrink-0 text-[#8a5d00]" aria-hidden="true" />
        <p>
          Send <strong>only on {crypto.network}</strong>. Funds sent on any other network are lost and we cannot get
          them back. If you are unsure, send a small test amount first.
        </p>
      </div>

      <div className="mt-6 grid items-center gap-6 sm:grid-cols-[auto_1fr]">
        <div className="mx-auto rounded-2xl border border-ink/10 bg-white p-3">
          {qr ? (
            <img src={qr} alt="QR code of the wallet address" width="200" height="200" className="h-[200px] w-[200px]" />
          ) : (
            <div className="h-[200px] w-[200px] animate-pulse rounded-lg bg-ink/5" />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-sm text-ink/60">Wallet address ({crypto.network})</p>
          <p className="mt-1 break-all rounded-xl bg-paper-soft/60 p-3 font-mono text-sm text-ink">{crypto.address}</p>
          <CopyButton value={crypto.address} label="Copy address" className="mt-3" />
          {crypto.tokens.length > 0 && (
            <p className="mt-4 text-sm text-ink/70">
              Accepted: <span className="font-medium text-ink">{crypto.tokens.join(', ')}</span>
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 border-t border-ink/10 pt-6">
        <h3 className="font-display text-xl font-semibold text-ink">Sent it? Let us say thank you.</h3>
        <p className="mt-1 text-ink/70">
          Paste your transaction hash so we can match your gift. It starts with 0x.
        </p>
        {done ? (
          <p role="status" className="mt-4 rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-green-800">
            {done}
          </p>
        ) : (
          <form onSubmit={submit} noValidate className="mt-4 space-y-4">
            {error && (
              <p role="alert" className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
                {error}
              </p>
            )}
            <label className="block">
              <span className="text-sm font-medium text-ink">Transaction hash</span>
              <input
                value={hash}
                onChange={(e) => setHash(e.target.value)}
                placeholder="0x..."
                spellCheck="false"
                autoComplete="off"
                className={`${inputClass} mt-1.5 font-mono text-sm`}
              />
            </label>
            <DonorFields values={donor} onChange={setDonor} />
            <button type="submit" disabled={busy || !hash.trim()} className={primaryBtn}>
              {busy ? 'Sending...' : 'Tell us about my gift'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
