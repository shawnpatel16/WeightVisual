const Workout = require("../models/workoutModel");
const Exercise = require("../models/exerciseModel")
const mongoose = require("mongoose");
const asyncHandler = require('express-async-handler');
const moment = require('moment')
//@desc: Get workout information for homepage
//@route: /
const getWorkoutsSummary = asyncHandler(async(req,res) => {
    const totalWorkouts = await Workout.countDocuments({})
    const oldestWorkout = await Workout.findOne().sort({ createdAt: 1 }).limit(1);
    const oldestWorkoutDate = oldestWorkout.createdAt;
    const currentDate = new Date();
    const duration = moment.duration(moment(currentDate).diff(moment(oldestWorkoutDate)))
    const weeksPassed = Math.floor(duration.asWeeks());
    const weeklyAverage = weeksPassed > 0 ? totalWorkouts / weeksPassed : totalWorkouts;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const workouts = await Workout.find().sort({ date: -1 }).skip((page - 1) * limit).limit(limit);
    res.status(200).json({totalWorkouts, weeklyAverage, workouts})
})

const getAllWorkouts = asyncHandler(async (req, res) => {
    const workouts = await Workout.find({}, 'split date _id').exec();
    res.status(200).json(workouts)
 });

const getPersonalBests = asyncHandler(async (req, res) => {
  const exercises = await Exercise.find({});

  if (req.query.search) {
    const searchQuery = req.query.search;
    const filteredExercises = exercises.filter((exercise) =>
      exercise.exerciseName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    res.status(200).json(filteredExercises);
  } else {
    res.status(200).json(exercises);
  }
});


const getWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  res.status(200).json(workout);
});

const createWorkout = asyncHandler(async (req, res) => {
  const workout = new Workout(req.body);
  await workout.save();
  res.status(201).json(workout);
});
const updateWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(workout);
});

const deleteWorkout = asyncHandler(async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Workout deleted" });
});

module.exports = {
  getWorkoutsSummary,
  getAllWorkouts,
  getPersonalBests,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}