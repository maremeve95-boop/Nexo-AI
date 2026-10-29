'use strict';
const { PRODUCTS, STRIPE_SECRET_KEY, hasAuthConfig, hasPaymentConfig, priceIdFor, json } = require('../../lib/nexo-billing');

async function getStripePrice(priceId, expectedMode) {
  if (!priceId || !STRIPE_SECRET_KEY) return null;
  try {
    const r = await fetch(`https://api.stripe.com/v1/prices/${encodeURIComponent(priceId)}`, {
      headers: { Authorization: `Bearer ${STRIPE_SECRET_KEY}` }, signal: AbortSignal.timeout(7000)
    });
    const price = await r.json();
    if (!r.ok || price.active !== true || price.unit_amount == null || !Number.isFinite(Number(price.unit_amount))) return null;
    const isRecurring = !!price.recurring;
    if ((expectedMode === 'subscription') !== isRecurring) return null;
    const formatted = new Intl.NumberFormat('es-ES', { style: 'currency', currency: String(price.currency || 'eur').toUpperCase() }).format(Number(price.unit_amount) / 100);
    const label = formatted + (price.recurring?.interval ? ` / ${price.recurring.interval === 'month' ? 'mes' : price.recurring.interval === 'year' ? 'año' : price.recurring.interval}` : '');
    return { label, id: price.id, active: true };
  } catch { return null; }
}
module.exports = async function handler(req, res) {
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return json(res, 405, { error: 'Método no permitido.' }); }
  const entries = await Promise.all(Object.entries(PRODUCTS).map(async ([key, definition]) => {
    const priceId = priceIdFor(key);
    const price = await getStripePrice(priceId, definition.mode);
    return [key, {
      name: key === 'premium' ? 'Nexo Premium' : key === 'credits_500' ? 'Pack 500 créditos' : 'Pack 2.000 créditos',
      kind: definition.mode,
      credits: key === 'premium' ? definition.monthlyCredits : definition.credits,
      configured: !!price,
      price: price?.label || null
    }];
  }));
  const products = Object.fromEntries(entries);
  return json(res, 200, {
    authReady: hasAuthConfig(),
    paymentsReady: hasPaymentConfig() && Object.values(products).some(p => p.configured),
    products,
    auth: hasAuthConfig() ? { url: process.env.SUPABASE_URL, anonKey: process.env.SUPABASE_ANON_KEY } : null,
    paymentMethods: {
      strategy: 'explicit-eligible-list',
      requested: ['card', 'paypal'],
      note: 'Checkout solicita tarjeta y PayPal con payment_method_types; Stripe solo acepta/muestra los métodos elegibles para esta cuenta, moneda y producto. PayPal para suscripciones puede requerir aprobación adicional.'
    },
    notice: 'Los créditos Nexo son independientes del saldo de Puter. El saldo comprado solo se usa en el modo de continuidad de Nexo.'
  });
};
