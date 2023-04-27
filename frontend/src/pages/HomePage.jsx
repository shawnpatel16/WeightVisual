import React, { useEffect, useState } from "react";
import Heatmap from '../components/Heatmap'
import axios from "axios";
import WorkoutCounter from '../components/WorkoutCounter'
import WeeklyAverage from '../components/WeeklyAverage'
import WorkoutHistory from '../components/WorkoutHistory'
import GoalsDashboardComponent from "../components/GoalsDashboardComponent";
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
      <h1 className="text-4xl font-bold mt-10 mb-6 ml-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="col-span-1 lg:col-span-2">
          <div className="flex justify-start space-x-4">
            <WorkoutCounter
              totalWorkouts={totalWorkouts}
              className="w-1/3 mx-4"
            />
            <WeeklyAverage
              weeklyAverage={weeklyAverage}
              className="w-1/3 mx-4"
            />
            <GoalsDashboardComponent className="w-1/3 mx-4" />
          </div>
        </div>
        <div className="col-span-1 lg:col-span-1">
          <Heatmap workouts={workouts} className="mx-4 text-secondary" />
        </div>
      </div>
      <div className="mt-8 bg-gray-700 rounded-xl shadow-md p-6">
        <WorkoutHistory workouts={workouts} />
      </div>
    </div>
  );
}

export default HomePage