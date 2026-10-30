import { Link } from 'react-router-dom';
import { usePlans } from '../data/usePlans';
import { BILLING_LABEL, planName } from '../data/plans';
import { useAuth } from '../context/AuthContext';

function Tick({ className = '' }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      aria-hidden="true"
      className={`mt-1 shrink-0 ${className}`}
      fill="none"
    >
      <path
        d="M3 8.5l3.2 3L13 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// One plan = one row, like a printed rate board. The recommended plan is the dark slab.
function PlanRow({ plan, current }) {
  const { featured } = plan;
  return (
    <li
      className={
        featured
          ? 'my-4 rounded-3xl bg-ink px-6 py-8 text-paper sm:px-9'
          : 'px-2 py-8 sm:px-9'
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[13rem_minmax(0,1fr)_auto] lg:items-center lg:gap-10">
        <div>
          <h2 className="font-display text-3xl font-semibold">{plan.name}</h2>
          <p className={`mt-1 ${featured ? 'text-paper/70' : 'text-ink/65'}`}>{plan.tagline}</p>
          {current ? (
            <p className="mt-3 inline-block rounded-full bg-teal px-3 py-1 text-sm font-semibold text-paper">
              Your plan
            </p>
          ) : (
            featured && (
              <p className="mt-3 inline-block rounded-full bg-gold px-3 py-1 text-sm font-semibold text-ink">
                Our pick
              </p>
            )
          )}
        </div>

        <ul className="space-y-2">
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-2.5">
              <Tick className={featured ? 'text-gold' : 'text-teal'} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 lg:flex-col lg:items-end">
          <p className="font-display leading-none">
            <span className={`mr-1.5 text-lg ${featured ? 'text-paper/70' : 'text-ink/65'}`}>KSh</span>
            <span className="text-5xl font-semibold tabular-nums">
              {Number(plan.amount).toLocaleString('en-KE')}
            </span>
            <span
              className={`mt-2 block font-body text-sm ${featured ? 'text-paper/70' : 'text-ink/65'}`}
            >
              {BILLING_LABEL}
            </span>
          </p>
          <Link
            to={`/checkout/${plan.key}`}
            className={`whitespace-nowrap rounded-full px-6 py-3 text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              featured
                ? 'bg-gold text-ink hover:bg-[#d49622] focus-visible:outline-paper'
                : 'border border-ink/30 text-ink hover:bg-ink/5 focus-visible:outline-ink'
            }`}
          >
            {current ? 'Renew' : 'Choose'} {plan.name}
          </Link>
        </div>
      </div>
    </li>
  );
}

function Skeleton() {
  return (
    <div role="status" aria-label="Loading plans" className="space-y-4">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-36 animate-pulse rounded-3xl bg-ink/5" />
      ))}
    </div>
  );
}

const STEPS = [
  { title: 'Choose a plan', body: 'Pick the plan that fits and log in or create your account.' },
  { title: 'Enter your M-Pesa number', body: 'Use the Safaricom number you want the payment prompt sent to.' },
  { title: 'Approve on your phone', body: 'Enter your M-Pesa PIN when the prompt appears. We confirm it here within seconds.' },
];

export default function Pricing() {
  const { plans, error, reload } = usePlans();
  const { user } = useAuth();
  const sub = user?.subscription?.active ? user.subscription : null;

  return (
    <div className="bg-paper px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
      <div className="mx-auto max-w-5xl">
        <header className="max-w-2xl">
          <h1 className="font-display text-4xl font-semibold leading-tight text-balance text-ink sm:text-5xl">
            Pick a plan, then pay from your phone
          </h1>
          <p className="mt-4 text-lg text-ink/70">
            Prices are in Kenyan shillings. You approve every payment yourself with M-Pesa, so
            you do not need a card.
          </p>
        </header>

        {sub && (
          <p role="status" className="mt-8 max-w-2xl rounded-2xl border border-teal/30 bg-teal/10 px-5 py-4 text-ink">
            You are on <strong>{planName(sub.plan)}</strong> until{' '}
            <strong>{new Date(sub.active_until).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>.
            Paying again adds 30 days on top.
          </p>
        )}

        <div className="mt-10">
          {error ? (
            <div role="alert" className="rounded-2xl border border-red-300 bg-red-50 p-6 text-red-800">
              <p className="font-medium">We could not load the prices.</p>
              <p className="mt-1 text-sm">Check your connection and try again.</p>
              <button
                type="button"
                onClick={reload}
                className="mt-4 rounded-full border border-red-400 px-5 py-2 text-sm font-semibold hover:bg-red-100"
              >
                Try again
              </button>
            </div>
          ) : !plans ? (
            <Skeleton />
          ) : (
            <ul className="divide-y divide-ink/15 border-y border-ink/15">
              {plans.map((plan) => (
                <PlanRow key={plan.key} plan={plan} current={sub?.plan === plan.key} />
              ))}
            </ul>
          )}
        </div>

        <section aria-labelledby="how-heading" className="mt-16 max-w-3xl">
          <h2 id="how-heading" className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            How paying works
          </h2>
          <ol className="mt-6 space-y-6">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="font-display text-3xl font-semibold leading-none text-gold"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1 text-ink/70">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-ink/70">
            We never see your M-Pesa PIN. Each payment gets a receipt by email and is listed in
            your account. Questions? <Link to="/#contact" className="font-medium text-ink underline decoration-gold underline-offset-4">Contact us</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
