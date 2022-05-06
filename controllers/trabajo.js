const { response } = require("express");
const Trabajo = require("../models/trabajo");

const getTrabajos = async (req, res) => {
  const desde = Number(req.query.desde) || 0;
  const estado = req.query.estado || false;
  const [trabajo, total] = await Promise.all([
    Trabajo.find(
      { estado: estado },
      "nombre modelo telefono description precio urgencia date estado _id"
    )
      .skip(desde)
      .limit(5)
      .sort({ date: -1 }),

    Trabajo.countDocuments(),
  ]);
  res.json({
    ok: true,
    trabajo,
    total,
  });
};
const createTrabajos = async (req, res) => {
  const uid = req.uid;
  const trabajo = new Trabajo({
    usuario: uid,
    ...req.body,
  });
  try {
    const trabajoDb = await trabajo.save();

    res.json({
      ok: true,
      trabajos: trabajoDb,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const deleteTrabajos = async (req, res) => {
  const id = req.params.id;
  try {
    const trabajo = await Trabajo.findById(id);
    if (!trabajo) {
      return res.status(404).json({
        ok: true,
        msg: "trabajo no encontrado",
      });
    }
    await Trabajo.findByIdAndDelete(id);
    res.json({
      ok: true,
      msg: "trabajo borrado",
    });
  } catch (e) {
    console.log(e);
  }
};
const actualizarTrabajo = async (req, res) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    const trabajo = await Trabajo.findById(id);
    if (!trabajo) {
      return res.status(404).json({
        ok: true,
        msg: "trabajo no encontrado",
      });
    }

    const cambiosTrabajo = {
      ...req.body,
      usuario: uid,
    };

    const trabajoActualizado = await Trabajo.findByIdAndUpdate(
      id,
      cambiosTrabajo,
      { new: true }
    );
    res.json({
      ok: true,
      msg: "actualizarTrabajo",
      hospital: trabajoActualizado,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getTrabajos,
  createTrabajos,
  deleteTrabajos,
  actualizarTrabajo,
};
