# Nexo AI — edición definitiva

Aplicación web/PWA de Gorbus con chat, perfiles especializados, generador y análisis de imágenes, archivos, memoria local, lectura de enlaces, voz y espacios de trabajo. La conexión de chat y el catálogo de motores se realizan con Puter.js.

## Perfiles

1. **Nexo Estándar** — perfil diario predeterminado (sustituye a Nexo 4 Lite).
2. **Nexo 4.5** — investigación y síntesis.
3. **Nexo 5** — programación general y depuración.
4. **Nexo 7** — código rápido y diario; prioriza GPT-5 Nano con GPT-5.4 Nano como alternativa económica.
5. **Papoi 8** — frontend y código limpio; prioriza GPT-5.4 Nano y GPT-5 Mini dentro del presupuesto. Conserva capacidad para juegos y experiencias 2D/3D.
6. **Anacleto Pro** — lógica compleja y revisión; prioriza Claude Haiku 5.5 con Haiku 4.5 como alternativa.
7. **Eustaquio Max** — programación web y agentes; prioriza GPT-5.1 Codex Mini y usa Qwen3 Coder 30B/Flash como alternativas.

Los perfiles anteriormente reservados Nexo 5.5 y Nexo 6 se renombran **Nexo Vision 5.5** y **Nexo Apex 6** y quedan activos como perfiles especializados. Los perfiles genéricos ChatGPT/OpenAI, Claude, Gemini y DeepSeek se han retirado del selector de chat; algunos modelos OpenAI/Claude pueden usarse como motores internos de perfiles especialistas si el catálogo Puter los ofrece y se confirma cualquier coste. Los perfiles Nexo son instrucciones y políticas de selección; no son modelos neuronales entrenados desde cero.

## Modelos y costes

Nexo consulta `puter.ai.listModels()` en la cuenta activa y construye una jerarquía por perfil. Estándar, 4.5 y Nexo 5 permanecen gratuitos por defecto. Los perfiles especialistas tienen motores económicos preferentes con límites de precio por perfil; solo se habilitan cuando Puter publica su ID y coste, y después de pedir confirmación explícita. Si el usuario no autoriza el pago, se usa un modelo gratuito compatible o se explica que no hay motor elegible. Vision 5.5 exige compatibilidad real con entrada de imágenes.

Nexo conserva un perfil de ahorro estricto: Estándar, 4.5 y Nexo 5 usan variantes `:free` o coste cero; los perfiles especialistas admiten motores facturables concretos solo dentro de un techo por perfil y con consentimiento explícito antes del envío. El predeterminado es 384 tokens de salida para respuestas y 2.800 para artefactos, con dos mensajes de historial. No se ejecutan revisiones ni reparaciones automáticas en segunda llamada. Consulta `CHANGELOG_ECONOMY_GUARD_2026-11-19.txt` y `CHANGELOG_MODEL_BUDGET_BALANCE_2026-11-19.txt`.

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

- Automático en Nexo Estándar, 4.5 y 5 es gratuito por diseño. Los perfiles especialistas pueden proponer motores económicos limitados por tarifa, siempre con confirmación; Gemini y DeepSeek siguen excluidos del selector de chat.
- Una petición principal equivale a una llamada principal: sin búsqueda auxiliar, reparación automática ni revisión duplicada. Las herramientas opcionales de mejora siguen requiriendo que el usuario pulse su botón.
- Respuestas normales: 384 tokens como máximo por defecto. Proyectos: 2.800 tokens de salida por defecto, con topes adaptativos por estado del cupo.
- Historial: dos últimos mensajes por defecto. Los límites de créditos de Puter siguen siendo independientes de los tokens configurados por Nexo.


## Economy Guard — 2026-11-19
- Perfiles generales limitados a variantes `:free` o coste 0 confirmado; perfiles especialistas admiten solo IDs concretos con tarifa verificada y bajo techo por perfil.
- Respuestas normales: 384 tokens por defecto; historial reciente compacto.
- Proyectos: 2.800 tokens por defecto, con topes según tipo de tarea.
- Sin revisión ni reparación automática adicional por defecto: un envío normal genera una sola llamada de chat.
- Los modelos gratuitos tienen cuotas del proveedor; los modelos de pago requieren consentimiento y `max_tokens` solo limita la salida, no garantiza un coste exacto.

- El chat principal desactiva los reintentos automáticos entre proveedores (`fallback:false`) y la repetición por rechazo de Claude (`refusalFallback:false`); un fallo se muestra al usuario en lugar de disparar otra pasada.


## Budget-balanced Model Ladder (19-11-2026)

- Nexo 7: GPT-5 Nano; alternativa GPT-5.4 Nano. Papoi 8: GPT-5.4 Nano; alternativa GPT-5 Mini. Anacleto Pro: Claude Haiku 5.5 / Haiku 4.5. Eustaquio Max: GPT-5.1 Codex Mini / Qwen3 Coder 30B / Qwen3 Coder Flash. Vision 5.5: GPT-4.1 Mini con visión / Llama 4 Scout si el catálogo confirma visión. Apex 6: GPT-5.4 Mini.
- Los límites por perfil son: Nexo 7 $0.25/$1.50; Papoi 8 $0.25/$2.00; Anacleto Pro $1/$5; Eustaquio Max $0.35/$2; Vision 5.5 $0.45/$2; Apex 6 $0.80/$5 por millón de tokens de entrada/salida. GPT-5.1 Codex Mini aparece en Puter a $0.25/$2 por 1M.
- Las cifras son techos, no precios fijos. Nexo obtiene la tarifa del catálogo actual de Puter y pide confirmación cuando un modelo sea facturable; si no se autoriza, no envía la petición de pago.
- Puter publica `openai/gpt-5.1-codex-mini` a $0.25/$2 por 1M; se habilita para Eustaquio solo si aparece en el catálogo activo. Aunque otros IDs GPT-5.1 Codex están deprecados en OpenAI, Puter mantiene esta ficha y puede conservar su alias de proveedor. GPT-5 Nano y GPT-5 Mini tienen retirada anunciada el 11-12-2026, y GPT-5.4 Nano el 01-04-2027; si dejan de aparecer, Nexo usa la alternativa aprobada que siga disponible. El catálogo decide disponibilidad final y puede cambiar con el tiempo.
- Roles: Nexo 7 (código rápido), Papoi 8 (frontend), Anacleto (lógica y revisión), Eustaquio (desarrollo web/agentes), Vision (código desde capturas/UI), Apex (razonamiento avanzado).
