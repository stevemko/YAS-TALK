import { useCallback, useEffect, useState } from 'react';
import { fetchPlans } from '../api/client';
import { PLAN_COPY, planName } from './plans';

// Prices barely change, so keep them for the whole visit instead of refetching per page.
let cached = null;

function build(apiPlans) {
  return apiPlans.map((p) => {
    const copy = PLAN_COPY[p.key] || {};
    return {
      key: p.key,
      amount: p.amount,
      name: planName(p.key),
      tagline: copy.tagline || '',
      features: copy.features || [],
      featured: Boolean(copy.featured),
    };
  });
}

export function usePlans() {
  const [plans, setPlans] = useState(cached);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (cached && attempt === 0) return undefined;
    let cancelled = false;
    fetchPlans()
      .then((data) => {
        cached = build(data.plans || []);
        if (!cancelled) {
          setPlans(cached);
          setError(false);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const reload = useCallback(() => {
    setError(false);
    setAttempt((a) => a + 1);
  }, []);

  return { plans, error, reload };
}
