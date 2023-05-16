const asyncHandler = require("express-async-handler");
const moment = require("moment");
const prisma = require("../../prismaClient");

const createGoal = asyncHandler(async(req,res)=> {
  const newGoal = await prisma.goals.create({
    data: {
      title: req.body.title,
          userId: req.user.id,
      completed: req.body.completed,
      subgoals: {
        create: req.body.subgoals,
      },
    },
  });
  res.status(200).json({newGoal})
});

module.exports = createGoal;