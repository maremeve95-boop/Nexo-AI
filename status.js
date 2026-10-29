'use strict';
const { json, verifyUser, getWallet, hasPaymentConfig } = require('../../lib/nexo-billing');
module.exports = async function handler(req, res) {
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return json(res, 405, { error: 'Método no permitido.' }); }
  try {
    const user = await verifyUser(req);
    const wallet = await getWallet(user.id);
    const premiumUntil = wallet.premium_until || null;
    return json(res, 200, {
      configured: hasPaymentConfig(), user: { id: user.id, email: user.email },
      credits: Math.max(0, Number(wallet.credits) || 0),
      premiumUntil,
      premiumActive: !!premiumUntil && Date.parse(premiumUntil) > Date.now(),
      stripeCustomerLinked: !!wallet.stripe_customer_id
    });
  } catch (error) { return json(res, error.statusCode || 502, { error: error.message || 'No se ha podido consultar la cartera.' }); }
};
