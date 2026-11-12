# Modelos de Nexo AI

Los perfiles Nexo son configuraciones de instrucciones, límites y herramientas; no son redes neuronales entrenadas desde cero. El motor real se selecciona desde el catálogo que Puter anuncia a la cuenta en cada momento.

| Perfil | Especialidad | Estado |
|---|---|---|
| Nexo 4 Lite | Estudios y respuestas rápidas | Disponible |
| Nexo 4.1 | Conversación, creatividad y uso general | Predeterminado |
| Nexo 4.5 | Investigación y síntesis | Disponible |
| Nexo 5 | Programación y depuración | Disponible |
| Nexo 5.5 | Repair Lab | Reservado |
| Nexo 6 | Advanced Lab | Reservado |
| Nexo 7 | Creator Lab | Disponible |
| Papoi 8 | Juegos, creación y proyectos | Disponible |
| Anacleto Pro | Ingeniería y tareas complejas | Disponible |

## Selección económica

Nexo consulta `puter.ai.listModels()` y utiliza las tarifas que devuelve el catálogo. En automático:

- Se priorizan variantes `:free` confirmadas.
- Los demás motores solo se consideran si Puter publica un coste y ese coste queda dentro del umbral económico configurado en el código.
- Se excluyen variantes `:priority`, Qwen, Claude Opus y GPT-6 Astra.
- Las capacidades de tarea (por ejemplo, código o búsqueda) solo desempatan motores de coste prácticamente igual; no pueden hacer que un modelo mucho más caro gane por su nombre.
- Si el catálogo no entrega nivel de consumo verificable, Nexo no lo elige automáticamente. Puede mostrar que no hay un motor económico compatible en vez de gastar a ciegas.

Los IDs y la disponibilidad no están hardcodeados. La aplicación no puede elegir un motor que el catálogo de Puter no ofrezca.

## Control del consumo

En Ajustes → Modelos e IA se controla el máximo de tokens de salida normal, el presupuesto máximo para proyectos y la cantidad de historial que se reenvía. El valor `max_tokens` es un límite de salida, no una garantía del gasto total: también se cobran tokens de entrada, herramientas y cualquier llamada auxiliar. El historial previo se limita y las llamadas de recuperación/revisión se ejecutan solo cuando son necesarias; la revisión automática está desactivada por defecto.

El modo de razonamiento solo envía `reasoning_effort` a motores cuya documentación/catálogo indique compatibilidad. Los parámetros OpenAI-only, como `verbosity`, no se envían a proveedores que no los admiten.


## Imágenes y visión

El catálogo distingue los modelos de chat multimodal de los motores dedicados a generar imágenes:

- Para analizar una imagen adjunta, Nexo filtra por modalidades/capacidades del catálogo Puter (`input_modalities`, `modalities` o indicadores equivalentes) y solo elige motores identificados como compatibles. En Ajustes → Modelos e IA, las opciones con visión aparecen marcadas como **Admite imágenes**.
- Si el catálogo no confirma ningún modelo de visión económico, Nexo avisa y no envía la imagen a un motor de texto sin compatibilidad comprobada.
- Para generar o editar imágenes, el menú `+` ofrece modelos independientes: Gemini 3.1 Flash Image, Gemini 3.1 Flash Lite Image, Gemini Nano Banana 2.1, Gemini 3 Pro Image, GPT Image 2.6 Flare y GPT Image 2.6 Sunburst. La selección real depende de la disponibilidad vigente en Puter.
- El generador permite relación de aspecto, calidad y una imagen de referencia PNG/JPEG/WebP/GIF. El valor por defecto es calidad baja para reducir el consumo; cada generación es una llamada separada y puede consumir saldo del proveedor.

La generación utiliza `puter.ai.txt2img()`; el análisis de imágenes en conversaciones utiliza `puter.ai.chat()` con archivo de imagen y debe ir a un modelo de chat que admita visión. Los enlaces alojados por proveedores pueden ser temporales: guarda la imagen generada si quieres conservarla.

## Creación y voz

Papoi 8 y Anacleto Pro pueden generar proyectos completos, juegos 2D/3D y archivos descargables. Mientras se transmite código incompleto, el chat muestra un indicador discreto de trabajo; revela la respuesta cuando termina. El menú `+` ofrece Pensar, Buscar, Alternativa, generación de mensaje de voz, transcripción de archivos de audio y adjuntos. La voz usa el servicio TTS de Puter y la transcripción usa `puter.ai.speech2txt()` (OpenAI por defecto); ambos servicios pueden consumir créditos por separado del chat. La transcripción acepta archivos `File`/`Blob`; Nexo aplica un máximo local de 10 MiB para mantener bajo el uso de memoria en Chromebook. El texto se inserta en el cuadro de escritura y el audio original no se conserva en el historial.

## Límites

- Las cuotas y la facturación real dependen de la cuenta Puter y del motor que responda.
- Los límites locales de algunos perfiles se guardan en el navegador y no representan crédito del proveedor.
- Los proyectos que usen Three.js/CDN necesitan Internet y conviene abrirlos desde HTTPS o servidor local.
- No se afirma que el código descargado haya sido ejecutado si no se ha probado.

## Créditos y consumo

Nexo no integra cartera propia, suscripciones ni compras. El contador de Uso solo muestra el consumo que informa Puter, convertido a unidades normalizadas de lectura.
