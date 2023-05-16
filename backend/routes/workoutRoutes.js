const express = require("express");
const router = express.Router();
const authenticate = require('../middleware/authenticate')
const { dashboardController, calendarController, personalBestsController,getExerciseSummary } = require('../prisma/controllers/page_controllers/pageIndex')
const { createGoal, updateGoal, deleteGoal, getGoal, getGoals, updateSubgoal} = require('../prisma/controllers/goal_CRUD/goalCRUDIndex')
const {
  createWorkout,
  updateWorkout,
  deleteWorkout,
  getWorkout,
  getWorkouts,
  getWorkoutByDate
} = require("../prisma/controllers/workout_CRUD/workoutCRUDIndex");
const getExercise = require("../prisma/controllers/exercise_controllers/getExercise")

//getting data based on pages
router.get("/", dashboardController)
router.get("/calendar", calendarController)
router.get("/personal-bests", personalBestsController)
router.get("/getExerciseSummary", getExerciseSummary);


//getting goals
router.get("/goals", getGoals);
router.get("/goals/:id", getGoal);
router.post("/goals/", createGoal);
router.put("/goals/:id", updateGoal);
router.delete("/goals/:id", deleteGoal);
router.put("/goals/:goalId/subgoals/:subgoalId", updateSubgoal);

//getting individual workout data
router.get("/:id", getWorkout);
router.get("/date/:date",getWorkoutByDate)
router.post("/", createWorkout);
router.put("/:id",updateWorkout)
router.delete("/:id", deleteWorkout);

router.get("/exercises/:exerciseName", getExercise);


module.exports = router;