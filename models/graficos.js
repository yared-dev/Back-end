const pool = require("../database/config.database");
const util = require("util");
const queryAsync = util.promisify(pool.query).bind(pool);

const get_data_horario = async (desde, hasta) => {
  const sql = `SELECT u.name,SUM ( j.price ) FROM jobs j JOIN users u ON u.id_user = j.id_user WHERE date BETWEEN '${desde}' AND '${hasta}' GROUP BY u.name`;
  try {
    const results = await queryAsync({
      sql,
      timeout: 40000, // 40s
    });
    return results;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  get_data_horario,
};
