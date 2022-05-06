/*

    ruta: api/graficos/
*/
const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");

const { getDataGrafico, get_data_horario } = require("../controllers/graficos");

const router = Router();

router.get("/", getDataGrafico);
router.get("/horario", get_data_horario);

module.exports = router;
