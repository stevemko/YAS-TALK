import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';          // ← added
import { fetchSiteMeta } from './api/client';

import {
  fallbackLanguages,
  fallbackServices,
  fallbackTestimonials,
} from './i18n/fallbackContent';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';     // ← added (optional but recommended)

import HomePage from './pages/HomePage';
import AppShowcase from './pages/AppShowcase';
import Login from './pages/Login';
import Signup from './pages/Signup';                          // ← added

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);

      if (el) {
        setTimeout(() => {
          el.scrollIntoView({
            behavior: 'smooth',
          });
        }, 50);

        return;
      }
    }

    window.scrollTo({
      top: 0,
    });
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
          languages: meta.languages?.length
            ? meta.languages
            : fallbackLanguages,

          services: meta.services?.length
            ? meta.services
            : fallbackServices,

          testimonials: meta.testimonials?.length
            ? meta.testimonials
            : fallbackTestimonials,
        });
      })
      .catch(() => {});

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
          <Route
            path="/"
            element={<HomePage data={data} />}
          />

          {/* Protected route - only logged-in users can see /app */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppShowcase />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />
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
        <AuthProvider>               {/* ← AuthProvider wraps everything */}
          <SiteContent />
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}