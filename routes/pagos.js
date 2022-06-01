/*
    Pagos
    ruta: '/api/pagos'
*/
const { Router } = require("express");

const { validarJWT } = require("../middlewares/validar-jwt");

const {enviarPago,getPagoByUser} = require("../controllers/pagos");

const router = Router();

router.post("/", validarJWT, enviarPago);
router.post("/usuario", validarJWT, getPagoByUser);

module.exports = router;
