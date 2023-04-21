const express = require("express");
require("dotenv").config();
const colors = require("colors");
const app = express();
const connectDB = require("./config/db");
const port = process.env.NODE_ENV === 'test' ? 3001 : 3000;
const mongoose = require("mongoose");
const morgan = require('morgan');
const workoutRoutes = require('./routes/workoutRoutes')
connectDB();

//middlewares for parsing and logging requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message });
});


// Your routes go here
app.use('/workout', workoutRoutes)


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
