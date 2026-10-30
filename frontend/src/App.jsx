import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { fetchSiteMeta } from './api/client';

import {
  fallbackLanguages,
  fallbackServices,
  fallbackTestimonials,
} from './i18n/fallbackContent';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import AppShowcase from './pages/AppShowcase';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import Account from './pages/Account';
import Pricing from './pages/Pricing';
import Checkout from './pages/Checkout';
import Donate from './pages/Donate';
import DonateThanks from './pages/DonateThanks';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

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
          languages: meta.languages?.length ? meta.languages : fallbackLanguages,
          services: meta.services?.length ? meta.services : fallbackServices,
          testimonials: meta.testimonials?.length ? meta.testimonials : fallbackTestimonials,
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
          <Route path="/" element={<HomePage data={data} />} />

          {/* Only logged-in visitors can open /app. Guests are sent to log in,
              then returned here. Remove ProtectedRoute to make it public. */}
          <Route
            path="/app"
            element={
              <ProtectedRoute reason="Log in or create an account to open the app.">
                <AppShowcase />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          <Route path="/pricing" element={<Pricing />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/donate/thanks" element={<DonateThanks />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route
            path="/checkout/:plan"
            element={
              <ProtectedRoute reason="Log in or create an account to subscribe.">
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/account"
            element={
              <ProtectedRoute reason="Log in to manage your account.">
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <FloatingActions />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <SiteContent />
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
