const crypto = require("crypto");
const { readFile } = require("fs");
const passport = require("passport");
const { Sequelize } = require("sequelize");
const Usuarios = require("../models/Usuarios");
const Op = Sequelize.Op;
const bcrypt = require("bcrypt");

const enviarEmail = require("../handlers/email");

exports.autenticarUsuario = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/iniciar-sesion",
  failureFlash: true,
  badRequestMessage: "Ambos Campos son Obligatorios",
});

// funcion para revisar si el usuario esta logueado o no

exports.usuarioAutenticado = (req, res, next) => {
  // si el usuario esta autenticado, adelante
  if (req.isAuthenticated()) {
    return next();
  }
  //sino esta autenticado
  return res.redirect("/iniciar-sesion");
};

// funcion para cerrar sesion
exports.cerrarSesion = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/iniciar-sesion");
  });
};

// Genera un token si el usuario es valido
exports.enviarToken = async (req, res) => {
  // Verficar que el usuario existe
  const { email } = req.body;
  const usuario = await Usuarios.findOne({ where: { email } });

  // si no existe el usuario
  if (!usuario) {
    req.flash("error", "No existe esa cuenta");
    res.redirect("/reestablecer");
  }

  // Usuario existe
  //Token
  usuario.token = crypto.randomBytes(20).toString("hex");
  usuario.expiracion = Date.now() + 3600000;

  // guardar en la base de datos
  await usuario.save();

  // url de reset
  const url = `${process.env.APP_URL}reestablecer/${usuario.token}`;
  await enviarEmail.enviar({
    to: usuario.email,
    subject: "Password Reset",
    url,
    archivo: "reestablecer-password",
  });

  // terminar la ejecucion
  req.flash("correcto", "Se envio un mensaje a tu correo");
  res.redirect("/iniciar-sesion");
};

exports.validarToken = async (req, res) => {
  const usuario = await Usuarios.findOne({
    where: {
      token: req.params.token,
    },
  });

  if (!usuario) {
    req.flash("error", "No valido");
    res.redirect("/reestablecer");
  }

  // Forumulario
  res.render("resetPassword", {
    nombrePagina: "Actualizar contrasena",
  });
};

exports.actualizarPassword = async (req, res) => {
  //verifica token valido y fecha de expiracion
  const usuario = await Usuarios.findOne({
    where: {
      token: req.params.token,
      expiracion: {
        [Op.gte]: Date.now(),
      },
    },
  });

  if (!usuario) {
    req.flash("error", "No valido");
    res.redirect("/reestablecer");
  }

  // hashear el pass
  usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  usuario.token = null;
  usuario.expiracion = null;

  //Guardamos el nuevo password
  await usuario.save();

  req.flash("correcto", "Tu password fue actualizado");
  res.redirect("/iniciar-sesion");
};
