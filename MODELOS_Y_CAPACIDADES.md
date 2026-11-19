# Modelos de Nexo AI — Budget-balanced Model Ladder

Fecha de revisión: 19-11-2026.

Los perfiles Nexo son configuraciones especializadas de la aplicación, no redes neuronales entrenadas desde cero. El motor real se consulta dinámicamente mediante `puter.ai.listModels()`. Nexo comprueba ID, proveedor, disponibilidad, metadatos de coste y, para Vision 5.5, compatibilidad con entrada de imágenes.

## Jerarquía y motores preferentes

| Nivel | Perfil | Rol | Motor preferente de coste contenido | Alternativa / reserva |
|---:|---|---|---|---|
| 1 | **Nexo Estándar** | Asistente cotidiano | Modelo compatible gratuito / coste 0 | Otro modelo gratuito del catálogo |
| 2 | **Nexo 4.5** | Investigación y síntesis | Modelo gratuito con mejor ajuste a análisis | Otro modelo gratuito compatible |
| 3 | **Nexo 5** | Programación y depuración general | Modelo gratuito especializado en código | Otro modelo gratuito compatible |
| 4 | **Nexo 7** | Código rápido y diario | `openai/gpt-5-nano` | `openai/gpt-5.4-nano` o variante elegible publicada |
| 5 | **Papoi 8** | Código limpio y frontend | `openai/gpt-5.4-nano` | `openai/gpt-5-mini`; después un Qwen Coder si entra en el límite |
| 6 | **Anacleto Pro** | Lógica compleja y revisión | `anthropic/claude-haiku-5-5` | `anthropic/claude-haiku-4-5` |
| 7 | **Eustaquio Max** | Programación web y agentes | `openai/gpt-5.1-codex-mini` | `qwen/qwen3-coder-30b-a3b-instruct`; después `qwen/qwen3-coder-flash` |
| 8 | **Nexo Vision 5.5** | Código desde capturas y UI; análisis visual | `openai/gpt-4.1-mini` | `meta-llama/llama-4-scout` si el catálogo confirma visión |
| 9 | **Nexo Apex 6** | Razonamiento avanzado equilibrado | `openai/gpt-5.4-mini` | El mejor motor gratuito compatible si no se autoriza el pago; no usa GPT-5.2 como fallback facturable |

Los nombres anteriores son preferencias, no promesas de disponibilidad. Si Puter no ofrece un ID, lo retira o modifica sus datos, Nexo busca otro motor permitido por el mismo perfil. Los IDs exactos visibles en el catálogo tienen prioridad sobre los nombres amigables.

## Tarifas de referencia y límites por perfil

Precios orientativos del catálogo público de Puter en USD por millón de tokens de entrada / salida; se consultan y se vuelven a comprobar en tiempo de uso. Pueden cambiar y el coste real depende de la cantidad de tokens de entrada, salida, archivos y herramientas.

| Perfil | Preferencia | Tarifa de referencia / 1M (entrada / salida) | Límite aplicado por Nexo |
|---|---|---:|---:|
| Nexo 7 | GPT-5 Nano | $0.05 / $0.40 | $0.25 / $1.50 |
| Papoi 8 | GPT-5.4 Nano | $0.20 / $1.25 | $0.25 / $2.00 |
| Anacleto Pro | Claude Haiku 5.5 | $0.10 / $0.50 | $1.00 / $5.00 |
| Eustaquio Max | GPT-5.1 Codex Mini | $0.25 / $2.00 | $0.35 / $2.00 |
| Eustaquio Max (alternativa económica) | Qwen3 Coder 30B A3B Instruct | $0.15 / $0.60 | $0.35 / $2.00 |
| Eustaquio Max (reserva) | Qwen3 Coder Flash | $0.30 / $1.50 | $0.35 / $2.00 |
| Vision 5.5 | GPT-4.1 Mini | $0.40 / $1.60 | $0.45 / $2.00 |
| Apex 6 | GPT-5.4 Mini | $0.75 / $4.50 | $0.80 / $5.00 |

La tabla resume las tarifas de referencia observadas; no se guarda como precio definitivo. El catálogo en vivo de la cuenta es la única fuente para habilitar cada opción. No se habilitan modelos sin coste verificable o sin metadatos de precio USD reconocidos.

### Política de selección y consentimiento

