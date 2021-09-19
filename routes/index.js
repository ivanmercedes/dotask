const express = require("express");
const { render } = require("pug");
const router = express.Router();

const { body } = require("express-validator");

// importar el controlador
const proyectoController = require("../controllers/proyectosController");
const tareasController = require("../controllers/tareasController");
const usuarioController = require("../controllers/usuarioController");
const authController = require("../controllers/authController");
module.exports = function () {
  // Definir una ruta para el home
  router.get(
    "/",
    authController.usuarioAutenticado,
    proyectoController.proyectosHome,
  );
  // Ruta para agregar nuevo proyecto
  router.get(
    "/nuevo-proyecto",
    authController.usuarioAutenticado,
    proyectoController.formularioProyecto,
  );
  router.post(
    "/nuevo-proyecto",
    authController.usuarioAutenticado,
    body("nombre").not().isEmpty().trim().escape(),
    proyectoController.nuevoProyecto,
  );

  // Listar proyecto
  router.get(
    "/proyectos/:url",
    authController.usuarioAutenticado,
    proyectoController.proyectoPorUrl,
  );

  // Actualizar el proyecto
  router.get(
    "/proyecto/editar/:id",
    authController.usuarioAutenticado,
    proyectoController.formularioEditar,
  );
  router.post(
    "/nuevo-proyecto/:id",
    authController.usuarioAutenticado,
    body("nombre").not().isEmpty().trim().escape(),
    proyectoController.actualizarProyecto,
  );

  // Eliminar proyecto
  router.delete(
    "/proyectos/:url",
    authController.usuarioAutenticado,
    proyectoController.eliminarProyecto,
  );

  // Tareas
  router.post(
    "/proyectos/:url",
    authController.usuarioAutenticado,
    tareasController.agregarTarea,
  );

  // Actualizar Tarea
  router.patch(
    "/tareas/:id",
    authController.usuarioAutenticado,
    tareasController.cambiarEstadoTarea,
  );
  // Eliminar tarea
  router.delete(
    "/tareas/:id",
    authController.usuarioAutenticado,
    tareasController.eliminarTarea,
  );

  // crear nueva cuenta
  router.get("/crear-cuenta", usuarioController.formCrearCuenta);
  router.post("/crear-cuenta", usuarioController.crearCuenta);

  router.get("/iniciar-sesion", usuarioController.formIniciarSesion);
  router.post("/iniciar-sesion", authController.autenticarUsuario);

  router.get("/cerrar-sesion", authController.cerrarSesion);

  // reestablecer constasena
  router.get("/reestablecer", usuarioController.formReestablecerPassword);
  router.post("/reestablecer", authController.enviarToken);
  router.get("/reestablecer/:token", authController.validarToken);
  router.post("/reestablecer/:token", authController.actualizarPassword);
  return router;
};
