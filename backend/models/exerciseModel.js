const mongoose = require("mongoose");

//each exercise should have a name, highest volume value (calculated by weight and reps for a single set),
// highest volume set corresponding to the highest volume value, and a list of objects that contain the
// highest volume set for every day

//Schema for highest volume set per exercise per day
const setSchema = new mongoose.Schema(
  {
    weight: Number,
    reps: Number,
    volume: Number,
    date: Date,
  },
  { _id: false }
);

//schema for each individual exercise containing the highest volume sets performed for that exercise
const exerciseSchema = new mongoose.Schema(
  {
    exerciseName: {
      type: String,
      required: true,
    },
    highestVolume: Number,
    highestVolumeSet: {
      weight: Number,
      reps: Number,
      date: Date,
    },
    sets: [setSchema],
  },
  { timestamps: true }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;
