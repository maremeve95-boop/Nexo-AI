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
