// The "payment received" moment: a tear-off receipt slip in receipt typography.
function Row({ label, value, strong = false }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-ink/60">{label}</dt>
      <dd className={`break-all text-right ${strong ? 'font-medium text-ink' : 'text-ink/85'}`}>{value}</dd>
    </div>
  );
}

export default function ReceiptSlip({
  headingRef,
  planName,
  amountLabel,
  receipt,
  email,
  paidAt,
  children,
}) {
  const when = paidAt
    ? paidAt.toLocaleString('en-KE', { dateStyle: 'medium', timeStyle: 'short' })
    : '';

  return (
    <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm">
      <div className="px-7 pb-7 pt-9 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-teal text-paper">
          <svg viewBox="0 0 16 16" width="22" height="22" aria-hidden="true" fill="none">
            <path d="M3 8.5l3.2 3L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mt-4 font-display text-3xl font-semibold text-ink outline-none"
        >
          Payment received
        </h1>
        <p className="mt-2 font-display text-5xl font-semibold tabular-nums text-ink">{amountLabel}</p>
      </div>

      <div className="relative">
        <div className="border-t-2 border-dashed border-ink/15" />
        <span aria-hidden="true" className="absolute -left-3 -top-3 h-6 w-6 rounded-full border border-ink/10 bg-paper" />
        <span aria-hidden="true" className="absolute -right-3 -top-3 h-6 w-6 rounded-full border border-ink/10 bg-paper" />
      </div>

      <dl className="space-y-3 px-7 py-7 font-mono text-sm">
        <Row label="Plan" value={planName} />
        <Row label="M-Pesa code" value={receipt || 'On its way'} strong />
        {when && <Row label="Paid" value={when} />}
        <Row label="Receipt to" value={email} />
      </dl>

      {children && <div className="space-y-3 px-7 pb-8">{children}</div>}
    </div>
  );
}
