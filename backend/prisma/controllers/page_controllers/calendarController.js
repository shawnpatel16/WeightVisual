const asyncHandler = require("express-async-handler");
const moment = require("moment");
const prisma = require("../../prismaClient");


const getAllWorkouts = asyncHandler(async (req, res) => {
    const workouts = await prisma.workouts.findMany({
      where: { userId: req.user.id },
      select: {
        split: true,
        date: true,
        id: true,
      },
    });
  res.status(200).json({ workouts });
})

module.exports = getAllWorkouts;