# Nexo AI — edición definitiva

Aplicación web/PWA de Gorbus con chat, perfiles especializados, generador y análisis de imágenes, archivos, memoria local, lectura de enlaces, voz y espacios de trabajo. La conexión de chat y el catálogo de motores se realizan con Puter.js.

## Perfiles

1. **Nexo Estándar** — perfil diario predeterminado (sustituye a Nexo 4 Lite).
2. **Nexo 4.5** — investigación y síntesis.
3. **Nexo 5** — programación general y depuración.
4. **Nexo 7** — Creator Lab, análisis y proyectos complejos.
5. **Papoi 8** — juegos y experiencias 2D/3D.
6. **Anacleto Pro** — análisis avanzado.
7. **Eustaquio Max** — perfil especialista en programación y desarrollo web completo; prioriza motores gratuitos especializados en código y puede usar variantes gratuitas OpenAI/Claude si Puter las publica.

Los perfiles anteriormente reservados Nexo 5.5 y Nexo 6 se renombran **Nexo Vision 5.5** y **Nexo Apex 6** y quedan activos como perfiles especializados. Los perfiles genéricos ChatGPT/OpenAI, Claude, Gemini y DeepSeek se han retirado del selector de chat; algunos motores OpenAI/Claude se usan como motores internos de los perfiles superiores. Los perfiles Nexo son instrucciones y políticas de selección; no son modelos neuronales entrenados desde cero.

## Modelos y costes

Nexo consulta `puter.ai.listModels()` en la cuenta activa y construye una jerarquía por perfil. Todos los perfiles automáticos seleccionan únicamente variantes `:free` o con coste 0 confirmado para entrada y salida. Eustaquio Max prioriza motores de código gratuitos; Apex 6 y Anacleto Pro priorizan modelos gratuitos con mejor ajuste para razonamiento. OpenAI y Claude solo pueden entrar si la variante específica es gratuita. No se seleccionan modelos de pago automáticamente. Vision 5.5 sigue siendo un perfil especializado de imagen, no un escalón de chat general.

Nexo usa ahora un perfil de ahorro estricto: todos los perfiles automáticos seleccionan únicamente variantes `:free` o coste cero confirmado por Puter. Eustaquio Max prioriza motores gratuitos especializados en código. El predeterminado es 384 tokens de salida para respuestas y 2.800 para artefactos, con dos mensajes de historial. No se ejecutan revisiones ni reparaciones automáticas en segunda llamada. Consulta `CHANGELOG_ECONOMY_GUARD_2026-11-19.txt` para los límites.

## Funciones destacadas

- Chat con historial local, memoria, adjuntos y análisis de archivos.
- Asistente de modelos en un overlay/chat independiente con historial separado.
- Generación y edición de imágenes mediante GPT Image 2.6 Flare/Sunburst o Gemini 3 Pro Image, con calidad media recomendada y mejora opcional del prompt visual. La mejora usa un modelo de chat gratuito confirmado y solo se ejecuta cuando se pulsa el botón.
- Búsqueda contextual: el botón «Buscar en Google» abre Google con el texto escrito; el usuario puede pegar hasta tres enlaces públicos y Nexo recupera su contenido mediante el endpoint de lectura. Algunos modelos OpenAI compatibles del catálogo Puter pueden usar la herramienta `web_search` en la llamada principal si la consulta es actual. Si el motor no admite búsqueda, Nexo lo indica y no inventa búsquedas. La búsqueda nativa puede consumir cuota adicional.
- Dictado desde el navegador, lectura en voz alta y transcripción de audio con Puter speech2txt/xAI.
- Descarga de archivos generados y paquetes ZIP.
- Ajustes de uso, límites de salida y protección inteligente de consumo. La aplicación muestra cupo mensual, saldo restante, porcentaje consumido y detecta agotamiento tras actualizar el dato de Puter o recibir un error de crédito. Incluye un diálogo de cupo agotado y una ventana de planes estilo Puter; los botones Upgrade abren Puter y no procesan pagos dentro de Nexo.
- Diseño responsive con modo de rendimiento para dispositivos modestos.

## Información actual, fecha y hora

