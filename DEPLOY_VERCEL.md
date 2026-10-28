# Publicar Nexo AI 7.4 en Vercel

1. Descomprime este ZIP.
2. Sube el contenido a la raíz de un repositorio de GitHub; no subas solo el ZIP.
3. Conserva las carpetas `icons/` y `api/`.
4. En Vercel elige **Add New → Project** e importa el repositorio.
5. Framework Preset: **Other**. No se necesita Build Command. Output Directory: `.`.
6. Pulsa **Deploy**.
7. Cuando esté en estado **Ready**, abre la URL HTTPS y prueba primero inicio de sesión, chat, generación de un HTML y la descarga de un ZIP.

`api/read-url.js` es una función serverless para leer contenido de páginas públicas a través de un lector. Puede fallar con páginas que requieren sesión o bloquean lectores automáticos.

No publiques claves privadas en GitHub ni en código del cliente.


### v7.7 — alternativa al agotar límites

La pantalla “SE ALCANZARON LOS LÍMITES” aparece al detectar un error 402 de Puter. Para mantener el chat con otro proveedor, se puede usar una clave propia de Gemini API directamente desde el panel. Es una vía opcional de cliente y no usa una clave incluida en el repositorio. La alternativa tiene cuota propia; no es ilimitada.
