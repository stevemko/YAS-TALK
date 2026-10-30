import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import { Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCopy } from '../i18n/homeCopy';
import { SITE } from '../config/site';
import Logo from './Logo';

export default function Footer() {
  const { t } = useLanguage();
  const copy = useCopy();
  const f = copy.footer;
  const location = useLocation();
  const navigate = useNavigate();

  // Home-page sections from any other page: go home first, then scroll.
  const toSection = (id) => (e) => {
    if (location.pathname !== '/') {
      e.preventDefault();
      navigate(`/#${id}`);
    }
  };

  const social = [
    { href: SITE.social.facebook, label: 'Facebook', Icon: FaFacebookF },
    { href: SITE.social.instagram, label: 'Instagram', Icon: FaInstagram },
    { href: SITE.social.tiktok, label: 'TikTok', Icon: FaTiktok },
  ];
  const linkClass = 'text-paper/70 transition-colors hover:text-gold';

  return (
    <footer className="bg-night text-paper">
      <div className="mx-auto max-w-6xl px-5 pb-8 pt-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo markClass="h-14" textClass="text-3xl" />
            <p className="mt-5 max-w-sm text-paper/70">{t.footer.tagline}</p>
            <Link
              to="/donate"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/70 px-5 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              <Heart size={15} aria-hidden="true" /> {f.donate}
            </Link>
            <div className="mt-7 flex gap-3">
              {social.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-paper/20 text-paper/80 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <nav aria-label={f.product}>
              <h3 className="font-display text-lg font-semibold">{f.product}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li><Link to="/app" className={linkClass}>{f.app}</Link></li>
                <li><Link to="/pricing" className={linkClass}>{f.plans}</Link></li>
                <li><Link to="/events" className={linkClass}>{f.events}</Link></li>
                <li><a href="/#languages" onClick={toSection('languages')} className={linkClass}>{t.nav.languages}</a></li>
              </ul>
            </nav>
            <nav aria-label={f.support}>
              <h3 className="font-display text-lg font-semibold">{f.support}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li><Link to="/donate" className={linkClass}>{f.donate}</Link></li>
                <li><a href="/#contact" onClick={toSection('contact')} className={linkClass}>{f.contact}</a></li>
                <li><a href="/#faq" onClick={toSection('faq')} className={linkClass}>FAQ</a></li>
                <li><Link to="/account" className={linkClass}>Account</Link></li>
              </ul>
            </nav>
            <nav aria-label={f.legal} className="col-span-2 sm:col-span-1">
              <h3 className="font-display text-lg font-semibold">{f.legal}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li><Link to="/privacy" className={linkClass}>{f.privacy}</Link></li>
                <li><Link to="/terms" className={linkClass}>{f.terms}</Link></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-paper/10 pt-6 text-sm text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE.legalName}. {t.footer.rights}
          </p>
          <p>{f.secure}</p>
        </div>
      </div>
    </footer>
  );
}
