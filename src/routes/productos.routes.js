import { Router } from "express";
import { readFile, writeFile } from "fs/promises";

const router = Router();
const PATH = "./data/productos.json";

// leer
async function getProductos() {
  const raw = await readFile(PATH, "utf-8");
  return JSON.parse(raw);
}

// guardar
async function saveProductos(data) {
  await writeFile(PATH, JSON.stringify(data, null, 2));
}

// todos
router.get("/", async (req, res) => {
  const productos = await getProductos();
  res.json(productos);
});

// por id
router.get("/:id", async (req, res) => {
  const productos = await getProductos();
  const producto = productos.find((p) => p.id == req.params.id);

  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(producto);
});

// crear producto
router.post("/", async (req, res) => {
  const productos = await getProductos();
  const nuevo = req.body;

  const nuevoId =
    productos.length > 0 ? Math.max(...productos.map((p) => p.id)) + 1 : 1;

  nuevo.id = nuevoId;

  productos.push(nuevo);
  await saveProductos(productos);

  res.status(201).json(nuevo);
});

router.post("/buscar", async (req, res) => {
  const { nombre } = req.body;
  const productos = await getProductos();

  const resultados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(nombre.toLowerCase()),
  );

  res.json(resultados);
});

router.put("/:id", async (req, res) => {
  const productos = await getProductos();
  const index = productos.findIndex((p) => p.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  productos[index] = { ...productos[index], ...req.body };

  await saveProductos(productos);

  res.json(productos[index]);
});

router.delete("/:id", async (req, res) => {
  const productos = await getProductos();

  const rawVentas = await readFile("./data/ventas.json", "utf-8");
  const ventas = JSON.parse(rawVentas);

  const productoId = parseInt(req.params.id);

  const tieneVentas = ventas.some((v) =>
    v.productos.some((p) => p.id_producto === productoId),
  );

  if (tieneVentas) {
    return res.status(400).json({
      error: "No se puede eliminar, está en ventas",
    });
  }

  const nuevos = productos.filter((p) => p.id !== productoId);

  await saveProductos(nuevos);

  res.json({ mensaje: "Producto eliminado" });
});

export default router;
