const { Sequelize } = require("sequelize");

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_ENGINE /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  port: process.env.DB_PORT,
  operatorsAliases: "0",
  define: {
    timestamps: "0",
  },
});

module.exports = db;
