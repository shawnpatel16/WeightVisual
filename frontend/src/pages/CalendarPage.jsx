import "react-big-calendar/lib/css/react-big-calendar.css";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WorkoutForm from "../components/WorkoutForm";
import { WorkoutContext } from "../context/WorkoutContext";

import Modal from "../components/Modal";
import WorkoutDetails from "../components/WorkoutDetails";
import { format } from "date-fns";

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [showWorkoutDetails, setShowWorkoutDetails] = useState(false);
  const [isEditFormModalOpen, setIsEditFormModalOpen] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/workout/calendar");
      const data = response.data.workouts;

      const formattedWorkouts = data.map((workout) => {
        const dateComponents = workout.date.split(/[-T:.Z]/).map(Number);
        const startDate = new Date(
          Date.UTC(
            dateComponents[0],
            dateComponents[1] - 1,
            dateComponents[2],
            23,
            59,
            59,
            999
          )
        );
        const endDate = new Date(
          Date.UTC(
            dateComponents[0],
            dateComponents[1] - 1,
            dateComponents[2],
            23,
            59,
            59,
            999
          )
        );

        return {
          start: startDate,
          end:endDate,
          title: `${workout.split}`,
          allDay: true,
          resource: workout,
        };
      });
      setWorkouts(formattedWorkouts);
    };

    fetchData();
    
  }, [workoutsUpdated]);

  const handleSelectEvent = (event) => {
    const workout = event.resource;
    console.log(workout);
    setSelectedWorkout(workout);
    console.log(selectedWorkout);
    setSelectedDate(new Date(event.start).toISOString());
    console.log(selectedDate);
    openModal()

  };

  const handleSelectSlot = (slotInfo) => {
    const slotStart = slotInfo.start;
    const formattedDate = moment(slotStart).format("dddd, MMMM Do, YYYY");
    const slotEnd = slotInfo.end;
    // Search for an event that matches the clicked slot
    const matchingEvent = workouts.find(
      (workout) =>
        moment(workout.start).format("dddd, MMMM Do, YYYY") === formattedDate
    );

    // If a matching event was found, handle as event click
    if (matchingEvent) {
      handleSelectEvent(matchingEvent);
    } else {
      setSelectedDate(new Date(slotInfo.start).toISOString());
      setSelectedWorkout(null)
      openModal()
    }
  };

  const openFormModalForEditing = (workout) => {
    editWorkout(workout);
    setIsEditFormModalOpen(true);
  };

const handleDeleteWorkout = (workoutId) => {
  deleteWorkout(workoutId);
  setWorkoutsUpdated(!workoutsUpdated);
  closeModal()
};
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className="flex justify-center align-center pt-8">
      <Calendar
        style={{ height: "90vh" }}
        localizer={localizer}
        events={workouts}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        startAccessor="start"
        endAccessor="end"
        className="w-4/5"
      />
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={`Workout: ${selectedDate}`}
      >
        {selectedWorkout ? (
          <WorkoutDetails
            workout={selectedWorkout}
            isOpen={showModal}
            onEditWorkout={openFormModalForEditing}
            onClose={closeModal}
            date={selectedDate}
            onDelete={handleDeleteWorkout}
          />
        ) : (
          <WorkoutForm closeModal={closeModal} date={selectedDate} />
        )}
      </Modal>
      {isEditFormModalOpen && (
        <Modal
          isOpen={isEditFormModalOpen}
          onClose={() => setIsEditFormModalOpen(false)}
        >
          <WorkoutForm
            closeModal={() => setIsEditFormModalOpen(false)}
            date={selectedDate}
            workoutToEdit={selectedWorkout}
            isEditing={isEditing}
          />
        </Modal>
      )}
    </div>
  );
};

export default CalendarPage;
