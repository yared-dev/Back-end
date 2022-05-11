/*
    Hospitales
    ruta: '/api/horario'
*/
const { Router } = require("express");

const { validarJWT } = require("../middlewares/validar-jwt");

const {
  enviarHorarioEntrada,
  getHorarioEmpleado,
} = require("../controllers/horarios");

const router = Router();

router.post("/", validarJWT, enviarHorarioEntrada);
router.get("/", validarJWT, getHorarioEmpleado);

module.exports = router;
