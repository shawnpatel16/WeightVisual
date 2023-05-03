const express = require("express");
const login = require("../prisma/controllers/user_controllers/loginController");
const router = express.Router();
const register = require("../prisma/controllers/user_controllers/registerController");

router.post("/login", login);

//signup route
router.post("/register", register);

module.exports = router;