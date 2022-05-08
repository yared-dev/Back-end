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
} = require("../controllers/productos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, getProductos);

router.post(
  "/",
  [
    validarJWT,
    check("name", "El name es obligatorio").not().isEmpty(),
    check("cant", "El cant es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  createProductos
);
router.delete("/:id", validarJWT, deleteProductos);
router.put("/:id", validarJWT, updateProductos);

module.exports = router;
