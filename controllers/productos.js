const Product = require("../models/productos");

const getProductos = async (req, res) => {
  const producto = await Product.getProduct();
  res.json({
    ok: true,
    producto: producto.rows,
  });
};
const createProductos = async (req, res) => {
  try {
    await Product.insertProduct(req.body);
    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const deleteProductos = async (req, res) => {
  const id = req.params.id;
  try {
    const producto = await Product.getProductById(id);
    if (!producto.rows[0]) {
      return res.status(404).json({
        ok: true,
        msg: "trabajo no encontrado",
      });
    }
    await Product.deleteProduct(id);
    res.json({
      ok: true,
      msg: "producto borrado",
    });
  } catch (e) {
    console.log(e);
  }
};
const updateProductos = async (req, res) => {
  const id = req.params.id;
  try {
    const producto = await Product.getProductById(id);
    if (!producto.rows[0]) {
      return res.status(404).json({
        ok: true,
        msg: "trabajo no encontrado",
      });
    }
    await Product.updateProduct(req.body, id);
    res.json({
      ok: true,
      msg: "producto Actualizado",
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getProductos,
  createProductos,
  deleteProductos,
  updateProductos,
};
