import { useState } from 'react';
import { Link } from 'react-router-dom';
import { requestPasswordReset } from '../api/auth';
import { parseApiError } from '../api/client';
import AuthLayout, {
  Field,
  FormError,
  SubmitButton,
  authLink,
} from '../components/auth/AuthLayout';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await requestPasswordReset(email.trim());
      setSent(true);
    } catch (err) {
      setError(parseApiError(err).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we will send you a link to choose a new password."
      footer={
        <Link to="/login" className={authLink}>
          Back to log in
        </Link>
      }
    >
      {sent ? (
        <p role="status" className="rounded-xl border border-gold/50 bg-gold/10 px-4 py-4 text-ink">
          If {email.trim()} has an account, a reset link is on its way. The link works for one
          hour. Check your spam folder if it does not arrive.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormError message={error} />
          <Field
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <SubmitButton loading={loading} loadingText="Sending...">
            Send reset link
          </SubmitButton>
        </form>
      )}
    </AuthLayout>
  );
}
