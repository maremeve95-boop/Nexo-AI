# Puter: consumo real y optimización — Nexo AI 9.0

## Ver el uso real

1. Inicia sesión con tu cuenta Puter.
2. Selecciona Nexo 5, Nexo 7, Papoi 8 o Anacleto Pro: aparecerá el chip de uso en la barra superior.
3. Pulsa el chip o abre Ajustes → Uso → Resumen y pulsa Consultar.
4. El panel muestra cupo mensual, restante, consumo total, porcentaje y consumo atribuido a Nexo si Puter identifica su appID. En Análisis puedes ver el desglose por API.
5. Usa el enlace al dashboard de Puter para ver facturación y ciclos de renovación.

## Qué significan las cifras

- `puter.auth.getMonthlyUsage()` devuelve `allowanceInfo.monthUsageAllowance` y `allowanceInfo.remaining` para el cupo de toda la cuenta. `usage` y `appTotals` ofrecen el desglose de la aplicación que realiza la llamada.
- Los valores se miden en microcents: USD 0,01 son 1.000.000 microcents; USD 1,00 son 100.000.000.
- `puter.auth.getDetailedAppUsage(appID)` devuelve `total` y el desglose por API de esa aplicación.
- Los totales son actuales; el desglose por API/aplicación puede retrasarse aproximadamente un minuto.
- El crédito incluido se renueva por ciclo mensual del plan y no se acumula. Los límites de frecuencia 429 usan ventanas móviles separadas. La API de uso mensual no proporciona una fecha exacta de renovación; el dashboard de Puter es la referencia.

## Por qué puede gastar más de lo esperado

Puter aplica cargos por modelo/token y también por egress (datos enviados al navegador). Cada respuesta paga entrada (prompt + historial + memorias + contexto de archivos) y salida (tokens generados). Se añade gasto si la tarea dispara una segunda consulta de búsqueda, recuperación/reparación de archivos, revisión automática o generación de imágenes. Un flujo interrumpido puede estimarse hasta que Puter recibe los tokens finales.

## Qué reduce Nexo 9.0

- El selector automático obtiene los modelos disponibles y sus costes con `puter.ai.listModels()`; prioriza modelos gratuitos y luego opciones de bajo coste verificable.
- Los modelos caros, `:priority`, no verificados, Qwen y Claude Opus se ocultan del selector diario.
- Se limita el historial a seis mensajes recientes y se truncan mensajes antiguos; la memoria selecciona hasta 12 notas relevantes.
- Modo de pensar desactivado y effort bajo por defecto; límites de salida reducidos para preguntas normales.
- Búsqueda web y revisión automática desactivadas hasta que sean necesarias/activadas.
- La recuperación de una entrega descargable solo realiza una segunda llamada si la primera entrega parece incompleta.

## Importante

Puter User-Pays mide uso en la cuenta de cada persona. Nexo no puede reiniciar o regalar el saldo del proveedor. El contador local de respuestas de Nexo es una regla de la aplicación y es independiente del crédito mensual de Puter.
