const prisma = require("../prismaClient");

const { faker } = require("@faker-js/faker");
const moment = require("moment");

const SPLIT_NAMES = [
  "Upper Body",
  "Lower Body",
  "Full Body",
  "Push",
  "Pull",
  "Legs",
  "Chest/Back",
  "Arms",
  "Legs/Shoulders",
];

const EXERCISE_NAMES = [
  "Bench Press",
  "Pull-ups",
  "Overhead Press",
  "Dumbbell Bench Press",
  "Dumbbell Row",
  "Dumbbell Overhead Press",
  "Dumbbell Curl",
  "Dumbbell Tricep Extension",
  "Lateral Raise",
  "Dumbbell Rear Delt Fly",
  "Dumbbell Shrug",
  "Dumbbell Pullover",
  "Dumbbell Skullcrusher",
  "Skullcrusher",
  "Hammer Curl",
  "Dumbbell Fly",
  "Dumbbell Incline Curl",
  "Lat Pulldown",
  "Cable Rows",
  "EZ Bar Curls",
  "Cable Tricep Extension",
  "Chin-ups",
  "Squat",
  "Deadlift",
  "Lunge",
  "Leg Press",
  "Leg Extension",
  "Leg Curl",
  "Calf Raise",
  "Romanian Deadlift",
  "Good Morning",
  "Leg Extensions",
];

GOALS = ["Eat pizza",
  "Sleep",
"Drink Water"]

async function main() {
  // Create a user
  await prisma.subgoals.deleteMany();
  await prisma.goals.deleteMany();
  await prisma.exerciseSets.deleteMany();
  await prisma.exercises.deleteMany();
  await prisma.workouts.deleteMany();
  
 const user = await prisma.users.findUnique({
   where: {
     email: "test@email.com",
   },
 });
  // Generate workouts
  const startDate = moment("2022-01-01");
  const endDate = moment("2023-06-05");

  for (
    let date = startDate;
    date.isSameOrBefore(endDate);
    date.add(1, "days")
  ) {
    // Randomly skip some dates
    if (Math.random() < 0.7) {
      continue;
    }

    const workout = await prisma.workouts.create({
      data: {
        date: date.toDate(),
        split: faker.helpers.arrayElement(SPLIT_NAMES),
        workoutProgressMade: faker.datatype.boolean(),
        userId: user.userId,
      },
    });

    const numExercises = faker.datatype.number({ min: 3, max: 10 });
    for (let i = 0; i < numExercises; i++) {
      const exercise = await prisma.exercises.create({
        data: {
          exerciseName: faker.helpers.arrayElement(EXERCISE_NAMES),
          exerciseProgressMade: faker.datatype.boolean(),
          workoutId: workout.workoutId,
        },
      });

      const numSets = faker.datatype.number({ min: 1, max: 5 });
      for (let j = 0; j < numSets; j++) {
        await prisma.exerciseSets.create({
          data: {
            weight: faker.datatype.number({ min: 10, max: 300 }),
            reps: faker.datatype.number({ min: 1, max: 30 }),
            volume: faker.datatype.number({ min: 10, max: 100 }),
            date: date.toDate(),
            exerciseId: exercise.exerciseId,
          },
        });
      }
    }
  }

  // Generate goals
  const numGoals = faker.datatype.number({ min: 5, max: 20 });
  for (let i = 0; i < numGoals; i++) {
    const goal = await prisma.goals.create({
      data: {
        title: faker.helpers.arrayElement(GOALS),
        completed: faker.datatype.boolean(),
        userId: user.userId,
      },
    });

    const numSubgoals = faker.datatype.number({ min: 1, max: 5 });
    for (let j = 0; j < numSubgoals; j++) {
      await prisma.subgoals.create({
        data: {
          description: faker.helpers.arrayElement(GOALS),
          completed: faker.datatype.boolean(),
          goalId: goal.goalId,
        },
      });
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
