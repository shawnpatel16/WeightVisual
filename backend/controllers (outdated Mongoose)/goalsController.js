const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const moment = require("moment");
const Goal = require("../models (outdated mongoose)/goalsModel")

const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({})
    res.status(200).json({goals})

})
const getGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    res.status(200).json({goal})
})
const createGoal = asyncHandler(async (req, res) => {
    const newGoal = new Goal(req.body)
    await newGoal.save();
    res.status(201).json(newGoal);
})
const updateGoal = asyncHandler(async (req, res) => {
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedGoal) {
      res.status(404).send(new Error("Goal not found"));
    }
    res.status(200).json({updatedGoal})
})
const deleteGoal = asyncHandler(async (req, res) => {
    const goalToDelete = await Goal.findByIdAndDelete(req.params.id)
    if (!goalToDelete) {
        res.status(404).send(new Error("Goal not found"));
    }
    res.status(200).json({message: "Goal successfully deleted"})
});

module.exports = {
    getGoals,
    getGoal,
    createGoal,
    updateGoal,
    deleteGoal
}