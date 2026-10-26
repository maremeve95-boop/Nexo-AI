# Nexo AI 7.1 Gratis · Inteligencia por perfiles · Inteligencia por perfiles · Inteligencia por perfiles · Inteligencia por perfiles · Inteligencia por perfiles · Inteligencia por perfiles

Aplicación web/PWA de IA con familia de perfiles progresivos, memoria local, búsqueda web, voz, análisis de adjuntos y generación de archivos descargables. Sin pagos, anuncios ni planes de suscripción.

## Familia Nexo

- **4 Lite — nivel 1:** estudio y respuestas rápidas.
- **4.1 — nivel 2:** asistente general predeterminado.
- **4.5 — nivel 3:** investigación, análisis y síntesis de fuentes.
- **5 — nivel 4:** programación y depuración; 5 respuestas exitosas/día guardadas localmente.
- **7 — nivel 5:** Creator Lab para proyectos complejos y revisión; 3 respuestas exitosas/día guardadas localmente.
- **5.5 y 6:** reservados permanentemente en esta versión. No se desbloquean por ningún método.

Los perfiles combinan instrucciones y selección dinámica de modelos reales del catálogo de Puter.js. Se priorizan variantes gratuitas cuando están disponibles, pero el proveedor puede tener cuotas. No son modelos entrenados desde cero ni se puede garantizar que un proveedor sea siempre mejor en toda tarea.

## Funciones

- Adjuntos: imágenes, PDF, DOCX, PPTX, XLSX, ZIP de proyectos y múltiples formatos de texto/código.
- ZIP: análisis limitado de archivos de texto/código; no ejecuta su contenido.
- Búsqueda web compatible y lectura de páginas públicas mediante `api/read-url.js`.
- Creación de archivos individuales y ZIP de proyectos.
- Memoria local, historial de conversaciones, voz/dictado, razonamiento configurable y revisión de entregables.
- PWA compatible con ordenador y móvil.

## Publicar con GitHub + Vercel

1. Descomprime el ZIP.
2. Sube el contenido a la raíz del repositorio de GitHub conservando `icons/` y `api/read-url.js`.
3. Importa el repositorio en Vercel.
4. Framework preset: `Other`; sin build command; Output Directory `.`.
5. Pulsa Deploy.

## Importante

El uso de IA y lectura web requieren Internet. El catálogo se consulta mediante `puter.ai.listModels()`. La selección automática prioriza perfiles de capacidad y variantes gratuitas cuando el catálogo las ofrece. Las cuotas del proveedor siguen vigentes. Los límites locales de 5 y 7 no son una medida de seguridad de servidor y se pueden reiniciar borrando almacenamiento del navegador.

Ver [`MODELOS_Y_CAPACIDADES.md`](MODELOS_Y_CAPACIDADES.md) para detalles de selección y límites.
