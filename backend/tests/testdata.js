const sampleWorkouts1 = [
  {
    date: new Date("2022-03-11T00:00:00Z"),
    split: "Chest and Triceps",
    exercises: [
      {
        name: "Bench Press",
        sets: [
          { weight: 135, reps: 10 },
          { weight: 185, reps: 8 },
          { weight: 225, reps: 6 },
        ],
      },
      {
        name: "Tricep Pushdowns",
        sets: [
          { weight: 50, reps: 10 },
          { weight: 60, reps: 8 },
          { weight: 70, reps: 6 },
        ],
      },
    ],
  },
  {
    date: new Date("2022-03-09T00:00:00Z"),
    split: "Back and Biceps",
    exercises: [
      {
        name: "Deadlifts",
        sets: [
          { weight: 225, reps: 10 },
          { weight: 315, reps: 8 },
          { weight: 365, reps: 6 },
        ],
      },
      {
        name: "Bicep Curls",
        sets: [
          { weight: 30, reps: 10 },
          { weight: 35, reps: 8 },
          { weight: 40, reps: 6 },
        ],
      },
    ],
  },
  {
    date: new Date("2022-03-01T00:00:00Z"),
    split: "Chest and Back",
    exercises: [
      {
        name: "Bench Press",
        sets: [
          { weight: 135, reps: 8 },
          { weight: 185, reps: 6 },
          { weight: 225, reps: 4 },
        ],
      },
      {
        name: "Pull-ups",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 8 },
          { weight: 0, reps: 6 },
        ],
      },
    ],
  },
  {
    date: new Date("2022-03-03T00:00:00Z"),
    split: "Legs",
    exercises: [
      {
        name: "Squats",
        sets: [
          { weight: 135, reps: 8 },
          { weight: 185, reps: 6 },
          { weight: 225, reps: 4 },
        ],
      },
      {
        name: "Lunges",
        sets: [
          { weight: 50, reps: 10 },
          { weight: 60, reps: 10 },
          { weight: 70, reps: 8 },
        ],
      },
    ],
  },
  {
    date: new Date("2022-03-05T00:00:00Z"),
    split: "Arms",
    exercises: [
      {
        name: "Bicep Curls",
        sets: [
          { weight: 25, reps: 10 },
          { weight: 30, reps: 8 },
          { weight: 35, reps: 6 },
        ],
      },
      {
        name: "Tricep Pushdowns",
        sets: [
          { weight: 40, reps: 10 },
          { weight: 50, reps: 8 },
          { weight: 60, reps: 6 },
        ],
      },
    ],
  },
];

const sampleWorkouts2 = {}

module.exports = { sampleWorkouts1, sampleWorkouts2 }