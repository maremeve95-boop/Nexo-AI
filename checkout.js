'use strict';
const { APP_URL, STRIPE_SECRET_KEY, PRODUCTS, priceIdFor, stripeReadyFor, verifyUser, getWallet, json } = require('../../lib/nexo-billing');
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return json(res, 405, { error: 'Método no permitido.' }); }
  try {
    const user = await verifyUser(req);
    const productKey = String(req.body?.product || '');
    const product = PRODUCTS[productKey];
    const priceId = priceIdFor(productKey);
    const wallet = await getWallet(user.id);
    if (productKey === 'premium' && wallet.premium_until && Date.parse(wallet.premium_until) > Date.now()) {
      return json(res, 409, { error: 'Nexo Premium ya está activo en esta cuenta. Usa “Gestionar suscripción” para cambiarlo o cancelarlo.' });
    }
    if (!product || !priceId) return json(res, 400, { error: 'Ese producto todavía no está configurado en Stripe.' });
    if (!stripeReadyFor(productKey)) return json(res, 503, { error: 'La facturación aún no está totalmente configurada. No se ha realizado ningún cobro.' });
    const params = new URLSearchParams();
    params.set('mode', product.mode);
    params.set('line_items[0][price]', priceId);
    params.set('line_items[0][quantity]', '1');
    // Use Stripe Checkout's documented payment_method_types[] parameter.
    // This requests card + PayPal; Stripe only offers each method if the
    // account, currency, product and subscription flow are eligible/configured.
    params.set('payment_method_types[0]', 'card');
    params.set('payment_method_types[1]', 'paypal');
    params.set('locale', 'auto');
    params.set('success_url', `${APP_URL}/?nexoPayment=success`);
    params.set('cancel_url', `${APP_URL}/?nexoPayment=cancel`);
    params.set('client_reference_id', user.id);
    if (wallet.stripe_customer_id) params.set('customer', wallet.stripe_customer_id);
    else if (user.email) params.set('customer_email', user.email);
    params.set('metadata[user_id]', user.id);
    params.set('metadata[kind]', productKey);
    params.set('metadata[credit_amount]', String(product.credits || 0));
    if (product.mode === 'subscription') {
      params.set('subscription_data[metadata][user_id]', user.id);
      params.set('subscription_data[metadata][kind]', 'premium');
      params.set('subscription_data[metadata][monthly_credits]', String(product.monthlyCredits));
    }
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST', headers: { Authorization: `Bearer ${STRIPE_SECRET_KEY}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(), signal: AbortSignal.timeout(12000)
    });
    const session = await response.json();
    if (!response.ok || !session.url) return json(res, 502, { error: session.error?.message || 'Stripe no ha podido crear el checkout.' });
    return json(res, 200, { url: session.url });
  } catch (error) { return json(res, error.statusCode || 502, { error: error.message || 'No se ha podido iniciar el checkout.' }); }
};
