import React, {useState} from "react";
import Modal from "./Modal";
import useWorkouts from "../hooks/useWorkouts";
import ConfirmationDialog from "./ConfirmationDialog";

const WorkoutDetails = ({ workout, isOpen, onClose, onDelete, onEditWorkout }) => {
  const { deleteWorkout, editWorkout } = useWorkouts();
  
  const handleEditClick = (event, workout) => {
    event.stopPropagation();
    editWorkout(workout);
    onClose()
    onEditWorkout(workout)
  };
  console.log(workout)
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

        <div>
          <ConfirmationDialog
            isDeleteDialogOpen={false} // Pass the initial open state as a prop
            message="Are you sure you want to delete this workout?"
            onConfirm={() => onDelete(workout.workoutId)}
            onCancel={() => {}}
          >
            <button className="bg-red-500 px-4 py-2 mt-4 ml-2 rounded text-white">
              Delete
            </button>
          </ConfirmationDialog>
        </div>
        {/* <button
          className="bg-red-500 px-4 py-2 mt-4 ml-2 rounded text-white"
          onClick={handleDeleteClick}
        >
          Delete
        </button> */}
      </div>
    </Modal>
  );
};

export default WorkoutDetails;
