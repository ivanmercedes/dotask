const { Router } = require("express");
const usuarioController = require("../controllers/usuarioController");

const router = Router();

module.exports = function () {
  // crear nueva cuenta
  router.get("/crear-cuenta", usuarioController.formCrearCuenta);
  router.post("/crear-cuenta", usuarioController.crearCuenta);
  router.get("/confirmar/:token", usuarioController.confirmarCuenta);

  router.get("/iniciar-sesion", usuarioController.formIniciarSesion);

  // reestablecer constasena
  router.get("/reestablecer", usuarioController.formReestablecerPassword);

  return router;
};
