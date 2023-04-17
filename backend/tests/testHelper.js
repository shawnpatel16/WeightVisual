const mongoose = require("mongoose");
const Workout = require("../models/workoutModel")
const Exercise = require("../models/exerciseModel");

async function updateExercisesForTest(newWorkout) {
  for (const exercise of newWorkout.exercises) {
    //get the current information for the exercise
    const existingExerciseRecord = await Exercise.findOne({
      exerciseName: exercise.name,
      "sets.date": newWorkout.date,
    });
    //if the exercise exists, then for the current entry's sets, calculate the highest volume to add it to the document
    if (existingExerciseRecord) {
      const entryHighestVolumeSet = exercise.sets.reduce(
        (maxSet, currentSet) => {
          const currentVolume = currentSet.weight * currentSet.reps;
          const maxVolume = maxSet.weight * maxSet.reps;
          return currentVolume > maxVolume ? currentSet : maxSet;
        }
      );

      const newVolume =
        entryHighestVolumeSet.weight * entryHighestVolumeSet.reps;
      const existingVolume = existingExerciseRecord.highestVolume;

      if (newVolume > existingVolume) {
        //get the id of the existing exercise to update it
        const filter = { _id: existingExerciseRecord._id };
        //update both the highest volume attribute and the highest volume set
        const update = {
          $set: {
            highestVolume: newVolume,
            highestVolumeSet: entryHighestVolumeSet,
          },
          $addToSet: {
            sets: {
              weight: entryHighestVolumeSet.weight,
              reps: entryHighestVolumeSet.reps,
              volume: newVolume,
              date: newWorkout.date,
            },
          },
        };
        const options = { new: true };
        const updatedExerciseRecord = await Exercise.findOneAndUpdate(
          filter,
          update,
          options
        );
      } else {
        const filter = { _id: existingExerciseRecord._id };
        const update = {
          $addToSet: {
            sets: {
              weight: entryHighestVolumeSet.weight,
              reps: entryHighestVolumeSet.reps,
              volume: newVolume,
              date: newWorkout.date,
            },
          },
        };
        await Exercise.findOneAndUpdate(filter, update);
      }
    } else {
      const newhighestVolumeSet = exercise.sets.reduce((maxSet, currentSet) => {
        const currentVolume = currentSet.weight * currentSet.reps;
        const maxVolume = maxSet.weight * maxSet.reps;
        return currentVolume > maxVolume ? currentSet : maxSet;
      });
      const newExercise = new Exercise({
        exerciseName: exercise.name,
        sets: exercise.sets.map((set) => ({
          ...set,
          date: newWorkout.date,
        })),
        highestVolume: newhighestVolumeSet.weight * newhighestVolumeSet.reps,
        highestVolumeSet: {
          ...newhighestVolumeSet,
          date: newWorkout.date,
        },
      });

      // Save the new Exercise document
      await newExercise.save();
    }
  }
    
    
}

module.exports = {
  async clear() {
    await Workout.deleteMany({});
    await Exercise.deleteMany({});
  },

  async save(workouts) {
    for (const workout of workouts) {
      const newWorkout = new Workout(workout);
      await newWorkout.save();
      await updateExercisesForTest(newWorkout);
    }
  },

  // You can add other methods as needed for your tests
};