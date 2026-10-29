# Nexo Premium y créditos reales — configuración paso a paso

## Métodos de pago: tarjeta y PayPal (v8.1.2)

Nexo usa **Stripe Checkout alojado** para que los datos de tarjeta y PayPal se introduzcan directamente en Stripe, no en el HTML de Nexo. El endpoint `api/billing/checkout.js` solicita los métodos `card` y `paypal` mediante el parámetro documentado `payment_method_types[]` de Checkout Session. Stripe solo permite completar el pago con métodos habilitados y elegibles para la cuenta, la moneda, el producto y el tipo de compra. PayPal para suscripciones puede requerir aprobación adicional.

### Activar tarjeta y PayPal

1. Abre el **Stripe Dashboard** de la cuenta que va a recibir los pagos.
2. En **Settings → Payments → Payment methods**, comprueba que **Cards** esté activado.
3. Activa **PayPal** y completa el proceso de incorporación/verificación que Stripe solicite. La disponibilidad depende de la elegibilidad del negocio. Stripe indica que PayPal está disponible para empresas establecidas en la Unión Europea (con excepciones indicadas en su documentación) y España aparece entre los países admitidos.
4. Actívalo primero en **modo de pruebas** y prueba el flujo de Checkout. Los ajustes, los productos/precios y las claves de prueba y de producción deben gestionarse con cuidado.
5. Para **Nexo Premium (suscripción mensual)**, PayPal para pagos recurrentes puede necesitar aprobación adicional. Si todavía no está aprobado, Stripe puede mostrar tarjeta y omitir PayPal en esa suscripción. Los paquetes de créditos son pagos únicos y pueden tener disponibilidad distinta.

La interfaz de Nexo muestra los métodos previstos, pero no puede confirmar desde el navegador que PayPal esté aprobado/activo en la cuenta de Stripe. Los métodos definitivos aparecen en Checkout. Si PayPal no aparece, revisa Payment methods en el Dashboard, el modo test/live, la moneda y los requisitos de aprobación.

