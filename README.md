# Nexo AI 7.5 — Papoi 8 Creator Engine

PWA de Nexo AI con perfiles especializados, memoria local, búsqueda/lectura web, análisis de archivos y generación de proyectos descargables. Sin pagos ni anuncios propios de Nexo.

## Qué ha mejorado en 7.5
- Peticiones como “hazme un Fortnite” se detectan como tarea de creación y descargable.
- Para juegos 3D, Papoi solicita una escena Three.js/WebGL real y una demo jugable, no una explicación genérica. Si una entrega inicial está vacía o es demasiado básica, intenta una única recuperación con instrucciones estrictas de salida.
- Modelos técnicos ordenados dinámicamente según el catálogo de Puter, priorizando GPT-6 Astra, GPT-6.1 Sol, Claude Sonnet 5.5 y Codex permitidos. Qwen se excluye; Claude Opus y Nexo 5.5/6 siguen reservados.
- Rutas relativas dentro de los ZIP conservadas.
- Nueva caché PWA para la actualización.

## Modelos
- Nexo 4 Lite: estudio.
- Nexo 4.1: general/creativo y predeterminado.
- Nexo 4.5: investigación.
- Nexo 5: programación y depuración; límite local diario.
- Nexo 5.5 y 6: reservados y no seleccionables.
- Nexo 7: Creator Lab.
- Papoi 8: Creator Engine para proyectos, juegos y 3D.

Los nombres Nexo representan perfiles, no redes neuronales entrenadas desde cero. La selección solo puede usar motores que el catálogo del proveedor anuncie realmente. No se garantiza uso gratuito ilimitado.

## Publicar con GitHub + Vercel
1. Descomprime el ZIP.
2. Sube todo el contenido a la raíz del repositorio GitHub manteniendo `icons/` y `api/`.
3. En Vercel importa el repositorio; utiliza preset `Other`, sin build command y Output Directory `.`.
4. Haz Deploy. Los commits siguientes pueden publicarse automáticamente.

Ver `DEPLOY_VERCEL.md` y `GITHUB_DESDE_CHROMEBOOK.txt`.

## Importante
- Si el proyecto 3D generado utiliza ES modules de Three.js, necesita Internet y debe abrirse vía HTTPS/servidor local; `file://` puede bloquear los módulos.
- La llamada adicional de recuperación solo se activa si la primera salida no genera archivos o la entrega de juego parece incompleta; puede añadir latencia.
- Se han probado sintaxis y funciones auxiliares, no una conversación real con el proveedor en esta sesión.
- No guardes claves API privadas en el HTML o el repositorio.


## Papoi 8 v7.7 — recuperación de límites

Esta versión intercepta errores 402/`insufficient_funds` y 429 de Puter para mostrar una pantalla de Nexo. Si quieres continuar el mismo chat sin Puter, puedes introducir una clave personal de Gemini API elegible y usar un modelo de texto que la API devuelva en su catálogo. La clave vive únicamente en `sessionStorage` de la pestaña y se envía directamente a Google; no la guardes en el repositorio. Las cuotas gratuitas son variables y no ilimitadas. En proyectos de producción se recomienda usar una función de servidor y controles de secretos apropiados.
