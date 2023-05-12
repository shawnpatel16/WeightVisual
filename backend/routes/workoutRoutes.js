const express = require("express");
const router = express.Router();
const authenticate = require('../middleware/authenticate')
const { dashboardController, calendarController, personalBestsController,getExerciseSummary } = require('../prisma/controllers/page_controllers/pageIndex')
const { createGoal, updateGoal, deleteGoal, getGoal, getGoals } = require('../prisma/controllers/goal_CRUD/goalCRUDIndex')
const {
  createWorkout,
  updateWorkout,
  deleteWorkout,
  getWorkout,
  getWorkouts,
  getWorkoutByDate
} = require("../prisma/controllers/workout_CRUD/workoutCRUDIndex");


//getting data based on pages
router.get("/", dashboardController)
router.get("/calendar", calendarController)
router.get("/personal-bests", personalBestsController)
router.get("/getExerciseSummary", getExerciseSummary);


//getting goals
router.get("/goals", getGoals);
router.get("/goal/:id", getGoal);
router.post("/goal/", createGoal);
router.put("/goal/:id", updateGoal);
router.delete("goal/:id", deleteGoal);

//getting individual workout data
router.get("/:id", getWorkout);
router.get("/date/:date",getWorkoutByDate)
router.post("/", createWorkout);
router.put("/:id",updateWorkout)
router.delete("/:id", deleteWorkout);



module.exports = router;