const { response } = require("express");
const Trabajo = require("../models/trabajo");

const getTrabajos = async (req, res) => {
  const activo = req.params.id || false;
  const trabajo = await Trabajo.getJobs(activo);
  res.json({
    ok: true,
    trabajo: trabajo,
  });
};
const createTrabajos = async (req, res) => {
  try {
    await Trabajo.insertJob(req.body);
    res.json({
      ok: true,
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
    const trabajo = await Trabajo.getJobsById(id);
    if (!trabajo[0]) {
      return res.status(404).json({
        ok: true,
        msg: "trabajo no encontrado",
      });
    }
    await Trabajo.deleteJob(id);
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
  try {
    const trabajo = await Trabajo.getJobsById(id);
    if (!trabajo[0]) {
      return res.status(404).json({
        ok: true,
        msg: "trabajo no encontrado",
      });
    }
    await Trabajo.updateJob(req.body);
    res.json({
      ok: true,
      msg: "Trabajo Actualizado",
    });
  } catch (e) {
    console.log(e);
  }
};
const getJobsByIdUser = async (req, res) => {
  try {
    const trabajo = await Trabajo.getJobsByUser(req.body);

    if (!trabajo[0]) {
      return res.status(200).json({
        ok: false,
        msg: "No Hay datos",
      });
    }
    res.status(200).json({
      ok: true,
      msg: "Great",
      trabajo: trabajo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: error,
    });
  }
};
module.exports = {
  getTrabajos,
  createTrabajos,
  deleteTrabajos,
  actualizarTrabajo,
  getJobsByIdUser,
};
