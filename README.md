# Nexo AI — edición definitiva

Aplicación web/PWA de Gorbus con chat, perfiles especializados, generador y análisis de imágenes, archivos, memoria local, lectura de enlaces, voz y espacios de trabajo. La conexión de chat y el catálogo de motores se realizan con Puter.js.

## Perfiles

1. **Nexo Estándar** — perfil diario predeterminado (sustituye a Nexo 4 Lite).
2. **Nexo 4.5** — investigación y síntesis.
3. **Nexo 5** — programación general y depuración.
4. **Nexo 7** — Creator Lab, análisis y proyectos complejos.
5. **Papoi 8** — juegos y experiencias 2D/3D.
6. **Anacleto Pro** — análisis avanzado.
7. **Eustaquio Max** — nuevo perfil especialista en programación y desarrollo web completo, situado después de Anacleto Pro.

Los perfiles anteriormente reservados Nexo 5.5 y Nexo 6 se renombran **Nexo Vision 5.5** y **Nexo Apex 6** y quedan activos como perfiles especializados. Los perfiles ChatGPT/OpenAI, Claude, Gemini y DeepSeek se han retirado del selector de chat. Los perfiles Nexo son instrucciones y políticas de selección; no son modelos neuronales entrenados desde cero.

## Modelos y costes

Nexo consulta `puter.ai.listModels()` en la cuenta activa. Solo deja seleccionar motores de chat con coste 0 publicado para entrada y salida o una variante `:free` reconocida por el ID del catálogo. Automático elige primero la alternativa gratuita compatible más económica. La documentación de Puter especifica que las variantes gratuitas están sujetas a cuotas y que el proveedor puede retirarlas. No existe garantía de uso ilimitado ni de que un modelo concreto aparezca en todas las cuentas. Nexo Apex 6 es la excepción controlada: acepta Sonnet o GPT-5.4 solo si el catálogo informa un coste verificable bajo un tope de 4 USD/M de entrada y 20 USD/M de salida; las respuestas se limitan a 700 tokens por defecto y pueden bajar con la protección inteligente.

Entre las familias gratuitas que pueden buscarse en catálogos públicos están Nemotron 3 Ultra, Nemotron 3.5 Super VL, Nemotron 3.5 Lightning, Nemotron 3 Nano Omni, ERNIE 5.5 Flash, Liquid LFM3 1.7B, Ling 3.2 Flash, Dots3-Note, Particle-1, Cohere North Mini Code y Flint. La aplicación solo las mostrará si Puter las devuelve realmente. No fija IDs de OpenRouter como si fueran automáticamente compatibles con Puter. Revisa `MODELOS_Y_CAPACIDADES.md` para detalles.

## Funciones destacadas

- Chat con historial local, memoria, adjuntos y análisis de archivos.
- Asistente de modelos en un overlay/chat independiente con historial separado.
- Generación y edición de imágenes mediante GPT Image 2.6 Flare/Sunburst o Gemini 3 Pro Image, con calidad media recomendada y mejora opcional del prompt visual. La mejora usa un modelo de texto económico y solo se ejecuta cuando se pulsa el botón.
- Lectura de enlaces públicos HTTP/HTTPS que el usuario comparta. Esta edición no anuncia búsqueda web general integrada al retirar los motores OpenAI del chat.
- Dictado desde el navegador, lectura en voz alta y transcripción de audio con Puter speech2txt/xAI.
- Descarga de archivos generados y paquetes ZIP.
- Ajustes de uso, límites de salida y protección inteligente de consumo. La aplicación muestra cupo mensual, saldo restante, porcentaje consumido y detecta agotamiento tras actualizar el dato de Puter o recibir un error de crédito. Incluye un diálogo de cupo agotado y una ventana de planes estilo Puter; los botones Upgrade abren Puter y no procesan pagos dentro de Nexo.
- Diseño responsive con modo de rendimiento para dispositivos modestos.

## Uso y despliegue

1. Descomprime el ZIP.
2. Sube el contenido a la raíz del repositorio (no subas solo el ZIP).
3. Conserva `index.html`, `icons/`, `api/`, `manifest.webmanifest` y `service-worker.js`.
4. Importa el repositorio en Vercel con preset **Other**, sin build command y con output directory `.`.
5. Abre la URL HTTPS e inicia sesión con Puter.
6. En Ajustes → Modelos, pulsa **Actualizar catálogo** para consultar los motores que tu cuenta ofrece en ese momento.

Requisito para las comprobaciones locales: Node.js 20 o superior. Ejecuta `npm run check:api`. No guardes claves privadas en el HTML ni en el repositorio.

## Consumo y privacidad

Las cuotas y tarifas dependen del proveedor y de la cuenta Puter. Los límites de salida de Nexo no equivalen al gasto total: también cuentan entrada, historial, archivos, imágenes y herramientas. Nexo no integra pagos, cartera ni suscripciones. La sincronización entre dispositivos es opcional y no ofrece cifrado de extremo a extremo; evita sincronizar secretos o datos sensibles.

Las comprobaciones estáticas no sustituyen una prueba de funcionamiento con una sesión real de Puter.
