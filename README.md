# Nexo AI 8.1.1 — Premium opcional y créditos verificados

PWA de Nexo AI con perfiles especializados, memoria local, búsqueda/lectura web, análisis de archivos y generación de proyectos descargables. No hay anuncios ni suscripción obligatoria para desbloquear perfiles. Se incluye una cartera opcional de créditos propios, lista para habilitarse con Stripe + Supabase + un proveedor de IA en el servidor.

## Qué ha mejorado en 7.5
- Peticiones como “hazme un Fortnite” se detectan como tarea de creación y descargable.
- Para juegos 3D, Papoi solicita una escena Three.js/WebGL real y una demo jugable, no una explicación genérica. Si una entrega inicial está vacía o es demasiado básica, intenta una única recuperación con instrucciones estrictas de salida.
- Modelos técnicos ordenados dinámicamente según el catálogo de Puter, priorizando GPT-6 Astra, GPT-6.1 Sol, Claude Sonnet 5.5 y Codex permitidos. Qwen se excluye; Claude Opus y Nexo 5.5/6 siguen reservados.
- Rutas relativas dentro de los ZIP conservadas.
- Nueva caché PWA para la actualización.

## Modelos
- Nexo 4 Lite: estudio.
- Nexo 4.1: general/creativo y predeterminado.
- Nexo 4.5: investigación.
- Nexo 5: programación y depuración; límite local diario.
- Nexo 5.5 y 6: reservados y no seleccionables.
- Nexo 7: Creator Lab.
- Papoi 8: Creator Engine para proyectos, juegos y 3D.

Los nombres Nexo representan perfiles, no redes neuronales entrenadas desde cero. La selección solo puede usar motores que el catálogo del proveedor anuncie realmente. No se garantiza uso gratuito ilimitado.

## Publicar con GitHub + Vercel
1. Descomprime el ZIP.
2. Sube todo el contenido a la raíz del repositorio GitHub manteniendo `icons/` y `api/`.
3. En Vercel importa el repositorio; utiliza preset `Other`, sin build command y Output Directory `.`.
4. Haz Deploy. Los commits siguientes pueden publicarse automáticamente.

Ver `DEPLOY_VERCEL.md` y `GITHUB_DESDE_CHROMEBOOK.txt`.

## Importante
- Si el proyecto 3D generado utiliza ES modules de Three.js, necesita Internet y debe abrirse vía HTTPS/servidor local; `file://` puede bloquear los módulos.
- La llamada adicional de recuperación solo se activa si la primera salida no genera archivos o la entrega de juego parece incompleta; puede añadir latencia.
- Se han probado sintaxis y funciones auxiliares, no una conversación real con el proveedor en esta sesión.
- No guardes claves API privadas en el HTML o el repositorio.


## Papoi 8 v7.7 — recuperación de límites

Esta versión intercepta errores 402/`insufficient_funds` y 429 de Puter para mostrar una pantalla de Nexo. Si quieres continuar el mismo chat sin Puter, puedes introducir una clave personal de Gemini API elegible y usar un modelo de texto que la API devuelva en su catálogo. La clave vive únicamente en `sessionStorage` de la pestaña y se envía directamente a Google; no la guardes en el repositorio. Las cuotas gratuitas son variables y no ilimitadas. En proyectos de producción se recomienda usar una función de servidor y controles de secretos apropiados.


## v7.8 — salida de emergencia del modal de límites

- Pulsa Esc, X o “Cerrar y volver al chat” para cerrar el aviso. La barra superior ⇄ Alternativa sigue disponible aunque lo cierres.
- El botón “Probar Puter otra vez” quita el bloqueo temporal en la pestaña; solo sirve si la cuenta tiene cuota disponible.
- Si Puter devuelve saldo insuficiente o límite temporal, no se harán nuevas llamadas a Puter en bucle dentro de esa pestaña.
- Si ya has guardado una clave y modelo Gemini en esta pestaña, los siguientes mensajes pasan a Gemini.
- Tras desplegar, recarga con Ctrl+Shift+R. En la PWA instalada, ciérrala por completo y vuelve a abrirla; si sigue antigua, borra los datos del sitio/caché desde Chrome.


