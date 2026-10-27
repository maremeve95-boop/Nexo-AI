# Familia Nexo AI 7.4

La familia son perfiles de comportamiento y selección de motores reales, no siete redes neuronales entrenadas desde cero.

| Perfil | Especialidad | Estado |
|---|---|---|
| Nexo 4 Lite | Estudios, ejercicios y explicaciones cortas | Disponible |
| Nexo 4.1 | Conversación general y creatividad | Predeterminado |
| Nexo 4.5 | Investigación y síntesis | Disponible |
| Nexo 5 | Programación y depuración | Disponible con límite local diario |
| Nexo 5.5 | Reparación profunda | Reservado/no seleccionable |
| Nexo 6 | Laboratorio avanzado | Reservado/no seleccionable |
| Nexo 7 | Creator Lab | Disponible con límite local diario |
| Papoi 8 | Perfil experimental de máxima exigencia disponible, programación, juegos y proyectos | Disponible con límite local diario |

## Política de motores Papoi 8

Papoi 8 solo selecciona motores reales del catálogo de Puter identificados como OpenAI/GPT/Codex o Claude Sonnet. Se omiten Qwen y Claude Opus. Los modelos recientes tienen prioridad dinámica según los IDs/nombres reales que devuelve el catálogo, con preferencias específicas para proyectos de código, web y visión. Si no hay candidatos compatibles, la app informa del problema y no realiza una sustitución silenciosa.

## Generación de archivos

Para peticiones de creación, Papoi debe devolver bloques separados con nombres explícitos, por ejemplo:

```html filename="index.html"
<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>Ejemplo</title></head><body><h1>Hola</h1></body></html>
```

La app interpreta esos bloques como archivos descargables. Cada archivo tiene una acción “Descargar [nombre]” y, para varios archivos, una opción ZIP.

## Límites

Disponibilidad, calidad, latencia, herramientas y cuotas dependen del motor/proveedor. Los contadores locales de respuestas son orientativos y no son una protección en servidor. Papoi 8 no está entrenado desde cero ni garantiza superioridad universal.
