const pool = require("../database/config.database");

const insertHorario = async (res) => {
  const { tipo_asistencia, idusers, date } = res;
  return await pool.query(
    "INSERT INTO horario_empleado (id_user, fecha_hora, tipo_asistencia) VALUES ($1,$2,$3)",
    [idusers, date, tipo_asistencia]
  );
};
const getHorarioEmpleado = async () => {
  var date = new Date();
  var desde = new Date(date.getFullYear(), date.getMonth(), 1);
  var hasta = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  desde = formatDate(desde);
  hasta = formatDate(hasta);
  const query = `SELECT u.name,MAX(fecha_hora::time) - MIN(fecha_hora::time) AS diferencia FROM horario_empleado rhe  JOIN users u ON u.id_user = rhe.id_user WHERE fecha_hora BETWEEN '${desde}' and '${hasta}' and  tipo_asistencia IN ( 'E', 'S' ) GROUP BY u.name`;
  return await pool.query(query);
};
function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
module.exports = {
  insertHorario,
  getHorarioEmpleado,
};
