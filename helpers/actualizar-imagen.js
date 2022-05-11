const fs = require("fs");

const Usuario = require("../models/usuario");
const Productos = require("../models/productos");

const borrarImagen = (path) => {
  if (fs.existsSync(path)) {
    // borrar la imagen anterior
    fs.unlinkSync(path);
  }
};

const actualizarImagen = async (tipo, id, nombreArchivo) => {
  let pathViejo = "";
  switch (tipo) {
    case "productos":
      const producto = await Productos.getProductById(id);
      if (!producto.rows[0]) {
        console.log("No es un producto por id");
        return false;
      }

      pathViejo = `./uploads/productos/${producto.img}`;
      borrarImagen(pathViejo);
      producto.rows[0].img = nombreArchivo;
      await Productos.updateProduct(producto.rows[0]);
      return true;

      break;
    case "usuarios":
      const usuario = await Usuario.findOneById(id);
      if (!usuario.rows[0]) {
        console.log("No es un usuario por id");
        return false;
      }

      pathViejo = `./uploads/usuario/${usuario.img}`;
      borrarImagen(pathViejo);
      usuario.rows[0].img = nombreArchivo;
      const { email, name, role, img, id_user } = usuario.rows[0];
      await Usuario.updateUser(email, name, role, img, id_user);
      return true;

      break;
  }
};

module.exports = {
  actualizarImagen,
};
