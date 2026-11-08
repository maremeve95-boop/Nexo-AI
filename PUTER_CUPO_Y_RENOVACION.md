# Cupo y renovación de Puter en Nexo AI

Nexo consulta el cupo mensual real con `puter.auth.getMonthlyUsage()`. Los importes son equivalentes en USD expresados por Puter en microcents: 100.000.000 microcents = 1 USD. El desglose por API/aplicación puede retrasarse aproximadamente un minuto; el total y restante son la referencia principal.

## Cuándo se puede volver a hablar

- **402 `insufficient_funds`:** la asignación mensual incluida se ha agotado. Puter la renueva el próximo mes según el ciclo del plan. El SDK no devuelve un timestamp exacto del próximo reinicio; consulta el panel de Puter. Si tienes créditos comprados, se consumen después de la asignación incluida y no caducan.
- **429 `too_many_requests`:** es un límite temporal de frecuencia/concurrencia, no saldo mensual. Las ventanas dependen de la operación y pueden ser de segundos/minutos; algunas operaciones de archivos pueden tener ventanas de hasta una hora. Si el error incluye `Retry-After`, Nexo muestra ese tiempo. Si no, no inventa una cuenta atrás.
- **Nexo no impone contadores locales por modelo:** el cupo real depende de Puter. Cambiar el perfil no reinicia ni aumenta el cupo.

En Ajustes → Uso puedes actualizar el consumo y abrir el panel oficial: https://puter.com/dashboard

Documentación: https://docs.puter.com/Objects/monthlyusage/ · https://docs.puter.com/Auth/getMonthlyUsage/ · https://docs.puter.com/rate-limits-and-quotas/
