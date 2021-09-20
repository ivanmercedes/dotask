const express = require("express");
const router = express.Router();

const auth = require("./auth");
const user = require("./user");
const task = require("./task");
const project = require("./project");

module.exports = function () {
  router.use(project());
  router.use(user());
  router.use(auth());
  router.use(task());

  return router;
};
