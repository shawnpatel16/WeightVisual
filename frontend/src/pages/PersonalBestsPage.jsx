import React from 'react'
import ExerciseChart from '../components/AllExercisesChart';
import ExerciseTable from '../components/ExerciseTable';
const PersonalBestsPage = () => {
  return (
    <div className="pl-24 p-6">
      <h1 className="text-4xl font-bold text-slate pl-6">
        Your Exercise History
      </h1>
      <div className="">
        <ExerciseChart />
      </div>
      <div className="mt-8 bg-gray-700 rounded-xl shadow-md p-6">
        <ExerciseTable />
      </div>
    </div>
  );
}

export default PersonalBestsPage