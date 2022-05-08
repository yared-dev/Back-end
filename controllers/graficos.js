const Graficos = require("../models/graficos");

// FUNCION PARA RETORNAR EL TOTAL DE LA SUMA DE PRECIOS DEL MES
const get_data_trabajos = async (req, res) => {
  const { desde, hasta } = req.body;
  const grafic = await Graficos.get_data_horario(desde, hasta);
  res.json({
    ok: true,
    grafic: grafic.rows,
  });
};

module.exports = {
  get_data_trabajos,
};
