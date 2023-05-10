// context/WorkoutContext.js
import React, { createContext, useState, useCallback } from "react";
import axios from "axios";


export const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [workoutToEdit, setWorkoutToEdit] = useState(null);
  const [workoutsUpdated, setWorkoutsUpdated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [weeklyAverage, setWeeklyAverage] = useState(0);
  const [paginatedWorkouts, setPaginatedWorkouts] = useState([]);
  const [allWorkouts, setAllWorkouts] = useState([]);
  const [mainGoals, setMainGoals] = useState([]);
  const [workoutByDate, setWorkoutByDate] = useState(null)

  const fetchWorkouts = useCallback(async () => {
    try {
      const response = await axios.get("/api/workout/");
      const data = response.data;

      // Update the state with the fetched data
      setTotalWorkouts(data.dashboardData.totalWorkouts);
      setWeeklyAverage(data.dashboardData.weeklyAverageWorkouts);
      setAllWorkouts(data.dashboardData.allWorkouts);
      setMainGoals(data.dashboardData.topThreeGoals);
      setPaginatedWorkouts(data.dashboardData.paginatedWorkouts);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  }, []);


  const addWorkout = useCallback(async (workout) => {
    console.log(workout)
    try {
      const response = await axios.post("/api/workout/", workout);
      const newWorkout = response.data;
      // Add the new workout to the context state
      setAllWorkouts([...allWorkouts, newWorkout]);
      setWorkoutsUpdated(!workoutsUpdated)
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  }, [allWorkouts]);

  const updateWorkout = useCallback(async (workoutId, updatedWorkout) => {

    try {
      const response = await axios.put(
        `/api/workout/${workoutId}`,
        updatedWorkout
      );
     const updatedWorkoutData = response.data;
     // Update the workout in the context state
     setAllWorkouts(
       allWorkouts.map((workout) =>
         workout._id === workoutId ? updatedWorkoutData : workout
       )
     );
      setWorkoutsUpdated(!workoutsUpdated);
    } catch (error) {
      console.error("Error updating workout:", error);
    }
  }, [allWorkouts]);


 const deleteWorkout = async (id) => {
   try {
     console.log(allWorkouts)
     await axios.delete(`/api/workout/${id}`);
     setAllWorkouts((prevWorkouts) =>
       prevWorkouts.filter((workout) => {
         
         return workout.workoutId !== id;
       })
     );
     console.log(allWorkouts)
   } catch (error) {
     console.log(error);
   }
 };



const fetchWorkoutByDate = useCallback(async (date) => {
  try {
    const response = await axios.get(`/api/workout/date/${date}`);
    const data = response.data;
    setWorkoutByDate(data.workout);
  } catch (error) {
    console.error("Error fetching workout by date:", error);
  }
}, []);
  
  const editWorkout = (workout) => {
    setWorkoutToEdit(workout);
    setIsEditing(true);
  };
  return (
    <WorkoutContext.Provider
      value={{
        fetchWorkouts,
        addWorkout,
        updateWorkout,
        deleteWorkout,
        fetchWorkoutByDate,
        totalWorkouts,
        weeklyAverage,
        allWorkouts,
        mainGoals,
        workoutToEdit,
        isEditing,
        editWorkout,
        workoutsUpdated,
        setWorkoutsUpdated,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
