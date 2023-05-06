const asyncHandler = require("express-async-handler");
const moment = require("moment");
const prisma = require("../../prismaClient");

const getTotalWorkoutsForUser = async (userId) => {
    const workouts = await prisma.workouts.findMany({
    where: { userId: userId },
  });

  return workouts.length;
  
}

const getWeeklyAverageWorkouts = async (userId) => {
  try {
    // Find the oldest workout
    const oldestWorkout = await prisma.workouts.findFirst({
      where: { userId: userId },
      orderBy: { date: 'asc' },
    });

    if (!oldestWorkout) {
      return 0;
    }

    // Calculate the weekly average
    const totalWorkouts = await getTotalWorkoutsForUser(userId);
    const currentDate = new Date();
    const oldestWorkoutDate = oldestWorkout.createdAt;
    const duration = moment.duration(moment(currentDate).diff(moment(oldestWorkoutDate)));
    const weeksPassed = Math.floor(duration.asWeeks());
    const weeklyAverage = weeksPassed > 0 ? totalWorkouts / weeksPassed : totalWorkouts;

    return weeklyAverage;
  } catch (error) {
    console.error('Error calculating weekly average workouts:', error);
    throw error;
  }
};

const getAllWorkouts = async (userId, page, limit) => {
  try {
    const workouts = await prisma.workouts.findMany({
      where: { userId: userId },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { date: "desc" },
    });

    return workouts;
  } catch (error) {
    console.error('Error getting all workouts with pagination:', error);
    throw error;
  }
};

const getTopThreeGoals = async (userId) => {
  try {
    const goals = await prisma.goals.findMany({
      where: { userId },
      take: 3,
      orderBy: { createdAt: 'asc' },
    });

    return goals;
  } catch (error) {
    console.error('Error getting top three goals:', error);
    throw error;
  }
};



const getWorkoutsSummary = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
    const totalWorkouts = await getTotalWorkoutsForUser(req.user.id);
    const weeklyAverageWorkouts = await getWeeklyAverageWorkouts(req.user.id);
    const allWorkouts = await getAllWorkouts(req.user.id, page, limit);
    const topThreeGoals = await getTopThreeGoals(req.user.id)
    const dashboardData = {
      totalWorkouts,
      weeklyAverageWorkouts,
      allWorkouts,
      topThreeGoals
    };

  res.status(200).json({ dashboardData });
})
 
module.exports = getWorkoutsSummary