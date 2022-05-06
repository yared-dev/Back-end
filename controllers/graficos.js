const Usuario = require("../models/usuario");
const Trabajos = require("../models/trabajo");
const Horario = require("../models/horario");

// FUNCION PARA RETORNAR EL TOTAL DE LA SUMA DE PRECIOS DEL MES
const getDataGrafico = async (req, res) => {
  var a = await get_total_precio_todos_usuarios();
  res.json({
    ok: true,
    a: a,
  });
};
const get_total_precio_todos_usuarios = async () => {
  var year = 2022;
  var mes = 1;
  var primerDia = new Date(year, mes, 1);
  var ultimoDia = new Date(year, mes + 1, 0);
  var resu = [];
  var id = {
    kendry: "62392d2999b18b512c010bde",
    yegor: "62392cee99b18b512c010bd6",
    jonathan: "62392caf99b18b512c010bcf",
  };
  for (let claves in id) {
    const listar_trabajos_por_usuario = await Trabajos.find(
      {
        usuario: id[claves], //id[claves],
        date: {
          $gte: primerDia,
          $lt: ultimoDia,
        },
      },
      "precio usuario date"
    );
    var totalSuma = listar_trabajos_por_usuario.reduce(
      (accumulator, trabajo) => {
        return accumulator + trabajo.precio;
      },
      0
    );
    resu.push(totalSuma);
  }
  var resultado = {
    kendry: resu[0],
    yegor: resu[1],
    jonathan: resu[2],
  };
  return resultado;
};
const get_data_horario = async (req, res) => {
  const date = new Date(Date.now());
  // let { mes } = req.body;
  let year = date.getUTCFullYear();

  const pagosDiariosMensuales = await Trabajos.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(`${3}/01/${year}`),
          $lt: new Date(`${5}/01/${year}`),
        },
      },
    },
    { $group: { _id: "$usuario", suma: { $sum: "$precio" } } },
  ]).sort({ _id: 1 });

  const usuarios = await Promise.all(
    pagosDiariosMensuales.map(async (resp) => {
      const asd = await Usuario.find({ _id: resp._id }, "nombre");
      return asd;
    })
  );
  var emepleados = {
    jhonatan: pagosDiariosMensuales[1].suma,
    yegor: pagosDiariosMensuales[2].suma,
    kendry: pagosDiariosMensuales[3].suma,
  };
  horasTrabajadas();
  res.json({
    ok: true,
    emepleados,
  });
};

const horasTrabajadas = async () => {
  let fecha = new Date();
  // let mes = fecha.getMonth() + 1;
  let year = fecha.getUTCFullYear();
  let day = fecha.getDate();

  const users = await Usuario.find().sort({ _id: 1 });
  const usuarios = await Promise.all(
    users.map(async (resp) => {
      console.log(resp._id, resp.nombre);
      const horaas = await Horario.find(
        {
          usuario: resp._id,
        },
        "usuario"
      );
    })
  );

  console.log(usuarios);
};

module.exports = {
  getDataGrafico,
  get_data_horario,
};