## v7.9 — límites y Anacleto Pro

- En Ajustes se configuran ventanas de 2/4/6/12/24 horas para los contadores locales.
- Ajustes muestra uso, barra de progreso y tiempo restante para Nexo 5, Nexo 7, Papoi 8 y Anacleto Pro; hay aviso al 90 %.
- Papoi 8 prioriza Claude Sonnet 5.5 si Puter lo anuncia en su catálogo. Anacleto Pro prioriza GPT-6 Astra/Codex y variantes gratuitas si están disponibles; usa un Claude Sonnet compatible como alternativa cuando no haya OpenAI. Qwen y Claude Opus se excluyen.
- Estos contadores solo limitan el uso local de perfiles; no restablecen el saldo real de Puter. Según la documentación oficial de Puter, el crédito de uso depende del plan y normalmente se reinicia mensualmente, mientras que los límites de frecuencia tienen ventanas de segundos/minutos/hora.


## v8.0 — límites configurables y selección consciente de motor

- Contadores locales configurables de 2/4/6/12/24 horas para Nexo 5, Nexo 7, Papoi 8 y Anacleto Pro, con barras y aviso al 90 %.
- Papoi 8 prioriza Claude Sonnet 5.5 en el catálogo de Puter y elige su variante gratuita si se expone. Anacleto Pro prioriza GPT/OpenAI/Codex y filtra a variantes gratuitas confirmadas cuando existen.
- Si el catálogo no tiene una variante gratuita apropiada, Nexo puede seleccionar el mejor modelo permitido de pago del proveedor; comprueba las notas del catálogo y el saldo de tu cuenta.
- Se elimina el temporizador permanente de actualización del uso para reducir trabajo de fondo en Chromebook/Celeron.
- Los contadores de la app no alteran el crédito real de Puter ni de otros proveedores.


## v8.1.1 — cartera opcional real (preparada, no activada por defecto)

- Añade cuenta Nexo con Supabase, cartera persistente en Postgres, registro de movimientos y endpoints serverless.
- Stripe Checkout concede packs y créditos Premium solo después de validar el webhook firmado; el manejo de eventos es idempotente.
- `POST /api/billing/portal` permite gestionar o cancelar una suscripción mediante Stripe Customer Portal, una vez activado en Stripe.
- El modo de continuidad de créditos usa una clave de proveedor guardada en Vercel y descuenta saldo en el servidor; el código no expone la clave en HTML.
- Los endpoints `/api/` quedan excluidos de la caché de la PWA para evitar conservar saldos o estado de cuentas en la caché del dispositivo.
- **Los pagos no están activos inmediatamente tras publicar el ZIP.** Debes crear el proyecto Supabase, ejecutar `supabase/SUPABASE_SETUP.sql`, crear precios y un webhook de prueba en Stripe y configurar todas las variables de `.env.example` en Vercel. Los botones permanecen desactivados mientras falte configuración.
- Los créditos de Nexo son distintos de los de Puter. Puter es un saldo/plan separado y no puede recargarse desde la cartera Nexo.
- Antes de vender al público, configura política de privacidad, términos, impuestos, reembolsos, cancelación de suscripción y revisa los costes del proveedor. Empieza en modo test de Stripe.


## v8.2 — Uso y recuperación

Nexo 8.2 hace que el panel de límite no sea bloqueante, añade un cuadro de uso mensual de Puter en Ajustes y en la barra lateral para perfiles avanzados, y reduce el contexto enviado a la IA para bajar el coste potencial. Consulta `USO_PUTER_Y_COSTES.md` y `CHANGELOG_V8_2.txt`.
