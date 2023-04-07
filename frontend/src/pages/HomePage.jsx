import React from 'react'
import Heatmap from '../components/Heatmap'
import WorkoutCounter from '../components/WorkoutCounter'
import WeeklyAverage from '../components/WeeklyAverage'
import WorkoutHistory from '../components/WorkoutHistory'
const HomePage = () => {
  return (
      <div className='pl-24'>
          Dashboard
          <Heatmap />
          <WorkoutCounter />
          <WeeklyAverage />
          <WorkoutHistory/>
      </div>
  )
}

export default HomePage