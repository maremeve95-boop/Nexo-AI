# Desplegar Nexo AI 6.0 Patched con GitHub + Vercel

1. Crea un repositorio en https://github.com/new (puede ser privado).
2. Descomprime el ZIP y sube el contenido al nivel raíz del repositorio. Debe existir `index.html` directamente en la raíz.
3. Haz commit a la rama principal.
4. Abre https://vercel.com/ → Add New → Project → importa el repositorio.
5. Si pregunta por framework, elige **Other**. No hay comando de build ni dependencias npm. Usa `.` como directorio de salida si lo solicita.
6. Pulsa Deploy y abre la URL HTTPS.
7. Comprueba inicio de sesión, creación de un chat, cambio de conversación, adjuntos, búsqueda al pegar una URL y descarga de archivos.
8. En futuras ediciones desde el móvil, modifica el archivo en GitHub y confirma el cambio. Vercel desplegará el commit con la integración activada.

**No subas claves de API, contraseñas ni tokens a GitHub.** La versión es estática; cualquier secreto para una aplicación multiusuario pública debe manejarse en un endpoint de servidor con variables de entorno y límites de uso.
