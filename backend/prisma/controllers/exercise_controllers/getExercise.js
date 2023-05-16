asyncHandler = require("express-async-handler");
const moment = require("moment");
const prisma = require("../../prismaClient");


const getExercise = asyncHandler(async (req, res) => {
  const exerciseName = decodeURIComponent(req.params.exerciseName);

  const exerciseData = await prisma.exercises.findMany({
    where: {
      exerciseName: exerciseName,
    },
    include: {
      exerciseSets: true,
    },
  });

  // Sort exerciseSets by date for each exercise, find set with max weight and volume, and transform the data
  const transformedData = exerciseData
    .map((exercise) => {
      exercise.exerciseSets.sort((a, b) => new Date(a.date) - new Date(b.date));
      const dateGroupedExerciseSets = {};

      exercise.exerciseSets.forEach((set) => {
        if (
          !dateGroupedExerciseSets[set.date] ||
          set.weight > dateGroupedExerciseSets[set.date].weight ||
          set.volume > dateGroupedExerciseSets[set.date].volume
        ) {
          dateGroupedExerciseSets[set.date] = set;
        }
      });

      return Object.values(dateGroupedExerciseSets).map((set) => ({
        date: set.date,
        weight: set.weight,
        volume: set.volume,
        reps: set.reps,
        progressMade: exercise.exerciseProgressMade,
      }));
    })
    .flat(); // Flatten the array of arrays to a single array

  res.status(200).json({ transformedData });
});

module.exports = getExercise; 