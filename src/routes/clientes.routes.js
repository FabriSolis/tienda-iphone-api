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


router.delete("/:id", async (req, res) => {
  let clientes = await getClientes();

  const existe = clientes.some((c) => c.id == req.params.id);

  if (!existe) {
    return res.status(404).json({ error: "Cliente no encontrado" });
  }

  clientes = clientes.filter((c) => c.id != req.params.id);

  await saveClientes(clientes);

  res.json({ mensaje: "Cliente eliminado" });
});

export default router;
