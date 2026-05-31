import jwt from "jsonwebtoken";

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      mensaje: "Token requerido",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = verified;

    next();
  } catch (error) {
    return res.status(403).json({
      mensaje: "Token inválido",
    });
  }
};

export default verificarToken;
