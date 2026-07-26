/**
 * Simple fetch helper for backend API routes.
 * Vite dev server proxies /api → http://localhost:3001
 */
const API_BASE = import.meta.env.VITE_API_URL || '';

async function fetchJson(path) {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

export const api = {
  health: () => fetchJson('/api/health'),
  stats: () => fetchJson('/api/stats'),
  castles: () => fetchJson('/api/castles'),
};
export async function fetchApi(endpoint) {
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export function formatSiegeDate(timestamp) {
  if (!timestamp || timestamp <= 0) return 'TBA';

  const date = new Date(Number(timestamp));
  if (Number.isNaN(date.getTime())) return 'TBA';

  return date.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatNumber(value) {
  return new Intl.NumberFormat().format(value ?? 0);
}
