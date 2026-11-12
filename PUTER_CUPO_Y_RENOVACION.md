# Uso y límites de Puter en Nexo AI

Nexo consulta el contador mensual real mediante `puter.auth.getMonthlyUsage()`. El panel presenta unidades normalizadas para facilitar la lectura: **1 crédito Nexo mostrado = 1.000.000 microcents** del contador técnico. No es dinero ni un saldo que se pueda comprar.

## Qué muestra
- **Créditos consumidos este mes:** cupo mensual incluido menos remanente.
- **Créditos disponibles:** remanente que devuelve Puter.
- **Consumo atribuido a Nexo:** total que Puter identifique para el ID de esta aplicación.
- **Consumo de esta sesión:** diferencia desde el primer contador de app consultado durante la sesión actual, cuando Puter ofrece ese desglose.
- **Por API:** llamadas y consumo de cada servicio, si están disponibles.

El total mensual y el remanente son la referencia principal. El desglose por API o aplicación puede tardar alrededor de un minuto. Si el proveedor no devuelve consumo de aplicación, Nexo no inventa esa cifra y muestra «No disponible».

## Protección inteligente
- Por debajo del 80 %: se aplican tus ajustes normales.
- Desde el 80 %: las respuestas normales se limitan a 800 tokens y se omiten revisiones automáticas adicionales.
- Desde el 90 %: las respuestas normales se limitan a 512 tokens y se pausan razonamiento y revisiones extra.

La protección no cambia el motor seleccionado, no bloquea el chat y no recorta automáticamente los presupuestos de proyectos/código. Puedes desactivarla en Ajustes → Uso.

Las llamadas de generación de voz e imágenes pueden generar consumo adicional; al 90 % del cupo, Nexo solicita confirmación para esas acciones. Si Puter no devuelve alguno de los campos de saldo, la interfaz indica que no está disponible en vez de inferir que se agotó.

## Errores de límites
- **402 `insufficient_funds`:** se agotó el cupo mensual incluido. La renovación depende del ciclo del plan Puter; el SDK no devuelve una fecha/hora exacta del siguiente reinicio.
- **429 `too_many_requests`:** límite temporal de frecuencia. No equivale a agotar el cupo mensual; respeta `Retry-After` cuando Puter lo devuelve.

Consulta el panel oficial: https://puter.com/dashboard
Documentación: https://docs.puter.com/rate-limits-and-quotas/
