Tienda de iPhones - Estructuras JSON

Este proyecto representa mi tienda de iPhones utilizando estructuras de datos en formato JSON.

Se crearon tres archivos principales:

- clientes.json
- productos.json
- ventas.json

Se incluyen distintos tipos de datos:

- Números (id, precio, total)
- Texto (nombre, descripción, dirección)
- Booleanos (activo, disponible, entregado)

El sistema simula mi tienda de iPhones donde:

- Los usuarios pueden comprar productos
- Los productos tienen estado (disponible, reservado, vendido)
- Las ventas registran las compras realizadas

Trabajo práctico - Primera entrega

- Node.js
- Express

npm install

npm run dev

### Clientes

GET /clientes
GET /clientes/:id
POST /clientes
POST /clientes/buscar
PUT /clientes/:id
DELETE /clientes/:id

### Productos

GET /productos
POST /productos
PUT /productos/:id
DELETE /productos/:id

### Ventas

GET /ventas
POST /ventas
PUT /ventas/:id
DELETE /ventas/:id
