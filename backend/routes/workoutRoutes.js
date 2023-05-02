const express = require("express");
const router = express.Router();
const {
    getWorkoutsSummary,
  getAllWorkouts,
  getPersonalBests,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require('../controllers/workoutController')
const {getGoals, getGoal, updateGoal, deleteGoal, createGoal} = require('../controllers/goalsController')
//getting data based on pages
router.get("/", getWorkoutsSummary)
router.get("/calendar", getAllWorkouts)
router.get("/personal-bests", getPersonalBests)

//getting goals
router.get("/goals", getGoals);
router.get("/goal/:id", getGoal);
router.post("/goal/", createGoal);
router.put("/goal/:id", updateGoal);
router.delete("goal/:id", deleteGoal);

//getting individual workout data
router.get("/:id", getWorkout);
router.post("/", createWorkout);
router.put("/:id",updateWorkout)
router.delete("/:id", deleteWorkout);



module.exports = router;