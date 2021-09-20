const { Router } = require("express");
const tareasController = require("../controllers/tareasController");

const { usuarioAutenticado } = require("../middlewares");

const router = Router();

module.exports = function () {
  // Tareas
  router.post(
    "/proyectos/:url",
    usuarioAutenticado,
    tareasController.agregarTarea,
  );

  // Actualizar Tarea
  router.patch(
    "/tareas/:id",
    usuarioAutenticado,
    tareasController.cambiarEstadoTarea,
  );
  // Eliminar tarea
  router.delete(
    "/tareas/:id",
    usuarioAutenticado,
    tareasController.eliminarTarea,
  );

  return router;
};
