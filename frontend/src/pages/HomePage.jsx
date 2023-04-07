import React from 'react'
import Heatmap from '../components/Heatmap'
import WorkoutCounter from '../components/WorkoutCounter'
import WeeklyAverage from '../components/WeeklyAverage'
import WorkoutHistory from '../components/WorkoutHistory'
const HomePage = () => {
  return (
    <div className="pl-24">
      <h1 className="text-2xl py-4 mx-4">Dashboard</h1>
      <div className='flex justify-start'>
        <WorkoutCounter />
        <WeeklyAverage />
        <Heatmap />
      </div>
      <WorkoutHistory />
    </div>
  );
}

export default HomePage