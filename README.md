# Nexo AI

Aplicación web de IA centrada en modelos económicos de Puter, generación y análisis de imágenes, chats locales, búsqueda web, memoria, archivos y herramientas de voz.

## Lo principal
- Catálogo dinámico de modelos y selección automática basada en costes publicados y capacidades; el selector puede incluir GPT-5.4 y Claude Sonnet cuando Puter confirma su ID y su tarifa dentro del presupuesto.
- Chat independiente **Asistente de modelos** para recomendar motores por tarea, explicar cómo crear HTML/imagenes y comparar coste/capacidad sin mezclar el historial principal.
- Perfiles de proveedor GPT/OpenAI, Claude/Anthropic, Gemini/Google y DeepSeek, siempre enrutados a IDs reales del catálogo y filtrados por coste.
- Pensamiento adaptativo por tipo de tarea; `reasoning_effort` solo se envía a modelos OpenAI compatibles.
- Iconos SVG originales para los perfiles; las instrucciones de generación de HTML exigen SVG accesibles en vez de emojis como iconos de interfaz.
- Panel **Ajustes → Uso** con créditos de consumo, créditos disponibles, porcentaje mensual, desglose de uso y exportación CSV.
- Protección inteligente configurable que reduce el gasto de salida cuando se consume el cupo mensual.
- Generación/edición de imágenes con modo de prueba `test_mode`.
- Transcripción de archivos de audio a texto con revisión antes de enviar; el archivo no se guarda en el historial.
- Análisis de imágenes usando modelos de visión compatibles.
- Historial paginado y búsqueda dentro de conversaciones; paneles con scroll independiente.
- Búsqueda web, lectura de enlaces públicos, memoria local, dictado en directo, transcripción de audio y lectura de respuestas.
- Sin cartera Nexo, suscripciones Premium, compras ni endpoints de pago.

## Créditos de consumo
Nexo consulta el uso real con `puter.auth.getMonthlyUsage()` y, cuando está disponible, `puter.auth.getDetailedAppUsage()`. Para que sea legible, Nexo representa el contador técnico en unidades normalizadas: **1 crédito mostrado = 1.000.000 microcents**. Esta escala no es dinero ni un crédito comprable. El total de cuenta no siempre puede atribuirse por completo a Nexo; el panel lo indica si Puter no devuelve datos por aplicación.

La protección inteligente viene activada por defecto: a partir del 80 % limita respuestas normales a 800 tokens y omite revisiones automáticas adicionales; a partir del 90 % limita respuestas normales a 512 tokens y pausa razonamiento adicional. No cambia el modelo seleccionado ni modifica el presupuesto de proyectos grandes.

## Desarrollo
- Requisito: Node.js 20 o superior.
- Comprobación API: `npm run check:api`.
- Despliegue: consulta `DEPLOY_VERCEL.md`.
- No guardes claves privadas en el HTML ni en el repositorio.

Las cuotas, modelos disponibles, costes técnicos y herramientas dependen de la cuenta y del proveedor Puter. La comprobación estática del proyecto no sustituye a una prueba real con una cuenta.

## Espacios, sincronización y Nexo Live

### Sincronizar Chromebook e iPhone
1. Publica Nexo en HTTPS.
2. Inicia sesión con la misma cuenta Puter en ambos dispositivos.
3. En cada dispositivo, abre **Ajustes → Cuenta y datos** y activa **Sincronización automática**.
4. Confirma la copia y pulsa **Sincronizar ahora** la primera vez. Después, Nexo agrupa cambios y los sincroniza automáticamente.

La sincronización es opcional y cada dispositivo necesita su propia confirmación. Copia los chats, sus contenidos guardados, memorias, espacios y notas de conocimiento. Los archivos originales adjuntos no se suben por separado. Puedes exportar e importar un respaldo JSON. Si cambias de cuenta, la sincronización automática se detiene y exige nueva confirmación. Esta versión no ofrece cifrado de extremo a extremo: evita sincronizar secretos o datos sensibles.

### Espacios de trabajo
En la barra lateral abre **Espacios de trabajo** para crear proyectos con instrucciones independientes. Al usar un espacio, puedes pulsar **Guardar en espacio** en una respuesta para convertirla en una nota de conocimiento reutilizable. Nexo añade solo las cinco notas recientes y limita su longitud para no cargar el prompt.

### Conversación por voz Nexo Live
Abre **+ → Conversación en directo**, revisa el aviso de uso y marca la casilla antes de conectar. Necesita HTTPS, permiso del micrófono, una sesión Puter y acceso a la API Realtime en tu cuenta. La función es experimental y puede consumir saldo/cupo del proveedor. Para evitar ese consumo, usa **Voz por turnos**: dictado y lectura normal del navegador.

El botón **Terminar** detiene el micrófono y el altavoz; también se intenta liberar el audio al cerrar el panel o abandonar la página. La prueba de desarrollo usa un audio simulado, no valida una cuenta Puter real.


## Perfiles y pensamiento adaptativo

Después de Anacleto Pro, el selector incluye perfiles específicos para OpenAI/GPT, Anthropic/Claude, Google/Gemini y DeepSeek. Cada perfil usa solo motores de esa marca que aparecen en el catálogo dinámico y pasan el umbral económico de Nexo; si no existe uno elegible, no hace fallback cruzado. Son perfiles de enrutamiento e instrucciones, no redes nuevas.

El modo Pensar adapta instrucciones a la dificultad. En modelos OpenAI compatibles se configura `reasoning_effort`; en Claude/Gemini/DeepSeek no se mandan campos que el wrapper de Puter no documenta. Para Claude se usan instrucciones directas, contextos delimitados y etiquetas XML en tareas que se benefician de ello.


## Signature & Economy Update — 16/11/2026

- Respuesta normal predeterminada: 800 tokens máximos.
- Presupuesto predeterminado para proyectos: 4.000 tokens, con más margen para juegos grandes y 3D.
- Protección progresiva de créditos desde el 70 % del cupo real de Puter.
- Búsqueda auxiliar más compacta y sin revisiones automáticas adicionales.
- Renovación visual de la interfaz, el compositor, las conversaciones y los ajustes.
- Se conserva el catálogo de proveedores, los iconos SVG, la sincronización, los espacios y las funciones de voz e imagen.

Los límites son techos de salida, no una predicción exacta del coste. El consumo real depende del modelo, la entrada, los archivos, las imágenes y las herramientas.

## Asistente de modelos
Pulsa **Asistente** en la barra superior para abrir el chat separado. El asesor consulta el catálogo de Puter, usa un motor elegible de coste bajo, limita sus respuestas y mantiene un historial local independiente. Para imágenes orienta al generador dedicado de Nexo; no confunde un modelo de chat con uno de generación visual.
