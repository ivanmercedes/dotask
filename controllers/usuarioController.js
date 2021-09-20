const crypto = require("crypto");
const Usuarios = require("../models/Usuarios");
const enviarEmail = require("../handlers/email");

exports.formCrearCuenta = (req, res) => {
  res.render("crearCuenta", {
    nombrePagina: "Crear cuenta en doTask",
  });
};

exports.formIniciarSesion = (req, res) => {
  const { error } = res.locals.mensajes;
  res.render("iniciarSesion", {
    nombrePagina: "Iniciar Sesion en doTask",
    error,
  });
};

exports.crearCuenta = async (req, res) => {
  // Leer los datos
  const { email, password } = req.body;

  try {
    //Crear el usuario
    const token = crypto.randomBytes(20).toString("hex");
    await Usuarios.create({
      email: email.toLowerCase(),
      password,
      token,
    });

    // Crear una url de confirmar
    const url = `${process.env.APP_URL}confirmar/${token}`;

    // crear un objecto de usuario
    const usuario = {
      email,
    };
    // Enviar email
    await enviarEmail.enviar({
      to: usuario.email,
      subject: "Confirma tu correo",
      url,
      archivo: "confirmar-cuenta",
    });

    //redirigir al usuario
    req.flash("correcto", "Enviamos un correo, confirma tu cuenta");
    res.redirect("/iniciar-sesion");
  } catch (error) {
    req.flash(
      "error",
      // error.errors.map((error) => error.message),
      'Este usuario ya existe.'
    );
    res.render("crearCuenta", {
      mensajes: req.flash(),
      nombrePagina: "Crear cuenta en UnTask",
      email,
      password,
    });
  }
};

exports.formReestablecerPassword = (req, res) => {
  res.render("reestablecer", {
    nombrePagina: "Reestablecer tu Contrasena",
  });
};

exports.confirmarCuenta = async (req, res) => {
  const usuario = await Usuarios.findOne({
    where: {
      token: req.params.token,
    },
  });

  if (!usuario) {
    req.flash("error", "No valido");
    res.redirect("/crear-cuenta");
  }

  usuario.activo = 1;
  usuario.token = null;
  await usuario.save();

  req.flash("correcto", "Cuenta activada correctamente");
  res.redirect("/iniciar-sesion");
};
