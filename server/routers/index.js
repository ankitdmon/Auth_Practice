const express = require("express");
const app = express();

// import routes
const users = require("./users");
// const questions = require("./questions");

app.use(users);
// app.use(questions);

module.exports = app;
