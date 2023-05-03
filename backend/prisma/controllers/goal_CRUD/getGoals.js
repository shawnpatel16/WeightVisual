const asyncHandler = require("express-async-handler");
const moment = require("moment");
const prisma = require("../../prismaClient");


const asyncHandler = require("express-async-handler");
const prisma = require("../../prismaClient");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await prisma.goals.findMany({
    where: { userId: req.user.id },
    include: { subgoals: true },
  });
  res.status(200).json({ goals });
});

module.exports = getGoals;