# Límites y continuidad — Nexo AI

## Cuotas reales del proveedor

Nexo no impone un contador local de respuestas ni ventanas artificiales de 10 mensajes. El cupo y los límites de uso los determina el proveedor conectado. El panel Ajustes → Uso consulta el estado real de Puter cuando la cuenta permite acceder a `puter.auth.getMonthlyUsage()`.

- **402 `insufficient_funds`:** el cupo mensual incluido se ha agotado. La renovación depende del ciclo de la cuenta Puter.
- **429 `too_many_requests`:** límite temporal de frecuencia, distinto del cupo mensual. Respeta el tiempo `Retry-After` si el proveedor lo devuelve.

La protección inteligente reduce progresivamente los topes de salida al 50 %, 70 %, 85 % y 95 % del cupo consultado. Los valores exactos se aplican según el perfil y la tarea; no garantizan un coste fijo porque también cuentan entrada, historial y herramientas.

## Créditos y exactitud

Nexo representa el valor técnico en unidades normalizadas: 1 crédito mostrado = 1.000.000 microcents. Es una escala de lectura, no una moneda ni una cartera. El total de cuenta no siempre se puede separar por app; cuando Puter no devuelve consumo atribuido a Nexo, la interfaz muestra «No disponible».

## Modelos y perfiles

Los perfiles Nexo son instrucciones y reglas de enrutamiento, no modelos entrenados desde cero. La selección real se basa en el catálogo en vivo que Puter ofrece a la cuenta. Las cuotas y capacidades pueden cambiar en el proveedor. Nexo Vision 5.5 y Nexo Apex 6 son perfiles especializados disponibles en la interfaz; no representan modelos base entrenados por Nexo.

## Herramientas de voz

- El dictado en directo utiliza las capacidades del navegador cuando están disponibles.
- La generación de voz utiliza `puter.ai.txt2speech()`.
- La transcripción de audio utiliza `puter.ai.speech2txt()` y requiere confirmación, porque puede consumir créditos de Puter.

No hay límites locales para desbloquear modelos ni una cartera de créditos propia de Nexo.


## Actualidad, hora y lectura web

- Fecha, hora y zona horaria proceden del reloj local del navegador. Si el dispositivo tiene mal configurada la hora, Nexo también recibirá ese dato incorrecto.
- Las consultas de actualidad intentan usar búsqueda web nativa de Puter solo si el modelo del catálogo ofrece `web_search`; el servicio puede consumir cuota adicional.
- El botón Buscar en Google abre Google directamente, no una API de resultados. Para análisis dentro de Nexo, el usuario debe pegar hasta tres URLs públicas. Lectura de páginas puede fallar por login, CAPTCHA, bloqueos o contenido dinámico.
- La memoria local sirve para guardar información del usuario y proyectos. No equivale a entrenar el modelo ni aporta noticias o hechos recientes sin búsqueda.
- El seguimiento automático del chat baja al enviar y durante la respuesta si la vista estaba al final. Si el usuario se desplaza arriba, Nexo respeta esa posición.
