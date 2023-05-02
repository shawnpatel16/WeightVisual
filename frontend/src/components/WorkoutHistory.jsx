import React, {useState} from 'react'
import mockData from '../data'
import Workout from './Workout'
import WorkoutDetails from './WorkoutDetails'
import Modal from './Modal'
// This can include a list of the past workouts
// It should show the date, how far from the current date, the split,
// edit and delete buttons
// Can also include pagination to scroll thru
const WorkoutHistory = ({ workouts, onDelete, onUndoDelete, deletedTimeoutId, onEdit, onEditWorkout, onUpdateWorkout }) => {

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

  const handleWorkoutClick = (workout) => {
    setSelectedWorkout(workout);
    setIsDetailsModalOpen(true);
  };

  const closeModal = () => {
    setIsDetailsModalOpen(false);
  };


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
    </div>
  );
}

export default WorkoutHistory