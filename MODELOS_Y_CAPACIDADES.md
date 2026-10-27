# Familia Nexo AI 7.3 — Papoi 8 Experimental

Nexo AI es una aplicación web/PWA gratuita, sin pagos, anuncios ni suscripciones.

## Perfiles

- **Nexo 4 Lite · Nivel 1:** tutor rápido para deberes, ejercicios, idiomas y explicaciones sencillas.
- **Nexo 4.1 · Nivel 2:** asistente general predeterminado, creativo y conversacional.
- **Nexo 4.5 · Nivel 3:** investigación, análisis y síntesis de fuentes.
- **Nexo 5 · Nivel 4:** programación y depuración; límite local de 5 respuestas exitosas al día.
- **Nexo 5.5 · Nivel 5:** reservado permanentemente en esta versión; no desbloqueable.
- **Nexo 6 · Nivel 6:** reservado permanentemente en esta versión; no desbloqueable.
- **Nexo 7 · Nivel 7:** Creator Lab para proyectos complejos, adjuntos y análisis multimodal; 3 respuestas exitosas al día en este navegador.
- **Papoi 8 · Nivel 8:** perfil experimental más ambicioso, orientado a ingeniería, investigación, proyectos completos y revisión de calidad; 3 respuestas exitosas al día en este navegador.

## Qué hace Papoi 8

Papoi 8 aplica instrucciones más exigentes para tareas difíciles, da prioridad a modelos con mayor capacidad en el catálogo disponible y favorece modelos identificados explícitamente como gratuitos cuando los hay. En programación refuerza el análisis de arquitectura, la preservación de funciones existentes, el diseño de proyectos descargables y la comprobación de errores comunes. En investigación favorece fuentes primarias y no debe inventar resultados. Para preguntas sencillas responde rápido, sin forzar una investigación ni un plan largo.

Papoi 8 **es un perfil de la aplicación**, no una red neuronal entrenada desde cero. Su calidad depende del modelo real elegido en el catálogo de Puter y de las herramientas disponibles. Se excluyen los modelos Claude Opus de la selección automática para mantener los perfiles Nexo 5.5 y 6 reservados. El catálogo de modelos puede cambiar.

## Funciones compartidas

- Adjuntos de imágenes, PDF, DOCX, PPTX, XLSX, ZIP y varios formatos de texto/código.
- Análisis de ZIP limitado a archivos de texto y código; nunca ejecuta su contenido.
- Búsqueda web compatible y lectura de páginas públicas mediante `api/read-url.js`.
- Generación de archivos individuales y ZIP de proyectos.
- Memoria e historial locales, voz/dictado, razonamiento configurable y revisión de entregables.
- PWA para ordenador y móvil.

## Publicar con GitHub + Vercel

1. Descomprime el ZIP.
2. Sube el contenido a la raíz del repositorio de GitHub y conserva `icons/` y `api/read-url.js`.
3. Importa el repositorio en Vercel.
4. Framework Preset: `Other`; deja el build command vacío y usa Output Directory `.`.
5. Pulsa Deploy.

## Límites y honestidad

Los límites diarios de Nexo 5, Nexo 7 y Papoi 8 se guardan localmente; no son protecciones de servidor y pueden reiniciarse borrando los datos del navegador. Los proveedores externos pueden aplicar sus propias cuotas y condiciones. La IA y la lectura web requieren Internet. La aplicación no cobra, pero no puede prometer cuotas ilimitadas de servicios externos.
