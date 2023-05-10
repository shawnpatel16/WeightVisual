const asyncHandler = require("express-async-handler");
const moment = require("moment");
const prisma = require("../../prismaClient");

const createWorkout = asyncHandler(async (req, res) => {
  const { userId, date, split, workoutProgressMade, exercises } = req.body;

  const workout = await prisma.workouts.create({
    data: {
      date,
      split,
      workoutProgressMade,
      userId,
      exercises: {
        create: exercises.map((exercise) => ({
          exerciseName: exercise.exerciseName,
          exerciseProgressMade: exercise.exerciseProgressMade,
          exerciseSets: {
            create: exercise.exerciseSets.map((set) => ({
              weight: set.weight,
              reps: set.reps,
              volume: set.weight * set.reps,
              date: date,
            })),
          },
        })),
      },
    },
  });

  res
    .status(201)
    .json({ workout });
});

module.exports = createWorkout;