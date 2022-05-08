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
  const { nombre, cantidad, precio } = res;
  let name = nombre,
    cant = cantidad,
    price = precio;
  const response = await pool.query(
    "UPDATE products SET name = $1, cant = $2, price = $3  WHERE idproduct = $4",
    [name, cant, price, id]
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
