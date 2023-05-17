import React from 'react'
// Get the length of the workouts from the database
const WorkoutCounter = ({totalWorkouts, className}) => {
  
  return (
    <div
      className={`bg-gray-700 rounded-xl shadow-md p-6 h-48 flex flex-col justify-between ${className}`}
    >
      <h2 className="text-xl font-bold text-center text-slate">
        Total Workouts
      </h2>
      <div className="flex flex-grow items-center justify-center">
        <span className="text-4xl font-semibold text-secondary">
          {totalWorkouts}
        </span>
      </div>
    </div>
  );
}

export default WorkoutCounter