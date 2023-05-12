asyncHandler = require("express-async-handler");
const moment = require("moment");
const prisma = require("../../prismaClient");

const getExerciseSummary = asyncHandler(async (req, res) => {
  const userId = req.user.id; // Assuming you have user information in the request
  const limit = parseInt(req.query.limit) || 20;
  const page = parseInt(req.query.page) || 1;
  const offset = limit * (page - 1);

  // Get exercises for the user with pagination
  const exercises = await prisma.exercises.findMany({
    where: { userId },
    skip: offset,
    include: {
      exerciseSets: true,
    },
  });

  const summary = {};
  const uniqueExercises = Array.from(
    exercises
      .reduce((map, obj) => map.set(obj.exerciseName, obj), new Map())
      .values()
  );

  // Perform pagination
  const paginatedExercises = uniqueExercises.slice(offset, offset + limit);
  paginatedExercises.forEach((exercise) => {
    const name = exercise.exerciseName;
    // Sort exercise sets by date in descending order
    const sets = exercise.exerciseSets.sort((a, b) => b.date - a.date);
    sets.forEach((set) => {
      if (!summary[name]) {
        summary[name] = {
          highestWeight: set.weight,
          highestVolume: set.volume,
          topSet: set,
        };
      } else {
        if (set.weight > summary[name].highestWeight) {
          summary[name].highestWeight = set.weight;
        }
        if (set.volume > summary[name].highestVolume) {
          summary[name].highestVolume = set.volume;
        }
        // Assuming the sets are sorted by date, the most recent set will overwrite the topSet
        summary[name].topSet = set;
      }
    });
  });

  const exerciseSummaries = Object.keys(summary).map((name) => ({
    exerciseName: name,
    highestWeight: summary[name].highestWeight,
    highestVolume: summary[name].highestVolume,
    topSet: {
      weight: summary[name].topSet.weight,
      reps: summary[name].topSet.reps,
    },
  }));

  res.json(exerciseSummaries);
});

module.exports = getExerciseSummary;
