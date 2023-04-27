import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Exercise from '../components/Exercise'
import axios from 'axios'
import ExerciseProgressChart from '../components/ExerciseProgressChart'
const PersonalBestsPage = () => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([])
  const handleExerciseClick = (exerciseName) => {
    navigate(`/personal-bests/${exerciseName}`);
  };
    useEffect(() => {
        
        const fetchData = async () => {
            const response = await axios.get("/api/workout/personal-bests");
          const data = response.data.exercises;
          
            const formattedExercises = data.map((exercise) => {
                const exerciseName = exercise.exerciseName
                const highestVolumeWeight = exercise.highestVolumeSet.weight
                const highestVolumeReps = exercise.highestVolumeSet.reps;
              const highestVolumeDate = exercise.highestVolumeSet.date;
              const sets = exercise.sets
              
                return {
                    exerciseName: exerciseName,
                    highestVolumeWeight: highestVolumeWeight,
                    highestVolumeReps: highestVolumeReps,
                  highestVolumeDate: highestVolumeDate,
                  sets:sets
                }
            })
          setExercises(formattedExercises)
          
        }
      fetchData()
      
    },[])
  return (
    <div className="pl-24 flex justify-start">
      {exercises.length > 0 && (
        <ExerciseProgressChart exercises={exercises} />)}
      <h2 className="text-lg font-medium text-primary">
        Your Exercise History
      </h2>
      <table className="bg-gray-700 table-auto text-secondary">
        <thead className="text-secondary text-lg border">
          <tr className="text-left">
            <th className="">Name</th>
            <th className="">Best Set Weight</th>
            <th className="">Best Set Reps</th>
            <th className="">Best Set Date</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise, index) => (
            <Exercise key={index} exercise={exercise} onClick={handleExerciseClick} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PersonalBestsPage