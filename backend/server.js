const express = require("express");
require("dotenv").config();
const colors = require("colors");
const app = express();
const connectDB = require("./config/db");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

connectDB();

//middlewares for parsing and logging requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Your routes go here



// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
