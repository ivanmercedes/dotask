const passport = require("passport");
const LocaStrategy = require("passport-local").Strategy;

// Referencia al Modelo donde vamos autenticar
const Usuarios = require("../models/Usuarios");

// Local strategy - Login con credenciales propios
passport.use(
  new LocaStrategy(
    // por default passport espera un usuario y password
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const usuario = await Usuarios.findOne({
          where: {
            email,
            activo: 1,
          },
        });
        // El usuario existe, password incorrecto
        if (!usuario.verificarPassword(password)) {
          return done(null, false, {
            message: "Password Incorrecto",
          });
        }
        // El email existe, y el password es correcto

        return done(null, usuario);
      } catch (error) {
        // Ese usuario no existe
        return done(null, false, {
          message: "Esa cuenta no existe",
        });
      }
    },
  ),
);

// serializar el usuario
passport.serializeUser((usuario, callback) => {
  callback(null, usuario);
});

// desarializar el usuario
passport.deserializeUser((usuario, callback) => {
  callback(null, usuario);
});

module.exports = passport;
