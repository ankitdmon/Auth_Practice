const express = require("express");
const app = express();
const { authenticatetoken } = require("../middleware/authentication");

// import routes
const noAuth = require("./noAuth");
const users = require("./users");

app.use("/public", noAuth);
app.use("/users", authenticatetoken,users);

module.exports = app;