- Nexo añade fecha, hora local y zona horaria obtenidas del navegador a cada petición principal; una respuesta local atiende preguntas directas como «¿qué día es hoy?» y «¿qué hora es?». La hora visible del encabezado se actualiza periódicamente.
- Las consultas que contienen indicadores de actualidad (hoy, noticias, versiones, precios, novedades, clima, tipos de cambio, resultados y similares) pueden activar la búsqueda nativa solo si el modelo seleccionado la admite.
- El botón Google no extrae automáticamente la página de resultados ni garantiza que Nexo lea todos los resultados; abre Google en otra pestaña. El usuario debe pegar en Nexo hasta tres URLs públicas. La lectura puede fallar ante páginas con login, CAPTCHA, bloqueo anti-bot o contenido dinámico.
- La memoria de Nexo guarda preferencias y notas del usuario, no actualiza automáticamente el conocimiento mundial ni cambia los pesos del modelo.

## Uso y despliegue

1. Descomprime el ZIP.
2. Sube el contenido a la raíz del repositorio (no subas solo el ZIP).
3. Conserva `index.html`, `icons/`, `api/`, `manifest.webmanifest` y `service-worker.js`.
4. Importa el repositorio en Vercel con preset **Other**, sin build command y con output directory `.`.
5. Abre la URL HTTPS e inicia sesión con Puter.
6. En Ajustes → Modelos, pulsa **Actualizar catálogo** para consultar los motores que tu cuenta ofrece en ese momento.

Requisito para las comprobaciones locales: Node.js 20 o superior. Ejecuta `npm run check:api`. No guardes claves privadas en el HTML ni en el repositorio.

## Consumo y privacidad

Las cuotas y tarifas dependen del proveedor y de la cuenta Puter. Los límites de salida de Nexo no equivalen al gasto total: también cuentan entrada, historial, archivos, imágenes y herramientas. Nexo no integra pagos, cartera ni suscripciones. La sincronización entre dispositivos es opcional y no ofrece cifrado de extremo a extremo; evita sincronizar secretos o datos sensibles.

Las comprobaciones estáticas no sustituyen una prueba de funcionamiento con una sesión real de Puter.


## Live Knowledge & Web Tools (19-11-2026)

- Se añade fecha, hora y zona horaria local del navegador al contexto de cada petición y al asesor de modelos; se responde localmente a preguntas directas sobre el día y la hora.
- Se corrige el seguimiento del chat para bajar al enviar y al recibir una respuesta cuando el usuario está al final, sin arrastrarlo hacia abajo si ha subido a consultar mensajes anteriores.
- Las consultas sensibles al tiempo pueden activar la herramienta web nativa de Puter en una llamada principal, solo con modelos compatibles.
- «Buscar en Google» abre una búsqueda real en otra pestaña; al pegar hasta tres enlaces públicos, Nexo los recupera y los analiza. Google no se consulta de forma programática ni se inventan resultados.
- Se actualizan instrucciones y textos para distinguir memoria, conocimiento del modelo y datos actuales verificados.

## Economy Guard (19-11-2026)

- Automático es gratuito por diseño: nunca selecciona modelos de pago aunque el perfil sea avanzado. Las variantes OpenAI/Claude solo entran si Puter confirma `:free` o coste 0; Gemini y DeepSeek siguen excluidos.
- Una petición principal equivale a una llamada principal: sin búsqueda auxiliar, reparación automática ni revisión duplicada. Las herramientas opcionales de mejora siguen requiriendo que el usuario pulse su botón.
- Respuestas normales: 384 tokens como máximo por defecto. Proyectos: 2.800 tokens de salida por defecto, con topes adaptativos por estado del cupo.
- Historial: dos últimos mensajes por defecto. Los límites de créditos de Puter siguen siendo independientes de los tokens configurados por Nexo.


## Economy Guard — 2026-11-19
- Perfiles automáticos limitados a variantes `:free` o coste 0 confirmado por el catálogo de Puter.
- Respuestas normales: 384 tokens por defecto; historial reciente compacto.
- Proyectos: 2.800 tokens por defecto, con topes según tipo de tarea.
- Sin revisión ni reparación automática adicional por defecto: un envío normal genera una sola llamada de chat.
- Los modelos gratuitos tienen cuotas del proveedor; `max_tokens` solo limita la salida y no garantiza un coste exacto.

- El chat principal desactiva los reintentos automáticos entre proveedores (`fallback:false`) y la repetición por rechazo de Claude (`refusalFallback:false`); un fallo se muestra al usuario en lugar de disparar otra pasada.
