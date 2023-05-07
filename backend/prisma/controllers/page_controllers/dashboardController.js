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
    const currentDate = moment.utc(new Date());
    const oldestWorkoutDate = moment.utc(oldestWorkout.date);
    
    const weeksPassed = currentDate.diff(oldestWorkoutDate,'weeks')
    
    const weeklyAverage = weeksPassed > 0 ? totalWorkouts / weeksPassed : totalWorkouts;

    return parseFloat(weeklyAverage.toFixed(2));
  } catch (error) {
    console.error('Error calculating weekly average workouts:', error);
    throw error;
  }
};

const getPaginatedWorkouts = async (userId, page, limit) => {
  try {
    const workouts = await prisma.workouts.findMany({
      where: { userId: userId },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { date: "desc" },
      select: {
        split: true,
        date: true,
        workoutId: true,
        exercises: {
          select: {
            exerciseId: true,
            exerciseName: true,
            exerciseSets: {
              select: {
                setId: true,
                weight: true,
                reps: true,
                volume: true,
                date: true,
              },
            },
          },
        },
      },
    });
    console.log(workouts)
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

const getAllWorkouts = async (userId) => {
  try {
    const workouts = await prisma.workouts.findMany({
    where: { userId: userId },
    include: { exercises: true },
    orderBy: { date: "desc" },
    });
    return workouts
  } catch (error) {
    console.error('Error getting all workouts:', error)
  }
}

const getWorkoutsSummary = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;

  const limit = parseInt(req.query.limit) || 10;
  
    const totalWorkouts = await getTotalWorkoutsForUser(req.user.id);
    const weeklyAverageWorkouts = await getWeeklyAverageWorkouts(req.user.id);
  const paginatedWorkouts = await getPaginatedWorkouts(req.user.id, page, limit);
  const topThreeGoals = await getTopThreeGoals(req.user.id)
  const allWorkouts = await getAllWorkouts(req.user.id)
  const totalPages = Math.ceil(totalWorkouts / 10);
    const dashboardData = {
      totalWorkouts,
      weeklyAverageWorkouts,
      paginatedWorkouts,
      topThreeGoals, 
      allWorkouts,
      totalPages
    };

  res.status(200).json({ dashboardData });
})
 
module.exports = getWorkoutsSummary