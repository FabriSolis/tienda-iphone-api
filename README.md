Prueba sin token

Solicitud:

POST /ventas

Sin enviar el header Authorization.

Resultado:

{
  "mensaje": "Token requerido"
}
Prueba con token
Se realiza login.
Se obtiene el JWT.
Se envía el token en el header:
Authorization: Bearer eyJhbGciOiJIUzI1Ni...
Se ejecuta la compra.

Resultado:

{
  "id": 7,
  "cliente": "Fabricio",
  "total": 395
}

La venta se registra correctamente, demostrando el funcionamiento de la autenticación basada en JWT.

Tecnologías Utilizadas
Node.js
Express.js
MongoDB
Mongoose
JSON Web Token (JWT)
bcryptjs
dotenv
CORS

Este procedimiento permitió migrar la aplicación desde almacenamiento basado en archivos JSON hacia una arquitectura con base de datos NoSQL, incorporando autenticación segura mediante JWT para proteger las operaciones críticas del sistema.
