# Nexo AI 7.4 — Papoi 8 Creator Engine

Aplicación web progresiva (PWA) de Nexo AI con perfiles especializados, memoria local, lectura/búsqueda web, análisis de archivos y creación de proyectos descargables. Sin pagos, anuncios ni suscripciones de Nexo.

## Papoi 8: motores permitidos

Papoi 8 elige dinámicamente entre modelos reales de OpenAI/GPT/Codex o Claude Sonnet que aparezcan en el catálogo actual de Puter.js. No usa Qwen; tampoco utiliza Claude Opus, que permanece reservado para Nexo 5.5/6. Si el catálogo no proporciona un motor permitido, Papoi lo indica en vez de cambiar de proveedor silenciosamente. El nombre Papoi 8 representa un perfil de instrucciones/herramientas, no un modelo entrenado desde cero.

## Familia de perfiles

- Nexo 4 Lite — estudio y respuestas rápidas.
- Nexo 4.1 — perfil general predeterminado.
- Nexo 4.5 — investigación y síntesis.
- Nexo 5 — programación y depuración; límite local de cinco respuestas satisfactorias al día.
- Nexo 5.5 y Nexo 6 — reservados permanentemente y no seleccionables.
- Nexo 7 — Creator Lab, límite local de tres respuestas satisfactorias al día.
- Papoi 8 — perfil experimental de máxima exigencia disponible en esta app, límite local de tres respuestas satisfactorias al día.

Los perfiles son especializaciones sobre modelos reales; no se garantiza que un perfil sea superior en todas las tareas. La velocidad y la calidad dependen del motor disponible, conexión y límites del proveedor.

## Crear juegos y proyectos descargables

Cuando el usuario pide crear HTML, una página o un juego, la app solicita archivos completos con nombre. Los bloques se convierten en enlaces clicables “Descargar archivo”, acciones para copiar código y, si hay varios archivos, un ZIP de proyecto. Para un juego web sencillo, Papoi prioriza HTML autocontenido que pueda abrirse sin compilación; proyectos mayores pueden incluir varios archivos.

Formatos comunes de adjuntos: imágenes, PDF, DOCX, PPTX, XLSX, ZIP de proyecto y archivos de texto/código. Los ZIP se analizan con límites de tamaño y no se ejecuta su contenido.

## Publicar en GitHub + Vercel

1. Descomprime el ZIP.
2. Sube el contenido a la raíz del repositorio GitHub, manteniendo `icons/` y `api/`.
3. En Vercel importa el repositorio.
4. Framework Preset: `Other`, sin build command y Output Directory `.`.
5. Pulsa Deploy.

Consulta `DEPLOY_VERCEL.md` y `GITHUB_DESDE_CHROMEBOOK.txt`.

## Importante

- La IA, la búsqueda web, la lectura de URLs y el análisis remoto necesitan Internet.
- Los contadores de Nexo 5/7/Papoi son locales y se pueden reiniciar borrando datos del navegador; no son límites de servidor.
- El uso gratuito no está garantizado ilimitadamente: los proveedores pueden aplicar sus propias cuotas.
- No pongas secretos ni claves privadas en `index.html` o GitHub.
