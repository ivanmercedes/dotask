const { DataTypes } = require("sequelize");
const slug = require("slug");
const db = require("../config/db");
const shortid = require("shortid");

const Proyectos = db.define(
  "proyectos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
    },
    nombre: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    hooks: {
      beforeCreate(proyecto) {
        const url = slug(proyecto.nombre);
        proyecto.url = `${url}-${shortid.generate()}`;
      },
    },
  },
);

module.exports = Proyectos;
