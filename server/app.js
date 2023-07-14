const express = require("express");
require('dotenv').config();
const connectDB = require('./config/db')
const app = express();

const PORT = process.env.PORT || 5001;

connectDB();

app.listen(() => {
  console.log(`Server is running on ${PORT}`);
});
