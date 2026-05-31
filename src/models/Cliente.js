import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
  id: Number,

  nombre: String,

  apellido: String,

  email: {
    type: String,
    unique: true,
  },

  contrasena: String,

  activo: Boolean,

  fecha_registro: String,
});

export default mongoose.model("Cliente", clienteSchema);
