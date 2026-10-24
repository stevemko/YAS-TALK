import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMe, logout as apiLogout } from '../api/auth';
import { tokenStore } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Start from the saved session so the page does not flash logged-out.
  const [user, setUser] = useState(() => (tokenStore.refresh ? tokenStore.user : null));
  const [loading, setLoading] = useState(() =>
    Boolean(tokenStore.refresh && !tokenStore.user)
  );

  // Confirm the saved session with the server in the background.
  useEffect(() => {
    if (!tokenStore.refresh) {
      setLoading(false);
      return undefined;
    }
    let cancelled = false;
    getMe()
      .then((fresh) => {
        if (cancelled) return;
        tokenStore.setUser(fresh);
        setUser(fresh);
      })
      .catch(() => {
        // An expired session is handled by the auth:logout event below.
        // A network error keeps you logged in.
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // The API client fires this when the refresh token is no longer valid.
  useEffect(() => {
    const onForcedLogout = () => setUser(null);
    window.addEventListener('auth:logout', onForcedLogout);
    return () => window.removeEventListener('auth:logout', onForcedLogout);
  }, []);

  const login = useCallback((data) => {
    tokenStore.save(data);
    setUser(data.user);
  }, []);

  const logout = useCallback(async () => {
    const refresh = tokenStore.refresh;
    try {
      if (refresh) await apiLogout(refresh);
    } catch {
      /* log out locally even if the server call fails */
    }
    tokenStore.clear();
    setUser(null);
  }, []);

  const updateUser = useCallback((next) => {
    tokenStore.setUser(next);
    setUser(next);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, logout, updateUser, isAuthenticated: Boolean(user) }),
    [user, loading, login, logout, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}

// For buttons that need an account (Subscribe, Pay, ...):
//   const requireAuth = useRequireAuth();
//   if (!requireAuth({ type: 'subscribe', plan: 'basic' })) return;
// Guests are sent to the login page and come back to this page afterwards,
// with location.state.resume set to the intent so the action can continue.
export function useRequireAuth() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (intent, reason = 'Log in or create an account to continue.') => {
      if (isAuthenticated) return true;
      navigate('/login', {
        state: {
          from: {
            pathname: location.pathname,
            search: location.search,
            hash: location.hash,
          },
          intent,
          reason,
        },
      });
      return false;
    },
    [isAuthenticated, navigate, location]
  );
}
