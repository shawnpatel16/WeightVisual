const express = require("express");
const router = express.Router();

//getting data based on pages
router.get("/", getWorkoutsSummary)
router.get("/calendar", getAllWorkouts)
router.get("/personal-bests", getPersonalBests)


//getting individual workout data
router.get("/:id", getWorkout);
router.post("/", createWorkout);
router.put("/:id",updateWorkout)
router.delete("/:id", deleteWorkout);

module.exports = router;