const asyncHandler = require("express-async-handler");
const moment = require("moment");
const prisma = require("../../prismaClient");


const getPersonalBestsData = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  // 1. Best set (highest volume) for each exercise
  const bestSets = await prisma.exerciseSets.groupBy({
    by: ["exerciseId"],
    _max: {
      volume: true,
    },
    where: {
      exercises: {
        workouts: {
          userId: userId,
        },
      },
    },
  });

  // 2. Volume trend data for each exercise (volume and date)
  const volumeTrends = await prisma.exerciseSets.findMany({
    where: {
      exercises: {
        workouts: {
          userId: userId,
        },
      },
    },
    select: {
      volume: true,
      date: true,
      exerciseId: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  // 3. Workout progress trend (date and progress made)
  const workoutProgressTrends = await prisma.workouts.findMany({
    where: {
      userId: userId,
    },
    select: {
      date: true,
      workoutProgressMade: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  // 4. Exercise progress trend (date and progress made)
  const exerciseProgressTrends = await prisma.exercises.findMany({
    where: {
      workouts: {
        userId: userId,
      },
    },
    select: {
      exerciseProgressMade: true,
      workouts: {
        select: {
          date: true,
        },
      },
    },
    orderBy: {
      workouts: {
        date: "asc",
      },
    },
  });

  // 5. Weight trend for each exercise (date and weight)
  const weightTrends = await prisma.exerciseSets.findMany({
    where: {
      exercises: {
        workouts: {
          userId: userId,
        },
      },
    },
    select: {
      weight: true,
      date: true,
      exerciseId: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  const personalBestsData = {
    bestSets,
    volumeTrends,
    workoutProgressTrends,
    exerciseProgressTrends,
    weightTrends,
  };

  res.status(200).json(personalBestsData);
});

module.exports = getPersonalBestsData;
