const { faker } = require("@faker-js/faker");


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateWorkout() {
  const workout = {
    date: faker.date.recent(),
    split: faker.helpers.arrayElement([
      "Chest and Back",
      "Arms",
      "Legs",
    ]),
    exercises: [],
  };

  const numExercises = getRandomInt(1, 5);
  for (let i = 0; i < numExercises; i++) {
    workout.exercises.push(generateExercise());
  }

  return workout;
}

function generateExercise() {
  const exercise = {
    name: faker.random.word(),
    sets: [],
  };

  const numSets = getRandomInt(1, 5);
  for (let i = 0; i < numSets; i++) {
    exercise.sets.push(generateSet());
  }

  return exercise;
}

function generateSet() {
  return {
    reps: getRandomInt(1, 12),
    weight: getRandomInt(10, 300),
    date: faker.date.recent().toISOString(),
  };
}

const randomSampleWorkouts = [];
for (let i = 0; i < 20; i++) {
  randomSampleWorkouts.push(generateWorkout());
}

module.exports = randomSampleWorkouts