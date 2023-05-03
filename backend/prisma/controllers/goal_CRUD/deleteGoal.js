const asyncHandler = require("express-async-handler");
const prisma = require("../../prismaClient");

const deleteGoal = asyncHandler(async (req, res) => {
  const deletedGoal = await prisma.goals.delete({
    where: { goalId: parseInt(req.params.goalId), userId: req.user.id },
  });
  res.status(200).json({ message: "Goal successfully deleted" });
});

module.exports = deleteGoal;
