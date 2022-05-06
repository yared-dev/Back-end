const { response } = require("express");

const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Trabajos = require("../models/trabajo");
const Productos = require("../models/productos");

const getTodo = async (req, res = response) => {
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  const [usuarios, medicos, trabajos, productos] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
    Trabajos.find({ nombre: regex }),
    Productos.find({ nombre: regex }),
  ]);
  res.json({
    ok: true,
    usuarios,
    medicos,
    trabajos,
    productos,
  });
};

const getDocumentosColeccion = async (req, res = response) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  let data = [];

  switch (tabla) {
    case "medicos":
      data = await Medico.find({ nombre: regex })
        .populate("usuario", "nombre img")
        .populate("hospital", "nombre img");
      break;

    case "productos":
      data = await Productos.find({ nombre: regex });

      break;

    case "trabajos":
      data = await Trabajos.find({ nombre: regex });
      break;

    case "usuarios":
      data = await Usuario.find({ nombre: regex });

      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: "La tabla tiene que ser usuarios/medicos/hospitales",
      });
  }

  res.json({
    ok: true,
    resultados: data,
  });
};

module.exports = {
  getTodo,
  getDocumentosColeccion,
};
