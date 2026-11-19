# Modelos de Nexo AI — Quality Ladder & Eustaquio Max

Los perfiles Nexo son configuraciones especializadas de la aplicación, no redes neuronales entrenadas por Nexo. El motor real es un modelo externo de Puter seleccionado dinámicamente según el perfil, la tarea, la disponibilidad y la tarifa publicada.

## Jerarquía de perfiles

| Nivel | Perfil | Motor automático | Especialidad |
|---:|---|---|---|
| 1 | **Nexo Estándar** | Modelo gratuito de conversación confirmado | Conversación diaria, explicaciones y tareas generales |
| 2 | **Nexo 4.5** | Modelo gratuito mejor ajustado a investigación | Investigación, contraste y síntesis |
| 3 | **Nexo 5** | Motor gratuito especializado en código cuando esté disponible | Programación y depuración |
| 4 | **Nexo 7** | Modelo gratuito con mejor ajuste a proyectos multimodales | Proyectos, archivos y análisis |
| 5 | **Papoi 8** | Modelo gratuito con buen rendimiento de código | Juegos, experiencias creativas y proyectos 2D/3D |
| 6 | **Anacleto Pro** | Modelo gratuito de mayor ajuste a razonamiento | Análisis complejo y resolución avanzada |
| 7 | **Eustaquio Max** | Motor gratuito de código; variantes OpenAI/Claude solo si son :free o coste 0 | Ingeniería de software y desarrollo web completo |
| 8 | **Nexo Vision 5.5** | Generador visual independiente | Dirección artística, prompts y generación/edición de imágenes |
| 9 | **Nexo Apex 6** | Mejor modelo gratuito compatible disponible | Razonamiento avanzado y análisis exigente |

El orden representa la escala de perfiles y su estrategia de selección, no una garantía matemática de que un modelo gane a todos los demás en cualquier tarea. Vision 5.5 es una especialidad visual y no un escalón de chat general.

## Eustaquio Max — programación de alto nivel

Eustaquio Max es el perfil especialista de código. Prioriza motores gratuitos especializados en código (por ejemplo, Cohere North Mini Code, Particle-1 o Flint, únicamente si aparecen en el catálogo real de Puter y su variante está marcada como gratuita). Una variante gratuita de OpenAI o Claude también puede entrar si Puter la publica. Sonnet, GPT de gama alta y cualquier modelo con coste positivo nunca se seleccionan automáticamente.

Sus reglas de trabajo son:

- Entregar archivos completos y conectados, no fragmentos incompletos.
- Crear interfaces responsive, accesibles y con interacciones reales.
- Revisar arquitectura, imports, rutas, selectores, listeners y dependencias cuando modifica un proyecto existente.
- Evitar botones decorativos, funciones vacías, pseudocódigo y marcadores TODO como sustituto de la implementación solicitada.
- Mantener las soluciones ligeras cuando el proyecto vaya a ejecutarse en un equipo modesto.
- Distinguir comprobaciones estáticas de pruebas realmente ejecutadas.
- Mantener el hilo de conversación y responder al mensaje real.

## Selección, tarifas y confirmación

Nexo consulta `puter.ai.listModels()` en tiempo de ejecución. Solo considera gratuitas las variantes cuyo ID/alias contiene `:free` o cuyo catálogo publica coste 0 para entrada y salida. La selección automática nunca escoge modelos con tarifa positiva. OpenAI y Claude solo entran si la variante concreta es gratuita; Google/Gemini y DeepSeek continúan excluidos del selector de chat.

Puter factura el uso a partir de las tarifas reales del modelo y del consumo efectivo de entrada/salida y herramientas. Los límites `max_tokens` de Nexo solo limitan la salida: no fijan el coste total ni el tamaño de la entrada. Las variantes gratuitas pueden tener cuotas, límites de frecuencia y disponibilidad variable. No existe garantía de uso ilimitado.

## Coherencia conversacional y consumo

Todos los perfiles comparten reglas de continuidad: responder a la intención real del mensaje, conservar el contexto pertinente, no responder «adiós» a «hola», no despedirse sin motivo y no reducir tareas complejas a frases vacías. La salida normal mantiene un límite moderado y la protección de créditos ajusta el presupuesto cuando el uso sube. Eustaquio Max conserva el presupuesto mayor de artefactos ya configurado para permitir entregar proyectos completos. No se realizan revisiones de código duplicadas automáticamente.

