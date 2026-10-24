import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import logo from '../assets/yastalk-logo.png';

// Anchor sections live on the home page; "app" is its own route.
const SECTIONS = [
  { id: 'services', key: 'services' },
  { id: 'languages', key: 'languages' },
  { id: 'about', key: 'about' },
  { id: 'testimonials', key: 'testimonials' },
  { id: 'contact', key: 'contact' },
];

function displayName(user) {
  return [user.first_name, user.last_name].filter(Boolean).join(' ') || user.email;
}

function AccountMenu({ user, logoutLabel, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const initial = (user.first_name || user.email || '?').charAt(0).toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Account menu"
        className="grid h-9 w-9 place-items-center rounded-full bg-gold text-sm font-semibold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
      >
        {initial}
      </button>
      {open && (
        <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-paper p-2 text-ink shadow-xl shadow-black/20">
          <div className="px-3 py-2">
            <p className="truncate font-medium">{displayName(user)}</p>
            <p className="truncate text-sm text-ink/60">{user.email}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            {logoutLabel}
          </button>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const { t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const loginLabel = t.nav.login || 'Log in';
  const signupLabel = t.nav.signup || 'Create account';
  const logoutLabel = t.nav.logout || 'Log out';

  // After logging in, visitors come back to the page they were on.
  const here = { pathname: location.pathname, search: location.search, hash: location.hash };

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

  async function handleLogout() {
    setMenuOpen(false);
    await logout();
    navigate('/');
  }

  return (
    <header
      className={`sticky top-0 z-40 transition-colors ${
        scrolled ? 'bg-ink/95 backdrop-blur shadow-lg shadow-black/10' : 'bg-ink'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Yas Talk Logo" className="h-9 w-auto object-contain" />
          <span className="font-display text-2xl font-semibold text-paper">
            Yas<span className="text-gold">Talk</span>
          </span>
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

          {isAuthenticated ? (
            <AccountMenu user={user} logoutLabel={logoutLabel} onLogout={handleLogout} />
          ) : (
            <Link
              to="/login"
              state={{ from: here }}
              className="hidden text-sm font-medium text-paper/80 transition-colors hover:text-gold sm:inline-block"
            >
              {loginLabel}
            </Link>
          )}

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

          <div className="mt-3 border-t border-paper/10 pt-3">
            {isAuthenticated ? (
              <>
                <p className="truncate px-3 text-sm text-paper/60">{displayName(user)}</p>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-1 block w-full rounded-lg px-3 py-2.5 text-left text-paper/90 hover:bg-paper/5"
                >
                  {logoutLabel}
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-1">
                <Link
                  to="/login"
                  state={{ from: here }}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-paper/90 hover:bg-paper/5"
                >
                  {loginLabel}
                </Link>
                <Link
                  to="/signup"
                  state={{ from: here }}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-paper/90 hover:bg-paper/5"
                >
                  {signupLabel}
                </Link>
              </div>
            )}
          </div>

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
