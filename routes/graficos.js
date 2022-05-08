/*

    ruta: api/graficos/
*/
const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");

const { get_data_trabajos } = require("../controllers/graficos");

const router = Router();

router.post("/", validarJWT, get_data_trabajos);
// router.get("/horario", get_data_horario);

module.exports = router;
