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
  getJobsByIdUser
} = require("../controllers/trabajo");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/:id", validarJWT, getTrabajos);

router.post(
  "/",
  [
    validarJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("model", "El modelo es obligatorio").not().isEmpty(),
    check("description", "El description es obligatorio").not().isEmpty(),
    check("price", "El precio es obligatorio").not().isEmpty(),
    check("priority", "El urgencia es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  createTrabajos
);

router.post('/usuario',validarJWT,getJobsByIdUser)

router.put("/:id", validarJWT, actualizarTrabajo);

router.delete("/:id", validarJWT, deleteTrabajos);

module.exports = router;
