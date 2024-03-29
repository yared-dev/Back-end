const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const conexion = require("../database/config.database");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  console.log("🚀 ~ login ~ email, password:", email, password)

  try {
    // Verificar email
    const usuarioDB = await Usuario.findOneByEmail(email);
    if (!usuarioDB[0]) {
      return res.status(404).json({
        ok: false,
        msg: "Email no encontrado",
      });
    }
    // Verificar contraseña
    const validPassword = bcrypt.compareSync(
      password,
      usuarioDB[0].password
    );
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña no válida",
      });
    }
    // Generar el TOKEN - JWT
    const token = await generarJWT(usuarioDB[0].id_user);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

// const googleSingin = async (req, res = response) => {
//   const googleToken = req.body.token;
//   try {
//     const verify = await googleVerify(googleToken);
//     const { name, email, picture } = verify;
//     const usuarioDB = await Usuario.findOne({ email });
//     let usuario;
//     if (!usuarioDB) {
//       usuario = new Usuario({
//         nombre: name,
//         email,
//         password: "@@@",
//         img: picture,
//         google: true,
//       });
//     } else {
//       usuario = usuarioDB;
//       usuario.google = true;
//       usuario.password = true;
//     }
//     await usuario.save();

//     const token = await generarJWT(usuario.id);

//     res.json({
//       ok: true,
//       msg: "google singin",
//       token: token,
//     });
//   } catch (error) {
//     console.log("token no es correcto");
//   }
// };

const renewToken = async (req, res = response) => {
  const uid = req.uid;
  const token = await generarJWT(uid);
  const usuarioDB = await Usuario.findOneById(uid);
  res.json({
    ok: true,
    token,
    usuarioDB: usuarioDB[0],
  });
};
module.exports = {
  login,
  // googleSingin,
  renewToken,
};
