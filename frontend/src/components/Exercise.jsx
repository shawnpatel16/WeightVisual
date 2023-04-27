import React from "react";
import { MdEdit, MdDeleteForever } from "react-icons/md";
const Exercise = ({ exercise, onClick }) => {
  
  return (
    <tr onClick ={()=>onClick(exercise.exerciseName)}>
      <td className="">{exercise.exerciseName}</td>
      <td className="">{exercise.highestVolumeWeight}</td>
      <td className="">{exercise.highestVolumeReps}</td>
      <td className="">{exercise.highestVolumeSet}</td>
          <td className="">{exercise.highestVolumeDate}</td>
    </tr>
  );
};

export default Exercise;
