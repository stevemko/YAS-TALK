import axios from 'axios';

// One address for the whole site. Both variable names work, so whichever one
// is already set on Vercel keeps working. In dev, Vite proxies /api to Django.
const baseURL =
  import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '/api';

function read(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function write(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage blocked (private mode) */
  }
}
function remove(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* storage blocked */
  }
}

export const tokenStore = {
  get access() {
    return read('access');
  },
  get refresh() {
    return read('refresh');
  },
  get user() {
    try {
      return JSON.parse(read('user'));
    } catch {
      return null;
    }
  },
  save({ access, refresh, user }) {
    if (access) write('access', access);
    if (refresh) write('refresh', refresh);
    if (user) write('user', JSON.stringify(user));
  },
  setUser(user) {
    write('user', JSON.stringify(user));
  },
  clear() {
    ['access', 'refresh', 'user'].forEach(remove);
  },
};

function expiresSoon(token, seconds = 30) {
  try {
    const payload = JSON.parse(
      atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
    );
    return payload.exp * 1000 - Date.now() < seconds * 1000;
  } catch {
    return true;
  }
}

// Only one refresh runs at a time, even if several requests need it at once.
let refreshing = null;

export function refreshAccess() {
  if (refreshing) return refreshing;
  const refresh = tokenStore.refresh;
  if (!refresh) return Promise.reject(new Error('No refresh token'));

  refreshing = axios
    .post(`${baseURL}/auth/refresh/`, { refresh })
    .then(({ data }) => {
      // The backend rotates refresh tokens, so keep the new one.
      tokenStore.save({ access: data.access, refresh: data.refresh });
      return data.access;
    })
    .catch((err) => {
      const status = err.response?.status;
      if (status === 400 || status === 401) {
        tokenStore.clear();
        window.dispatchEvent(new Event('auth:logout'));
      }
      throw err;
    })
    .finally(() => {
      refreshing = null;
    });
  return refreshing;
}

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach the login token, refreshing it first if it is about to expire.
// Requests marked skipAuth (login, register, password reset) never send it.
api.interceptors.request.use(async (config) => {
  if (config.skipAuth) return config;
  let access = tokenStore.access;
  if (access && tokenStore.refresh && expiresSoon(access)) {
    try {
      access = await refreshAccess();
    } catch {
      access = null;
    }
  }
  if (access) config.headers.Authorization = `Bearer ${access}`;
  return config;
});

// If the server still says 401, refresh once and retry the request.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (
      error.response?.status === 401 &&
      original &&
      !original.skipAuth &&
      !original._retried &&
      tokenStore.refresh
    ) {
      original._retried = true;
      try {
        const access = await refreshAccess();
        original.headers.Authorization = `Bearer ${access}`;
        return api(original);
      } catch {
        /* fall through to the original error */
      }
    }
    return Promise.reject(error);
  }
);

// Turns any API failure into { message, fields } that a form can show.
export function parseApiError(err) {
  if (!err?.response) {
    return {
      message: 'Cannot reach the server. Check your connection and try again.',
      fields: {},
    };
  }
  const { status, data } = err.response;
  const fields = {};
  let message = '';

  if (data && typeof data === 'object') {
    message = data.error || data.detail || '';
    for (const [key, value] of Object.entries(data)) {
      if (key === 'non_field_errors' && Array.isArray(value)) {
        message = value.join(' ');
      } else if (Array.isArray(value)) {
        fields[key] = value.join(' ');
      }
    }
  }
  if (status === 429) {
    message = data?.error || 'Too many attempts. Please wait a few minutes and try again.';
  } else if (status === 401 && !data?.error) {
    message = 'Please log in to continue.';
  }
  if (!message && !Object.keys(fields).length) {
    message = 'Something went wrong. Please try again.';
  }
  return { message, fields };
}

/* ---- Public site content ---- */

export async function fetchSiteMeta() {
  const { data } = await api.get('/meta/');
  return data;
}

export async function subscribeToNewsletter(email) {
  const { data } = await api.post('/newsletter/', { email });
  return data;
}

/* ---- Needs a logged-in account ---- */

// The server fills in your name and email from your account.
export async function submitContactMessage({ subject = '', message }) {
  const { data } = await api.post('/contact/', { subject, message });
  return data;
}

export async function initiatePayment({ plan, phone }) {
  const { data } = await api.post('/payments/initiate/', { plan, phone });
  return data;
}

export async function fetchPaymentStatus(id) {
  const { data } = await api.get(`/payments/${id}/status/`);
  return data;
}

export async function fetchPayments() {
  const { data } = await api.get('/payments/');
  return data;
}
