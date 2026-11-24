# Nexo AI

Aplicación web de Nexo AI. La interfaz principal está en `index.html`; utiliza Puter.js para modelos y herramientas.

## Actualización 1.2.1 — 24 de noviembre de 2026

- Enrutamiento economy-first: los modelos gratuitos compatibles se ordenan antes que cualquier opción de pago; las tarifas y el consentimiento de pago existentes siguen vigentes.
- Fallback explícito ante 402/429: Nexo prueba hasta dos alternativas gratuitas compatibles, también cuando el error llega durante el stream.
- El fallback integrado del SDK está desactivado para impedir cambios silenciosos de modelo o tarifa.
- Los timeouts cubren tanto la promesa inicial de Puter como las lecturas del stream; un límite agotado ya no bloquea el resto de la pestaña.
- El ahorro inteligente reduce el historial y las llamadas auxiliares con el consumo real de Puter. El payload transmite solo roles y texto, no metadatos internos.

## Actualización 1.2.0 — 24 de noviembre de 2026

- Nexo conoce la fecha de esta versión y responde localmente cuándo se actualizó.
- Caché del catálogo de modelos: restaura la lista al iniciar y la actualiza en segundo plano, evitando pedir el catálogo en cada mensaje.
- Instrucciones reforzadas para juegos 2D HTML autocontenidos: primer frame visible, Canvas 2D, bucle requestAnimationFrame, controles, objetivo, HUD y reinicio.
- Diagnóstico estático y previsualización aislada de HTML con avisos de errores JavaScript o Canvas sin dibujo.
- Reparación de HTML bajo petición manual, sin llamadas automáticas adicionales.

## Archivos esenciales

- `index.html`: aplicación y lógica de cliente.
- `api/read-url.js`: lector de enlaces públicos.
- `manifest.webmanifest`, `service-worker.js` e `icons/`: PWA y caché.
- `vercel.json`: configuración de despliegue.
- `package.json`: configuración Node y comprobaciones.

```bash
npm run check
```

Los perfiles son configuraciones de Nexo, no modelos entrenados desde cero. El catálogo y las cuotas dependen de Puter. La vista previa HTML está aislada y no sustituye probar el juego en los dispositivos objetivo.
