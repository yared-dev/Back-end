const pool = require("../database/config.database");
const util = require('util');
const queryAsync = util.promisify(pool.query).bind(pool);

const findOneByEmail = async (email) => {
  try {
    const results = await queryAsync({
      sql: 'SELECT * FROM users WHERE email = ?',
      timeout: 40000, // 40s
      values: [email]
    });
    return results;
  } catch (error) {
    throw error;
  }
};

const findOneById = async (id) => {
  try {
    const results = await queryAsync({
      sql: 'SELECT * FROM users WHERE id_user = ?',
      timeout: 40000, // 40s
      values: [id]
    });
    return results;
  } catch (error) {
    throw error;
  }
};

const insertUser = async (email, name, role, password) => {
  try {
    const results = await queryAsync({
      sql: "INSERT INTO users (email, name, role, password) VALUES (?,?,?,?)",
      timeout: 40000, // 40s
      values: [email, name, role, password]
    });
    return results;
  } catch (error) {
    throw error;
  }

};

const getUsers = async (desde = 0) => {
  // return await pool.query("SELECT * FROM users");
  try {
    const results = await queryAsync({
      sql: 'SELECT * FROM users',
      timeout: 40000, // 40s
      values: []
    });
    return results;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (email, name, role, img, id) => {
  // const response = await pool.query(
  //   "UPDATE users SET name = $1, email = $2, role = $3,img=$4 WHERE id_user = $5",
  //   [name, email, role, img, id]
  // );
  // return response;
  try {
    const results = await queryAsync({
      sql: "UPDATE users SET name = ?, email = ?, role = ?,img=? WHERE id_user = ?",
      timeout: 40000, // 40s
      values: [name, email, role, img, id],
    });
    return results;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  // const response = await pool.query("DELETE FROM users WHERE id_user = $1", [
  //   id,
  // ]);
  // return response;
  try {
    const results = await queryAsync({
      sql: "DELETE FROM users WHERE id_user = ?",
      timeout: 40000, // 40s
      values: [id],
    });
    return results;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  findOneByEmail,
  insertUser,
  findOneById,
  getUsers,
  updateUser,
  deleteUser,
};
