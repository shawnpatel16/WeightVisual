const asyncHandler = require("express-async-handler");
const moment = require("moment");
const prisma = require("../../prismaClient");


const deleteWorkout = asyncHandler(async (req, res) => {
  const deletedWorkout = await prisma.workouts.delete({
    where: { workoutId: parseInt(req.params.workoutId), userId: req.user.id },
  });
  res.status(200).json({ message: "Workout successfully deleted" });
});

module.exports = deleteWorkout;