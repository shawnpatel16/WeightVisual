import React from 'react'
import { MdEdit, MdDeleteForever } from "react-icons/md";
const Workout = ({item}) => {
  return (
    <tr>
      <td className="">{item.date}</td>
      <td className="">1 day ago</td>
      <td className="">{item.split}</td>
      <td data-testid="edit-button" className="">
        <MdEdit />
      </td>
      <td data-testid="delete-button" className="">
        <MdDeleteForever />
      </td>
    </tr>
  );
}

export default Workout