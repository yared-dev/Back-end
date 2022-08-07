const pool = require("../database/config.database");

const insertPago = async (res) => {
  const { iduser, fecha, monto } = res;
  return await pool.query(
    "INSERT INTO pagos_diarios ( id_users, fecha, monto) VALUES ($1,$2,$3)",
    [iduser, fecha, monto]
  );
};
const getPagos = async (res) => {
  const { iduser } = res;
  console.log(iduser);
  return await pool.query("select * from pagos_diarios where id_users = $1", [
    iduser,
  ]);
};
module.exports = {
  insertPago,
  getPagos,
};
