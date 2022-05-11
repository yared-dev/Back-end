const pool = require("../database/config.database");

const insertProduct = async (res) => {
  const { name, cant, price } = res;
  return await pool.query(
    "INSERT INTO products ( name, cant,price) VALUES ($1,$2,$3)",
    [name, cant, price]
  );
};
const getProduct = async () => {
  return await pool.query("SELECT * FROM products");
};
const getProductById = async (id) => {
  return await pool.query("SELECT * FROM products where idproduct =$1 ", [id]);
};
const updateProduct = async (res, id) => {
  const { name, cant, price, img, idproduct } = res;
  const response = await pool.query(
    "UPDATE products SET name = $1, cant = $2, price = $3,img=$4  WHERE idproduct = $5",
    [name, cant, price, img, idproduct]
  );
  return response;
};
const deleteProduct = async (id) => {
  const response = await pool.query(
    "DELETE FROM products WHERE idproduct = $1",
    [id]
  );
  return response;
};
module.exports = {
  insertProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
