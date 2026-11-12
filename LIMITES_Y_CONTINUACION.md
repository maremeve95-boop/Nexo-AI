# Límites y continuidad — Nexo AI

## Cuotas reales del proveedor

Nexo no impone un contador local de respuestas ni ventanas artificiales de 10 mensajes. El cupo y los límites de uso los determina el proveedor conectado. El panel Ajustes → Uso consulta el estado real de Puter cuando la cuenta permite acceder a `puter.auth.getMonthlyUsage()`.

- **402 `insufficient_funds`:** el cupo mensual incluido se ha agotado. La renovación depende del ciclo de la cuenta Puter.
- **429 `too_many_requests`:** límite temporal de frecuencia, distinto del cupo mensual. Respeta el tiempo `Retry-After` si el proveedor lo devuelve.

La protección inteligente de Nexo reduce las respuestas normales al 80 % y 90 % del cupo consultado. No cambia el modelo seleccionado ni recorta automáticamente proyectos grandes.

## Créditos y exactitud

Nexo representa el valor técnico en unidades normalizadas: 1 crédito mostrado = 1.000.000 microcents. Es una escala de lectura, no una moneda ni una cartera. El total de cuenta no siempre se puede separar por app; cuando Puter no devuelve consumo atribuido a Nexo, la interfaz muestra «No disponible».

## Modelos y perfiles

Los perfiles Nexo son instrucciones y reglas de enrutamiento, no modelos entrenados desde cero. La selección real se basa en el catálogo en vivo que Puter ofrece a la cuenta. Las cuotas y capacidades pueden cambiar en el proveedor. Nexo 5.5 y Nexo 6 continúan reservados en la interfaz.

## Herramientas de voz

- El dictado en directo utiliza las capacidades del navegador cuando están disponibles.
- La generación de voz utiliza `puter.ai.txt2speech()`.
- La transcripción de audio utiliza `puter.ai.speech2txt()` y requiere confirmación, porque puede consumir créditos de Puter.

No hay límites locales para desbloquear modelos ni una cartera de créditos propia de Nexo.
