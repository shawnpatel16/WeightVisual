import React from 'react'
import mockData from '../data'
import Workout from './Workout'
// This can include a list of the past workouts
// It should show the date, how far from the current date, the split,
// edit and delete buttons
// Can also include pagination to scroll thru
const WorkoutHistory = ({workouts}) => {
  return (
    <div>
      <h2 className="text-lg font-medium text-primary">Your Workout History</h2>
      <table className="bg-gray-700 table-auto text-secondary">
        <thead className="text-secondary text-lg border">
          <tr className="text-left">
            <th className="">Date</th>
            <th className="pr-8">Relative Time</th>
            <th className="">Split</th>
            <th className="">Edit</th>
            <th className="">Delete</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((item, index) => (
            <Workout key={index} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WorkoutHistory