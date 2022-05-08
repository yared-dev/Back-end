const pool = require("../database/config.database");

const insertHorario = async (res) => {
  const { id, tipo_asistencia } = res;
  var dt = new Date();
  var date = `${(dt.getMonth() + 1).toString().padStart(2, "0")}/${dt
    .getDate()
    .toString()
    .padStart(2, "0")}/${dt.getFullYear().toString().padStart(4, "0")} ${dt
    .getHours()
    .toString()
    .padStart(2, "0")}:${dt.getMinutes().toString().padStart(2, "0")}:${dt
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;

  return await pool.query(
    "INSERT INTO horario_empleado (id_user, fecha_hora, tipo_asistencia) VALUES ($1,$2,$3)",
    [id, date, tipo_asistencia]
  );
};
module.exports = {
  insertHorario,
};
