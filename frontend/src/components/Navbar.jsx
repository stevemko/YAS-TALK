import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useCopy } from '../i18n/homeCopy';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';

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
  const item =
    'block w-full rounded-xl px-3 py-2 text-left text-sm font-medium hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold';

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Account menu"
        className="grid h-10 w-10 place-items-center rounded-full bg-gold text-sm font-semibold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
      >
        {initial}
      </button>
      {open && (
        <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-paper p-2 text-ink shadow-xl shadow-black/30 rtl:left-0 rtl:right-auto">
          <div className="px-3 py-2">
            <p className="truncate font-medium">{displayName(user)}</p>
            <p className="truncate text-sm text-ink/60">{user.email}</p>
          </div>
          <Link to="/account" onClick={() => setOpen(false)} className={item}>
            Account &amp; payments
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className={item}
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
  const copy = useCopy();
  const { user, isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const loginLabel = t.nav.login || copy.nav.login;
  const signupLabel = t.nav.signup || copy.nav.signup;
  const logoutLabel = t.nav.logout || copy.nav.logout;
  const here = { pathname: location.pathname, search: location.search, hash: location.hash };

  // Main links: pages first, then the two sections visitors look for most.
  const links = [
    { to: '/app', label: t.nav.app },
    { to: '/pricing', label: copy.nav.plans },
    { to: '/events', label: copy.nav.events },
    { id: 'about', label: t.nav.about },
    { id: 'contact', label: t.nav.contact },
  ];
  // The mobile menu also lists the other sections of the home page.
  const moreSections = [
    { id: 'services', label: t.nav.services },
    { id: 'languages', label: t.nav.languages },
    { id: 'stories', label: t.nav.testimonials },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  function goToSection(id) {
    return (e) => {
      setMenuOpen(false);
      if (location.pathname !== '/') {
        e.preventDefault();
        navigate(`/#${id}`);
      }
    };
  }

  async function handleLogout() {
    setMenuOpen(false);
    await logout();
    navigate('/');
  }

  const linkClass = (active) =>
    `whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium transition-colors hover:text-gold ${
      active ? 'text-gold' : 'text-paper/80'
    }`;
  const donateBtn =
    'items-center gap-2 whitespace-nowrap rounded-full border border-gold/70 px-4 py-2 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper';

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors ${
        scrolled
          ? 'border-paper/10 bg-night/90 shadow-lg shadow-black/20 backdrop-blur'
          : 'border-transparent bg-night'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link to="/" aria-label="YasTalk home" className="shrink-0">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              {l.to ? (
                <Link to={l.to} className={linkClass(location.pathname.startsWith(l.to))}>
                  {l.label}
                </Link>
              ) : (
                <a href={`/#${l.id}`} onClick={goToSection(l.id)} className={linkClass(false)}>
                  {l.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher variant="dark" />
          </div>

          {isAuthenticated ? (
            <AccountMenu user={user} logoutLabel={logoutLabel} onLogout={handleLogout} />
          ) : (
            <Link
              to="/login"
              state={{ from: here }}
              className="hidden whitespace-nowrap px-2 text-sm font-medium text-paper/80 transition-colors hover:text-gold sm:inline-block"
            >
              {loginLabel}
            </Link>
          )}

          <Link to="/donate" className={`${donateBtn} nav-donate`}>
            <Heart size={15} aria-hidden="true" /> {copy.nav.donate}
          </Link>
          <a
            href="/#cta"
            onClick={goToSection('cta')}
            className="hidden whitespace-nowrap rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink transition-transform hover:scale-105 min-[1400px]:inline-block"
          >
            {t.nav.cta}
          </a>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-paper/20 text-paper lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-paper/10 bg-night px-5 pb-6 lg:hidden">
          <ul className="flex flex-col pt-3">
            {[...links, ...moreSections].map((l) => (
              <li key={l.label}>
                {l.to ? (
                  <Link
                    to={l.to}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-3 font-display text-xl text-paper hover:bg-paper/5"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    href={`/#${l.id}`}
                    onClick={goToSection(l.id)}
                    className="block rounded-lg px-3 py-3 font-display text-xl text-paper hover:bg-paper/5"
                  >
                    {l.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Link to="/donate" onClick={() => setMenuOpen(false)} className={`${donateBtn} inline-flex justify-center py-3`}>
              <Heart size={15} aria-hidden="true" /> {copy.nav.donate}
            </Link>
            <a
              href="/#cta"
              onClick={goToSection('cta')}
              className="rounded-full bg-gold px-4 py-3 text-center text-sm font-semibold text-ink"
            >
              {t.nav.cta}
            </a>
          </div>

          <div className="mt-4 border-t border-paper/10 pt-4">
            {isAuthenticated ? (
              <>
                <p className="truncate px-3 text-sm text-paper/60">{displayName(user)}</p>
                <Link
                  to="/account"
                  onClick={() => setMenuOpen(false)}
                  className="mt-1 block rounded-lg px-3 py-2.5 text-paper/90 hover:bg-paper/5"
                >
                  Account &amp; payments
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-1 block w-full rounded-lg px-3 py-2.5 text-left text-paper/90 hover:bg-paper/5 rtl:text-right"
                >
                  {logoutLabel}
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-1">
                <Link to="/login" state={{ from: here }} onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2.5 text-paper/90 hover:bg-paper/5">
                  {loginLabel}
                </Link>
                <Link to="/signup" state={{ from: here }} onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2.5 text-paper/90 hover:bg-paper/5">
                  {signupLabel}
                </Link>
              </div>
            )}
            <div className="mt-3 px-1">
              <LanguageSwitcher variant="dark" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
