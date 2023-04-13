const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  // Add more properties for your workout model
  // For example: exercise, sets, reps, etc.
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
