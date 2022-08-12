// require("dotenv").config();

const cors = require("cors");
const express = require("express");

const morgan = require("morgan");

// Crear el servidor de express
const app = express();

//leer los request qeu consultan
app.use(morgan("tiny"));

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
app.use("/api/upload", require("./routes/uploads"));
app.use("/api/pagos", require("./routes/pagos"));
// app.use("/api/todo", require("./routes/busquedas"));

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto " + 3000);
});
