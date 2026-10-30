// A picture of what the customer should see on their phone, with a countdown.
export default function PhonePrompt({ amountLabel, secondsLeft, totalSeconds }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const left = Math.max(0, secondsLeft);
  const offset = circumference * (1 - left / totalSeconds);
  const mm = Math.floor(left / 60);
  const ss = String(left % 60).padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-7 sm:flex-row sm:items-center sm:gap-9">
      <div
        aria-hidden="true"
        className="w-56 shrink-0 rounded-[2.25rem] bg-ink p-3 shadow-xl shadow-ink/25"
      >
        <div className="rounded-[1.6rem] bg-ink-soft px-4 pb-5 pt-3">
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-paper/20" />
          <div className="rounded-2xl bg-paper px-4 py-4 text-left text-ink">
            <p className="text-xs text-ink/60">On your phone</p>
            <p className="mt-1 font-display text-lg font-semibold leading-snug">
              Pay {amountLabel} to YasTalk?
            </p>
            <p className="mt-3 text-xs text-ink/70">Enter your M-Pesa PIN</p>
            <div className="mt-2 flex gap-2">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="h-2.5 w-2.5 animate-pulse rounded-full bg-ink"
                  style={{ animationDelay: `${i * 0.25}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true" className="shrink-0">
          <circle cx="32" cy="32" r={radius} fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="5" />
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="#e3a527"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 32 32)"
          />
          <text
            x="32"
            y="36"
            textAnchor="middle"
            className="fill-current font-mono text-[13px]"
          >
            {mm}:{ss}
          </text>
        </svg>
        <p className="max-w-[14rem] text-sm text-ink/70">
          Waiting for your PIN. We will keep checking for a minute and a half.
        </p>
      </div>
    </div>
  );
}
