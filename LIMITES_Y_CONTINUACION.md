# Límites y continuación — Nexo AI v8.0

## Límites locales de Nexo

Nexo 5, Nexo 7, Papoi 8 y Anacleto Pro tienen un contador local de 10 respuestas satisfactorias por ventana. En Ajustes se puede elegir 2, 4, 6, 12 o 24 horas. Al llegar al 90 % (9/10) se muestra un aviso una vez durante esa ventana. El panel enseña el uso y el tiempo hasta el reinicio. El panel se refresca al abrir Ajustes, usar el botón de actualizar o tras una respuesta, sin un temporizador permanente en segundo plano.

Este límite se guarda en el navegador, no está protegido por un servidor; borrar los datos del navegador puede reiniciarlo. No representa los créditos de Puter.

## Cuotas reales del proveedor

Puter documenta el crédito de uso como una asignación mensual según el plan; los límites de frecuencia (429) son ventanas separadas. Cambiar la ventana local no recarga los créditos externos. Ante un 402/429 puede usarse una alternativa configurada por el usuario, pero el proveedor alternativo tiene sus propias cuotas.

## Motores de los perfiles

- **Papoi 8:** prioriza Claude Sonnet 5.5 cuando se encuentra en `puter.ai.listModels()`, usando una variante confirmada como gratuita si se ofrece; si no hay Sonnet 5.5, prioriza otros motores permitidos GPT/OpenAI/Codex.
- **Anacleto Pro:** prioriza GPT/OpenAI/Codex disponibles y elige primero entre variantes gratuitas confirmadas si hay alguna. Si el catálogo no expone una variante gratuita, la mejor opción estándar podría requerir crédito del proveedor. Si no hay OpenAI, admite Claude Sonnet compatible.
- Qwen y Claude Opus quedan excluidos de estos perfiles; Nexo 5.5 y Nexo 6 siguen reservados sin mecanismo de desbloqueo.

Los IDs de motor se comparan con el catálogo en vivo; la app no puede activar un modelo que Puter no ofrezca. Los perfiles Nexo no son redes neuronales entrenadas desde cero. Las cuotas y precios del proveedor externo siguen aplicándose.
