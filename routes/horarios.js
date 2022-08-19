/*
    Hospitales
    ruta: '/api/horario'
*/
const { Router } = require("express");

const { validarJWT } = require("../middlewares/validar-jwt");

const {
  enviarHorarioEntrada,
  getHorarioEmpleado,
  countHorario,
  update_horario
} = require("../controllers/horarios");

const router = Router();

router.get("/", validarJWT, getHorarioEmpleado);
router.post("/", validarJWT, enviarHorarioEntrada);
router.post("/cant", validarJWT, countHorario);
router.post("/actualizar", validarJWT, update_horario);

module.exports = router;
