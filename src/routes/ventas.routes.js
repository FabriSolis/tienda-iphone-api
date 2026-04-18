import { Router } from "express";
import { readFile, writeFile } from "fs/promises";

const router = Router();
const PATH = "./data/ventas.json";

// leer
async function getVentas() {
  const raw = await readFile(PATH, "utf-8");
  return JSON.parse(raw);
}

// guardar
async function saveVentas(data) {
  await writeFile(PATH, JSON.stringify(data, null, 2));
}

// todas
router.get("/", async (req, res) => {
  const ventas = await getVentas();
  res.json(ventas);
});

// por id
router.get("/:id", async (req, res) => {
  const ventas = await getVentas();
  const venta = ventas.find((v) => v.id == req.params.id);

  if (!venta) {
    return res.status(404).json({ error: "Venta no encontrada" });
  }

  res.json(venta);
});

// crear venta
router.post("/", async (req, res) => {
  const ventas = await getVentas();
  const nueva = req.body;

  const nuevoId =
    ventas.length > 0 ? Math.max(...ventas.map((v) => v.id)) + 1 : 1;

  nueva.id = nuevoId;

  ventas.push(nueva);
  await saveVentas(ventas);

  res.status(201).json(nueva);
});

router.post("/buscar", async (req, res) => {
  const { id_usuario } = req.body;
  const ventas = await getVentas();

  const resultados = ventas.filter((v) => v.id_usuario == id_usuario);

  res.json(resultados);
});

router.put("/:id", async (req, res) => {
  const ventas = await getVentas();
  const index = ventas.findIndex((v) => v.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Venta no encontrada" });
  }

  ventas[index] = { ...ventas[index], ...req.body };

  await saveVentas(ventas);

  res.json(ventas[index]);
});

router.delete("/:id", async (req, res) => {
  const ventas = await getVentas();

  const nuevas = ventas.filter((v) => v.id != req.params.id);

  await saveVentas(nuevas);

  res.json({ mensaje: "Venta eliminada" });
});

export default router;
