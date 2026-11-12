# Uso de Puter y optimización — Nexo AI

## Consultar consumo

1. Inicia sesión con Puter.
2. Pulsa el chip de consumo de la barra superior o abre Ajustes → Uso.
3. Pulsa Actualizar para consultar los créditos reales.
4. En Análisis puedes descargar un informe CSV con los datos disponibles.

## Unidad visual de créditos

Nexo presenta el contador técnico de Puter en unidades legibles: 1 crédito mostrado equivale a 1.000.000 microcents. Es una escala visual, no dinero, no una cartera y no representa una cantidad fija de mensajes.

`puter.auth.getMonthlyUsage()` devuelve el cupo mensual y el remanente de la cuenta. `puter.auth.getDetailedAppUsage(appID)` puede devolver el consumo y el desglose de Nexo. Si Puter no facilita el detalle de la app, Nexo no inventa el consumo atribuido. Los detalles por API/app pueden retrasarse alrededor de un minuto.

## Protección inteligente

- Desde el 80 % del cupo: respuestas normales de hasta 800 tokens y pausa de revisiones adicionales.
- Desde el 90 %: respuestas normales de hasta 512 tokens y pausa de razonamiento/revisiones adicionales.
- No cambia el modelo seleccionado ni reduce automáticamente los presupuestos de proyectos grandes.

## Cómo reducir consumo

- Usa un modelo gratuito o de nivel bajo cuando sea suficiente.
- Mantén desactivada la búsqueda web para preguntas que no necesiten actualidad.
- Conserva un historial corto y adjunta solo los archivos necesarios.
- Genera imágenes finales cuando estés conforme con el prompt; usa antes el modo de prueba si quieres comprobar el servicio.
- Evita pedir revisiones duplicadas si la primera respuesta ya resuelve la tarea.

## Límites del proveedor

402 indica que se alcanzó el cupo mensual incluido; 429 indica un límite temporal de frecuencia. No son el mismo problema. Respeta `Retry-After` cuando Puter lo devuelve. La API de uso no ofrece una fecha/hora exacta de renovación; consulta https://puter.com/dashboard.
