const asyncHandler = require("express-async-handler");
const prisma = require("../../prismaClient");

const deleteGoal = asyncHandler(async (req, res) => {
  console.log(req.params)
  const deletedGoal = await prisma.goals.delete({
    where: { goalId: parseInt(req.params.id), userId: req.user.id },
  });
  res.status(200).json({ message: "Goal successfully deleted" });
});

module.exports = deleteGoal;
