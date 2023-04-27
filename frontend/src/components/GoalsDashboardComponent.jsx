import React from 'react'

const GoalsDashboardComponent = ({className}) => {
  return (
    <div
      className={`bg-gray-700 rounded-xl shadow-md p-6 h-48 flex flex-col justify-between ${className}`}
    >
      <h2 className="text-xl font-bold text-center text-secondary">
        Total Workouts
      </h2>
      <div className="flex flex-grow items-center justify-center">
        <span className="text-4xl font-semibold text-secondary">
          Hello world
        </span>
      </div>
    </div>
  );
}

export default GoalsDashboardComponent