const { response } = require("express");

const Horario = require("../models/horario");

const enviarHorarioEntrada = async (req, res) => {
  try {
    await Horario.insertHorario(req.body);
    res.json({
      ok: true,
      horario: "horario insertado",
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
