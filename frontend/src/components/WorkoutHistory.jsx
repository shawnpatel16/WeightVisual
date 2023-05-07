import React, {useState, useEffect} from 'react'
import ReactPaginate from "react-paginate";
import axios from 'axios'
import Workout from './Workout'
import WorkoutDetails from './WorkoutDetails'
import Modal from './Modal'
// This can include a list of the past workouts
// It should show the date, how far from the current date, the split,
// edit and delete buttons
// Can also include pagination to scroll thru
const WorkoutHistory = ({ onDelete, onUndoDelete, deletedTimeoutId, onEdit, onEditWorkout, onUpdateWorkout }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [workouts, setWorkouts] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("dateDesc");
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
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
      console.log(pageNumber)
      const fetchWorkouts = async (pageNumber) => {
        console.log(pageNumber)
        const response = await axios.get(`/api/workout?page=${pageNumber}&limit=10`);
        // Update your workouts state with the new data
        setWorkouts(response.data.dashboardData.paginatedWorkouts);
        setTotalPages(response.data.dashboardData.totalPages)
      };
      fetchWorkouts(pageNumber);
    }, [pageNumber]);

  const handleWorkoutClick = (workout) => {
    console.log(workout)
    
    setSelectedWorkout(workout);
    console.log(selectedWorkout)
    setIsDetailsModalOpen(true);
  };

  const closeModal = () => {
    setIsDetailsModalOpen(false);
  };

 useEffect(() => {
   console.log(selectedWorkout);
 }, [selectedWorkout]);

  return (
    <div className="">
      <h2 className="text-lg font-medium text-secondary">
        Your Workout History
      </h2>
      <table className="bg-gray-700 table-auto text-secondary">
        <thead className="text-secondary text-lg border">
          <tr className="text-left text-secondary">
            <th className="">Date</th>
            <th className="pr-8">Relative Time</th>
            <th className="">Overloaded</th>
            <th className="">Split</th>
            <th className="">Edit</th>
            <th className="">Delete</th>
            <button onClick={() => setSortCriteria("dateDesc")}>
              Sort by date (desc)
            </button>
            <button onClick={() => setSortCriteria("dateAsc")}>
              Sort by date (asc)
            </button>
            <button onClick={() => setSortCriteria("splitAsc")}>
              Sort by split (A-Z)
            </button>
            <button onClick={() => setSortCriteria("splitDesc")}>
              Sort by split (Z-A)
            </button>
          </tr>
        </thead>
        <tbody>
          {sortedWorkouts.map((item, index) => (
            <Workout
              key={index}
              item={item}
              onClick={() => handleWorkoutClick(item)}
              onDelete={onDelete}
              onUndoDelete={onUndoDelete}
              deletedTimeoutId={deletedTimeoutId}
              onEdit={onEdit}
              onEditWorkout={onEditWorkout}
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
        />
      )}
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={totalPages} // totalPages should be fetched from the API and stored in the state
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={({ selected }) => setPageNumber(selected + 1)} // Update the pageNumber state when a new page is clicked
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default WorkoutHistory