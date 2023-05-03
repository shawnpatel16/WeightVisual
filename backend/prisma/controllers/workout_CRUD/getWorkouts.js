const asyncHandler = require("express-async-handler");
const moment = require("moment");
const prisma = require("../../prismaClient");

const getWorkouts = asyncHandler(async (req, res) => {
  const workouts = await prisma.workouts.findMany({
    where: { userId: req.user.id },
    include: {
      exercises: {
        include: { exerciseSets: true },
      },
    },
  });
  res.status(200).json({ workouts });
});

module.exports = getWorkouts;