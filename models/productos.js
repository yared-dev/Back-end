const pool = require("../database/config.database");
const util = require('util');

const queryAsync = util.promisify(pool.query).bind(pool);


const insertProduct = async (res) => {
  const { name, cant, price } = res;
  try {
    const results = await queryAsync({
      sql: "INSERT INTO products ( name, cant, price) VALUES (?,?,?)",
      timeout: 40000, // 40s
      values: [name, cant, price]
    });
    return results;
  } catch (error) {
    throw error;
  }
};
const getProduct = async () => {
  // return await pool.query("SELECT * FROM products WHERE cant > 0");
  try {
    const results = await queryAsync({
      sql: "SELECT * FROM products WHERE cant > 0",
      timeout: 40000, // 40s
    });
    return results;
  } catch (error) {
    throw error;
  }
};
const getProductById = async (id) => {
  try {
    const results = await queryAsync({
      sql: "SELECT * FROM products where idproduct = ? ",
      timeout: 40000, // 40s
      values: [id]
    });
    return results;
  } catch (error) {
    throw error;
  }
};
const updateProduct = async (res, id) => {
  const { name, cant, price, img, idproduct } = res;
  try {
    const results = await queryAsync({
      sql: "UPDATE products SET name = ?, cant = ?, price = ?, img = ? WHERE idproduct = ?",
      timeout: 40000, // 40s
      values: [name, cant, price, img, idproduct],
    });
    return results;
  } catch (error) {
    throw error;
  }
};
const deleteProduct = async (id) => {
  try {
    const results = await queryAsync({
      sql: "DELETE FROM products WHERE idproduct = ?",
      timeout: 40000, // 40s
      values: [id],
    });
    return results;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  insertProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
