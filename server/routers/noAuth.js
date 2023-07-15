const express = require("express");
const router = express();
const loginSignup = require("../controller/loginSignup.Controller");

router.post("/register", loginSignup.register);

router.post("/login", loginSignup.login);

router.post("/isUserNameAvalible", loginSignup.isUserNameAvailable);

router.post("/isMobileAvaliable", loginSignup.isMobileAvaliable);

router.post("/isEmailAvaliable", loginSignup.isEmailAvaliable);

module.exports = router;
