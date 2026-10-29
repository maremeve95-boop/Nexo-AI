'use strict';
const { APP_URL, STRIPE_SECRET_KEY, verifyUser, getWallet, json } = require('../../lib/nexo-billing');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return json(res, 405, { error: 'Método no permitido.' }); }
  if (!STRIPE_SECRET_KEY || !APP_URL) return json(res, 503, { error: 'El portal de facturación todavía no está configurado.' });
  try {
    const user = await verifyUser(req);
    const wallet = await getWallet(user.id);
    const customerId = String(wallet.stripe_customer_id || '');
    if (!customerId) return json(res, 404, { error: 'Esta cuenta Nexo todavía no tiene una compra o suscripción de Stripe asociada.' });
    const params = new URLSearchParams({ customer: customerId, return_url: `${APP_URL}/?nexoPortal=return` });
    const response = await fetch('https://api.stripe.com/v1/billing_portal/sessions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${STRIPE_SECRET_KEY}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      signal: AbortSignal.timeout(12000)
    });
    const portal = await response.json().catch(() => ({}));
    if (!response.ok || !portal.url) return json(res, 502, { error: portal.error?.message || 'Stripe no ha podido abrir el portal de facturación.' });
    return json(res, 200, { url: portal.url });
  } catch (error) {
    return json(res, error.statusCode || 502, { error: error.message || 'No se ha podido abrir el portal de facturación.' });
  }
};
