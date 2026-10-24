import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../api/auth';
import { parseApiError } from '../api/client';
import { useAuth } from '../context/AuthContext';
import AuthLayout, {
  Field,
  FormError,
  SubmitButton,
  afterAuthPath,
  authLink,
} from '../components/auth/AuthLayout';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await apiLogin(email.trim(), password);
      login(data);
      const intent = location.state?.intent;
      navigate(afterAuthPath(location.state), {
        replace: true,
        state: intent ? { resume: intent } : undefined,
      });
    } catch (err) {
      setError(parseApiError(err).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Log in"
      subtitle="Log in to subscribe, pay and message the team."
      notice={location.state?.reason}
      footer={
        <>
          New to YasTalk?{' '}
          <Link to="/signup" state={location.state} className={authLink}>
            Create an account
          </Link>
        </>
      }
    >
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
        <div>
          <Field
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="mt-2 text-right text-sm">
            <Link to="/forgot-password" className={authLink}>
              Forgot password?
            </Link>
          </div>
        </div>
        <SubmitButton loading={loading} loadingText="Logging in...">
          Log in
        </SubmitButton>
      </form>
    </AuthLayout>
  );
}
