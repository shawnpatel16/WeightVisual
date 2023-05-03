const asyncHandler = require("express-async-handler");
const moment = require("moment");
const prisma = require("../../prismaClient");

const createWorkout = asyncHandler(async (req, res) => {
  const newWorkout = await prisma.workouts.create({
    data: {
      title: req.body.title,
      date: req.body.date,
      userId: req.user.id,
      exercises: {
        create: req.body.exercises.map((exercise) => ({
          name: exercise.name,
          exerciseSets: {
            create: exercise.exerciseSets,
          },
        })),
      },
    },
    include: {
      exercises: {
        include: { exerciseSets: true },
      },
    },
  });
  res.status(200).json({ newWorkout });
});

module.exports = createWorkout;