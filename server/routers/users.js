const express = require("express");
const router = express();
const usersController = require("../controller/usersController");

router.post("register", usersController.register);

module.exports = router;