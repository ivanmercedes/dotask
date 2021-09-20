const { Router } = require("express");
const authController = require("../controllers/authController");

const router = Router();

module.exports = function () {
  router.post("/iniciar-sesion", authController.autenticarUsuario);
  router.get("/cerrar-sesion", authController.cerrarSesion);

  router.post("/reestablecer", authController.enviarToken);
  router.get("/reestablecer/:token", authController.validarToken);
  router.post("/reestablecer/:token", authController.actualizarPassword);
  return router;
};
// module.exports = router;
