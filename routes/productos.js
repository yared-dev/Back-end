/*
    Ruta: /api/productos
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const {
  getProductos,
  createProductos,
  deleteProductos,
  updateProductos,
  getProductosByName,
} = require("../controllers/productos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, getProductos);
router.get("/byname", getProductosByName);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("precio", "El precio es obligatorio").not().isEmpty(),
    check("cantidad", "El cantidad es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  createProductos
);
router.delete("/:id", validarJWT, deleteProductos);
router.put("/:id", validarJWT, updateProductos);

module.exports = router;
