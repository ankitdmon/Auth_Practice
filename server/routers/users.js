const express = require("express");
const router = express();
const usersController = require("../controller/usersController");

router.post("/register", usersController.register);

router.post("/login", usersController.login);

router.post("/getUserById", usersController.getUserById);

router.post("/getUserByMobile", usersController.getUserByMobile);

router.post("/getUserByEmail", usersController.getUserByEmail);

router.post("/getUserByUsername", usersController.getUserByUsername);

module.exports = router;
