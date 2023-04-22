import React from 'react'
// Get the length of the workouts from the database
const WorkoutCounter = ({totalWorkouts}) => {
  
  return (
    <div className="bg-gray-700 rounded-xl shadow-md p-6 w-64 h-48 flex flex-col justify-between mx-4">
      <h2 className="text-xl font-bold text-center text-secondary">
        Total Workouts
      </h2>
      <div className="flex flex-grow items-center justify-center">
        <span className="text-4xl font-semibold text-secondary">{totalWorkouts}</span>
      </div>
    </div>
  );
}

export default WorkoutCounter