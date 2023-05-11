import { useState,useContext } from "react";
import ConfirmationDialog from "./ConfirmationDialog";
import { WorkoutContext } from "../context/WorkoutContext";
import { FaCheck, FaTimes } from "react-icons/fa";
import moment from "moment";
import { toast } from "react-toastify";
import { MdEdit, MdDeleteForever } from "react-icons/md";

const Workout = ({ item, onClick, onDelete,onEditWorkout }) => {
  const formattedDate = moment.utc(item.date).format("dddd, MMMM Do, YYYY");
  const relativeTime = moment.utc(item.date).fromNow();
    

const { deleteWorkout, undoDeleteWorkout } = useContext(WorkoutContext);
  const handleEditClick = (event, item) => {
    event.stopPropagation();
    onEditWorkout(item);
  };




  return (
    <tr>
      <td className="" onClick={onClick}>
        {formattedDate}
      </td>
      <td className="" onClick={onClick}>
        {relativeTime}
      </td>
      <td className="" onClick={onClick}>
        {item.progressMade ? <FaCheck /> : <FaTimes />}
      </td>
      <td className="" onClick={onClick}>
        {item.split}
      </td>
      <td data-testid="edit-button" className="">
        <MdEdit onClick={(event) => handleEditClick(event, item)} />
      </td>
      <td data-testid="delete-button" className="">
        <ConfirmationDialog
          isDeleteDialogOpen={false} // Pass the initial open state as a prop
          message="Are you sure you want to delete this workout?"
          onConfirm={() => onDelete(item.workoutId)}
          onCancel={() => {}}
        >
          <MdDeleteForever />
        </ConfirmationDialog>
      </td>
    </tr>
  );
};

export default Workout;
