import { Link } from 'react-router-dom';
import { Heart, Share2 } from 'lucide-react';
import { SITE } from '../../config/site';
import { formatKsh } from '../../data/plans';
import { primaryBtn, secondaryBtn } from './shared';

// The "thank you" moment after a gift. Sharing on WhatsApp is how most gifts spread here.
export default function DonationThanks({ headingRef, name, amount, receipt, note, bare = false }) {
  const shareText = `I just supported YasTalk, the translation app for English, French, Lingala, Swahili and Arabic. Join me: ${SITE.url}/donate`;
  return (
    <div className={bare ? 'py-4 text-center' : 'relative overflow-hidden rounded-3xl border border-ink/10 bg-white p-8 text-center shadow-sm sm:p-10'}>
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold">
        <Heart size={28} className="fill-ink text-ink" aria-hidden="true" />
      </span>
      <h2 ref={headingRef} tabIndex={-1} className="mt-6 font-display text-4xl font-semibold text-ink outline-none">
        Thank you{name ? `, ${name.split(' ')[0]}` : ''}
      </h2>
      {amount ? (
        <p className="mt-2 font-display text-3xl font-semibold tabular-nums text-teal">{formatKsh(amount)}</p>
      ) : null}
      <p className="mx-auto mt-4 max-w-md text-lg text-ink/75">
        {note || 'Your gift helps more people talk to each other in the language they grew up with.'}
      </p>
      {receipt && (
        <p className="mt-5 font-mono text-sm text-ink/70">
          M-Pesa code <span className="font-medium text-ink">{receipt}</span>
        </p>
      )}
      <div className="mx-auto mt-8 max-w-sm space-y-3">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noreferrer"
          className={primaryBtn}
        >
          <Share2 size={18} aria-hidden="true" /> Tell a friend on WhatsApp
        </a>
        <Link to="/" className={secondaryBtn}>
          Back to home
        </Link>
      </div>
    </div>
  );
}
