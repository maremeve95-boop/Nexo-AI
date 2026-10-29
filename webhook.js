'use strict';
const crypto = require('node:crypto');
const { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, json, applyBillingEvent } = require('../../lib/nexo-billing');

module.exports.config = { api: { bodyParser: false } };
async function readRawBody(req) {
  const parts = [];
  for await (const part of req) parts.push(Buffer.isBuffer(part) ? part : Buffer.from(part));
  return Buffer.concat(parts);
}
function validSignature(raw, header) {
  if (!STRIPE_WEBHOOK_SECRET || !header) return false;
  const entries = String(header).split(',').map(x => x.split('='));
  const timestamp = entries.find(x => x[0] === 't')?.[1];
  const signatures = entries.filter(x => x[0] === 'v1').map(x => x[1]);
  if (!timestamp || !signatures.length || Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;
  const expected = crypto.createHmac('sha256', STRIPE_WEBHOOK_SECRET).update(`${timestamp}.${raw.toString('utf8')}`).digest();
  return signatures.some(hex => {
    try { const candidate = Buffer.from(hex, 'hex'); return candidate.length === expected.length && crypto.timingSafeEqual(candidate, expected); } catch { return false; }
  });
}
async function stripeGet(path) {
  const r = await fetch(`https://api.stripe.com/v1/${path}`, { headers: { Authorization: `Bearer ${STRIPE_SECRET_KEY}` }, signal: AbortSignal.timeout(10000) });
  const body = await r.json();
  if (!r.ok) throw new Error(body.error?.message || `Stripe HTTP ${r.status}`);
  return body;
}
async function applySubscriptionEvent(event, sub, creditDelta = 0) {
  const userId = sub?.metadata?.user_id;
  if (!userId) throw new Error('La suscripción no contiene metadata.user_id.');
  const activeStatus = ['active', 'trialing'].includes(sub.status);
  const currentEnd = Number(sub.current_period_end || 0);
  const premiumUntil = activeStatus && currentEnd > 0 ? new Date(currentEnd * 1000).toISOString() : new Date().toISOString();
  return applyBillingEvent({ eventId: event.id, eventType: event.type, userId, creditDelta, premiumUntil, customerId: sub.customer || null });
}
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return json(res, 405, { error: 'Método no permitido.' }); }
  if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET) return json(res, 503, { error: 'Falta configurar Stripe en el servidor.' });
  try {
    const raw = await readRawBody(req);
    if (!validSignature(raw, req.headers['stripe-signature'])) return json(res, 400, { error: 'Firma de Stripe no válida.' });
    const event = JSON.parse(raw.toString('utf8'));
    const object = event.data?.object || {};
    if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
      const userId = object.metadata?.user_id || object.client_reference_id;
      const kind = object.metadata?.kind;
      if (!userId) throw new Error('La sesión de Checkout no incluye user_id.');
      if (kind === 'credits_500' || kind === 'credits_2000') {
        if (object.payment_status === 'paid' || event.type === 'checkout.session.async_payment_succeeded') {
          const amount = kind === 'credits_500' ? 500 : 2000;
          await applyBillingEvent({ eventId: event.id, eventType: event.type, userId, creditDelta: amount, customerId: object.customer || null });
        }
      } else if (kind === 'premium' && object.subscription) {
        const sub = await stripeGet(`subscriptions/${encodeURIComponent(object.subscription)}`);
        await applySubscriptionEvent(event, { ...sub, metadata: { ...(sub.metadata || {}), user_id: sub.metadata?.user_id || userId } }, 0);
      }
    } else if (event.type === 'invoice.paid') {
      const subId = object.subscription || object.parent?.subscription_details?.subscription;
      if (subId) {
        const sub = await stripeGet(`subscriptions/${encodeURIComponent(subId)}`);
        if (sub.metadata?.kind === 'premium' || sub.metadata?.user_id) await applySubscriptionEvent(event, sub, Number(sub.metadata?.monthly_credits) || 1200);
      }
    } else if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
      const sub = object;
      if (sub.metadata?.user_id) await applySubscriptionEvent(event, sub, 0);
    }
    return json(res, 200, { received: true });
  } catch (error) {
    console.error('Nexo billing webhook error:', error.message);
    return json(res, 500, { error: 'No se ha podido procesar el evento de facturación.' });
  }
};
