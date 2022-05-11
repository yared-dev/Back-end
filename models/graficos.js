const pool = require("../database/config.database");
const get_data_horario = async (desde, hasta) => {
  const query = `SELECT u.name,SUM ( j.price ) FROM jobs j JOIN users u ON u.id_user = j.id_user WHERE date BETWEEN '${desde}' AND '${hasta}' GROUP BY u.name`;
  return await pool.query(query);
};
module.exports = {
  get_data_horario,
};
