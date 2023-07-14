const express = require("express");
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 5001;

app.listen(() => {
  console.log(`Server is running on ${PORT}`);
});
