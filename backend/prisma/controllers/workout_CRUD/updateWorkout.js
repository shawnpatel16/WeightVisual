const asyncHandler = require("express-async-handler");
const moment = require("moment");
const prisma = require("../../prismaClient");

const updateWorkout = asyncHandler(async (req, res) => {
  const updatedWorkout = await prisma.workouts.update({
    where: { workoutId: parseInt(req.params.workoutId), userId: req.user.id },
    data: {
      title: req.body.title,
      date: req.body.date,
      exercises: {
        upsert: req.body.exercises.map((exercise) => ({
          where: { exerciseId: exercise.exerciseId },
          update: {
            name: exercise.name,
            exerciseSets: {
              upsert: exercise.exerciseSets.map((exerciseSet) => ({
                where: { setId: exerciseSet.setId },
                update: { weight: exerciseSet.weight, reps: exerciseSet.reps },
                create: { weight: exerciseSet.weight, reps: exerciseSet.reps },
              })),
            },
          },
          create: {
            name: exercise.name,
            exerciseSets: { create: exercise.exerciseSets },
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
  res.status(200).json({ updatedWorkout });
});

module.exports = updateWorkout;