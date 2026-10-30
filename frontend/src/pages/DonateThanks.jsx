import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { verifyCardDonation } from '../api/client';
import DonationThanks from '../components/donate/DonationThanks';
import { primaryBtn, secondaryBtn } from '../components/donate/shared';

// Where Paystack sends a donor back after the card page: /donate/thanks?reference=...
export default function DonateThanks() {
  const [params] = useSearchParams();
  const reference = params.get('reference') || '';
  const [state, setState] = useState({ status: reference ? 'checking' : 'missing', amount: null });
  const tries = useRef(0);
  const headingRef = useRef(null);

  useEffect(() => {
    if (!reference) return undefined;
    let cancelled = false;
    let timer;
    const check = async () => {
      try {
        const r = await verifyCardDonation(reference);
        if (cancelled) return;
        if (r.status === 'success') return setState({ status: 'success', amount: r.amount });
        if (r.status === 'failed') return setState({ status: 'failed', amount: null });
      } catch (err) {
        if (cancelled) return;
        if (err.response?.status === 404) return setState({ status: 'missing', amount: null });
      }
      tries.current += 1;
      if (tries.current >= 8) return setState({ status: 'pending', amount: null });
      timer = setTimeout(check, 3000);
    };
    check();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [reference]);

  useEffect(() => {
    if (state.status !== 'checking') headingRef.current?.focus();
  }, [state.status]);

  return (
    <div className="bg-night px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-xl">
        {state.status === 'success' ? (
          <DonationThanks headingRef={headingRef} amount={state.amount} note="Your card gift went through. A receipt is on its way to your email." />
        ) : (
          <div className="rounded-3xl bg-paper p-8 text-center text-ink sm:p-10">
            <h1 ref={headingRef} tabIndex={-1} className="font-display text-3xl font-semibold outline-none">
              {state.status === 'checking' && 'Confirming your gift...'}
              {state.status === 'pending' && 'Still confirming'}
              {state.status === 'failed' && 'The payment did not go through'}
              {state.status === 'missing' && 'We could not find that payment'}
            </h1>
            <p role="status" className="mt-4 text-ink/75">
              {state.status === 'checking' && 'This only takes a few seconds.'}
              {state.status === 'pending' && 'Your bank is still confirming. If you were charged, your gift will be recorded automatically. You do not need to pay again.'}
              {state.status === 'failed' && 'Nothing was charged. You can try again with the same or another card.'}
              {state.status === 'missing' && 'If you were charged, please write to us and we will sort it out.'}
            </p>
            {state.status !== 'checking' && (
              <div className="mx-auto mt-8 max-w-xs space-y-3">
                <Link to="/donate" className={primaryBtn}>Back to donate</Link>
                <Link to="/" className={secondaryBtn}>Back to home</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
