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

- Node.js
- Express

npm install

npm run dev

Endpoints

Clientes

- GET /clientes obtener todos
- GET /clientes/:id obtener por id
- POST /clientes crear cliente
- POST /clientes/buscar buscar cliente por nombre
- PUT /clientes/:id actualizar cliente
- DELETE /clientes/:id eliminar cliente (con integridad)

Productos

GET /productos → obtener todos
GET /productos/:id → obtener por id
POST /productos → crear producto
POST /productos/buscar → buscar productos por nombre
PUT /productos/:id → actualizar producto
DELETE /productos/:id → eliminar producto (si no está asociado a ventas)

Ventas

GET /ventas → obtener todas
GET /ventas/:id → obtener por id
POST /ventas → crear venta
POST /ventas/buscar → buscar ventas por usuario
PUT /ventas/:id → actualizar venta
DELETE /ventas/:id → eliminar venta

Integridad
No se permite eliminar un cliente si tiene ventas asociadas.
