const mongoose = require("mongoose");

const SubGoalSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const GoalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subgoals: [SubGoalSchema],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Goal", GoalSchema);
