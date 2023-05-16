const asyncHandler = require("express-async-handler");
const prisma = require("../../prismaClient");

const updateSubgoal = asyncHandler(async (req, res) => {
  const { goalId, subgoalId } = req.params;
  console.log(req.body)
  const updatedSubgoal = await prisma.subgoals.update({
    where: { subgoalId: parseInt(subgoalId)},
    data: {
      completed: req.body.isCompleted,
    },
  });
  res.status(200).json({ updatedSubgoal });
});

module.exports = updateSubgoal
