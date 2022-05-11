const pool = require("../database/config.database");

const insertJob = async (res) => {
  const {
    iduser,
    idproduct,
    name,
    model,
    phone_number,
    description,
    price,
    priority,
    estate,
  } = res;
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
    "INSERT INTO jobs (id_user,idproduct,name,model,phone_number,description,price,priority,estate,date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
    [
      iduser,
      idproduct,
      name,
      model,
      phone_number,
      description,
      price,
      priority,
      estate,
      date,
    ]
  );
};

const getJobs = async (bool) => {
  return await pool.query(
    `SELECT idjobs,j.id_user,idproduct,j.name,model,phone_number,description,price,priority,estate,date,(u.name) as empleado FROM jobs j join users u on u.id_user = j.id_user where j.estate=${bool}`
  );
};
const getJobsById = async (id) => {
  return await pool.query(
    "SELECT * FROM jobs j join users u on u.id_user = j.id_user where j.idjobs =$1 ",
    [id]
  );
};

const updateJob = async (res) => {
  const {
    nombre,
    modelo,
    telefono,
    precio,
    estado,
    description,
    urgencia,
    id,
  } = res;
  let name = nombre,
    model = modelo,
    phone_number = telefono,
    price = precio,
    priority = urgencia;
  estate = estado;
  const response = await pool.query(
    "UPDATE jobs SET name=$1,model = $2, phone_number = $3, description = $4, price = $5, priority=$6,estate=$7 WHERE idjobs = $8",
    [name, model, phone_number, description, price, priority, estate, id]
  );
  return response;
};

const deleteJob = async (id) => {
  const response = await pool.query("DELETE FROM jobs WHERE idjobs = $1", [id]);
  return response;
};
module.exports = {
  insertJob,
  getJobs,
  getJobsById,
  updateJob,
  deleteJob,
};
