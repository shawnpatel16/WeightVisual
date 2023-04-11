const Workout = require("../models/workoutModel");
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

const getPersonalBests = asyncHandler(async (req, res) => { });

const getProgress = asyncHandler(async (req, res) => { });

const getWorkout = asyncHandler(async (req, res) => { });

const createWorkout = asyncHandler(async (req, res) => { });

const updateWorkout = asyncHandler(async (req, res) => { });

const deleteWorkout = asyncHandler(async (req, res) => {});