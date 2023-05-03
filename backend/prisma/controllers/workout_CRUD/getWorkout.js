const asyncHandler = require("express-async-handler");
const moment = require("moment");
const prisma = require("../../prismaClient");


const getWorkout = asyncHandler(async (req, res) => {
  const workout = await prisma.workouts.findFirst({
    where: { workoutId: parseInt(req.params.workoutId), userId: req.user.id },
    include: {
      exercises: {
        include: { exerciseSets: true },
      },
    },
  });
  res.status(200).json({ workout });
});

module.exports = getWorkout;