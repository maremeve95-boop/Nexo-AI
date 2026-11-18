# Modelos de Nexo AI — edición definitiva

Los perfiles Nexo son instrucciones, prioridades de tarea y límites de uso de esta aplicación. **No son redes neuronales entrenadas por Nexo**: el motor que genera una respuesta es un modelo externo seleccionado desde el catálogo dinámico que Puter ofrece a la cuenta.

## Familia disponible

| Orden | Perfil | Uso recomendado | Estado |
|---:|---|---|---|
| 1 | **Nexo Estándar** | Asistente diario equilibrado, conversación, explicaciones y tareas generales. | Disponible · predeterminado |
| 2 | **Nexo 4.5** | Investigación, contraste de información, síntesis y análisis. | Disponible |
| 3 | **Nexo 5** | Programación general, depuración y mantenimiento de software. | Disponible |
| 4 | **Nexo 7** | Creator Lab: planificación, archivos, análisis multimodal y proyectos complejos. | Disponible |
| 5 | **Papoi 8** | Videojuegos, experiencias creativas y proyectos 2D/3D. | Disponible |
| 6 | **Anacleto Pro** | Análisis avanzado y resolución de problemas complejos. | Disponible |
| 7 | **Eustaquio Max** | Especialista en ingeniería de software y desarrollo web completo: HTML, CSS, JavaScript, TypeScript, Python y otros lenguajes. | Disponible · nuevo |
| 8 | **Nexo Vision 5.5** | Dirección artística, mejora compacta de prompts y generación/edición de imágenes. | Disponible |
| 9 | **Nexo Apex 6** | Razonamiento avanzado, prioriza Sonnet y usa GPT-5.4 como respaldo con tarifas verificadas y límites de coste. | Disponible |

Nexo 4 Lite se ha retirado. Nexo Estándar ocupa su lugar como perfil principal. Los perfiles genéricos ChatGPT/OpenAI, Claude, Gemini y DeepSeek se han retirado del selector de chat. Nexo Apex 6 puede usar Claude Sonnet o GPT-5.4 como motores específicos cuando Puter los publique con precio verificable; no se ofrecen como perfiles genéricos. Eustaquio Max aparece inmediatamente después de Anacleto Pro.

## Eustaquio Max

Eustaquio Max es el perfil especialista de código. Sus prioridades son:

- Entregar archivos completos y conectados, no fragmentos incompletos.
- Crear interfaces responsive, accesibles y con interacciones reales.
- Revisar arquitectura, imports, rutas, selectores, listeners y dependencias cuando se modifica un proyecto existente.
- Evitar botones decorativos, funciones vacías, pseudocódigo y marcadores TODO como sustituto de la implementación solicitada.
- Mantener las soluciones ligeras cuando el proyecto vaya a ejecutarse en un equipo modesto.
- Distinguir comprobaciones estáticas de pruebas realmente ejecutadas.

## Modelos gratuitos: cómo se eligen

Nexo consulta `puter.ai.listModels()` en tiempo de ejecución. La documentación oficial indica que el catálogo devuelve IDs, proveedor, aliases y metadatos de coste/capacidad cuando están disponibles. El selector solo admite modelos de chat con coste 0 confirmado en entrada y salida o variante `:free`; excluye proveedores/perfiles de chat retirados, variantes `:priority` y motores que no encajan con los criterios de esta edición.

La búsqueda de modelos gratuitos se guía por familias que aparecen en el catálogo público de OpenRouter consultado el 18 de noviembre de 2026 —por ejemplo, **NVIDIA Nemotron 3 Ultra**, **ERNIE 5.5 Flash Preview**, **Nemotron 3.5 Super VL**, **Nemotron 3 Nano Omni**, **Nemotron 3.5 Lightning**, **Liquid LFM3 1.7B**, **Ling 3.2 Flash**, **Dots3-Note**, **Particle-1**, **Cohere North Mini Code** y **Flint**—, pero Nexo **solo muestra y usa una opción cuando su propio catálogo Puter la devuelve**. No se inventan IDs ni se da por hecho que OpenRouter y Puter ofrezcan exactamente el mismo conjunto.

Las variantes `:free` pueden tener cuotas por proveedor, límites temporales, colas y cambios o retiradas. Inkling 2 Small aparece marcado para retirarse el 19 de noviembre de 2026, por lo que no se usa como recomendación estable en esta edición. “Gratis” no significa ilimitado ni garantiza que esté disponible en todas las cuentas. Automático prioriza primero el menor coste elegible y usa la especialidad como desempate; no elige un modelo caro solo porque su nombre parezca más potente. Si no existe un modelo gratuito compatible, Nexo lo comunica en vez de cambiar a uno de pago silenciosamente.

