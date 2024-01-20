const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {
  const { email, nombre, role, password } = req.body;

  try {
    const existeEmail = await Usuario.findOneByEmail(email);
    if ( existeEmail.length !== 0 ) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya está registrado",
      });
    }
    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    let password_encrypt = bcrypt.hashSync(password, salt);

    // Guardar usuario con contraseña encriptada
    await Usuario.insertUser(email, nombre, role, password_encrypt);

    // Buscar usuario por id
    const user = await Usuario.findOneByEmail(email);
    const { id_user } = user[0];
    // Generar el TOKEN - JWT
    const token = await generarJWT(id_user);

    res.json({
      ok: true,
      user: user[0],
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

const getUsuarios = async (req, res) => {
  const desde = Number(req.query.desde) || 0;
  try {
    const usuarios = await Usuario.getUsers(desde);

    res.json({
      ok: true,
      usuarios: usuarios,
      total: 0,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

const actualizarUsuario = async (req, res = response) => {
  // TODO: Validar token y comprobar si es el usuario correcto

  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findOneById(uid);

    if (!usuarioDB[0]) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }

    // Actualizaciones
    const { email, name, role, img } = req.body;
    if (usuarioDB[0].email !== email) {
      const existeEmail = await Usuario.findOneByEmail(email);
      if (existeEmail[0]) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese email",
        });
      }
    }
    const usuarioActualizado = await Usuario.updateUser(
      email,
      name,
      role,
      img,
      uid
    );

    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const borrarUsuario = async (req, res = response) => {
  const uid = req.params.id;

  try {
    await Usuario.deleteUser(uid);
    res.json({
      ok: true,
      msg: "Usuario eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
};
