import { Link } from "react-router-dom";
import {useState,useEffect} from 'react'
import axios from "axios";

const ExerciseTable = () => {
    const [exercises, setExercises] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("/api/workout/getExerciseSummary",);
            setExercises(response.data)
            console.log(response)
        }
        
       fetchData(); 
    }, 
        
        [])
  return (
    <table>
      <thead>
        <tr>
          <th>Exercise Name</th>
          <th>Highest Weight</th>
          <th>Highest Volume</th>
          <th>Most Recent Top Set</th>
        </tr>
      </thead>
      <tbody>
        {exercises.map((exercise) => (
          <tr key={exercise.id}>
            <td>
              <Link to={`/exercises/${exercise.id}`}>
                {exercise.exerciseName}
              </Link>
            </td>
            <td>{exercise.highestWeight}</td>
            <td>{exercise.highestVolume}</td>
            <td>{`${exercise.topSet.weight} lbs x ${exercise.topSet.reps} reps`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExerciseTable;
