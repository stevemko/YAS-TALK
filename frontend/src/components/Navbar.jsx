import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

// Anchor sections live on the home page; "app" is its own route.
const SECTIONS = [
  { id: 'services', key: 'services' },
  { id: 'languages', key: 'languages' },
  { id: 'about', key: 'about' },
  { id: 'testimonials', key: 'testimonials' },
  { id: 'contact', key: 'contact' },
];

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function goToSection(id) {
    return (e) => {
      setMenuOpen(false);
      if (location.pathname !== '/') {
        e.preventDefault();
        navigate(`/#${id}`);
      }
      // if already on home page, let the default anchor jump happen
    };
  }

  return (
    <header
      className={`sticky top-0 z-40 transition-colors ${
        scrolled ? 'bg-ink/95 backdrop-blur shadow-lg shadow-black/10' : 'bg-ink'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-semibold text-paper">Yas<span className="text-gold">Talk</span></span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`/#${s.id}`}
                onClick={goToSection(s.id)}
                className="text-sm font-medium text-paper/80 transition-colors hover:text-gold"
              >
                {t.nav[s.key]}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/app"
              className={`text-sm font-medium transition-colors hover:text-gold ${
                location.pathname === '/app' ? 'text-gold' : 'text-paper/80'
              }`}
            >
              {t.nav.app}
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher variant="dark" />
          </div>
          <a
            href="/#cta"
            onClick={goToSection('cta')}
            className="hidden rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink transition-transform hover:scale-105 sm:inline-block"
          >
            {t.nav.cta}
          </a>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border border-paper/20 text-paper lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
              <path d="M0 1H18M0 7H18M0 13H18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-paper/10 bg-ink px-5 pb-5 lg:hidden">
          <ul className="flex flex-col gap-1 pt-3">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`/#${s.id}`}
                  onClick={goToSection(s.id)}
                  className="block rounded-lg px-3 py-2.5 text-paper/90 hover:bg-paper/5"
                >
                  {t.nav[s.key]}
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/app"
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-paper/90 hover:bg-paper/5"
              >
                {t.nav.app}
              </Link>
            </li>
          </ul>
          <div className="mt-3 flex items-center justify-between gap-3">
            <LanguageSwitcher variant="dark" />
            <a
              href="/#cta"
              onClick={goToSection('cta')}
              className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
