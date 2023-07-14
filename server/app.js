const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routers/index");
const app = express();

const PORT = process.env.PORT || 5001;


app.use(router);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });
