const pool = require("../database/config.database");
const util = require("util");
const queryAsync = util.promisify(pool.query).bind(pool);

const insertPago = async (res) => {
  const { iduser, fecha, monto } = res;
  try {
    const results = await queryAsync({
      sql: "INSERT INTO pagos_diarios ( id_users, fecha, monto) VALUES (?,?,?)",
      timeout: 40000, // 40s
      values: [iduser, fecha, monto],
    });
    return results;
  } catch (error) {
    throw error;
  }
};
const getPagos = async (res) => {
  const { iduser } = res;
  try {
    const results = await queryAsync({
      sql: "select id_users, fecha, monto from pagos_diarios where id_users = ?",
      timeout: 40000, // 40s
      values: [iduser],
    });
    return results;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  insertPago,
  getPagos,
};
