# Nexo AI

PWA de Nexo AI con ajustes por secciones, uso real de Puter, memoria local ampliada, selección automática económica, perfiles especializados, análisis de archivos y generación de proyectos descargables. No hay anuncios ni suscripción obligatoria para desbloquear perfiles. Se incluye una cartera opcional de créditos propios, lista para habilitarse con Stripe + Supabase + un proveedor de IA en el servidor.

## Funciones principales
- Peticiones como “hazme un Fortnite” se detectan como tarea de creación y descargable.
- Para juegos 3D, Papoi solicita una escena Three.js/WebGL real y una demo jugable, no una explicación genérica. Si una entrega inicial está vacía o es demasiado básica, intenta una única recuperación con instrucciones estrictas de salida.
- Modelos técnicos ordenados dinámicamente según el catálogo de Puter, priorizando GPT-6 Astra, GPT-6.1 Sol, Claude Sonnet 5.5 y Codex permitidos. Qwen se excluye; Claude Opus y Nexo 5.5/6 siguen reservados.
- Rutas relativas dentro de los ZIP conservadas.
- Nueva caché PWA para la actualización.

## Modelos
- Nexo 4 Lite: estudio.
- Nexo 4.1: general/creativo y predeterminado.
- Nexo 4.5: investigación.
- Nexo 5: programación y depuración; el consumo depende del modelo y del proveedor.
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


## Nexo AI 8.2 — consumo real de Puter y estabilidad

- Ajustes incorpora el consumo oficial de Puter usando `puter.auth.getMonthlyUsage()`: cupo mensual y restante de la cuenta. Si `puter.appID` está disponible, también consulta `puter.auth.getDetailedAppUsage(puter.appID)` para el total y el desglose por API de Nexo AI.
- El panel oficial de uso de Puter abre `https://puter.com/dashboard`. Los datos de cuenta, el consumo específico de Nexo (cuando Puter lo identifica) y los contadores locales de Nexo se muestran por separado.
- Los recursos de Puter se devuelven en microcentavos: 100.000.000 microcentavos = 1 USD. El cupo mensual se renueva según el ciclo de Puter; el contador local de Nexo no recarga ese cupo.
- Nexo reduce el historial enviado por petición (10 mensajes recientes, límites de caracteres más bajos), reduce los máximos de salida predeterminados y baja el umbral de compactación. La segunda revisión automática queda desactivada por migración para evitar una llamada extra no solicitada.
- Se elimina la consulta de autenticación redundante después de cada respuesta. La sesión se refresca al iniciar/cerrar sesión y cuando corresponde, no tras cada mensaje.
- La detección del diálogo de límites de Puter ahora escanea también raíces Shadow DOM abiertas y añade una ruta de cierre de emergencia sin dejar deshabilitado el compositor.

### Por qué puede aumentar el consumo
Los modelos tienen tarifas distintas; el historial largo y los adjuntos elevan los tokens de entrada; las respuestas/proyectos grandes elevan los tokens de salida; las búsquedas auxiliares, imágenes, voz y revisiones pueden añadir más llamadas. Puter documenta que el crédito se cobra a coste real y que los valores por API pueden retrasarse alrededor de un minuto.

### Límites de visibilidad
`getMonthlyUsage()` ofrece el cupo mensual total y restante de la cuenta. Cuando Puter facilita `puter.appID`, Nexo consulta también `getDetailedAppUsage(puter.appID)` para obtener el total exacto de esta app y su desglose por API. No expone necesariamente el saldo total de créditos comprados por separado ni un cálculo exacto por cada conversación individual. Si el despliegue no tiene un App ID reconocible, Nexo muestra el total de cuenta sin atribuirlo falsamente a la aplicación. El panel lo etiqueta como cupo mensual y gasto registrado por Nexo para no confundirlo con una cartera o un límite de tokens.

### Comprobaciones
Se validan la sintaxis, la presencia de los nuevos controles, las rutas del service worker y la estructura ZIP. La lectura de uso real requiere una sesión Puter activa y probar la aplicación publicada; no se simula saldo real.


## Funciones de Nexo AI

- Ajustes por secciones con Uso (Resumen/Análisis), Modelos e IA, Memoria, Personalización, Voz y entrada y Cuenta/datos.
- El consumo de Puter se consulta a través del SDK oficial y se enlaza al panel de uso; las cifras se expresan en USD y el desglose por app se muestra solo cuando Puter lo devuelve.
- El chat usa un aviso de límite no bloqueante: puedes abrir Ajustes y el panel de consumo aunque Puter rechace una petición.
- El selector consulta el catálogo y tarifas reales. Prioriza `:free` y modelos de coste bajo; oculta modelos caros y no selecciona un modelo de tarifa alta como fallback.
- Menos historial enviado, salidas acotadas y sin revisiones/búsqueda extra automáticas por defecto.
- Memoria local ampliada (80 × 800), con recuperación por relevancia y comandos explícitos sin llamada de IA.
- Nueva introducción animada configurable y temas de color.

Ver `USO_PUTER_Y_OPTIMIZACION_V9.md` y `CHANGELOG_V9_0_RELEASE.txt`.


## Interfaz, compositor y voz

- El compositor sigue el diseño compacto con botón `+`, adjuntos, campo de texto, indicador, dictado y acción azul que alterna entre ondas y enviar.
- El menú `+` incluye Pensar, Buscar, Alternativa y Generar mensaje de voz. El generador permite elegir proveedor, voz y estilo; Puter ofrece una muestra de prueba y generación real de audio.
- Durante la generación de código se oculta el bloque incompleto y se muestran estados discretos como «Analizando», «Programando», «Cooking» y «Let me cook».
- Ajustes se organiza por secciones; la paleta violeta/cian se mantiene estable y el tema de color variable queda desactivado.
- En Safari iOS los campos mantienen 16 px para evitar el zoom al enfocar, y el compositor usa anchos flexibles para no desbordarse en escritorio.
- La memoria local admite hasta 80 notas de 800 caracteres; la orden explícita de guardar memoria se ejecuta localmente sin consulta al modelo.
