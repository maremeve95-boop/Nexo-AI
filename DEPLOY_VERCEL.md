# Publicar Nexo AI en Vercel

1. Descomprime el ZIP.
2. Sube el contenido a la raíz de un repositorio de GitHub; no subas solo el ZIP.
3. Conserva `index.html`, `icons/`, `api/`, `manifest.webmanifest` y `service-worker.js`.
4. En Vercel elige **Add New → Project** e importa el repositorio.
5. Framework Preset: **Other**. Build Command: vacío. Output Directory: `.`.
6. Pulsa **Deploy**.
7. Cuando el proyecto esté en estado **Ready**, abre la URL HTTPS e inicia sesión con Puter.

## Funciones del proyecto

- `api/read-url.js` permite leer el texto de páginas públicas para la herramienta de búsqueda/lectura. Puede fallar con páginas que requieren sesión o bloquean lectores automáticos.
- La IA, el catálogo de modelos, el uso y las imágenes se ejecutan mediante el SDK de Puter en el navegador.
- Nexo no incluye cartera propia, planes Premium, pagos, Stripe ni Supabase.
- No se necesitan claves privadas en variables de Vercel para el funcionamiento normal. No añadas claves privadas a GitHub ni al HTML.

## Después de desplegar

- Espera a que Vercel muestre **Ready**.
- En Chrome/Chromebook usa Ctrl+Shift+R. Si instalaste la PWA, ciérrala por completo y vuelve a abrirla.
- Inicia sesión con Puter, abre Ajustes → Uso y pulsa Actualizar.
- Comprueba el chat, el historial, la lectura de enlaces, los adjuntos y el generador de imágenes.
- El botón «Probar sin gastar» utiliza el modo de prueba documentado del servicio; no genera la imagen final.

Las cuotas y motores disponibles dependen de tu cuenta Puter. Las validaciones estáticas no sustituyen una prueba real con tu sesión.
