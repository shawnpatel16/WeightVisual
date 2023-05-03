const asyncHandler = require("express-async-handler");
const prisma = require("../../prismaClient");

const getGoal = asyncHandler(async (req, res) => {
  const goal = await prisma.goals.findFirst({
    where: { goalId: parseInt(req.params.goalId), userId: req.user.id },
    include: { subgoals: true },
  });
  res.status(200).json({ goal });
});


module.exports = getGoal;
