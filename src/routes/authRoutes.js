import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Cliente from "../models/Cliente.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const existe = await Cliente.findOne({ email });

    if (existe) {
      return res.status(400).json({
        mensaje: "El usuario ya existe",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const passwordHash = await bcrypt.hash(password, salt);

    const nuevoCliente = new Cliente({
      nombre,
      email,
      password: passwordHash,
    });

    await nuevoCliente.save();

    res.json({
      mensaje: "Usuario registrado",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      mensaje: "Error del servidor",
    });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const cliente = await Cliente.findOne({ email });

    if (!cliente) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }
    const passwordCorrecta = password === cliente.contrasena;

    if (!passwordCorrecta) {
      return res.status(401).json({
        mensaje: "Contraseña incorrecta",
      });
    }

    const token = jwt.sign(
      {
        id: cliente._id,
        email: cliente.email,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "2h",
      },
    );

    res.json({
      mensaje: "Login exitoso",

      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      mensaje: "Error del servidor",
    });
  }
});

export default router;
