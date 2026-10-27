# Familia Nexo AI 7.5

Los modelos Nexo son perfiles de instrucciones y selección de motores reales; no son redes neuronales entrenadas desde cero.

| Perfil | Especialidad | Estado |
|---|---|---|
| Nexo 4 Lite | Estudios y respuestas rápidas | Disponible |
| Nexo 4.1 | Conversación y creatividad | Predeterminado |
| Nexo 4.5 | Investigación y síntesis | Disponible |
| Nexo 5 | Ingeniería, depuración y juegos | Disponible con límite diario local |
| Nexo 5.5 | Repair Lab avanzado | Reservado/no seleccionable |
| Nexo 6 | Advanced Lab | Reservado/no seleccionable |
| Nexo 7 | Creator Lab | Disponible con límite diario local |
| Papoi 8 | Creator Engine: juegos 2D/3D, proyectos y archivos | Disponible con límite beta local |

## Selección real del motor

Papoi 8 y las familias técnicas consultan el catálogo dinámico de Puter. La preferencia de Papoi se ordena entre modelos permitidos de OpenAI/GPT/Codex y Anthropic Claude Sonnet: GPT-6 Astra para máximas exigencias, GPT-6.1 Sol para equilibrio de capacidad/coste, Claude Sonnet 5.5 para coding ágil y modelos Codex actuales cuando estén disponibles. No se hardcodea la disponibilidad: si un ID no está en el catálogo, no puede elegirse. Qwen queda excluido; Claude Opus y perfiles Nexo 5.5/6 siguen reservados. La aplicación no puede garantizar las cuotas de esos proveedores.

La documentación oficial que orienta esta preferencia es [OpenAI GPT-6 Astra](https://developers.openai.com/api/docs/models/gpt-6-astra), [guía de selección de modelos de OpenAI](https://developers.openai.com/api/docs/models) y [Claude Sonnet 5.5 de Anthropic](https://www.anthropic.com/claude-sonnet-5-5).

## Proyectos y juegos

Si el usuario pide crear un juego o un artefacto, Papoi debe devolver bloques completos y nombrados en Markdown, que la app convierte en descargas clicables. Los proyectos de varios ficheros conservan rutas relativas en el ZIP.

Para una petición 3D se solicita una escena WebGL real con Three.js, cámara perspectiva, luces, movimiento, controles, game loop, HUD, reinicio y un nivel de detalle prudente para equipos modestos. Para una petición inspirada en una franquicia se generan geometrías y diseño originales, sin copiar marcas o recursos propietarios. Si la primera respuesta no genera archivos o parece claramente demasiado incompleta, la app hace una sola pasada de recuperación; no ejecuta el código ni garantiza que esté libre de errores.

## Límites

- La calidad, velocidad, disponibilidad de herramientas y cuotas dependen del motor real y del servicio.
- Los límites de uso de Nexo 5/7/Papoi son locales; borrar datos del navegador puede reiniciarlos.
- Los proyectos 3D que importen módulos/CDN necesitan Internet y conviene abrirlos desde HTTPS/servidor local; abrirlos como `file://` puede bloquear ES modules.
- La IA, búsqueda web, lectura de páginas y análisis remoto necesitan conexión.
- Papoi 8 no es un modelo entrenado desde cero.
