const asyncHandler = require("express-async-handler");
const moment = require("moment");
const prisma = require("../../prismaClient");

const getAllWorkouts = asyncHandler(async (req, res) => {
  const workouts = await prisma.workouts.findMany({
    where: { userId: req.user.id },
    select: {
      split: true,
      date: true,
      workoutId: true,
      exercises: {
        select: {
          exerciseId: true,
          exerciseName: true,
          exerciseSets: {
            select: {
              setId: true,
              weight: true,
              reps: true,
              volume: true,
              date: true,
            },
          },
        },
      },
    },
  });
  res.status(200).json({ workouts });
});

module.exports = getAllWorkouts;
