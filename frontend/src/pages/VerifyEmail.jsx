import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getMe, verifyEmail } from '../api/auth';
import { parseApiError } from '../api/client';
import { useAuth } from '../context/AuthContext';
import AuthLayout, { authLink } from '../components/auth/AuthLayout';

// The page the confirmation email links to: /verify-email?token=...
export default function VerifyEmail() {
  const [params] = useSearchParams();
  const token = params.get('token') || '';
  const { isAuthenticated, updateUser } = useAuth();

  const [status, setStatus] = useState(token ? 'working' : 'error');
  const [message, setMessage] = useState(
    token ? '' : 'The confirmation link is incomplete. Open the link from your email again.'
  );
  const started = useRef(false);

  useEffect(() => {
    if (!token || started.current) return;
    started.current = true;
    verifyEmail(token)
      .then(async () => {
        setStatus('done');
        if (isAuthenticated) {
          try {
            updateUser(await getMe());
          } catch {
            /* the next page load refreshes it */
          }
        }
      })
      .catch((err) => {
        setStatus('error');
        setMessage(parseApiError(err).message);
      });
  }, [token, isAuthenticated, updateUser]);

  if (status === 'working') {
    return (
      <AuthLayout title="Confirming your email..." subtitle="This only takes a moment." />
    );
  }

  if (status === 'done') {
    return (
      <AuthLayout
        title="Email confirmed"
        subtitle="Thank you. Your account can now make payments, and you can recover it if you ever forget your password."
        footer={
          <Link to={isAuthenticated ? '/app' : '/login'} className={authLink}>
            {isAuthenticated ? 'Continue to the app' : 'Log in'}
          </Link>
        }
      />
    );
  }

  return (
    <AuthLayout
      title="This link will not work"
      subtitle={message || 'The confirmation link is invalid or has expired.'}
      footer={
        <Link to="/account" className={authLink}>
          Log in and get a new confirmation link
        </Link>
      }
    />
  );
}
