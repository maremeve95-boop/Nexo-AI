# Uso real de Puter y por qué se consumen créditos

Nexo AI 8.2 usa `puter.auth.getMonthlyUsage()` cuando abres Ajustes o pulsas Consultar. La sección muestra la asignación mensual y su uso aproximado, además del coste que Puter atribuye a las APIs de esta app.

La documentación oficial explica que el consumo se mide en microcentavos y que el uso de IA depende del modelo y tokens; búsqueda web, imágenes, audio, egress y operaciones de almacenamiento también pueden consumir recursos. Las solicitudes que incluyen mucho historial o generan mucho código pueden costar más.

Nexo reduce el coste potencial enviando menos historial antiguo, limitando el contexto, usando presupuestos de salida más bajos y dejando la revisión automática desactivada por defecto. Los juegos grandes o proyectos 3D siguen necesitando más tokens que una respuesta corta.

Importante: `allowanceInfo.remaining` representa la asignación mensual restante, no necesariamente todos los créditos comprados. Usa el panel oficial para el saldo completo: https://puter.com/#billing

Límites del proveedor:
- 402 insufficient_funds: asignación/crédito insuficiente. Cambiar de modelo no lo soluciona necesariamente.
- 429 too_many_requests: límite temporal de frecuencia; Nexo permite reintentar tras una pausa de 60 segundos, pero no cambia los límites de Puter.

Fuentes: https://docs.puter.com/rate-limits-and-quotas/ y https://docs.puter.com/Auth/getMonthlyUsage/


## Qué hacer si la ventana de límites congela el chat

El panel de Nexo es no modal, para que la interfaz detrás siga siendo interactiva. El detector busca diálogos del SDK en el documento y en Shadow DOM abierto, y evita recorrer todo el documento en cada cambio de texto. Algunos diálogos dentro de iframes de otro origen o Shadow DOM cerrado no se pueden ocultar desde la página; recarga la app y usa `https://puter.com/#billing` para consultar la cuenta o cambia al proveedor alternativo configurado.
