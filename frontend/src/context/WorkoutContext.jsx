// context/WorkoutContext.js
import React, { createContext, useState, useCallback } from "react";
import axios from "axios";


export const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [workoutToEdit, setWorkoutToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [weeklyAverage, setWeeklyAverage] = useState(0);
  const [paginatedWorkouts, setPaginatedWorkouts] = useState([]);
  const [allWorkouts, setAllWorkouts] = useState([]);
  const [mainGoals, setMainGoals] = useState([]);
  const [deletedWorkout, setDeletedWorkout] = useState(null);
  const [deleteTimeout, setDeleteTimeout] = useState(null);
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
    try {
      const response = await axios.post("/api/workout/", workout);
      const newWorkout = response.data;
      // Add the new workout to the context state
      setAllWorkouts([...allWorkouts, newWorkout]);
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
    } catch (error) {
      console.error("Error updating workout:", error);
    }
  }, [allWorkouts]);


 const deleteWorkout = useCallback(
   (workoutId) => {
     const workoutToDelete = allWorkouts.find(
       (workout) => workout._id === workoutId
     );
     setDeletedWorkout(workoutToDelete);

     setAllWorkouts(allWorkouts.filter((workout) => workout._id !== workoutId));

     const timeout = setTimeout(async () => {
       try {
         await axios.delete(`/api/workout/${workoutId}`);
       } catch (error) {
         console.error("Error deleting workout:", error);
       }
       setDeletedWorkout(null);
     }, 5000);

     setDeleteTimeout(timeout);
   },
   [allWorkouts]
 );

const fetchWorkoutByDate = useCallback(async (date) => {
  try {
    const response = await axios.get(`/api/workout/date/${date}`);
    const data = response.data;
    setWorkoutByDate(data.workout);
  } catch (error) {
    console.error("Error fetching workout by date:", error);
  }
}, []);
  const undoDeleteWorkout = useCallback(() => {
    if (deletedWorkout && deleteTimeout) {
      clearTimeout(deleteTimeout);
      setAllWorkouts([...allWorkouts, deletedWorkout]);
      setDeletedWorkout(null);
      setDeleteTimeout(null);
    }
  }, [allWorkouts, deletedWorkout, deleteTimeout]);
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
        undoDeleteWorkout,
        totalWorkouts,
        weeklyAverage,
        allWorkouts,
        mainGoals,
        workoutToEdit,
        isEditing,
        editWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
