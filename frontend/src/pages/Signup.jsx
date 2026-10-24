import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { register, login as apiLogin } from '../api/auth';
import { parseApiError } from '../api/client';
import { useAuth } from '../context/AuthContext';
import AuthLayout, {
  Field,
  FormError,
  SubmitButton,
  afterAuthPath,
  authLink,
} from '../components/auth/AuthLayout';

// The server needs at least 10 characters and rejects common passwords,
// so the meter only judges what we can check here.
function strength(password) {
  if (!password) return null;
  if (password.length < 10) {
    return { width: 'w-1/3', color: 'bg-red-500', label: 'Too short: use at least 10 characters.' };
  }
  const mixed = /[a-z]/i.test(password) && /[^a-z]/i.test(password);
  if (password.length >= 12 && mixed) {
    return { width: 'w-full', color: 'bg-green-600', label: 'Strong password.' };
  }
  return {
    width: 'w-2/3',
    color: 'bg-amber-500',
    label: 'Good. Add numbers or symbols, or make it longer, to make it stronger.',
  };
}

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const meter = strength(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    setLoading(true);

    const payload = { ...form, email: form.email.trim(), phone: form.phone.trim() };

    try {
      await register(payload);
    } catch (err) {
      const { message, fields } = parseApiError(err);
      setFieldErrors(fields);
      setError(Object.keys(fields).length ? '' : message);
      setLoading(false);
      return;
    }

    try {
      // Registering does not log you in, so do that next.
      const data = await apiLogin(payload.email, form.password);
      login(data);
      const intent = location.state?.intent;
      navigate(afterAuthPath(location.state), {
        replace: true,
        state: intent ? { resume: intent } : undefined,
      });
    } catch {
      navigate('/login', {
        replace: true,
        state: { ...location.state, reason: 'Your account is ready. Log in to continue.' },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Browsing never needs one. You need an account to subscribe, pay or send us a message."
      notice={location.state?.reason}
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" state={location.state} className={authLink}>
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormError message={error} />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="First name"
            name="first_name"
            autoComplete="given-name"
            value={form.first_name}
            onChange={handleChange}
            error={fieldErrors.first_name}
            required
          />
          <Field
            label="Last name (optional)"
            name="last_name"
            autoComplete="family-name"
            value={form.last_name}
            onChange={handleChange}
            error={fieldErrors.last_name}
          />
        </div>

        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          error={fieldErrors.email}
          required
        />

        <Field
          label="Phone (optional)"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="0712345678"
          hint="Used to pre-fill your M-Pesa number when you pay."
          value={form.phone}
          onChange={handleChange}
          error={fieldErrors.phone}
        />

        <div>
          <Field
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            hint="At least 10 characters. Avoid common passwords and all-number passwords."
            value={form.password}
            onChange={handleChange}
            error={fieldErrors.password}
            required
          />
          {meter && (
            <div className="mt-3" aria-live="polite">
              <div className="h-1.5 overflow-hidden rounded-full bg-ink/10">
                <div className={`h-full rounded-full transition-all ${meter.width} ${meter.color}`} />
              </div>
              <p className="mt-1.5 text-sm text-ink/70">{meter.label}</p>
            </div>
          )}
        </div>

        <SubmitButton loading={loading} loadingText="Creating account...">
          Create account
        </SubmitButton>
      </form>
    </AuthLayout>
  );
}
