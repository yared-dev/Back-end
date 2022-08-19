const pool = require("../database/config.database");

const insertHorario = async (res) => {
  const {idusers, date} = res;
  return await pool.query(
    "INSERT INTO horario_empleado (id_user, fecha, entrada) VALUES ($1,$2,$3)",
    [idusers, formatDate(date), date]
  );
};
const getHorarioEmpleado = async () => {
  var date = new Date();
  var desde = new Date(date.getFullYear(), date.getMonth(), 1);
  var hasta = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  desde = formatDate(desde);
  hasta = formatDate(hasta);
  const query = `
                SELECT
                u."name",
                sum( he.salida - he.entrada ) AS diferencia 
              FROM
                users u
                JOIN horario_empleado he ON he.id_user = u.id_user
                where he.fecha BETWEEN '${desde}' and '${hasta}'
              GROUP BY
                u."name"
              `;
  return await pool.query(query);
};
const countHorario = async (res) => {
  const {idusers} = res;
  var date = new Date();
  const query = `SELECT id_horario,entrada,break,visita,salida from horario_empleado where id_user = ${idusers} and fecha = '${formatDate(date)}'`;
  return await pool.query(query);
};
const updateHorario = async (res) => {
  const {id_horario,idusers,date,tipo_asistencia} = res;
  let tidoAsistencia = '';
  switch (tipo_asistencia){
    case "E" :
      tidoAsistencia = 'entrada';
    break;
    case "B" :
      tidoAsistencia = 'break';
    break;
    case "V" :
      tidoAsistencia = 'visita';
    break;
    case "S" :
      tidoAsistencia = 'salida';
    break;
  }
  return await pool.query(
    `
    update  horario_empleado
    set ${tidoAsistencia} = '${date}'
    where id_user = ${idusers}
    and id_horario = ${id_horario};
    `
  );
}

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
  updateHorario
};
