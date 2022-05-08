const pool = require("../database/config.database");
const get_data_horario = async (desde, hasta) => {
  const query = `SELECT u.name,SUM ( j.price ) FROM jobs j JOIN users u ON u.iduser = j.iduser WHERE date BETWEEN '${desde}' AND '${hasta}' GROUP BY u.name`;
  console.log(query);
  return await pool.query(query);
};
module.exports = {
  get_data_horario,
};
