const { Sequelize } = require("sequelize");

const db = new Sequelize("dotask", "root", "", {
  host: "localhost",
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  port: "3306",
  operatorsAliases: "0",
  define: {
    timestamps: "0",
  },
});

module.exports = db;
