const express = require("express");
const passport = require("passport");
require("dotenv").config();
const colors = require("colors");
const app = express();
const connectDB = require("./config/db");
const port = process.env.NODE_ENV === 'test' ? 3001 : 3000;
const mongoose = require("mongoose");
const morgan = require('morgan');
const workoutRoutes = require('./routes/workoutRoutes')
const userRoutes = require('./routes/userRoutes')
const validationErrorHandler = require('./middleware/validationErrorHandler')
const authenticate = require('./middleware/authenticate')
connectDB();

//middlewares for parsing and logging requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(validationErrorHandler)

// Your routes go here
app.use('/workout',authenticate,workoutRoutes)
app.use('/auth', userRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message });
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
