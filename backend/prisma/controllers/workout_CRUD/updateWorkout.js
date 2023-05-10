const asyncHandler = require("express-async-handler");
const moment = require("moment");
const prisma = require("../../prismaClient");

const updateWorkout = asyncHandler(async (req, res) => {
  const updatedWorkout = await prisma.workouts.update({
    where: { workoutId: parseInt(req.params.id), userId: req.user.id },
    data: {
      split: req.body.split,
      date: req.body.date,
      workoutProgressMade: req.body.workoutProgressMade,
      exercises: {
        upsert: req.body.exercises.map((exercise) => ({
          where: { exerciseId: exercise.exerciseId },
          update: {
            exerciseName: exercise.exerciseName,
            exerciseProgressMade: exercise.exerciseProgressMade,
            exerciseSets: {
              upsert: exercise.exerciseSets.map((exerciseSet) => ({
                where: { setId: exerciseSet.setId },
                update: {
                  weight: exerciseSet.weight,
                  reps: exerciseSet.reps,
                  volume: exerciseSet.weight * exerciseSet.reps, // Calculate the volume
                  date: req.body.date, // Set the date for each exercise set
                },
                create: {
                  weight: exerciseSet.weight,
                  reps: exerciseSet.reps,
                  volume: exerciseSet.weight * exerciseSet.reps, // Calculate the volume
                  date: req.body.date, // Set the date for each exercise set
                },
              })),
            },
          },
          create: {
            exerciseName: exercise.exerciseName,
            exerciseProgressMade: exercise.exerciseProgressMade,
            exerciseSets: {
              create: exercise.exerciseSets.map((exerciseSet) => ({
                weight: exerciseSet.weight,
                reps: exerciseSet.reps,
                volume: exerciseSet.weight * exerciseSet.reps, // Calculate the volume
                date: req.body.date, // Set the date for each exercise set
              })),
            },
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
