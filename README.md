# Tienda Online de iPhone

Proyecto desarrollado con Node.js, Express y React para la gestión y compra de productos.

## Tecnologías utilizadas

### Backend
- Node.js
- Express
- JSON como base de datos
- API REST

### Frontend
- React
- Vite
- Tailwind CSS
- LocalStorage

---

# Funcionalidades

## Productos
- Listado de productos
- Filtrado por categoría
- Visualización de precio y descripción

## Carrito
- Agregar productos
- Eliminar productos
- Guardado en localStorage
- Cálculo de total

## Compras
- Generación de ventas
- Envío de datos al backend
- Persistencia en archivo JSON


---

# Instalación

## Backend

```bash
npm install
node index.js
```

Servidor:

```bash
http://localhost:3000
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicación:

```bash
http://localhost:5173
```

---

# API REST

## Productos

```bash
GET /productos
GET /productos/:id
POST /productos
PUT /productos/:id
DELETE /productos/:id
```

## Ventas

```bash
GET /ventas
POST /ventas
```

## Clientes

```bash
GET /clientes
POST /clientes
```
