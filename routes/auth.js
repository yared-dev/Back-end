/*
    Path: '/api/login'
*/
const { Router, response } = require("express");
const { login } = require("../controllers/auth");
const { googleSingin } = require("../controllers/auth");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { renewToken } = require("../controllers/auth");

const router = Router();

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);
router.post(
  "/google",
  [
    check("token", "El token de google es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  googleSingin
);
router.get("/renew-token", validarJWT, renewToken);

module.exports = router;
