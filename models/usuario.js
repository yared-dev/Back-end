const pool = require("../database/config.database");

const findOneByEmail = async (email) => {
  return await pool.query("SELECT * FROM users WHERE email = $1", [email]);
};

const findOneById = async (id) => {
  return await pool.query("SELECT * FROM users WHERE id_user = $1", [id]);
};

const insertUser = async (email, name, role, password) => {
  return await pool.query(
    "INSERT INTO users (email, name, role, password) VALUES ($1,$2,$3,$4)",
    [email, name, role, password]
  );
};

const getUsers = async (desde = 0) => {
  return await pool.query("SELECT * FROM users");
};

const updateUser = async (email, name, role, img, id) => {
  const response = await pool.query(
    "UPDATE users SET name = $1, email = $2, role = $3,img=$4 WHERE id_user = $5",
    [name, email, role, img, id]
  );
  return response;
};

const deleteUser = async (id) => {
  const response = await pool.query("DELETE FROM users WHERE id_user = $1", [
    id,
  ]);
  return response;
};
module.exports = {
  findOneByEmail,
  insertUser,
  findOneById,
  getUsers,
  updateUser,
  deleteUser,
};