Los topes de salida no garantizan un coste fijo: el consumo también depende de tokens de entrada, historial, archivos, imágenes y herramientas. Los motores de pago no se seleccionan automáticamente. Para controlar el consumo, el selector automático se limita a variantes :free o coste cero confirmado.

## Modelos gratuitos y filtro de calidad

Nexo consulta el catálogo dinámicamente y prioriza los candidatos gratuitos que encajan con la especialidad. Se filtran identificadores de baja capacidad muy pequeños (por ejemplo, variantes anunciadas como 1B o 1.7B, Tiny o Micro) para que el perfil diario no elija un motor diminuto solo por consumir menos. Si la cuenta no devuelve un candidato que supere el filtro, Nexo lo comunica o usa el siguiente candidato elegible. No se promete que una familia concreta de modelos esté presente en todas las cuentas.

## Imágenes y audio

La generación de imágenes utiliza una herramienta y un catálogo separados de los modelos de chat. Cambiar el perfil a Eustaquio Max no genera imágenes por sí solo; para crear o editar visuales hay que abrir **Crear imagen**. Vision 5.5 ayuda a formular prompts visuales, pero no sustituye al motor de imagen.

La transcripción de audio usa Puter `speech2txt` con el proveedor configurado por la app; el uso puede consumir créditos de Puter. El dictado del micrófono del navegador es una función distinta.

## Actualidad, búsqueda web y memoria

La aplicación incluye fecha, hora y zona horaria local del navegador en el contexto de cada petición. Las preguntas directas sobre la hora o la fecha pueden resolverse localmente sin consumir una llamada de modelo. Las consultas con indicadores de actualidad pueden activar `web_search` de Puter si el modelo real es compatible (actualmente, los modelos OpenAI que expongan esa herramienta); la herramienta se añade a la petición principal y puede gastar cuota adicional.

El botón **Buscar en Google** abre Google con el texto que el usuario ha escrito, en otra pestaña. Nexo no afirma extraer automáticamente resultados de Google: para leer el contenido, el usuario pega hasta tres enlaces públicos en el chat. El backend `api/read-url.js` los recupera mediante Jina Reader; páginas con autenticación, CAPTCHA, bloqueo o contenido dinámico pueden fallar. La memoria de Nexo conserva notas y preferencias del usuario, pero no actualiza por sí sola información pública y no modifica los pesos del modelo.

## Referencias técnicas

- [Puter.js `listModels()`](https://docs.puter.com/AI/listModels/) — IDs, proveedor, `puterId`, metadatos de coste y variantes `:free`.
- [Puter.js `chat()`](https://docs.puter.com/AI/chat/) — llamada de chat y opciones por modelo.
- [Puter · Anthropic Claude](https://developer.puter.com/ai/anthropic/) — lista de modelos Claude disponibles mediante Puter, incluyendo Sonnet 5.5.
- [Puter · OpenAI](https://developer.puter.com/ai/openai/) — lista de modelos OpenAI disponibles mediante Puter, incluyendo GPT-6.2 Sol y Astra.

La disponibilidad, el coste final y los límites dependen de la cuenta y el catálogo de Puter en el momento de uso.


## Política de consumo — Economy Guard (19-11-2026)

Todos los perfiles automáticos usan únicamente variantes `:free` o con coste cero confirmado para entrada y salida en `puter.ai.listModels()`. OpenAI/Claude solo pueden aparecer cuando Puter indique que esa variante concreta es gratuita; las variantes de pago no se seleccionan automáticamente. Eustaquio Max favorece motores de código gratuitos. Apex 6 y Anacleto Pro adaptan las instrucciones al razonamiento avanzado sin activar automáticamente modelos caros.

El valor predeterminado limita las respuestas normales a 384 tokens de salida, proyectos a 2.800 y el historial a dos mensajes. A partir del 50 % del uso mensual se reduce progresivamente el máximo de salida (320, 256, 192 y 160 tokens al 50, 70, 85 y 95 %), también para artefactos. Las revisiones y reparaciones automáticas duplicadas y la búsqueda facturable auxiliar están desactivadas. Un mensaje del usuario produce una única llamada principal por defecto.

Puter factura el uso conforme a las tarifas del modelo y a los tokens/herramientas efectivamente usados; `max_tokens` limita la salida, no la entrada ni el coste total. Las variantes gratuitas tienen cuotas y límites propios.

- El chat principal desactiva los reintentos automáticos entre proveedores (`fallback:false`) y la repetición por rechazo de Claude (`refusalFallback:false`); un fallo se muestra al usuario en lugar de disparar otra pasada.
