import "dotenv/config";

import app from "./src/app.js";
import conectarDB from "./src/config/database.js";

const PORT = process.env.PORT || 3000;

// conectar mongo
conectarDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
