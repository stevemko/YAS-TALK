import { api } from './client';

// skipAuth: these calls never send a login token.
const open = { skipAuth: true };

export const register = (data) =>
  api.post('/auth/register/', data, open).then((r) => r.data);

export const login = (email, password) =>
  api.post('/auth/login/', { email, password }, open).then((r) => r.data);

export const logout = (refresh) =>
  api.post('/auth/logout/', { refresh }, open).then(() => undefined);

export const getMe = () => api.get('/auth/me/').then((r) => r.data);

export const requestPasswordReset = (email) =>
  api.post('/auth/password-reset/', { email }, open).then((r) => r.data);

export const confirmPasswordReset = ({ uid, token, password }) =>
  api
    .post('/auth/password-reset/confirm/', { uid, token, password }, open)
    .then((r) => r.data);
