import React, {useState} from "react";
import Modal from "./Modal";

const WorkoutDetails = ({ workout, isOpen, onClose }) => {
  console.log(workout)
  console.log(workout.split);
  console.log(workout.date);
  console.log(workout.exercises);
  
  
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
          {workout.exercises.map((exercise, index) => (
            <li key={index}>
              <strong>{exercise.exerciseName}</strong>
              <ul>
                {workout.exercises.map((set, idx) => (
                  <li key={idx}>
                        Set {idx + 1}: {set.weight} lbs x {set.reps} reps
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <button
          className="bg-green-500 px-4 py-2 mt-4 rounded text-white"
          onClick={onClose}
        >
          Edit
        </button>
        <button
          className="bg-red-500 px-4 py-2 mt-4 ml-2 rounded text-white"
          onClick={onClose}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default WorkoutDetails;
