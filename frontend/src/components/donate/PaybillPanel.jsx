import { CopyButton } from './shared';

// Give by M-Pesa Paybill: no prompt, the donor types the numbers into their own M-Pesa menu.
export default function PaybillPanel({ paybill }) {
  const steps = [
    'Open M-Pesa on your phone and choose Lipa na M-Pesa.',
    'Choose Pay Bill.',
    'Enter the business number below.',
    'Enter the account number below.',
    'Enter the amount you would like to give, then your M-Pesa PIN.',
  ];
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { label: 'Business number', value: paybill.number },
          { label: 'Account number', value: paybill.account },
        ].map((row) => (
          <div key={row.label} className="rounded-2xl border border-ink/15 bg-paper-soft/50 p-4">
            <p className="text-sm text-ink/60">{row.label}</p>
            <p className="mt-1 font-mono text-2xl font-medium tracking-wide text-ink">{row.value}</p>
            <CopyButton value={row.value} className="mt-3" />
          </div>
        ))}
      </div>
      <ol className="mt-6 list-decimal space-y-2 pl-5 text-ink/80 marker:font-semibold marker:text-gold">
        {steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      <p className="mt-6 text-sm text-ink/55">You will get an M-Pesa confirmation message. Thank you for the support.</p>
    </div>
  );
}
