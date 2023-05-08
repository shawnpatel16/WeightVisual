// hooks/useWorkouts.js
import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";

const useWorkouts = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkouts must be used within a WorkoutProvider");
  }
  return context;
};

export default useWorkouts;
