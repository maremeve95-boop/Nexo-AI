# Nexo AI 8.2 — Uso real y rendimiento

- Nuevo panel de consumo real de Puter en Ajustes con cupo mensual, restante, gasto equivalente en USD y consumo por API de Nexo AI.
- Enlace oficial al panel `https://puter.com/dashboard`.
- Distinción explícita entre cupo mensual de Puter, consumo por API, créditos internos de Nexo y límites locales de respuesta.
- Detección más robusta del diálogo externo de límites, también en Shadow DOM abierto; Escape, X y cerrar y volver al chat liberan la interfaz.
- Reducción del historial y de los máximos de salida por defecto para reducir reservas y gasto.
- Segunda revisión automática desactivada por migración; se puede volver a activar desde Ajustes.
- Eliminada la llamada redundante de refresco de autenticación tras cada respuesta.

## Importante
Puter indica que el crédito de uso se renueva mensualmente, mientras los límites 429 tienen ventanas independientes. Los valores de allowance se devuelven en microcentavos; 100.000.000 microcentavos equivalen a 1 USD. `getMonthlyUsage()` ofrece allowanceInfo y consumo por API; el desglose puede retrasarse hasta aproximadamente un minuto.

- Si Puter expone `puter.appID`, el panel consulta `getDetailedAppUsage(appId)` para mostrar consumo específico de Nexo; sin App ID, no atribuye el gasto total de la cuenta a la app.
- El detector del diálogo de Puter solo oculta candidatos específicos de facturación y no inspecciona ni oculta elementos contenedores generales, evitando congelar el resto de la interfaz.
