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
const getHorarioEmpleado = async (req, res) => {
  try {
    const horario = await Horario.getHorarioEmpleado();
    res.json({
      ok: true,
      horario: horario.rows,
    });
  } catch (error) {
    console.log(error);
  }
};
const countHorario = async (req, res) => {
  try {
    const horario = await Horario.countHorario(req.body);
    res.json({
      ok: true,
      horario: horario.rows,
    });
  } catch (error) {
    console.log(error);
  }
};
const update_horario = async (req, res) => {
  try {
    const horario = await Horario.updateHorario(req.body);
    res.json({
      ok: true,
      horario: horario.rows,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  enviarHorarioEntrada,
  getHorarioEmpleado,
  countHorario,
  update_horario
};