## Selección y uso de modelos

- **Automático**: selecciona el motor elegible de menor coste publicado que encaja con la tarea.
- **Manual**: permite escoger entre las opciones gratuitas confirmadas por el catálogo de la cuenta.
- **Visión**: cuando el catálogo identifica una modalidad de imagen, se puede priorizar un motor compatible para analizar adjuntos.
- **Asistente de modelos**: chat independiente con historial propio que explica qué perfil elegir y compara solo IDs presentes en el catálogo real.

## Búsqueda y lectura web

La búsqueda web integrada de Puter depende de un motor compatible con la herramienta `web_search`. Esta edición retira los perfiles OpenAI/GPT del chat y, por tanto, **no promete búsqueda web general integrada**. Se conserva la lectura de páginas públicas: pega una URL HTTP/HTTPS y Nexo intentará recuperar su contenido mediante el lector del proyecto. Las páginas que exigen sesión o bloquean lectores automáticos pueden fallar.

## Imágenes y audio

La generación de imágenes utiliza una herramienta y un catálogo separados de los modelos de chat. Cambiar el perfil a Eustaquio Max no genera imágenes por sí solo; abre **Crear imagen** para generar o editar visuales. Los modelos que aparezcan en ese apartado son motores visuales y no perfiles de chat.

La transcripción de audio usa Puter `speech2txt` con el proveedor xAI y solicita idioma español; el uso puede consumir créditos del servicio de voz de Puter. El dictado del micrófono del navegador es una función distinta.

## Consumo y límites

Los límites de tokens de Nexo son topes de salida, no una garantía del gasto total. El consumo depende también del contenido de entrada, historial, archivos, imágenes, llamadas de herramientas y cuotas del proveedor. La protección de créditos reduce presupuestos cuando el uso de Puter aumenta, pero no puede garantizar un importe exacto. No existe cartera propia, Premium ni compra de créditos dentro de Nexo.

## Referencias técnicas

- [Puter.js `listModels()`](https://docs.puter.com/AI/listModels/) — catálogo por cuenta, metadatos de coste y variantes `:free`.
- [Puter.js `chat()`](https://docs.puter.com/AI/chat/) — llamada de chat y herramientas disponibles.
- [Puter.js `speech2txt()`](https://docs.puter.com/AI/speech2txt/) — transcripción y proveedores admitidos.
- [OpenRouter: Free Models](https://openrouter.ai/collections/free-models/) — referencia pública actualizada en noviembre de 2026, con descripciones, tarifas publicadas y modelos previstos para desaparecer; no implica que estén habilitados en Puter.

## Nexo Vision 5.5

Nexo Vision 5.5 es un perfil de arte visual que abre el generador independiente cuando el usuario pide crear una imagen. El valor predeterminado es **GPT Image 2.6 Flare** con calidad media: equilibrio entre acabado y coste. También se ofrecen GPT Image 2.6 Sunburst para detalle y Gemini 3 Pro Image. La disponibilidad efectiva depende del catálogo y los permisos de Puter. El botón **Mejorar prompt visual** hace una única llamada corta (máximo aproximado de 220 tokens de salida) a un motor gratuito de texto, solo cuando el usuario lo pulsa.

## Nexo Apex 6

Nexo Apex 6 busca primero Claude Sonnet y después GPT-5.4, pero solo cuando `puter.ai.listModels()` devuelve un coste verificable dentro del límite de 4 USD por millón de tokens de entrada y 20 USD por millón de salida. Se excluyen variantes `:priority`. Si no hay coincidencias, usa un motor gratuito compatible y no afirma que haya utilizado Sonnet o GPT-5.4. El máximo normal de salida del perfil se limita a 700 tokens antes de aplicar la protección gradual de créditos. Esto reduce consumo, pero no garantiza un coste fijo: también cuenta el contexto de entrada.

## Uso y suscripciones Puter

`puter.auth.getMonthlyUsage()` devuelve `allowanceInfo.monthUsageAllowance` y `allowanceInfo.remaining`. Nexo muestra consumo, restante y porcentaje; también actualiza el panel después de errores de crédito/402. El aviso de cupo agotado se muestra cuando el dato devuelto indica cero restante. La API no proporciona la fecha exacta de renovación. El modal de suscripciones reproduce la estructura Free/Basic/Plus/Pro y cada botón Upgrade abre la página oficial `https://puter.com/`; Nexo no procesa compras ni recoge datos de pago. Los precios públicos mostrados en esta edición son $0, $10, $25 y $100 USD/mes y pueden cambiar.
