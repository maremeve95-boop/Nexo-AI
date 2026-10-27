# Nexo AI 7.3 — Papoi 8 Experimental

Aplicación web/PWA de IA con perfiles especializados, memoria local, búsqueda y lectura web, análisis de adjuntos y generación de archivos descargables. Sin pagos, anuncios ni suscripciones.

## Familia de perfiles

- Nexo 4 Lite — estudio y respuestas rápidas.
- Nexo 4.1 — perfil general predeterminado.
- Nexo 4.5 — investigación y síntesis.
- Nexo 5 — programación y depuración; 5 respuestas exitosas/día en este navegador.
- Nexo 5.5 y Nexo 6 — reservados permanentemente, sin desbloqueo.
- Nexo 7 — Creator Lab, 3 respuestas exitosas/día.
- **Papoi 8 — nuevo perfil experimental de nivel 8**, centrado en proyectos complejos, ingeniería, investigación y revisión de calidad; 3 respuestas exitosas/día.

Los perfiles son configuraciones especializadas conectadas a motores reales del catálogo de Puter.js, no redes neuronales entrenadas desde cero. Papoi 8 da prioridad a motores con mayor capacidad que estén disponibles y favorece opciones reconocidas como gratuitas cuando el catálogo lo permite. Las cuotas del proveedor siguen vigentes.

## Funciones

- Adjuntar imágenes, PDF, DOCX, PPTX, XLSX, ZIP de proyectos y formatos comunes de texto/código.
- Analizar archivos ZIP con límites de tamaño; el contenido no se ejecuta.
- Búsqueda web compatible y lectura de páginas públicas mediante `api/read-url.js`.
- Generación de archivos descargables individuales y ZIP de proyectos.
- Historial y memoria locales, voz/dictado y respuesta en streaming.
- PWA para ordenador y móvil.

## Publicar en GitHub + Vercel

1. Descomprime el ZIP.
2. Sube el contenido a la raíz del repositorio de GitHub. Conserva las carpetas `icons/` y `api/`.
3. En Vercel, importa el repositorio.
4. Usa Framework Preset `Other`, sin comando de build y Output Directory `.`.
5. Pulsa Deploy.

Revisa también `DEPLOY_VERCEL.md` y `GITHUB_DESDE_CHROMEBOOK.txt`.

## Importante

La aplicación es gratuita y no incluye compras. Las funciones remotas necesitan Internet y los proveedores pueden aplicar cuotas propias. Los contadores locales pueden reiniciarse borrando los datos del navegador; no son límites de servidor. No subas secretos ni claves privadas a GitHub ni a `index.html`.
