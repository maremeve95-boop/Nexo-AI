# Límites de Puter y continuación de chat

## Por qué aparece el cuadro original
Puter.js puede abrir automáticamente su diálogo de uso/crédito al recibir `402 insufficient_funds`. Cambiar de cuenta solo cambia el límite si se autentica realmente en otra cuenta que tenga cuota propia; no restablece la cuota de la cuenta anterior. Los errores `429 too_many_requests` son límites temporales diferentes.

## Qué hace esta versión
- Oculta el custom element `usage-limit-dialog` en el navegador independiente y gestiona el rechazo en Nexo.
- Presenta “SE ALCANZARON LOS LÍMITES” para crédito insuficiente y un aviso separado para límites temporales.
- Permite exportar la conversación y, opcionalmente, continuar el mismo hilo textual con Gemini API.
- Consulta el catálogo de modelos con `generateContent` al introducir la clave; la selección se basa en modelos que el propio proyecto de Google devuelve, no en IDs inventados.

## Uso del proveedor alternativo
La clave es introducida por el propio usuario y se guarda solo en `sessionStorage` de la pestaña. Se usa para solicitudes desde el navegador directamente a `generativelanguage.googleapis.com`; no se incluye en HTML, ZIP, historial ni commits. La clave se puede inspeccionar por alguien con acceso al navegador, así que usa solo una clave personal en un despliegue que controles. Para una aplicación pública multiusuario, utiliza un backend seguro y no compartas una clave común.

La cuota gratuita de Gemini no es ilimitada: depende del proyecto, modelo, país/condiciones y límites actuales. La app no activa facturación. Si el proveedor alternativo llega a su límite, Nexo lo indica y permite cambiar el modelo o volver más tarde. No se puede prometer un chat en la nube sin ninguna cuota ni proveedor disponible.

Los archivos binarios e imágenes enviados a Puter no se conservan en el historial de texto del navegador, por lo que deben adjuntarse otra vez para que el proveedor alternativo pueda analizarlos.