- **Nexo Estándar, 4.5 y 5** permanecen gratuitos por defecto: solo usan `:free` o coste 0 confirmado.
- Los seis perfiles especialistas anteriores pueden proponer un motor económico concreto, pero solo si su ID aparece en el catálogo, coincide con la especialidad, su tarifa está dentro del techo del perfil y la tarifa tiene metadatos válidos.
- Antes de enviar la primera petición facturable, Nexo muestra el nombre del motor, la tarifa por millón de tokens y pide confirmación. Si el precio cambia, vuelve a pedir permiso. Cancelar significa que la petición no se envía; no se cambia silenciosamente a otro motor de pago.
- Si el modelo preferente falta, supera el presupuesto o no se autoriza, Nexo utiliza una alternativa gratuita compatible o informa de que no hay motor elegible. Nunca sube a GPT-5.2, GPT Astra, Claude Opus ni otro modelo más caro como fallback automático.
- Puter publica el ID `openai/gpt-5.1-codex-mini` con su propia ficha y precio. La documentación general de OpenAI marca como deprecados otros IDs de GPT-5.1 Codex; por eso Nexo confía en el catálogo de Puter en vivo y solo lo habilita si vuelve a aparecer con tarifa válida. GPT-5 Nano y GPT-5 Mini tienen retirada anunciada para el 11-12-2026; GPT-5.4 Nano figura con retirada anunciada para el 01-04-2027. Si desaparecen del catálogo, se usará la alternativa aprobada que siga disponible.
- Gemini/Google y DeepSeek continúan fuera del selector de chat por la decisión de producto anterior. La generación de imágenes permanece en su herramienta separada.

## Roles funcionales

- **Nexo 7:** consultas de código cotidianas, scripts, snippets, correcciones y funciones pequeñas.
- **Papoi 8:** frontend moderno, interfaces responsive, accesibilidad y código mantenible; conserva capacidad creativa para juegos y experiencias 2D/3D.
- **Anacleto Pro:** lógica difícil, causas raíz, revisión y casos límite.
- **Eustaquio Max:** desarrollo web y de software completo, archivos conectados, arquitectura, APIs y agentes cuando la herramienta lo permita; prioriza GPT-5.1 Codex Mini, con Qwen3 Coder como alternativa económica.
- **Nexo Vision 5.5:** analiza capturas, mockups y UI; puede convertir una referencia visual en código. La generación de imágenes se hace en el generador independiente.
- **Nexo Apex 6:** razonamiento complejo, planificación y síntesis avanzada, usando GPT-5.4 Mini solo después de la confirmación de tarifa.

## Coherencia y ahorro

Todos los perfiles comparten reglas de continuidad: responder a la intención real, mantener el contexto pertinente, no responder «adiós» a «hola» y no acortar las tareas hasta dejarlas incompletas. Los valores predeterminados de ahorro se conservan: 384 tokens de salida normal, 2.800 para proyectos y dos mensajes de historial; no se realizan revisiones ni reparaciones automáticas duplicadas. Los modelos facturables tienen además sus límites de tarifa por perfil.

Los topes de salida no fijan un coste exacto: también cuentan entrada, contexto, archivos, imágenes y herramientas. Nexo no puede prometer un coste fijo por conversación.

## Imágenes, actualidad y memoria

La generación de imágenes utiliza una herramienta y un catálogo independientes de los modelos de chat. Vision 5.5 analiza referencias y ayuda con prompts, pero no sustituye al generador.

La app incluye fecha, hora y zona horaria local del navegador. La búsqueda nativa de Puter solo se añade a la petición principal cuando el motor la admite; el botón de Google abre Google y el usuario puede pegar hasta tres enlaces públicos para que Nexo lea sus páginas. La memoria conserva preferencias y notas, pero no entrena los pesos del modelo ni actualiza por sí sola información mundial.

## Referencias técnicas

- [Puter.js `listModels()`](https://docs.puter.com/AI/listModels/) — IDs, proveedor, metadatos de coste y variantes `:free`.
- [Puter.js `chat()`](https://docs.puter.com/AI/chat/) — llamada de chat y opciones por modelo.
- [Puter · Catálogo de OpenAI](https://developer.puter.com/ai/openai/) — IDs OpenAI disponibles mediante Puter.
- [Puter · Catálogo de Anthropic](https://developer.puter.com/ai/anthropic/) — IDs Claude disponibles mediante Puter.
- [OpenAI — Modelos y precios](https://platform.openai.com/docs/models) — identificadores, estado y precios de referencia.
- [Anthropic — Precios](https://www.anthropic.com/pricing) — tarifas de referencia de Claude.

La disponibilidad, las tarifas finales, el cupo y los límites dependen del catálogo y de la cuenta Puter en el momento de uso.
