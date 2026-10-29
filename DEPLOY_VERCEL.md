# Publicar Nexo AI 8.1.1 en Vercel

1. Descomprime este ZIP.
2. Sube el contenido a la raíz de un repositorio de GitHub; no subas solo el ZIP.
3. Conserva las carpetas `icons/` y `api/`.
4. En Vercel elige **Add New → Project** e importa el repositorio.
5. Framework Preset: **Other**. No se necesita Build Command. Output Directory: `.`.
6. Pulsa **Deploy**.
7. Cuando esté en estado **Ready**, abre la URL HTTPS y prueba primero inicio de sesión, chat, generación de un HTML y la descarga de un ZIP.

Las funciones dentro de `api/` se despliegan como funciones serverless: `api/read-url.js` lee contenido de páginas públicas y `api/billing/` gestiona la cartera opcional de créditos. Puede fallar con páginas que requieren sesión o bloquean lectores automáticos.

No publiques claves privadas en GitHub ni en código del cliente.


### v7.7 — alternativa al agotar límites

La pantalla “SE ALCANZARON LOS LÍMITES” aparece al detectar un error 402 de Puter. Para mantener el chat con otro proveedor, se puede usar una clave propia de Gemini API directamente desde el panel. Es una vía opcional de cliente y no usa una clave incluida en el repositorio. La alternativa tiene cuota propia; no es ilimitada.


### v7.8 — recargar el código nuevo

Después de confirmar los archivos en GitHub y esperar a que Vercel esté en Ready, abre la URL en Chrome y pulsa Ctrl+Shift+R. Si estás usando la PWA instalada, ciérrala por completo y vuelve a abrirla. Si conserva la versión antigua, limpia los datos del sitio/caché. El botón ⇄ Alternativa permanece en la barra superior para abrir las opciones de continuación.


## Cartera opcional de créditos Nexo (v8.1.1)

El proyecto incluye funciones Vercel en `api/billing/` (config, status, checkout, portal, webhook y chat), una biblioteca server-side en `lib/nexo-billing.js` y SQL de Supabase. Esto está preparado para habilitarse, pero los cobros no funcionarán hasta que configures servicios externos. Sigue `PAYMENTS_SETUP_ES.md` completamente y empieza con Stripe en modo test. No publiques claves privadas en GitHub.

La PWA nunca cachea `/api/`, en especial `/api/billing/status`. Tras desplegar, comprueba que los endpoints de cartera devuelven `Cache-Control: no-store`.
