const { response } = require("express");

const Medico = require("../models/medico");

const getMedicos = async (req, res = response) => {
  const medicos = await Medico.find()
    .populate("usuario", "nombre img")
    .populate("hospital", "nombre img");

  res.json({
    ok: true,
    medicos,
  });
};

const crearMedico = async (req, res = response) => {
  const uid = req.uid;
  const medico = new Medico({
    usuario: uid,
    ...req.body,
  });
  console.log(medico);
  try {
    const medicoDB = await medico.save();
    
    res.json({
      ok: true,
      medico: medicoDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarMedico = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    const medico = await Medico.findById(id);
    console.log(medico);

    if (!medico) {
      return res.status(404).json({
        ok: true,
        msg: "medico no encontrado",
      });
    }

    const cambiosMedico = {
      ...req.body,
      usuario: uid,
    };

    const medicoActual = await Medico.findByIdAndUpdate(id, cambiosMedico, {
      new: true,
    });
    res.json({
      ok: true,
      msg: "actualizar medico",
      medico: medicoActual,
    });
  } catch (e) {
    console.log(e);
  }
};

const borrarMedico = async (req, res = response) => {
  const id = req.params.id;
  try {
    const medico = await Medico.findById(id);

    if (!medico) {
      return res.status(404).json({
        ok: true,
        msg: "medico no encontrado",
      });
    }
    await Medico.findByIdAndDelete(id);
    res.json({
      ok: true,
      msg: "borrar medico",
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico,
};
