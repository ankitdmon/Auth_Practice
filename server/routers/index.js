const express = require("express");
const app = express();

// import routes
const users = require("./users");
const public = require("./public");
// const questions = require("./questions");

app.use("/users", users);
app.use("/public", public);
// app.use(questions);

module.exports = app;
