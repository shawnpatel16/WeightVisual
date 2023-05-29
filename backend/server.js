const express = require("express");
const passport = require("passport");
require("dotenv").config();
const colors = require("colors");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const morgan = require('morgan');
const workoutRoutes = require('./routes/workoutRoutes')
const userRoutes = require('./routes/userRoutes')
const validationErrorHandler = require('./middleware/validationErrorHandler')
const authenticate = require('./middleware/authenticate')
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const path = require('path');
const cors = require('cors');
const fs = require('fs');


app.use(cors());
//middlewares for parsing and logging requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(validationErrorHandler)
app.use(cookieParser());
// Your routes go here


app.use('/workout', authenticate, workoutRoutes)
app.use('/signin', userRoutes)
app.use('/auth',authRoutes)

fs.stat(path.join(__dirname, "../frontend/dist/index.html"), (err, stats) => {
    if (err) {
        console.error("Error accessing file at startup:", err);
    } else {
        console.log("File access at startup:", stats);
    }
});
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
console.log("Attempting to serve index.html");
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
console.log("index.html served");
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message });
});
// Start the server
setTimeout(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}, 10000);
