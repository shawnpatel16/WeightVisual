const { faker } = require("@faker-js/faker");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function generateSetSample() {
  const weight = getRandomInt(10, 300);
  const reps = getRandomInt(1, 12);
  const volume = weight * reps;

  return {
    weight,
    reps,
    volume,
    date: faker.date.recent().toISOString(),
  };
}

function generateExerciseSample(exerciseName) {
  const sets = [];

  for (let i = 0; i < getRandomInt(1, 5); i++) {
    sets.push(generateSetSample());
  }

  const highestVolumeSet = sets.reduce((prev, current) =>
    prev.volume > current.volume ? prev : current
  );

  return {
    exerciseName,
    highestVolume: highestVolumeSet.volume,
    highestVolumeSet: {
      weight: highestVolumeSet.weight,
      reps: highestVolumeSet.reps,
      date: highestVolumeSet.date,
    },
    sets,
  };
}

const randomSampleExercises = [];
const exerciseNames = new Set();
const desiredNumberOfExercises = 20;

while (exerciseNames.size < desiredNumberOfExercises) {
  const newExerciseName = faker.random.word();

  // Only add the exercise if its name hasn't been generated before
  if (!exerciseNames.has(newExerciseName)) {
    exerciseNames.add(newExerciseName);

    const newExercise = generateExerciseSample(newExerciseName);
    randomSampleExercises.push(newExercise);
  }
}


module.exports = randomSampleExercises;
