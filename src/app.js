import express from "express";
import clientesRoutes from "./routes/clientes.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import ventasRoutes from "./routes/ventas.routes.js";
import authRoutes from "./routes/authRoutes.js";

import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/clientes", clientesRoutes);
app.use("/productos", productosRoutes);
app.use("/ventas", ventasRoutes);

// nuevas rutas auth
app.use("/api/auth", authRoutes);

export default app;
