# Nexo AI

Aplicación web de Nexo AI. La interfaz principal está en `index.html`; usa Puter.js para los modelos y herramientas.

## Despliegue

1. Sube el contenido de este proyecto a la raíz del repositorio.
2. En Vercel, importa el repositorio y usa la configuración predeterminada de Node.
3. Comprueba que `/api/read-url` responde en el deployment.

## Archivos necesarios en ejecución

- `index.html`: aplicación y lógica de cliente.
- `api/read-url.js`: lector de enlaces públicos con validación de URL.
- `manifest.webmanifest`, `service-worker.js` e `icons/`: instalación PWA y caché.
- `vercel.json`: cabeceras de API y service worker.
- `package.json`: versión Node y comprobaciones.

Los changelogs antiguos y notas de cada iteración se han retirado del paquete limpio; no eran necesarios para ejecutar la aplicación. El historial del repositorio conserva las versiones anteriores.

## Comprobaciones

```bash
npm run check:api
npm run check:service-worker
```

La integración de IA requiere iniciar sesión en Puter. Los motores y cuotas dependen de la cuenta y de la disponibilidad del proveedor.
