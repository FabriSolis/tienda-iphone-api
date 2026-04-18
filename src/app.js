import express from "express";
import clientesRoutes from "./routes/clientes.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import ventasRoutes from "./routes/ventas.routes.js";

const app = express();

app.use(express.json());

app.use("/clientes", clientesRoutes);
app.use("/productos", productosRoutes);
app.use("/ventas", ventasRoutes);

export default app;
