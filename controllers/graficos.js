const Graficos = require("../models/graficos");

// FUNCION PARA RETORNAR EL TOTAL DE LA SUMA DE PRECIOS DEL MES
const get_data_trabajos = async (req, res) => {
  let { desde, hasta } = req.body;
  let d = formatDate(desde);
  let h = formatDate(hasta);
  const grafic = await Graficos.get_data_horario(d, h);
  res.json({
    ok: true,
    grafic: grafic.rows,
  });
};
const formatDate = (date) => {
  let d = new Date(date);
  let month = (d.getMonth() + 1).toString();
  let day = d.getDate().toString();
  let year = d.getFullYear();
  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return [year, month, day].join('-');
}
module.exports = {
  get_data_trabajos,
};
