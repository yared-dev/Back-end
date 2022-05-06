/*
    Ruta: /api/trabajo
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const {
  getTrabajos,
  createTrabajos,
  actualizarTrabajo,
  deleteTrabajos,
} = require("../controllers/trabajo");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, getTrabajos);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("modelo", "El modelo es obligatorio").not().isEmpty(),
    check("description", "El description es obligatorio").not().isEmpty(),
    check("precio", "El precio es obligatorio").not().isEmpty(),
    check("urgencia", "El urgencia es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  createTrabajos
);

router.put("/:id", validarJWT, actualizarTrabajo);

router.delete("/:id", validarJWT, deleteTrabajos);

module.exports = router;
