const asyncHandler = require("express-async-handler");
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

const getChartData = asyncHandler(async (req, res) => {
  const { timeframe, split } = req.query;
  const userId = req.user.id;

  let startDate;
  try {
    startDate = calculateStartDate(timeframe);
  } catch (error) {
    // Handle the case when timeframe is not one of the expected values
    console.error(error);
    startDate = new Date(0); // Set startDate to the earliest possible date
  }

  // Find the first workout
  const firstWorkout = await prisma.workouts.findFirst({
    where: { userId: userId },
    orderBy: { date: "asc" },
  });

  // If there are no workouts in the selected timeframe, use the date of the first workout
  if (firstWorkout && firstWorkout.date > startDate) {
    startDate = firstWorkout.date;
  }

  const workouts = await prisma.workouts.findMany({
    where: {
      AND: [{ date: { gte: startDate } }, { userId: userId }, { split: split }],
    },
    include: {
      exercises: {
        select: {
          exerciseName: true,
          exerciseSets: {
            select: {
              weight: true,
              date: true,
            },
            orderBy: {
              weight: "desc",
            },
            take: 1,
          },
        },
      },
    },
  });

  res.json(workouts);
});



const personalBestsController = getChartData

module.exports = personalBestsController