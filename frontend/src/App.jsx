import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { fetchSiteMeta } from './api/client';
import { fallbackLanguages, fallbackServices, fallbackTestimonials } from './i18n/fallbackContent';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AppShowcase from './pages/AppShowcase';

// Scrolls to a #section on route change (needed since React Router doesn't
// do this automatically, and our nav links can point to "/#section" from
// any page).
function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        // slight delay lets the target page finish rendering first
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
}

function SiteContent() {
  const [data, setData] = useState({
    languages: fallbackLanguages,
    services: fallbackServices,
    testimonials: fallbackTestimonials,
  });

  useEffect(() => {
    let cancelled = false;
    fetchSiteMeta()
      .then((meta) => {
        if (cancelled) return;
        setData({
          languages: meta.languages?.length ? meta.languages : fallbackLanguages,
          services: meta.services?.length ? meta.services : fallbackServices,
          testimonials: meta.testimonials?.length ? meta.testimonials : fallbackTestimonials,
        });
      })
      .catch(() => {
        // API not reachable yet (e.g. backend not running) — fallback content stays in place.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-paper">
      <ScrollToHash />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage data={data} />} />
          <Route path="/app" element={<AppShowcase />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <SiteContent />
      </LanguageProvider>
    </BrowserRouter>
  );
}
