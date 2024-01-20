const pool = require("../database/config.database");
const util = require("util");

const queryAsync = util.promisify(pool.query).bind(pool);

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
  var date = new Date();

  const sql =
    "INSERT INTO jobs (id_user,idproduct,name,model,phone_number,description,price,priority,estate,date) VALUES (?,?,?,?,?,?,?,?,?,?)";
  try {
    const results = await queryAsync({
      sql,
      timeout: 40000, // 40s
      values: [
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
      ],
    });
    return results;
  } catch (error) {
    throw error;
  }
};

const getJobs = async (bool) => {
  bool = bool === "true" ? 1 : 0;
  const sql = `
    SELECT
      idjobs,
      j.id_user,
      pr.name AS producto,
      j.name,
      j.model,
      phone_number,
      description,
      j.price,
      j.priority,
      j.estate,
      j.date,
       u.name  AS empleado 
    FROM
      jobs j
      JOIN users u ON u.id_user = j.id_user
      LEFT JOIN products pr ON j.idproduct = pr.idproduct 
    WHERE
      j.estate = ? ;`;
  try {
    const results = await queryAsync({
      sql,
      timeout: 40000, // 40s
      values: [bool],
    });
    return results;
  } catch (error) {
    throw error;
  }
};

const getJobsById = async (id) => {
  const sql = `
    SELECT 
      u.name AS empleado,
      j.price,
      j.date 
    FROM jobs j 
    join users u on u.id_user = j.id_user 
    where j.idjobs = ?`;
  try {
    const results = await queryAsync({
      sql,
      timeout: 40000, // 40s
      values: [id],
    });
    return results;
  } catch (error) {
    throw error;
  }
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
  const sql =
    "UPDATE jobs SET name= ?,model =  ?, phone_number =  ?, description =  ?, price =  ?, priority= ?,estate= ? WHERE idjobs =  ?";
  try {
    const results = await queryAsync({
      sql,
      timeout: 40000, // 40s
      values: [
        name,
        model,
        phone_number,
        description,
        price,
        priority,
        estate,
        id,
      ],
    });
    return results;
  } catch (error) {
    throw error;
  }
};

const deleteJob = async (id) => {
  const sql = "DELETE FROM jobs WHERE idjobs = ? ";
  try {
    const results = await queryAsync({
      sql,
      timeout: 40000, // 40s
      values: [id],
    });
    return results;
  } catch (error) {
    throw error;
  }
};

const getJobsByUser = async (res) => {
  const { iduser } = res;
  const sql =
    "SELECT * FROM jobs j join users u on u.id_user = j.id_user where u.id_user = ? and j.estate = true";
  try {
    const results = await queryAsync({
      sql,
      timeout: 40000, // 40s
      values: [iduser],
    });
    return results;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  insertJob,
  getJobs,
  getJobsById,
  updateJob,
  deleteJob,
  getJobsByUser,
};
