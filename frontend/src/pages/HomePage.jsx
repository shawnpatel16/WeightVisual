import React, { useEffect, useState,useContext } from "react";
import Heatmap from '../components/Heatmap'
import axios from "axios";
import WorkoutCounter from '../components/WorkoutCounter'
import WeeklyAverage from '../components/WeeklyAverage'
import WorkoutHistory from '../components/WorkoutHistory'
import GoalsDashboardComponent from "../components/GoalsDashboardComponent";
import { WorkoutContext } from "../context/WorkoutContext";
const HomePage = () => {
  const [paginatedWorkouts, setPaginatedWorkouts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [workoutToEdit, setWorkoutToEdit] = useState(null);
  const [deletedTimeoutId, setDeletedTimeoutId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const {
    workouts,
    fetchWorkouts,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    fetchWorkoutByDate,
    totalWorkouts,
    weeklyAverage,
    allWorkouts,
    mainGoals,
    editWorkout,
    workoutsUpdated,
    setWorkoutsUpdated,
  } = useContext(WorkoutContext);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts, workoutsUpdated]);

  return (
    <div className="p-8 pl-24 flex flex-col">
      <h1 className="text-4xl font-bold mb-8 text-slate">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="col-span-1 lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-32">
            <WorkoutCounter totalWorkouts={totalWorkouts} />
            <WeeklyAverage weeklyAverage={weeklyAverage} />
            <GoalsDashboardComponent mainGoals={mainGoals} />
          </div>
        </div>
        <div className="col-span-1 lg:col-span-1">
          <Heatmap
            allWorkouts={allWorkouts}
            className="text-secondary h-full"
          />
        </div>
      </div>
      <h2 className="text-3xl font-semibold text-slate mt-10">
        Your Workout History
      </h2>
      <div className="mt-2 bg-gray-800 rounded-xl shadow-md p-6 min-h-max flex-grow">
        <WorkoutHistory
          onDelete={deleteWorkout}
          onEditWorkout={editWorkout}
          onUpdateWorkout={updateWorkout}
        />
      </div>
    </div>
  );
};

export default HomePage;