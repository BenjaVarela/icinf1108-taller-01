# Taller de Desarrollo Backend - API Estándar (NestJS)

Taller backend desarrollado con **NestJS** enfocado en el módulo de **Students**, el cual implementa un estándar unificado de respuestas HTTP y manejo global de excepciones.

## Integrantes del Equipo
* Benjamín Varela (Líder / Integración / Documentación)
* Mauricio (Endpoint GET - Listar)
* Diego (Endpoints POST: Creación y GET por ID)
* Benja Riquelme (Endpoints PATCH y DELETE)

---

## Estándar de Respuesta de la API

Todas las respuestas de la API (tanto éxitos como errores) siguen estrictamente un formato JSON unificado de 6 campos para garantizar consistencia en el frontend.

### Ejemplo de Estructura JSON:
- success: true
- statusCode: 200
- message: "Operación exitosa"
- data: { ... }
- errors: null
- timestamp: "2026-08-30T18:00:00.000Z"

### Descripción de los Campos
* **`success`**: Booleano que indica si la solicitud fue exitosa (`true`) o fallida (`false`).
* **`statusCode`**: Código de estado HTTP correspondiente (ej. `200`, `201`, `400`, `404`, etc.).
* **`message`**: Mensaje descriptivo sobre el resultado de la petición.
* **`data`**: Contiene la información devuelta por el servidor (en caso de éxito) o `null` (en caso de error).
* **`errors`**: Contiene los detalles o arreglos de errores en caso de fallo, o `null` si no hay errores.
* **`timestamp`**: Fecha y hora exacta de la respuesta en formato ISO 8601.

## Endpoints del Módulo Students

La API expone los siguientes endpoints bajo el prefijo `/api/students`:

| Método | Endpoint | Descripción |
| **GET** | `/api/students` | Retorna la lista completa de todos los estudiantes registrados. |
| **GET** | `/api/students/:id` | Retorna los detalles de un estudiante específico según su ID. |
| **POST** | `/api/students` | Crea y registra un nuevo estudiante en el sistema. |
| **PATCH** | `/api/students/:id` | Actualiza parcialmente la información de un estudiante existente. |
| **DELETE** | `/api/students/:id` | Elimina un estudiante y sus dependencias asociadas del sistema. |

---

## Arquitectura e Infraestructura Implementada

* **`ApiResponse<T>` DTO**: Estructura tipada genérica para envolver las respuestas de los controladores.
* **`ResponseInterceptor`**: Interceptor global encargado de interceptar todas las respuestas exitosas de los controladores y darles automáticamente la forma estándar.
* **`AllExceptionsFilter`**: Filtro global de excepciones que captura cualquier error o excepción lanzada por NestJS y la transforma al formato de 6 campos con `success: false`.

---

## Guía de Instalación y Ejecución Local

1. Clonar el repositorio y acceder a la carpeta del proyecto.
2. Instalar las dependencias del proyecto ejecutando: `pnpm install`
3. Levantar la aplicación en modo desarrollo ejecutando: `pnpm start:dev`
4. Acceder a la documentación interactiva de Swagger en el navegador en: `http://localhost:3000/docs`
