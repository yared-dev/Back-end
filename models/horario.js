const pool = require("../database/config.database");
const util = require("util");
const queryAsync = util.promisify(pool.query).bind(pool);

const insertHorario = async (res) => {
  const { idusers } = res;
  const date = new Date();
  try {
    const results = await queryAsync({
      sql: "INSERT INTO horario_empleado (id_user, fecha, entrada) VALUES (?,?,?)",
      timeout: 40000, // 40s
      values: [idusers, date, date],
    });
    return results;
  } catch (error) {
    throw error;
  }
};
const getHorarioEmpleado = async () => {
  var date = new Date();
  var desde = new Date(date.getFullYear(), date.getMonth(), 1);
  var hasta = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  desde = formatDate(desde);
  hasta = formatDate(hasta);
  const sql = `
    SELECT
      u.name,
      sum( he.salida - he.entrada ) AS diferencia 
    FROM
      users u
      JOIN horario_empleado he ON he.id_user = u.id_user
      where he.fecha BETWEEN '${desde}' and '${hasta}'
    GROUP BY
      u.name
    `;
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
const countHorario = async (res) => {
  const { idusers } = res;
  const sql = `SELECT id_horario,entrada,break,visita,salida from horario_empleado where id_user = ${idusers} and fecha = '${formatDate(
    date
  )}'`;
  try {
    const results = await queryAsync({
      sql,
      timeout: 40000, // 40s,
      values: [idusers],
    });
    return results;
  } catch (error) {
    throw error;
  }
};
const updateHorario = async (res) => {
  const { id_horario, idusers, date, tipo_asistencia } = res;
  let tidoAsistencia = "";
  switch (tipo_asistencia) {
    case "E":
      tidoAsistencia = "entrada";
      break;
    case "B":
      tidoAsistencia = "break";
      break;
    case "V":
      tidoAsistencia = "visita";
      break;
    case "S":
      tidoAsistencia = "salida";
      break;
  }
  const sql = `
  update  horario_empleado
  set ${tidoAsistencia} = '${date}'
  where id_user = ${idusers} and id_horario = ${id_horario};
  `;
  try {
    const results = await queryAsync({
      sql,
      timeout: 40000, // 40s,
    });
    return results;
  } catch (error) {
    throw error;
  }
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
  countHorario,
  updateHorario,
};
