const express = require("express");
const app = express();

// import routes
const noAuth = require("./noAuth");
const users = require("./users");

app.use("/public", noAuth);
app.use("/users", users);

module.exports = app;
