const createWorkout = require("./createWorkout");
const getWorkouts = require("./getWorkouts");
const getWorkout = require("./getWorkout");
const updateWorkout = require("./updateWorkout");
const deleteWorkout = require("./deleteWorkout");
const getWorkoutByDate = require("./getWorkoutByDate")

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout,
  getWorkoutByDate
};
