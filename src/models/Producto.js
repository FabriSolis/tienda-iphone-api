import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  id: Number,

  nombre: {
    type: String,
    required: true,
  },

  desc: String,

  precio: Number,

  imagen: String,

  stock: Number,

  estado: String,

  disponible: Boolean,

  categoria: String,
});

export default mongoose.model("Producto", productoSchema);
