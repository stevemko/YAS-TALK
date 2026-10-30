// What each plan shows on the pricing and checkout pages.
//
// The KEYS (mini, basic, standard, premium) must match PLANS in the backend
// (core/payment_views.py). PRICES are deliberately NOT here: the server owns them
// and the site reads them from GET /api/payments/plans/, so the price on screen
// is always the price that gets charged.
//
// DRAFT COPY: replace the names, taglines and features below with what each
// plan really includes.

export const BILLING_LABEL = 'per month';

export const PLAN_COPY = {
  mini: {
    name: 'Mini',
    tagline: 'For quick messages',
    features: ['Text translation', 'English, French, Lingala, Swahili and Arabic'],
  },
  basic: {
    name: 'Basic',
    tagline: 'For talking, not just typing',
    features: ['Everything in Mini', 'Voice translation'],
  },
  standard: {
    name: 'Standard',
    tagline: 'For real conversations',
    features: ['Everything in Basic', 'Live conversation mode', 'Camera translation'],
    featured: true,
  },
  premium: {
    name: 'Premium',
    tagline: 'For everything, even offline',
    features: ['Everything in Standard', 'Offline language packs', 'Document translation'],
  },
};

export function formatKsh(amount) {
  return `KSh ${Number(amount).toLocaleString('en-KE')}`;
}

export function planName(key) {
  return PLAN_COPY[key]?.name || key.charAt(0).toUpperCase() + key.slice(1);
}
