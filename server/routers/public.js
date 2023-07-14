const express = require("express");
const router = express();
const publicController = require("../controller/publicController");

router.post("/isUserNameAvalible", publicController.isUserNameAvailable);

router.post("/isMobileAvaliable", publicController.isMobileAvaliable);

router.post("/isEmailAvaliable", publicController.isEmailAvaliable);

module.exports = router;
