const { Schema, model } = require("mongoose");

const TrabajoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  telefono: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  urgencia: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

module.exports = model("Trabajo", TrabajoSchema);
