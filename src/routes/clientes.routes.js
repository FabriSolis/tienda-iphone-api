import { Router } from "express";
import { readFile, writeFile } from "fs/promises";

const router = Router();
const PATH = "./data/clientes.json";

async function getClientes() {
  const raw = await readFile(PATH, "utf-8");
  return JSON.parse(raw);
}

async function saveClientes(data) {
  await writeFile(PATH, JSON.stringify(data, null, 2));
}

// todos
router.get("/", async (req, res) => {
  const clientes = await getClientes();
  res.json(clientes);
});

// por id
router.get("/:id", async (req, res) => {
  const clientes = await getClientes();
  const cliente = clientes.find((c) => c.id == req.params.id);

  if (!cliente) {
    return res.status(404).json({ error: "Cliente no encontrado" });
  }

  res.json(cliente);
});

// buscar
router.post("/buscar", async (req, res) => {
  const { nombre } = req.body;
  const clientes = await getClientes();

  const resultados = clientes.filter((c) =>
    c.nombre.toLowerCase().includes(nombre.toLowerCase()),
  );

  res.json(resultados);
});

// crear cliente
router.post("/", async (req, res) => {
  const clientes = await getClientes();
  const nuevo = req.body;

  // validación básica
  if (!nuevo.nombre || !nuevo.email) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  // generar ID
  const nuevoId =
    clientes.length > 0 ? Math.max(...clientes.map((c) => c.id)) + 1 : 1;

  nuevo.id = nuevoId;

  clientes.push(nuevo);
  await saveClientes(clientes);

  res.status(201).json(nuevo);
});

router.put("/:id", async (req, res) => {
  const clientes = await getClientes();
  const index = clientes.findIndex((c) => c.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Cliente no encontrado" });
  }

  clientes[index] = { ...clientes[index], ...req.body };

  await saveClientes(clientes);

  res.json(clientes[index]);
});

router.delete("/:id", (req, res) => {
  const clientes = leerJSON(RUTA_CLIENTES);
  const ventas = leerJSON(RUTA_VENTAS);

  const clienteId = parseInt(req.params.id);

  const tieneVentas = ventas.some((v) => v.id_usuario === clienteId);

  if (tieneVentas) {
    return res.status(400).json({
      mensaje: "No se puede eliminar, el cliente tiene ventas asociadas",
    });
  }

  const nuevos = clientes.filter((c) => c.id !== clienteId);

  guardarJSON(RUTA_CLIENTES, nuevos);

  res.json({ mensaje: "Cliente eliminado correctamente" });
});

export default router;
