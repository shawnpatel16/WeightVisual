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

function generateExerciseSample() {
  const exerciseName = faker.random.word();
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
for (let i = 0; i < 20; i++) {
  randomSampleExercises.push(generateExerciseSample());
}

module.exports = randomSampleExercises;
