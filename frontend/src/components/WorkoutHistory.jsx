import { WorkoutContext } from "../context/WorkoutContext";
import React, { useState, useEffect, useContext } from "react";
import WorkoutForm from "./WorkoutForm";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Workout from "./Workout";
import WorkoutDetails from "./WorkoutDetails";
import Modal from "./Modal";

const WorkoutHistory = ({
  onDelete,
  onEditWorkout,
  onUpdateWorkout,
}) => {
  const {
    allWorkouts,
    updateWorkout,
    deleteWorkout,
    editWorkout,
    workoutToEdit,
    isEditing,
    workoutsUpdated,
    setWorkoutsUpdated,
  } = useContext(WorkoutContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [workouts, setWorkouts] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("dateDesc");
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    switch (sortCriteria) {
      case "dateDesc":
        return new Date(b.date) - new Date(a.date);
      case "dateAsc":
        return new Date(a.date) - new Date(b.date);
      case "splitAsc":
        return a.split.localeCompare(b.split);
      case "splitDesc":
        return b.split.localeCompare(a.split);
      default:
        return 0;
    }
  });

  useEffect(() => {
    const fetchWorkouts = async (pageNumber) => {
      const response = await axios.get(
        `/api/workout?page=${pageNumber}&limit=10`
      );
      // Update your workouts state with the new data
      setWorkouts(response.data.dashboardData.paginatedWorkouts);
      setTotalPages(response.data.dashboardData.totalPages);
    };
    fetchWorkouts(pageNumber);
  }, [pageNumber, workoutsUpdated]);


  const handleDeleteWorkout = (workoutId) => {
      deleteWorkout(workoutId);
      setWorkoutsUpdated(!workoutsUpdated);
      setIsDetailsModalOpen(false)
    };

  const handleWorkoutClick = (workout, isEdit = false) => {
    if (isEdit) {
      editWorkout(workout);
    } else {
      setSelectedWorkout(workout);
      setIsDetailsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsDetailsModalOpen(false);
  };

  const openFormModalForEditing = (workout) => {
    editWorkout(workout);
    setIsFormModalOpen(true);
  };

  return (
    <div className="w-full py-1 min-h-full flex flex-col">
      <table className="table-auto w-full text-secondary divide-y flex-grow">
        <thead className="text-lg border-b border-gray-500">
          <tr className="text-left text-slate">
            <th className="w-1/4">
              Date
              <button
                className="ml-2"
                onClick={() => setSortCriteria("dateDesc")}
              >
                <BsArrowDown size="16" />
              </button>
              <button
                className="ml-2"
                onClick={() => setSortCriteria("dateAsc")}
              >
                <BsArrowUp size="16" />
              </button>
            </th>
            <th className="pr-8 w-1/4">Relative Time</th>
            <th className="w-1/4">Overloaded</th>
            <th className="w-1/4">
              Split
              <button
                className="ml-2"
                onClick={() => setSortCriteria("splitDesc")}
              >
                <BsArrowDown size="16" />
              </button>
              <button
                className="ml-2"
                onClick={() => setSortCriteria("splitAsc")}
              >
                <BsArrowUp size="16" />
              </button>
            </th>
            <th className="w-1/8 px-2">Edit</th>
            <th className="w-1/8 px-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedWorkouts.map((item, index) => (
            <Workout
              key={index}
              item={item}
              onClick={() => handleWorkoutClick(item)}
              onDelete={handleDeleteWorkout}
              onEditWorkout={(item) => openFormModalForEditing(item)}
              onUpdateWorkout={onUpdateWorkout}
            />
          ))}
        </tbody>
      </table>
      {selectedWorkout && (
        <WorkoutDetails
          workout={selectedWorkout}
          isOpen={isDetailsModalOpen}
          onClose={closeModal}
          onDelete={handleDeleteWorkout}
          onEditWorkout={openFormModalForEditing}
          onUpdateWorkout={onUpdateWorkout}
        />
      )}
      {isFormModalOpen && (
        <Modal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
        >
          <WorkoutForm
            closeModal={() => setIsFormModalOpen(false)}
            date={isEditing ? workoutToEdit.date : new Date()}
            workoutToEdit={workoutToEdit}
            isEditing={isEditing}
          />
        </Modal>
      )}
      <div className="pagination flex justify-center items-center mt-4">
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={totalPages} // totalPages should be fetched from the API and stored in the state
          marginPagesDisplayed={2}
          pageRangeDisplayed={4}
          onPageChange={({ selected }) => setPageNumber(selected + 1)} // Update the pageNumber state when a new page is clicked
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default WorkoutHistory;
