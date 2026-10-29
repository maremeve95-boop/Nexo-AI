# Créditos Nexo

## Reglas de la cartera

- El saldo real se guarda en `public.nexo_wallets.credits` de Supabase, no en `localStorage`.
- Un pago solo concede créditos después de que el webhook firmado de Stripe lo confirme.
- El servidor limita productos y cantidades usando una lista fija; el cliente no puede enviar un importe de créditos arbitrario.
- Las llamadas de IA del modo de créditos requieren una sesión de cuenta Nexo verificada en Supabase.
- El coste por respuesta se aplica en el servidor: `4-lite=1`, `4.1=1`, `4.5=2`, `5=3`, `7=4`, `papoi8=5`, `anacleto-pro=6`. Los perfiles reservados 5.5/6 no pueden utilizar este endpoint.
- La base de datos consume créditos bajo bloqueo de fila; si el proveedor falla, se intenta una devolución idempotente.
- `invoice.paid` añade 1.200 créditos por renovación Premium. El webhook impide procesar dos veces un mismo ID de evento.

## Lo que NO hace

- No añade saldo a Puter. Cada cuenta Puter conserva su propio sistema de asignación y compra de crédito.
- No se habilitan pagos reales hasta configurar Supabase, Stripe, webhook y proveedor de IA en Vercel.
- No hay precios preseleccionados en el código: los define el propietario en Stripe, y la app lee los valores públicos desde la API.

- El endpoint `/api/billing/portal` permite que un cliente vinculado abra Stripe Customer Portal para gestionar o cancelar la suscripción; activa la función de Customer Portal en la configuración de Stripe.
