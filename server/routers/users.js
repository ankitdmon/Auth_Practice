const express = require("express");
const router = express();
const usersController = require("../controller/users.Controller");

router.post("/getUserById", usersController.getUserById);

router.post("/getUserByMobile", usersController.getUserByMobile);

router.post("/getUserByEmail", usersController.getUserByEmail);

router.post("/getUserByUsername", usersController.getUserByUsername);

module.exports = router;
