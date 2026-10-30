import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUp, Heart, MessageCircle } from 'lucide-react';
import { useCopy } from '../i18n/homeCopy';
import { SITE } from '../config/site';

// Buttons that stay with the visitor while they scroll: Donate, WhatsApp (if set), back to top.
const HIDE_ON = ['/donate', '/checkout', '/login', '/signup', '/forgot-password', '/reset-password', '/verify-email'];

export default function FloatingActions() {
  const copy = useCopy();
  const { pathname } = useLocation();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (HIDE_ON.some((p) => pathname.startsWith(p))) return null;

  const round =
    'grid h-12 w-12 place-items-center rounded-full shadow-lg shadow-black/25 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink';

  return (
    <div className="fixed bottom-5 right-4 z-30 flex flex-col items-end gap-3 rtl:left-4 rtl:right-auto rtl:items-start sm:right-6 sm:rtl:left-6 sm:rtl:right-auto">
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className={`${round} bg-night text-paper ring-1 ring-paper/20`}
        >
          <ArrowUp size={20} />
        </button>
      )}
      {SITE.whatsapp && (
        <a
          href={`https://wa.me/${SITE.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with us on WhatsApp"
          className={`${round} bg-[#25d366] text-white`}
        >
          <MessageCircle size={22} />
        </a>
      )}
      <Link
        to="/donate"
        className="flex items-center gap-2 rounded-full bg-gold px-5 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-black/30 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <Heart size={17} className="fill-ink" aria-hidden="true" />
        {copy.nav.donate}
      </Link>
    </div>
  );
}
