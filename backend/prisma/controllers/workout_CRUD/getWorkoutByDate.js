const asyncHandler = require("express-async-handler");
const moment = require("moment");
const prisma = require("../../prismaClient");

const getWorkout = asyncHandler(async (req, res) => {
  console.log(req.params.date)
  const parsedDate = new Date(req.params.date);
  const workout = await prisma.workouts.findFirst({
    where: { date: parsedDate, userId: req.user.id },
    select: {
      split: true,
      date: true,
      workoutId: true,
      workoutProgressMade: true,
      exercises: {
        select: {
          exerciseId: true,
          exerciseName: true,
          exerciseProgressMade: true,
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

    res.status(200).json({ workout });

});

module.exports = getWorkout;
