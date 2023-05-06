const express = require("express");
const router = express.Router();
const isAuthenticated = require("../prisma/controllers/user_controllers/isAuthenticated");
const logoutController = require("../prisma/controllers/user_controllers/logoutController");

router.get("/isAuthenticated", isAuthenticated);


router.post("/logout", logoutController);
module.exports = router;
