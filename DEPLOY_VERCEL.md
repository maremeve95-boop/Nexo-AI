# Publicar Nexo AI 7.1 Gratis con GitHub + Vercel

1. Descomprime el ZIP.
2. Sube todo el contenido a la raíz del repositorio; no subas solo el ZIP.
3. Conserva `index.html`, `vercel.json`, `manifest.webmanifest`, `service-worker.js`, `icons/` y `api/read-url.js`.
4. En Vercel importa el repositorio de GitHub.
5. Usa Framework Preset `Other`, deja Build Command vacío y Output Directory `.`.
6. Pulsa Deploy.
7. Abre la URL HTTPS y prueba inicio de sesión, chat, archivos y lectura de enlaces.

La función `api/read-url.js` necesita ejecutarse como función de Vercel; no funciona si abres el HTML directamente desde `file://`. La IA, búsqueda web, lectura de páginas y recursos externos necesitan Internet.

La app es gratuita y no incorpora cobros ni anuncios. Los proveedores de IA pueden tener cuotas de uso propias. No guardes claves privadas en `index.html` ni en GitHub.
