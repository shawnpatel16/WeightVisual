import React from "react";
import { MdEdit, MdDeleteForever } from "react-icons/md";
const ExerciseSets = ({ item }) => {
  console.log(item);
  return (
    <tr>
      <td className="">{item.date}</td>
      <td className="">{item.weight}</td>
      <td className="">{item.reps}</td>
      <td className="">{item.volume}</td>
    </tr>
  );
};

export default ExerciseSets;