Referencias oficiales: [PayPal en Stripe](https://stripe.com/en-es/payment-method/paypal), [Disponibilidad de PayPal en Stripe](https://support.stripe.com/questions/paypal-payment-method-availability), [Crear una Checkout Session](https://docs.stripe.com/api/checkout/sessions/create).

> **Titularidad y edad:** la cuenta de cobros debe pertenecer a una persona o entidad legalmente elegible. Si el creador del proyecto es menor de 18 años, un tutor legal debe ser el titular/responsable de Stripe y de los cobros; no se debe falsear la edad ni evitar verificaciones del proveedor.

---


## Qué significan los dos saldos

- **Puter:** su asignación/crédito pertenece a la cuenta de cada usuario y Puter lo factura directamente. Nexo no puede transferirlo ni recargarlo mediante Stripe.
- **Créditos Nexo:** son un saldo de nuestra aplicación guardado en Supabase y modificado únicamente por funciones de servidor. Se utilizan al continuar una conversación en el modo «Créditos Nexo», que llama al modelo de OpenAI con la clave privada guardada en Vercel. Por tanto, el dueño de Nexo paga el consumo de esa clave y debe fijar precios sostenibles.

La interfaz de pagos viene desactivada por defecto. No habrá cobros hasta completar toda esta guía y probar el flujo en modo de pruebas.

## 1. Crea el proyecto de base de datos y acceso

1. Crea un proyecto Supabase.
2. En **SQL Editor**, ejecuta el archivo `supabase/SUPABASE_SETUP.sql` incluido en este ZIP.
3. En **Authentication → Providers**, activa Email/Password.
4. Configura las URLs permitidas de inicio de sesión/confirmación para la URL HTTPS del proyecto Vercel y las URL de prueba que uses.
5. Copia el Project URL, la publishable/anon key y la service-role key. La service-role es secreta y solo debe ir a variables de entorno del servidor.

La app tiene una **cuenta Nexo** independiente de la sesión Puter. Esa cuenta se utiliza para autenticar la cartera, las compras y las peticiones con créditos.

## 2. Crea productos y precios en Stripe

Usa primero el modo de pruebas de Stripe. Crea los productos:

- **Nexo Premium:** suscripción mensual recurrente. Cada pago mensual confirmado añade 1.200 créditos.
- **Pack 500 créditos:** pago único que añade 500 créditos.
- **Pack 2.000 créditos:** pago único que añade 2.000 créditos.

Decide los precios después de calcular los costes actuales del modelo, los impuestos, las comisiones y posibles reembolsos. Nexo cobra créditos por respuesta (1/1/2/3/4/5/6 según perfil); el coste real de la API depende también del modelo y la longitud. No publiques precios sin probar primero la rentabilidad y las condiciones legales.

Copia los tres Price IDs del catálogo de Stripe; la interfaz muestra el precio real mediante una consulta al servidor. Si un Price ID falta, no muestra un precio inventado y no se realizará ningún cobro; la pantalla informa de que falta configurar el producto.

## 3. Crea un webhook de Stripe

En Stripe Developers → Webhooks, añade un endpoint:

`https://TU-URL-DE-VERCEL/api/billing/webhook`

Selecciona estos eventos:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `invoice.paid`
- `customer.subscription.updated`
- `customer.subscription.deleted`

Guarda la firma `whsec_...` para usarla como `STRIPE_WEBHOOK_SECRET`. El servidor valida la firma de los eventos, y la tabla `nexo_stripe_events` evita volver a conceder créditos al procesar el mismo evento dos veces.

## 4. Configura las variables privadas en Vercel

En Vercel → proyecto → **Settings → Environment Variables**, añade cada variable de `.env.example`. Usa los valores reales de tus servicios, no los del ejemplo:

- `APP_URL`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_PREMIUM_MONTHLY`
- `STRIPE_PRICE_CREDITS_500`
- `STRIPE_PRICE_CREDITS_2000`
- `OPENAI_API_KEY`
- `OPENAI_MODEL_DEFAULT`
- Opcionales: `OPENAI_MODEL_LITE`, `OPENAI_MODEL_RESEARCH`, `OPENAI_MODEL_CODING`, `OPENAI_MODEL_ADVANCED`

El valor de `OPENAI_MODEL_DEFAULT` debe ser un identificador de modelo habilitado en tu proyecto de OpenAI. No copies una clave privada en `index.html`, `.env.example`, mensajes de chat o GitHub.

Después de guardar las variables, vuelve a desplegar el proyecto.

## 5. Prueba antes de cobrar dinero real

1. Comprueba que `/api/billing/config` responde con `authReady: true` y que `paymentsReady` solo se activa cuando están todas las piezas requeridas.
2. Crea una cuenta Nexo, inicia sesión y abre **Nexo Premium y créditos**.
3. Usa Price IDs y claves de prueba de Stripe; completa un Checkout de prueba.
4. Comprueba en Stripe que el webhook llegó, en Supabase que se creó una fila de cartera/ledger y en Nexo que el saldo coincide.
5. Prueba una respuesta en «Créditos Nexo». Debe descontar el coste del perfil, y devolver los créditos si el proveedor falla antes de responder.
6. Prueba cancelaciones, pagos repetidos, falta de créditos y suscripción cancelada antes de activar modo live.

## 6. Límites y responsabilidades

- Los créditos de Nexo son unidades internas por respuesta; **no** son tokens de OpenAI y **no** se pueden convertir en saldo Puter.
- El modo comprado usa la clave de OpenAI del servidor y por tanto genera un gasto para el propietario. Los packs y la cuota mensual se deben dimensionar para que ese gasto no supere los ingresos.
- Los créditos comprados permanecen en el wallet según este código; la suscripción Premium añade 1.200 créditos cuando Stripe confirma cada `invoice.paid`. El estado Premium se mantiene hasta su fecha final de suscripción.
- Esta base técnica no incluye todavía panel de reembolsos, facturas, IVA, términos de venta ni política de privacidad. Añádelos y pruébalos antes de abrirlo al público.
- Si el propietario de Stripe es menor de 18 años, Stripe exige que un tutor legal asuma el papel de titular antes de que la cuenta acepte cargos y transfiera fondos. No intentes saltarte ese requisito; consulta la ayuda oficial de Stripe: https://support.stripe.com/questions/age-requirement-to-create-a-stripe-account?locale=es-ES

## Endpoints incluidos

- `GET /api/billing/config`: estado de configuración y nombres/precios públicos de productos.
- `GET /api/billing/status`: saldo y estado Premium de la cuenta autenticada.
- `POST /api/billing/checkout`: crea la sesión segura de Stripe Checkout.
- `POST /api/billing/portal`: abre el portal de Stripe para gestionar/cancelar una suscripción o revisar los datos de facturación de un cliente ya vinculado.
- `POST /api/billing/webhook`: valida el webhook y concede saldo de forma idempotente.
- `POST /api/billing/chat`: consume créditos de forma atómica y llama al modelo configurado en el servidor.
