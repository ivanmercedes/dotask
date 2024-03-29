const Proyectos = require("../models/Proyectos");
const Tareas = require("../models/Tareas");

exports.proyectosHome = async (req, res) => {
  const usuarioId = res.locals.usuario.id;
  const proyectos = await Proyectos.findAll({ where: { usuarioId } });

  res.render("index", {
    nombrePagina: "Dashboard",
    proyectos,
  });
};

exports.formularioProyecto = async (req, res) => {
  const usuarioId = res.locals.usuario.id;
  const proyectos = await Proyectos.findAll({ where: { usuarioId } });
  res.render("nuevoProyecto", {
    nombrePagina: "Nuevo Proyecto",
    proyectos,
  });
};

exports.nuevoProyecto = async (req, res) => {
  const usuarioId = res.locals.usuario.id;
  const proyectos = await Proyectos.findAll({ where: { usuarioId } });

  // validar que tengamos algo el input
  const { nombre } = req.body;

  let errores = [];

  if (!nombre) {
    errores.push({ texto: "Agregar un nombre al Proyecto" });
  }

  // si hay errores
  if (errores.length > 0) {
    res.render("nuevoProyecto", {
      nombrePagina: "Nuevo Proyecto",
      errores,
      proyectos,
    });
  } else {
    // no hay errores
    // insertar en la DB
    const usuarioId = res.locals.usuario.id;

    await Proyectos.create({ nombre, usuarioId });
    res.redirect("/");
  }
};

exports.proyectoPorUrl = async (req, res, next) => {
  const usuarioId = res.locals.usuario.id;
  const proyectosPromise = Proyectos.findAll({ where: { usuarioId } });
  const proyectoPromise = Proyectos.findOne({
    where: {
      url: req.params.url,
    },
  });

  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);

  // Consultar tareas del proyecto actual
  const tareas = await Tareas.findAll({
    where: {
      proyectoId: proyecto.id,
    },
    include: [{ model: Proyectos }],
  });
  if (!proyecto) return next();

  res.render("tareas", {
    nombrePagina: "Tareas del Proyecto",
    proyecto,
    proyectos,
    tareas,
  });
};

exports.formularioEditar = async (req, res) => {
  const usuarioId = res.locals.usuario.id;
  const proyectosPromise = Proyectos.findAll({ where: { usuarioId } });
  const proyectoPromise = Proyectos.findOne({
    where: {
      id: req.params.id,
    },
  });

  const [proyectos, proyecto] = await Promise.all([
    proyectosPromise,
    proyectoPromise,
  ]);
  res.render("nuevoProyecto", {
    nombrePagina: "Editar Proyecto",
    proyectos,
    proyecto,
  });
};

exports.actualizarProyecto = async (req, res) => {
  const usuarioId = res.locals.usuario.id;
  const proyectos = await Proyectos.findAll({ where: { usuarioId } });
  // Enviar a la consola lo que el usuario escriba
  // console.log(req.body);

  // validar que tengamos algo el input
  const { nombre } = req.body;

  let errores = [];

  if (!nombre) {
    errores.push({ texto: "Agregar un nombre la Proyecto" });
  }

  // si hay errores
  if (errores.length > 0) {
    res.render("nuevoProyecto", {
      nombrePagina: "Nuevo Proyecto",
      errores,
      proyectos,
    });
  } else {
    // no hay errores
    // insertar en la DB

    proyecto = await Proyectos.update(
      { nombre: nombre },
      { where: { id: req.params.id } },
    );
    res.redirect("/");
  }
};

exports.eliminarProyecto = async (req, res, next) => {
  // req, query o params
  // console.log(req.params);
  const { url } = req.params;
  const resultado = await Proyectos.destroy({ where: { url } });

  if (!resultado) {
    return next();
  }
  res.status(200).send("Proyecto eliminado correctamente");
};
