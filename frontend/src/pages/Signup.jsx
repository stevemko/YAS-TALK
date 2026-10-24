import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register, login as apiLogin } from '../api/auth';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Password strength helpers
  const getStrengthWidth = (password) => {
    if (password.length < 6) return '25%';
    if (password.length < 8) return '50%';
    if (password.length < 10) return '75%';
    return '100%';
  };

  const getStrengthColor = (password) => {
    if (password.length < 6) return '#f87171'; // red
    if (password.length < 8) return '#fbbf24'; // yellow
    if (password.length < 10) return '#60a5fa'; // blue
    return '#4ade80'; // green
  };

  const getStrengthLabel = (password) => {
    if (password.length < 6) return 'Very weak';
    if (password.length < 8) return 'Weak – add more characters';
    if (password.length < 10) return 'Good';
    return 'Strong password';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Create the account on Django
      await register(form);

      // 2. Automatically log the user in
      const data = await apiLogin(form.email, form.password);

      // 3. Update global auth state
      login(data);

      // 4. Redirect
      navigate('/app');
    } catch (err) {
      // Handle Django validation errors nicely
      if (err.email) {
        setError(err.email[0]);
      } else if (err.password) {
        setError(err.password[0]);
      } else if (err.phone) {
        setError(err.phone[0]);
      } else if (err.first_name) {
        setError(err.first_name[0]);
      } else {
        setError(err.error || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0f172a',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: '#1e293b',
          padding: '36px 32px',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        }}
      >
        <h1
          style={{
            color: '#f8fafc',
            textAlign: 'center',
            marginBottom: '24px',
            fontSize: '28px',
          }}
        >
          Create Account
        </h1>

        {error && (
          <div
            style={{
              background: '#7f1d1d',
              color: '#fecaca',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                color: '#e2e8f0',
                marginBottom: '6px',
                fontSize: '14px',
              }}
            >
              First Name *
            </label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Last Name */}
          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                color: '#e2e8f0',
                marginBottom: '6px',
                fontSize: '14px',
              }}
            >
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                color: '#e2e8f0',
                marginBottom: '6px',
                fontSize: '14px',
              }}
            >
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Phone */}
          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                color: '#e2e8f0',
                marginBottom: '6px',
                fontSize: '14px',
              }}
            >
              Phone (optional)
            </label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="0712345678"
              style={inputStyle}
            />
          </div>

          {/* Password with dynamic strength */}
          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                color: '#e2e8f0',
                marginBottom: '6px',
                fontSize: '14px',
              }}
            >
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            {/* Dynamic strength feedback */}
            {form.password.length > 0 && (
              <div style={{ marginTop: '10px' }}>
                {/* Strength bar */}
                <div
                  style={{
                    height: '6px',
                    borderRadius: '4px',
                    backgroundColor: '#334155',
                    overflow: 'hidden',
                    marginBottom: '6px',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: getStrengthWidth(form.password),
                      backgroundColor: getStrengthColor(form.password),
                      transition: 'all 0.3s ease',
                    }}
                  />
                </div>

                {/* Strength text */}
                <p
                  style={{
                    fontSize: '13px',
                    color: getStrengthColor(form.password),
                    margin: 0,
                  }}
                >
                  {getStrengthLabel(form.password)}
                </p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: loading ? '#92400e' : '#f59e0b',
              color: '#111827',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p
          style={{
            textAlign: 'center',
            marginTop: '24px',
            color: '#94a3b8',
            fontSize: '14px',
          }}
        >
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#f59e0b', fontWeight: 600 }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

// Shared input style
const inputStyle = {
  width: '100%',
  padding: '13px 14px',
  borderRadius: '8px',
  border: '1px solid #475569',
  backgroundColor: '#0f172a',
  color: '#f1f5f9',
  fontSize: '15px',
};