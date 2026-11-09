# Nexo AI

Aplicación web progresiva para conversar con modelos de IA mediante Puter, guardar memoria local, investigar en la web, adjuntar archivos, crear proyectos descargables y generar mensajes de voz.

## Qué incluye

- Interfaz adaptable a escritorio y móvil, con onboarding opcional.
- Ajustes por secciones: Uso, Modelos e IA, Memoria, Personalización, Voz y entrada, Cuenta y datos.
- Consumo mensual de Puter consultado desde el SDK cuando la cuenta lo permite.
- Selección automática basada en precios reales del catálogo; prioriza `:free`, admite motores de coste bajo verificable y bloquea GPT-6 Astra, variantes `:priority`, Qwen y Claude Opus.
- Control de tokens de salida, presupuesto de proyectos e historial enviado.
- Indicador discreto de trabajo; el código/HTML parcial se oculta durante streaming.
- Menú `+` con Pensar, Buscar, Alternativa, Generar mensaje de voz y Adjuntar archivos.
- Memoria local explícita mediante «Nexo, guarda esto en la memoria: …», sin llamar al modelo.
- PWA con caché propia; las rutas `/api/` no se cachean.
- Cartera opcional Nexo Premium y créditos, preparada con Stripe + Supabase en servidor (desactivada hasta configurar claves y webhooks).

## Control del gasto

En Ajustes → Modelos e IA puedes limitar los tokens de salida normal y de proyectos, además de elegir cuánto historial se envía al modelo. El valor de tokens es un máximo de salida, no el coste total garantizado: también influyen la entrada, las herramientas y cualquier llamada extra. Nexo limita el historial y evita la revisión/recuperación adicional salvo que haga falta.

El selector usa datos de precio publicados por `puter.ai.listModels()`. Los modelos sin tarifa verificable no entran en automático. Si Puter no publica un modelo económico compatible, Nexo lo indica en lugar de seleccionar a ciegas. GPT-6 Astra no se usa en automático ni en la búsqueda auxiliar.

## Publicar en GitHub + Vercel

1. Descomprime este ZIP.
2. Sube el contenido a la raíz del repositorio GitHub; conserva `index.html`, `api/`, `lib/`, `icons/`, `manifest.webmanifest`, `service-worker.js` y `vercel.json`.
3. En Vercel importa el repositorio. Usa preset `Other`, sin build command y Output Directory `.`.
4. Haz Deploy. En futuros commits Vercel publicará los cambios automáticamente.
5. Tras actualizar, recarga con `Ctrl + Shift + R`. Si usas la PWA instalada, ciérrala completamente y vuelve a abrirla.

## Pagos opcionales

La cartera Nexo usa saldo propio almacenado en Supabase y checkout alojado por Stripe. No añade saldo a Puter. La compra no se activa hasta configurar los productos, variables privadas y webhook descritos en `PAYMENTS_SETUP_ES.md`. Empieza en Stripe test mode y no guardes secretos en GitHub.

## Archivos de ayuda

- `LEEME_ES.txt`: instrucciones rápidas.
- `MODELOS_Y_CAPACIDADES.md`: perfiles y selección económica.
- `USO_PUTER_Y_OPTIMIZACION_V9.md`: consumo y optimización.
- `DEPLOY_VERCEL.md`: despliegue.
- `PAYMENTS_SETUP_ES.md`: configuración opcional de cobros.
- `CHANGELOG_NEXO_AI_FINAL.txt`: cambios de esta actualización.

## Limitaciones verificables

La disponibilidad de motores, sus precios, cuotas, herramientas y TTS dependen del catálogo y de la cuenta del proveedor. Las comprobaciones del proyecto son estáticas y de lógica local; no implican que se haya realizado una conversación real con cada motor ni una prueba física en iPhone/Chromebook.


## Ajuste final de interfaz y uso

- iPhone/Safari: controles de texto a 16 px y viewport safe-area para impedir el zoom automático al tocar el compositor.
- El diseño se adapta a pantallas estrechas, con controles flexibles y scroll interno para tablas/código.
- Tema claro funcional con texto oscuro y tema oscuro con texto claro; acentos violeta, océano, esmeralda y rosa.
- Se retiran los topes locales de respuestas de Nexo; los límites reales son los de la cuenta Puter.
- En Ajustes → Uso: `402` significa cupo mensual agotado (se renueva el próximo mes según el plan); `429` es un límite de frecuencia en ventana móvil. El SDK de uso mensual no devuelve la fecha exacta del ciclo; el panel oficial es la referencia para el próximo ciclo.


## Pulido final de Nexo AI (8 de noviembre de 2026)

- iOS Safari: controles editables a 16px para evitar el autozoom al enfocar el cuadro de mensaje. Se conserva el zoom manual del usuario.
- Layout: refuerzo de `min-width:0`, `max-width:100%`, wrapping, safe areas y contención horizontal en composer, topbar, ajustes, modales y tarjetas.
- Temas: modo claro con fondos blancos y texto oscuro; modo oscuro con fondos oscuros y texto claro. El acento (violeta, océano, esmeralda o rosa) se mantiene independiente.
- Uso: se retiran topes locales ficticios. Ajustes informa del reinicio mensual 402 y los límites temporales 429. El SDK no expone la fecha exacta del próximo reinicio; Nexo muestra el panel oficial.


## Pulido final de Chromebook y consumo

- En resoluciones de portátil se compacta la barra superior: herramientas que antes ocupaban sitio pasan al menú `+`.
- El menú `+` se eleva al `body` y se posiciona en el viewport, con scroll interno y sin quedar recortado por el compositor. Contiene Pensar, Buscar, Alternativa, Generar voz, Mejorar prompt, Memoria, Lectura, Perfiles, Exportar, Limpiar y Adjuntar.
- Los controles del menú están enlazados a los eventos existentes de cada herramienta.
- El historial enviado por defecto baja a tres mensajes; las memorias relevantes se limitan a siete fragmentos; los turnos antiguos se acortan.
- La salida normal por defecto es 1.100 tokens y la de proyectos 5.500; ambas son configurables.
- Gemini alternativo respeta ahora las mismas opciones de historial y salida que Puter.
- Se ha probado la maquetación en Chromium a varios tamaños de portátil y móvil; las pruebas de proveedor real siguen dependiendo de la cuenta Puter/Gemini del usuario.
