const loginController = require("./loginController");
const registerController = require("./registerController");
const isAuthenticated = require("./isAuthenticated");
const logoutController = require("./logoutController")

module.exports = {
  loginController,
  registerController,
  isAuthenticated,
  logoutController
};
