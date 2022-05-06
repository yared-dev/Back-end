/*
    Hospitales
    ruta: '/api/horario'
*/
const { Router } = require("express");

const { validarJWT } = require("../middlewares/validar-jwt");

const { enviarHorarioEntrada } = require("../controllers/horarios");

const router = Router();

router.post("/", validarJWT, enviarHorarioEntrada);

module.exports = router;
