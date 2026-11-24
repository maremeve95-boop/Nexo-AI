# Nexo AI 1.2.1 — Economy Router & Smart Fallback (2026-11-24)

## Enrutamiento económico
- Los modelos gratuitos confirmados por el catálogo se ordenan siempre antes de los modelos de pago, aunque estos últimos coincidan con un patrón preferente del perfil.
- Ante 402 o 429, Nexo prueba hasta dos motores gratuitos alternativos compatibles y prioriza proveedores distintos.
- La gestión cubre errores antes de recibir el stream y errores a mitad de la respuesta; el texto parcial del motor fallido se descarta antes de cambiar.
- El fallback del SDK queda desactivado (`fallback: false`) para evitar cambios silenciosos de modelo o coste.
- Se respetan los requisitos de visión y búsqueda cuando se elige una alternativa.

## Ahorro inteligente e historial
- El historial se limita a 3 mensajes desde el 50 %, 2 desde el 70 % y 1 desde el 85 % del consumo mensual real.
- El resumen de compactación también se acorta al subir el consumo.
- La reparación automática y la revisión secundaria de archivos se pausan desde el 50 % para evitar llamadas auxiliares.
- El payload del chat solo transmite `role` y `content`; excluye identificadores, proveedor, marcas de tiempo, estados y metadatos de generación.
- Los mejoradores auxiliares de prompts se pausan desde el 50 % del cupo; las llamadas auxiliares usan `fallback: false`.
- Sin datos válidos de uso de Puter, Nexo no inventa un porcentaje ni aplica límites basados en una medición inexistente.

## Fiabilidad de Puter.js
- Se clasifican estados 402/429 tanto en campos HTTP como en códigos y mensajes de error del SDK.
- Se interpretan correctamente las propiedades `Retry-After` en segundos o fecha HTTP; los campos explícitos en milisegundos se convierten por separado.
- Se añaden límites de espera a la promesa de chat y a cada lectura del stream.
- Se toleran fallos de `listModels()` sin dejar una promesa rechazada sin controlar.
- Después de agotar las alternativas gratuitas, el mensaje queda como fallido y el siguiente envío se puede intentar de nuevo; no se bloquea toda la pestaña.
- Las promesas de catálogo y autenticación del arranque y del asesor de modelos quedan controladas.

## Validación
- `npm run check` verifica sintaxis de scripts inline, API y Service Worker.
- El fallback se probó con errores simulados 429 durante el stream, cambio de proveedor, SDK fallback desactivado y Retry-After.
- Las pruebas contra límites reales de Puter requieren una cuenta autenticada y no se presentan como realizadas.

---

# Nexo AI — Live Knowledge & 2D Game Update (2026-11-24)

- Added release metadata (v1.2.0, updated 24 November 2026) and a local answer for questions about the update date.
- Added cached Puter model catalogue with a 10-minute refresh interval, 36-hour stale-cache ceiling, request deduplication and 6.5-second timeout.
- Strengthened 2D HTML game instructions: visible first frame, Canvas 2D, requestAnimationFrame, delta time, input, HUD, objective and restart.
- Added static diagnostics and a sandboxed iframe preview (scripts only, no same-origin access), with JavaScript and Canvas draw status.
- Added manual attach-to-repair action; it never performs an automatic second AI call.
- Bumped service-worker cache key.

Static HTML ID, inline JavaScript syntax, API, service-worker, CSS parse and ZIP checks passed locally. Live authenticated Puter generation and interactive browser visual testing were unavailable.
