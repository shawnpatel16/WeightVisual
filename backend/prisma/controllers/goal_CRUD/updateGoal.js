const asyncHandler = require("express-async-handler");
const prisma = require("../../prismaClient");

const updateGoal = asyncHandler(async (req, res) => {
  const updatedGoal = await prisma.goals.update({
    where: { goalId: parseInt(req.params.goalId), userId: req.user.id },
    data: {
      title: req.body.title,
      completed: req.body.completed,
      subgoals: {
        upsert: req.body.subgoals.map((subgoal) => ({
          where: { subgoalId: subgoal.subgoalId },
          update: {
            description: subgoal.description,
            completed: subgoal.completed,
          },
          create: {
            description: subgoal.description,
            completed: subgoal.completed,
          },
        })),
      },
    },
    include: { subgoals: true },
  });
  res.status(200).json({ updatedGoal });
});

module.exports = updateGoal;
