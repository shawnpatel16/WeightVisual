const mongoose = require("mongoose");

//each workout should have a date, split name, and a list of exercises
//the list of exercises will be a list of objects with a name and a list of sets
//each set will have a weight and reps associated with it
const setSchema = new mongoose.Schema({
  weight: Number,
  reps: Number,
},{_id:false});

const exerciseSchema = new mongoose.Schema({
  name: String,
  sets: [setSchema],
  progressMade: Boolean,
});

const workoutSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  split: String,
  exercises: [exerciseSchema],
  progressMade: Boolean
},{timestamps:true})

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
