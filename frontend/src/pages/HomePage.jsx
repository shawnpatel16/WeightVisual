import React, { useEffect, useState } from "react";
import Heatmap from '../components/Heatmap'
import axios from "axios";
import WorkoutCounter from '../components/WorkoutCounter'
import WeeklyAverage from '../components/WeeklyAverage'
import WorkoutHistory from '../components/WorkoutHistory'
const HomePage = () => {
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [weeklyAverage, setWeeklyAverage] = useState(0);
  const [workouts, setWorkouts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "/api/workout"
      );
      const data = response.data;
      setTotalWorkouts(data.totalWorkouts);
      setWeeklyAverage(data.weeklyAverage);
      setWorkouts(data.workouts);
    };

    fetchData();
  }, []);
  return (
    <div className="pl-24">
      <h1 className="text-2xl py-4 mx-4">Dashboard</h1>
      <div className="flex justify-start">
        <WorkoutCounter totalWorkouts={totalWorkouts} />
        <WeeklyAverage weeklyAverage={weeklyAverage} />
        <Heatmap workouts={workouts} />
      </div>
      <WorkoutHistory workouts={workouts} />
    </div>
  );
}

export default HomePage