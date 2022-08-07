const Pagos = require("../models/pagos");

const enviarPago = async (req, res) => {
  try {
    await Pagos.insertPago(req.body);
    res.status(200).json({
      ok: true,
      msg: "Pagos Enviado Correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: error,
    });
  }
};
const getPagoByUser = async (req, res) => {
  try {
    console.log(req.body);
    const pago = await Pagos.getPagos(req.body);
    // console.log(pago.rows)
    if (!pago.rows[0]) {
      return res.status(200).json({
        ok: true,
        msg: "No Hay datos",
      });
    }
    res.status(200).json({
      ok: true,
      msg: "Great",
      pago: pago.rows,
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
  enviarPago,
  getPagoByUser,
};