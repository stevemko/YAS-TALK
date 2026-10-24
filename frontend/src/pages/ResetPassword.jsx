import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { confirmPasswordReset } from '../api/auth';
import { parseApiError } from '../api/client';
import AuthLayout, {
  Field,
  FormError,
  SubmitButton,
  authLink,
} from '../components/auth/AuthLayout';

export default function ResetPassword() {
  const [params] = useSearchParams();
  const uid = params.get('uid') || '';
  const token = params.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldError('');

    if (password !== confirm) {
      setFieldError('The two passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await confirmPasswordReset({ uid, token, password });
      setDone(true);
    } catch (err) {
      const { message, fields } = parseApiError(err);
      setFieldError(fields.password || '');
      setError(fields.password ? '' : message);
    } finally {
      setLoading(false);
    }
  };

  if (!uid || !token) {
    return (
      <AuthLayout
        title="This link will not work"
        subtitle="The reset link is incomplete or has expired."
        footer={
          <Link to="/forgot-password" className={authLink}>
            Get a new reset link
          </Link>
        }
      />
    );
  }

  return (
    <AuthLayout
      title="Choose a new password"
      subtitle="You will be logged out everywhere else when you save it."
      footer={
        <Link to="/login" className={authLink}>
          Back to log in
        </Link>
      }
    >
      {done ? (
        <p role="status" className="rounded-xl border border-gold/50 bg-gold/10 px-4 py-4 text-ink">
          Your password is updated.{' '}
          <Link to="/login" className={authLink}>
            Log in
          </Link>{' '}
          with the new one.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormError message={error} />
          <Field
            label="New password"
            name="password"
            type="password"
            autoComplete="new-password"
            hint="At least 10 characters. Avoid common passwords and all-number passwords."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldError}
            required
          />
          <Field
            label="Repeat new password"
            name="confirm"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <SubmitButton loading={loading} loadingText="Saving...">
            Save new password
          </SubmitButton>
        </form>
      )}
    </AuthLayout>
  );
}
