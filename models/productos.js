const { Schema, model } = require("mongoose");

const ProductoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    default: "no-img",
  },
});

module.exports = model("producto", ProductoSchema);
