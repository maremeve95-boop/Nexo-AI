'use strict';

const SUPABASE_URL = String(process.env.SUPABASE_URL || '').replace(/\/+$/, '');
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const APP_URL = String(process.env.APP_URL || '').replace(/\/+$/, '');

const PRODUCTS = Object.freeze({
  premium: { env: 'STRIPE_PRICE_PREMIUM_MONTHLY', mode: 'subscription', monthlyCredits: 1200 },
  credits_500: { env: 'STRIPE_PRICE_CREDITS_500', mode: 'payment', credits: 500 },
  credits_2000: { env: 'STRIPE_PRICE_CREDITS_2000', mode: 'payment', credits: 2000 }
});

function hasAuthConfig() { return !!(SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_SERVICE_ROLE_KEY); }
function hasPaymentConfig() { return !!(hasAuthConfig() && STRIPE_SECRET_KEY && STRIPE_WEBHOOK_SECRET && APP_URL && OPENAI_API_KEY && process.env.OPENAI_MODEL_DEFAULT); }
function priceIdFor(product) { const cfg = PRODUCTS[product]; return cfg ? String(process.env[cfg.env] || '') : ''; }
function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}
async function verifyUser(req) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    const e = new Error('La cuenta Nexo no está configurada. Configura Supabase en Vercel.'); e.statusCode = 503; throw e;
  }
  const auth = String(req.headers.authorization || '');
  const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
  if (!token) { const e = new Error('Inicia sesión con tu cuenta Nexo para utilizar la cartera.'); e.statusCode = 401; throw e; }
  const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(10000)
  });
  const user = await response.json().catch(() => ({}));
  if (!response.ok || !user || !user.id) { const e = new Error('La sesión de Nexo ha caducado. Vuelve a iniciar sesión.'); e.statusCode = 401; throw e; }
  return { id: user.id, email: user.email || null };
}
async function adminRest(path, options = {}) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) throw new Error('Falta configurar Supabase en el servidor.');
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    signal: options.signal || AbortSignal.timeout(12000)
  });
  const raw = await response.text();
  let body = null;
  try { body = raw ? JSON.parse(raw) : null; } catch { body = raw; }
  if (!response.ok) {
    const e = new Error(typeof body === 'object' ? body.message || body.error || `Supabase devolvió HTTP ${response.status}.` : `Supabase devolvió HTTP ${response.status}.`);
    e.statusCode = response.status >= 400 && response.status < 500 ? response.status : 502;
    throw e;
  }
  return body;
}
async function rpc(name, args) {
  const result = await adminRest(`rpc/${encodeURIComponent(name)}`, { method: 'POST', body: JSON.stringify(args) });
  return result;
}
async function getWallet(userId) {
  const rows = await adminRest(`nexo_wallets?select=user_id,credits,premium_until,stripe_customer_id&user_id=eq.${encodeURIComponent(userId)}&limit=1`);
  if (Array.isArray(rows) && rows[0]) return rows[0];
  // Create an empty wallet only on the server; the service key never reaches the browser.
  await adminRest('nexo_wallets?on_conflict=user_id', {
    method: 'POST', headers: { Prefer: 'resolution=ignore-duplicates,return=minimal' },
    body: JSON.stringify({ user_id: userId, credits: 0 })
  });
  const createdOrExisting = await adminRest(`nexo_wallets?select=user_id,credits,premium_until,stripe_customer_id&user_id=eq.${encodeURIComponent(userId)}&limit=1`);
  return Array.isArray(createdOrExisting) && createdOrExisting[0] ? createdOrExisting[0] : { user_id: userId, credits: 0, premium_until: null, stripe_customer_id: null };
}
async function applyBillingEvent({ eventId, eventType, userId, creditDelta = 0, premiumUntil = null, customerId = null }) {
  return rpc('apply_nexo_purchase', {
    p_event_id: eventId,
    p_event_type: eventType,
    p_user_id: userId,
    p_credit_delta: Math.max(0, Number(creditDelta) || 0),
    p_premium_until: premiumUntil,
    p_stripe_customer_id: customerId
  });
}
function stripeReadyFor(product) {
  return !!(STRIPE_SECRET_KEY && STRIPE_WEBHOOK_SECRET && priceIdFor(product) && APP_URL && hasAuthConfig() && OPENAI_API_KEY && process.env.OPENAI_MODEL_DEFAULT);
}
module.exports = {
  APP_URL, PRODUCTS, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, OPENAI_API_KEY,
  SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY,
  hasAuthConfig, hasPaymentConfig, priceIdFor, stripeReadyFor, json, verifyUser, adminRest, rpc, getWallet, applyBillingEvent
};
