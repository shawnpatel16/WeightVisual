asyncHandler = require("express-async-handler");
const moment = require("moment");
const prisma = require("../../prismaClient");

const calculateStartDate = (timeframe) => {
  const now = new Date();
  switch (timeframe) {
    case "weekly":
      now.setDate(now.getDate() - 7);
      break;
    case "monthly":
      now.setMonth(now.getMonth() - 1);
      break;
    case "3months":
      now.setMonth(now.getMonth() - 3);
      break;
    case "6months":
      now.setMonth(now.getMonth() - 6);
      break;
    case "yearly":
      now.setFullYear(now.getFullYear() - 1);
      break;
    case "5years":
      now.setFullYear(now.getFullYear() - 5);
      break;
    default:
      throw new Error("Invalid timeframe");
  }
  return now;
};
const getExercise = asyncHandler(async (req, res) => {
  const exerciseName = decodeURIComponent(req.params.exerciseName);
  const timeframe = req.query.timeframe;

  // Get the start date of the time frame
  const startDate = calculateStartDate(timeframe);
  console.log(startDate)
  // Get the exercise data
  const exerciseData = await prisma.exercises.findMany({
    where: {
      exerciseName: exerciseName,
    },
    include: {
      exerciseSets: {
        where: {
          date: {
            gte: startDate,
          },
        },
      },
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
