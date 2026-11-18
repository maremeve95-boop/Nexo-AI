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
| ChatGPT · OpenAI | Modelos GPT reales, solo OpenAI | Disponible si Puter confirma tarifas dentro del presupuesto |
| Claude · Anthropic | Modelos Claude reales, solo Anthropic | Disponible si Puter confirma tarifas dentro del presupuesto |
| Gemini · Google | Modelos Gemini reales, solo Google | Disponible si hay modelos económicos |
| DeepSeek | Modelos DeepSeek reales | Disponible si hay modelos económicos |

## Selección económica

Nexo consulta `puter.ai.listModels()` y utiliza las tarifas que devuelve el catálogo. En automático:

- Se priorizan variantes `:free` confirmadas y, después, las tarifas más bajas.
- El selector admite modelos con tarifa publicada de hasta **3 USD / millón de tokens de entrada** y **16 USD / millón de tokens de salida**. Esto permite incluir opciones como GPT-5.4 y Claude Sonnet si el catálogo de Puter las ofrece dentro de ese límite. No significa que sean las opciones más baratas: se etiquetan por nivel de coste y Automático sigue eligiendo primero la alternativa más económica compatible.
- Se excluyen variantes `:priority`, Qwen, Claude Opus y GPT-6 Astra.
- Las capacidades de tarea (por ejemplo, código o búsqueda) solo desempatan motores de coste prácticamente igual; no pueden hacer que un modelo mucho más caro gane por su nombre.
- Si el catálogo no entrega nivel de consumo verificable, Nexo no lo elige automáticamente. Puede mostrar que no hay un motor económico compatible en vez de gastar a ciegas.

Los IDs y la disponibilidad no están hardcodeados. La aplicación no puede elegir un motor que el catálogo de Puter no ofrezca. Al seleccionar uno de los perfiles de proveedor nuevos, la lista manual también queda restringida a esa marca; un modelo elegido antes en otro perfil no se reutiliza.

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


## Perfiles de proveedor añadidos después de Anacleto Pro

Los perfiles **ChatGPT · OpenAI**, **Claude · Anthropic**, **Gemini · Google** y **DeepSeek** no son modelos nuevos entrenados por Nexo: son filtros de proveedor sobre los IDs reales que devuelve `puter.ai.listModels()`. Cada selector excluye modelos de otras marcas, motores sin tarifa verificable, variantes `:priority`, Qwen y Claude Opus. La selección automática ordena por la tarifa publicada y el ajuste a la tarea. El catálogo es dinámico; si un proveedor no ofrece ahora una variante gratuita o dentro del umbral económico, Nexo muestra que no hay motor compatible en lugar de cambiar de proveedor silenciosamente.

Los nombres comerciales se usan para identificar al proveedor del motor, no para afirmar que Nexo sea la aplicación oficial ChatGPT, Claude o Gemini.

## Pensamiento adaptativo e instrucciones Claude

El modo Pensar añade instrucciones breves según la tarea y el nivel seleccionado: el esfuerzo Bajo se mantiene para preguntas corrientes; tareas de código, investigación, archivos o visión pueden subir a Medio si el usuario activa Pensar. En los modelos OpenAI compatibles, Puter recibe `reasoning_effort`. No se envía ese parámetro a Claude, Gemini ni DeepSeek. La integración `puter.ai.chat()` documenta ese control como OpenAI-only; no expone los campos nativos `thinking`/`output_config.effort` de la API Messages de Anthropic. Para el perfil Claude, Nexo aplica las recomendaciones de prompting de Anthropic: instrucciones directas, objetivo y formato explícitos, contexto separado y etiquetas XML descriptivas cuando sirven para estructurar una tarea. Nunca pide revelar una cadena de pensamiento privada.

## Iconos de interfaz generada

Cuando se genera HTML/CSS/JavaScript, el prompt de entrega exige iconos SVG inline originales, consistentes y accesibles (viewBox 24×24, trazos `currentColor`, `aria-label` en controles de solo icono); prohíbe emojis como sustitutos de iconos de interfaz. Los emojis pueden seguir usándose como contenido textual si encajan.

Documentación usada para estas decisiones: [Claude prompting best practices](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags), [Claude prompting overview](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/be-clear-and-direct), [Puter chat API](https://docs.puter.com/AI/chat/), [Puter model catalog](https://docs.puter.com/AI/listModels/).

## Asistente de modelos

El botón **Asistente** de la barra superior abre un chat independiente del historial principal. Puede recomendar motores para HTML, comparar GPT-5.4 y Claude Sonnet o explicar la generación de imágenes. El asesor usa el modelo elegible más barato, limita cada respuesta a 300 tokens y conserva su propio historial local, que se puede limpiar sin borrar los chats normales. La generación de imágenes usa un catálogo/API distinto del catálogo de modelos de chat.
