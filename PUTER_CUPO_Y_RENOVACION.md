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
- Valor normal predeterminado: 384 tokens de salida; historial de dos mensajes.
- Desde el 50 % de uso: máximo 320 tokens por respuesta normal; presupuesto de artefactos hasta 2.400 y sin llamadas auxiliares automáticas.
- Desde el 70 %: máximo 256 tokens y pensamiento adicional pausado; artefactos hasta 2.000.
- Desde el 85 %: máximo 192 tokens; artefactos hasta 1.700.
- Desde el 95 %: máximo 160 tokens; artefactos hasta 1.400.

La selección automática usa únicamente modelos que Puter marque como variante `:free` o con coste cero confirmado para entrada y salida. No se cambia silenciosamente a un motor de pago. `max_tokens` limita la salida, no los tokens de entrada ni el coste total. La protección reduce también el contexto y las llamadas adicionales, pero no puede garantizar que una cuota del proveedor gratuito dure un número concreto de mensajes. Puedes desactivar el ahorro en Ajustes → Uso, aunque no es recomendable si quieres conservar el cupo.

Las llamadas de generación de voz e imágenes son servicios independientes y pueden consumir recursos aparte de los tokens de chat. La mejora de prompts es opcional y hace una llamada adicional solo cuando pulsas su botón. La revisión automática de código está desactivada por defecto; al activarla se hará una segunda llamada.

## Errores de límites
- **402 `insufficient_funds`:** se agotó el cupo mensual incluido. La renovación depende del ciclo del plan Puter; el SDK no devuelve una fecha/hora exacta del siguiente reinicio.
- **429 `too_many_requests`:** límite temporal de frecuencia. No equivale a agotar el cupo mensual; respeta `Retry-After` cuando Puter lo devuelve.

Consulta el panel oficial: https://puter.com/dashboard
Documentación: https://docs.puter.com/rate-limits-and-quotas/
