# Nexo AI 6.0 Patched

Actualización centrada en estabilidad, con la estructura de la PWA preparada para editarse desde GitHub móvil y desplegarse en Vercel.

## Correcciones principales

- Evita cambiar de conversación o de cuenta mientras se preparan imágenes para enviar.
- Deshabilita envío y adjuntos durante esa preparación para reducir carreras, duplicados y mensajes que terminen en otro chat.
- Conserva la conversación activa si el almacenamiento local está casi lleno.
- Detecta URLs públicas pegadas en el chat y trata de activar la búsqueda web para consultar la página.
- Nexo 5 está disponible con una cuota local de cinco respuestas exitosas por día.
- Nexo 5.5 y Nexo 6 permanecen reservados y no se pueden desbloquear en esta versión. Los modelos Claude Opus también están ocultos en el selector manual para respetar esa separación.
- Actualiza el nombre de caché del service worker para refrescar la aplicación tras desplegar el parche.

## Familia de modelos

| Perfil | Estado | Enfoque |
|---|---|---|
| Nexo 4 Lite | Disponible | Estudios y aprendizaje |
| Nexo 4.1 | Disponible por defecto | Chat general, creatividad y personalidad Nexo |
| Nexo 4.5 | Disponible | Investigación y análisis |
| Nexo 5 | Disponible, 5 respuestas/día | Programación |
| Nexo 5.5 | Reservado | Futuro perfil de revisión de alto nivel, no desbloqueable aquí |
| Nexo 6 | Reservado | Futuro perfil laboratorio, no desbloqueable aquí |

Los nombres Nexo son perfiles e instrucciones sobre modelos reales que el proveedor expone; no son modelos neuronales nuevos entrenados desde cero. El límite de cinco respuestas de Nexo 5 se guarda en el almacenamiento local del navegador y no es una restricción segura de servidor. El proveedor puede tener límites adicionales.

## Despliegue con GitHub + Vercel

1. Crea un repositorio en [GitHub](https://github.com/new).
2. Descomprime el ZIP y sube **el contenido** de la carpeta al nivel raíz del repositorio, de forma que `index.html` esté en la raíz.
3. En [Vercel](https://vercel.com/), elige Add New → Project e importa el repositorio.
4. Elige **Other** si solicita framework. No requiere comando de build ni instalación de dependencias. Si pregunta por el directorio de salida, usa `.`.
5. Despliega y prueba la URL HTTPS. La integración Git puede actualizar Vercel con cada commit.

Pasos más detallados: consulta [`DEPLOY_VERCEL.md`](DEPLOY_VERCEL.md).

## Aplicación móvil

- **Android:** abre la URL HTTPS desplegada en Chrome y selecciona Instalar aplicación o Añadir a pantalla de inicio.
- **iPhone:** abre la URL HTTPS en Safari → Compartir → Añadir a pantalla de inicio. Activa Abrir como app web si aparece.

## Importante

- La IA, la búsqueda y el análisis remoto necesitan Internet.
- Historial, memoria y el contador local de Nexo 5 se guardan en el navegador y no se sincronizan automáticamente entre dispositivos.
- No guardes ni subas claves de API a GitHub. Un producto público con claves privadas necesita endpoints de servidor y límites impuestos en servidor.
- Nexo no ejecuta automáticamente el código que genera; revisa los archivos antes de abrirlos.

## Autoría

Proyecto: **Gorbus**. ChatGPT ayudó con diseño y desarrollo. El proveedor y el modelo subyacente pueden variar según el catálogo real y los límites del servicio.
