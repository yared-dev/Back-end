require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos

//directorio.
app.use(express.static("public"));

// Rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/login", require("./routes/auth"));
app.use("/api/trabajos", require("./routes/trabajos"));
app.use("/api/productos", require("./routes/productos"));
app.use("/api/horarios", require("./routes/horarios"));
app.use("/api/graficos", require("./routes/graficos"));
// app.use("/api/todo", require("./routes/busquedas"));
// app.use("/api/upload", require("./routes/uploads"));

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto " + 3000);
});
