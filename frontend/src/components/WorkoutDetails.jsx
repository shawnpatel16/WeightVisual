import React, {useState} from "react";
import Modal from "./Modal";
import useWorkouts from "../hooks/useWorkouts";
import ConfirmationDialog from "./ConfirmationDialog";
import {BsPencilSquare, BsTrash} from 'react-icons/bs'
const WorkoutDetails = ({
  workout,
  isOpen,
  onClose,
  onDelete,
  onEditWorkout,
}) => {
  const { deleteWorkout, editWorkout } = useWorkouts();
  const date = new Date(workout.date);
  const formattedDate = date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const handleEditClick = (event, workout) => {
    event.stopPropagation();
    editWorkout(workout);
    onClose();
    onEditWorkout(workout);
  };
  console.log(workout);
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={formattedDate}>
      <div className="text-white">
        <div className="flex items-center justify-between">
          <p className="text-2xl mt-2">
            <strong>{workout.split} Workout</strong>
          </p>
          <div className="flex justify-end">
            <button
              className="text-2xl text-green-500 p-2"
              onClick={(event) => handleEditClick(event, workout)}
            >
              <BsPencilSquare /> {/* Edit icon */}
            </button>

            <ConfirmationDialog
              isDeleteDialogOpen={false}
              message="Are you sure you want to delete this workout?"
              onConfirm={() => onDelete(workout.workoutId)}
              onCancel={() => {}}
            >
              <button className="text-2xl text-red-500 p-2 ml-2">
                <BsTrash /> 
              </button>
            </ConfirmationDialog>
          </div>
        </div>
        <hr className="my-4" />
        <ul className="list-none space-y-4">
          {workout.exercises.map((exercise, exerciseIdx) => (
            <div key={exerciseIdx}>
              <h3 className="text-xl text-secondary">
                {exercise.exerciseName}
              </h3>
              <ul className="pl-4 text-secondary">
                {exercise.exerciseSets.map((set, setIdx) => (
                  <li key={setIdx}>
                    Set {setIdx + 1}: {set.weight} lbs x {set.reps} reps
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default WorkoutDetails;
