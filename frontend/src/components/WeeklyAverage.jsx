import React from 'react'
// Starting from the date of the first workout, get the current date
// Then take the total number of workouts and divide by the number of weeks

const WeeklyAverage = ({weeklyAverage, className}) => {

  return (
    <div
      className={`bg-gray-700 rounded-xl shadow-md p-6 h-48 flex flex-col justify-between ${className}`}
    >
      <h2 className="text-xl font-bold text-center text-secondary">
        Weekly Average
      </h2>
      <div className="flex flex-grow items-center justify-center">
        <span className="text-4xl font-semibold text-secondary">
          {weeklyAverage}
        </span>
      </div>
    </div>
  );
}

export default WeeklyAverage