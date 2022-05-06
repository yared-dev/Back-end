const { response } = require("express");

const Usuario = require("../models/usuario");
const Horario = require("../models/horario");

const enviarHorarioEntrada = async (req, res) => {
  try {
    const HorarioDb = await Usuario.findById(req.body.id);

    if (!HorarioDb) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }

    const horario = new Horario({
      usuario: req.body.id,
    });

    // Guardar usuario
    await horario.save();
    res.json({
      ok: true,
      usuario: horario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

module.exports = {
  enviarHorarioEntrada,
};
