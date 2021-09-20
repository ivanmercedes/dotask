const { Router } = require("express");
const { body } = require("express-validator");

const proyectoController = require("../controllers/proyectosController");
const { usuarioAutenticado } = require("../middlewares");

const router = Router();

module.exports = function () {
  // Definir una ruta para el home
  router.get("/", usuarioAutenticado, proyectoController.proyectosHome);
  // Ruta para agregar nuevo proyecto
  router.get(
    "/nuevo-proyecto",
    usuarioAutenticado,
    proyectoController.formularioProyecto,
  );
  router.post(
    "/nuevo-proyecto",
    usuarioAutenticado,
    body("nombre").not().isEmpty().trim().escape(),
    proyectoController.nuevoProyecto,
  );

  // Listar proyecto
  router.get(
    "/proyectos/:url",
    usuarioAutenticado,
    proyectoController.proyectoPorUrl,
  );

  // Actualizar el proyecto
  router.get(
    "/proyecto/editar/:id",
    usuarioAutenticado,
    proyectoController.formularioEditar,
  );
  router.post(
    "/nuevo-proyecto/:id",
    usuarioAutenticado,
    body("nombre").not().isEmpty().trim().escape(),
    proyectoController.actualizarProyecto,
  );

  // Eliminar proyecto
  router.delete(
    "/proyectos/:url",
    usuarioAutenticado,
    proyectoController.eliminarProyecto,
  );

  return router;
};
