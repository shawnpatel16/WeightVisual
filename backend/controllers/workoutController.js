const Workout = require("../models/workoutModel");
const Exercise = require("../models/exerciseModel");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const moment = require("moment");
//@desc: Get workout information for homepage
//@route: /
//@inputs: get current page number to see which exercises need to be displayed
//@return: total number of workouts, weekly average number of workouts, and 10 workouts per page
const getWorkoutsSummary = asyncHandler(async (req, res) => {
  const totalWorkouts = await Workout.countDocuments({});
  const oldestWorkout = await Workout.findOne().sort({ createdAt: 1 }).limit(1);
  const currentDate = new Date();
  let weeklyAverage = totalWorkouts;
  if (oldestWorkout) {
    const oldestWorkoutDate = oldestWorkout.createdAt;
    const duration = moment.duration(
      moment(currentDate).diff(moment(oldestWorkoutDate))
    );
    const weeksPassed = Math.floor(duration.asWeeks());
    const weeklyAverage =
      weeksPassed > 0 ? totalWorkouts / weeksPassed : totalWorkouts;
  }
  const page = parseInt(req.query.page) || 1;
  console.log("Page:", page);
  const limit = parseInt(req.query.limit) || 10;
  const workouts = await Workout.find()
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  console.log(totalWorkouts)
  res.status(200).json({ totalWorkouts, weeklyAverage, workouts });
});
//@desc: get all workouts
//@route: /calendar
//@input: None
//@output: return the split name,date, id of all workouts
const getAllWorkouts = asyncHandler(async (req, res) => {
  const workouts = await Workout.find({}, "split date _id").exec();
  res.status(200).json({ workouts });
});

//@desc: get all individual exerices or filtered exercises (not workouts but rather each individual exercise)
//@route: /personal-bests
//@input: search input
//@output: all exercises or filtered exercises

const getPersonalBests = asyncHandler(async (req, res) => {
  const exercises = await Exercise.find({});
  console.log(req.query)
  if (Object.keys(req.query).length !== 0) {
    const searchQuery = req.query;
    const filteredExercises = exercises.filter((exercise) =>
      exercise.exerciseName.toLowerCase().includes(searchQuery.exerciseName.toLowerCase())
      
    );
    console.log(filteredExercises);
    res.status(200).json({ filteredExercises });
  } else {
    res.status(200).json({ exercises });
  }
});

//@desc: CRUD for each individual workout
//@route: /
//@input: req.params.id/req.body input form fields
//@output: individual workouts
const getWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  res.status(200).json({ workout });
});

const createWorkout = asyncHandler(async (req, res) => {
  const newWorkout = new Workout(req.body);
  await newWorkout.save();
  //iterate through each exercise to update exercise values
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
  res.status(201).json({ newWorkout });
});

const updateWorkout = asyncHandler(async (req, res) => {
  const updatedWorkout = await Workout.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  console.log(req.params.id)
  console.log(req.body)
  if (!updatedWorkout) {
    res.status(404).send(new Error("Workout not found"));
  }
  for (const exercise of updatedWorkout.exercises) {
    //get the current information for the exercise
    const existingExerciseRecord = await Exercise.findOne({
      exerciseName: exercise.name,
      "sets.date": updatedWorkout.date,
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
            "highestVolumeSet.weight": entryHighestVolumeSet.weight,
            "highestVolumeSet.reps": entryHighestVolumeSet.reps,
            "highestVolumeSet.volume": newVolume,
            "highestVolumeSet.date": updatedWorkout.date,
          },
          $addToSet: {
            sets: {
              weight: entryHighestVolumeSet.weight,
              reps: entryHighestVolumeSet.reps,
              volume: newVolume,
              date: updatedWorkout.date,
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
              date: updatedWorkout.date,
            },
          },
        };
        await Exercise.findOneAndUpdate(filter, update);
      }
    }
  }
  console.log(updatedWorkout)
  res.status(200).json({ updatedWorkout });
});

const deleteWorkout = asyncHandler(async (req, res) => {
  const workoutToDelete = await Workout.findById(req.params.id);
  if (!workoutToDelete) {
    res.status(404).send(new Error("Workout not found"));
  }

  for (const exercise of workoutToDelete.exercises) {
    const exerciseRecord = await Exercise.findOne({
      exerciseName: exercise.name,
    });

    if (exerciseRecord) {
      // Filter out the sets from the exercise record that have the same date as the workout to delete
      exerciseRecord.sets = exerciseRecord.sets.filter(
        (set) => set.date.getTime() !== workoutToDelete.date.getTime()
      );

      if (exerciseRecord.sets.length > 0) {
        // Calculate the highest volume set
        const highestVolumeSet = exerciseRecord.sets.reduce(
          (maxSet, currentSet) => {
            const currentVolume = currentSet.weight * currentSet.reps;
            const maxVolume = maxSet.weight * maxSet.reps;
            return currentVolume > maxVolume ? currentSet : maxSet;
          }
        );

        const newHighestVolume =
          highestVolumeSet.weight * highestVolumeSet.reps;

        const filter = { _id: exerciseRecord._id };
        const update = {
          $set: {
            highestVolume: newHighestVolume,
            highestVolumeSet: {
              weight: highestVolumeSet.weight,
              reps: highestVolumeSet.reps,
              date: highestVolumeSet.date
            }
          },
        };

        const options = { new: true };
        await Exercise.findOneAndUpdate(filter, update, options);
      } 
    }
  }

  await Workout.findOneAndDelete({ _id: req.params.id });
  res.status(200).json({ message: "Workout successfully deleted" });
});

module.exports = {
  getWorkoutsSummary,
  getAllWorkouts,
  getPersonalBests,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
