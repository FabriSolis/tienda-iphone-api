import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema({
  id: Number,

  id_usuario: Number,

  cliente: String,

  fecha: String,

  total: Number,

  direccion: String,

  productos: Array,

  entregado: Boolean,

  metodo_pago: String,
});

export default mongoose.model("Venta", ventaSchema);
