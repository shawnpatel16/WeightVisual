import React from 'react'
import { FaCheck, FaTimes } from "react-icons/fa";
import moment from "moment";
import { toast } from 'react-toastify';
import { MdEdit, MdDeleteForever } from "react-icons/md";

const Workout = ({ item, onClick,onDelete, onUndoDelete, onEdit, onEditWorkout }) => {
  const formattedDate = moment(item.date).format("dddd, MMMM Do, YYYY");
  const relativeTime = moment(item.date).fromNow();
  
  const handleEditClick = (event, item) => {
    
    event.stopPropagation();
    onEditWorkout(item);
  };


  const handleDeleteClick = (event) => {
    event.stopPropagation();
    const { timeoutId, deletedWorkout } = onDelete(item._id);

    toast(
      <>
        Workout deleted.
        <button onClick={() => handleUndo(timeoutId, deletedWorkout)}>
          Undo
        </button>
      </>
    );
  };
  const handleUndo = (timeoutId, deletedWorkout) => {
    clearTimeout(timeoutId);
    onUndoDelete(deletedWorkout);
  };

  return (
    <tr onClick={onClick}>
      <td className="">{formattedDate}</td>
      <td className="">{relativeTime}</td>
      <td className="">{item.progressMade ? <FaCheck /> : <FaTimes />}</td>
      <td className="">{item.split}</td>
      <td data-testid="edit-button" className="">
        <MdEdit onClick={(event) => handleEditClick(event,item)} />
      </td>
      <td data-testid="delete-button" className="">
        <MdDeleteForever onClick={handleDeleteClick} />
      </td>
    </tr>
  );
}

export default Workout