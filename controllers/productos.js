const Producto = require("../models/productos");

const getProductos = async (req, res) => {
  const desde = Number(req.query.desde) || 0;

  const [producto, total] = await Promise.all([
    Producto.find({}, "nombre precio cantidad img ").skip(desde).limit(5),
    Producto.countDocuments(),
  ]);

  res.json({
    ok: true,
    producto,
    total,
  });
};
const createProductos = async (req, res) => {
  const uid = req.uid;
  const producto = new Producto({
    usuario: uid,
    ...req.body,
  });
  try {
    const paroductoDb = await producto.save();

    res.json({
      ok: true,
      producto: paroductoDb,
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
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({
        ok: true,
        msg: "producto no encontrado",
      });
    }
    await Producto.findByIdAndDelete(id);
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
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({
        ok: true,
        msg: "Producto no encontrado",
      });
    }

    const cambiosProducto = req.body;

    const productoActualizado = await Producto.findByIdAndUpdate(
      id,
      cambiosProducto,
      { new: true }
    );
    res.json({
      ok: true,
      msg: "producto Actualizado",
      producto: productoActualizado,
    });
  } catch (e) {
    console.log(e);
  }
};
const getProductosByName = async (req, res) => {
  const total = await Producto.aggregate([
    {
      $group: {
        _id: {
          nombre: "$nombre",
        },
        totalPrice: {
          $sum: "$precio",
        },
      },
    },
  ]);
  res.json({
    ok: true,
    total,
  });
};
module.exports = {
  getProductos,
  createProductos,
  deleteProductos,
  updateProductos,
  getProductosByName,
};
