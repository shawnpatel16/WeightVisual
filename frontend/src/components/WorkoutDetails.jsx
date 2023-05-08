import React, {useState} from "react";
import Modal from "./Modal";
import useWorkouts from "../hooks/useWorkouts";
const WorkoutDetails = ({ workout, isOpen, onClose }) => {
  const { deleteWorkout, undoDeleteWorkout, editWorkout } = useWorkouts();
  const handleEditClick = (event, workout) => {
    event.stopPropagation();
    editWorkout(workout);
    onClose()
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    const { timeoutId, deletedWorkout } = onDelete(workout._id);

    toast(
      <>
        Workout deleted.
        <button onClick={() => handleUndo(timeoutId, deletedWorkout)}>
          Undo
        </button>
      </>
    );
  };
  const handleUndo = (timeoutId, deletedWorkout) => {
    clearTimeout(timeoutId);
    onUndoDelete(deletedWorkout);
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Workout Details">
      <div className="text-white">
        <p>
          <strong>Date:</strong> {workout.date}
        </p>
        <p>
          <strong>Split:</strong> {workout.split}
        </p>
        <ul className="list-none space-y-1">
          {workout.exercises.map((exercise, exerciseIdx) => (
            <div key={exerciseIdx}>
              <h3>{exercise.exerciseName}</h3>
              <ul>
                {exercise.exerciseSets.map((set, setIdx) => (
                  <li key={setIdx}>
                    Set {setIdx + 1}: {set.weight} lbs x {set.reps} reps
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ul>
        <button
          className="bg-green-500 px-4 py-2 mt-4 rounded text-white"
          onClick={(event) => handleEditClick(event, workout)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 px-4 py-2 mt-4 ml-2 rounded text-white"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default WorkoutDetails;
