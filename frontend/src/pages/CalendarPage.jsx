import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import WorkoutForm from "../components/WorkoutForm";
import Modal from "../components/Modal";
import WorkoutDetails from "../components/WorkoutDetails"
const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [showWorkoutDetails, setShowWorkoutDetails] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get("/api/workout/calendar");
        const data = response.data.workouts;

        const formattedEvents = data.map((workout) => {
          const startDate = new Date(workout.date);
          const endDate = new Date(workout.date);
          endDate.setHours(endDate.getHours() + 1); // Assuming each workout is 1 hour long

          return {
            start: startDate,
            end: endDate,
            title: `${workout.split} - ${workout.exercises
              .map((exercise) => exercise.exerciseName)
              .join(", ")}`,
            allDay: true,
            resource: workout, // You can store the entire workout object as a custom field if needed
          };
        });

        setEvents(formattedEvents);
      };

      fetchData();
    }, []);

const handleSelectEvent = (event) => {
  setSelectedEvent(event);
  setShowWorkoutDetails(true);
};

const handleSelectSlot = (slotInfo) => {
  setSelectedDate(slotInfo.start);
  setShowWorkoutForm(true);
};

const closeModal = () => {
  setShowWorkoutForm(false);
  setShowWorkoutDetails(false);
  setSelectedEvent(null);
  setSelectedDate(null);
};
  const updateWorkout = (updatedWorkout) => {
    const updatedEvents = events.map((event) =>
      event.resource._id === updatedWorkout._id
        ? {
            ...event,
            start: new Date(updatedWorkout.date),
            end: new Date(updatedWorkout.date),
            title: `${updatedWorkout.split} - ${updatedWorkout.exercises
              .map((exercise) => exercise.exerciseName)
              .join(", ")}`,
            resource: updatedWorkout,
          }
        : event
    );
    setEvents(updatedEvents);
  };

 

  return (
    <div className="flex justify-center align-center pt-8">
      <Calendar
        style={{ height: "90vh", width: "70vw" }}
        localizer={localizer}
        events={events}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        startAccessor="start"
        endAccessor="end"
        
      />
      {showWorkoutForm && (
        <Modal
          isOpen={showWorkoutForm}
          onClose={closeModal}
          title={selectedEvent ? "Edit Workout" : "Add Workout"}
        >
          <WorkoutForm
            closeModal={closeModal}
            date={selectedDate}
            workoutToEdit={selectedEvent?.resource}
            isEditing={Boolean(selectedEvent)}
            onUpdateWorkout={updateWorkout} // You should implement this function to update the event in the calendar
          />
        </Modal>
      )}
      {showWorkoutDetails && (
        <Modal
          isOpen={showWorkoutDetails}
          onClose={closeModal}
          title="Workout Details"
        >
          <WorkoutDetails workout={selectedEvent?.resource} isOpen={showWorkoutDetails} onClose={closeModal}/>
        </Modal>
      )}
    </div>
  );
};

export default CalendarPage;
