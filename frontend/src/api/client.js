import axios from 'axios';

// In dev, Vite proxies /api to the Django server (see vite.config.js).
// In production, set VITE_API_BASE_URL to your deployed Django host.
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

export async function fetchSiteMeta() {
  const { data } = await api.get('/meta/');
  return data; // { languages, services, testimonials }
}

export async function submitContactMessage(payload) {
  const { data } = await api.post('/contact/', payload);
  return data;
}

export async function subscribeToNewsletter(email) {
  const { data } = await api.post('/newsletter/', { email });
  return data;
}
