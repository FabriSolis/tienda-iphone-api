### Prueba sin token

Solicitud:

```http
POST /ventas
```

Sin enviar el header Authorization.

Resultado:

```json
{
  "mensaje": "Token requerido"
}
```

---

### Prueba con token

1. Se realiza login.
2. Se obtiene el JWT.
3. Se envía el token en el header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1Ni...
```

4. Se ejecuta la compra.

Resultado:

```json
{
  "id": 7,
  "cliente": "Fabricio",
  "total": 395
}
```

La venta se registra correctamente, demostrando el funcionamiento de la autenticación basada en JWT.

---

## Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- CORS

Este procedimiento permitió migrar la aplicación desde almacenamiento basado en archivos JSON hacia una arquitectura con base de datos NoSQL, incorporando autenticación segura mediante JWT para proteger las operaciones críticas del sistema.
