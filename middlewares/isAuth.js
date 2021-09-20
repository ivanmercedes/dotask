const usuarioAutenticado = (req, res, next) => {
  // si el usuario esta autenticado, adelante
  if (req.isAuthenticated()) {
    return next();
  }
  //sino esta autenticado
  return res.redirect("/iniciar-sesion");
};

module.exports = {
  usuarioAutenticado,
};
