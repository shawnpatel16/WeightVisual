import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import './index.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CalendarPage from './pages/CalendarPage'
import mockData from './data'
import moment from 'moment'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonalBestsPage from './pages/PersonalBestsPage'
import Modal from "./components/Modal";
import WorkoutForm from "./components/WorkoutForm";
import GoalsPage from "./pages/GoalsPage"
import { date } from 'yup'
import { DateLocalizer } from 'react-big-calendar'
function App() {
  const [showModal, setShowModal] = useState(false);
  const [workoutToEdit, setWorkoutToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [weeklyAverage, setWeeklyAverage] = useState(0);
  const [workouts, setWorkouts] = useState([]);
  const [deletedTimeoutId, setDeletedTimeoutId] = useState(null);
  const currDate = new Date()
  const formattedDate = moment(currDate).format("dddd, MMMM Do, YYYY");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/workout");
      const data = response.data;
      setTotalWorkouts(data.totalWorkouts);
      setWeeklyAverage(data.weeklyAverage);
      setWorkouts(data.workouts);
    };

    fetchData();
  }, []);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleEditWorkout = (workout) => {
    setWorkoutToEdit(workout);
    setIsEditing(true);
    setShowModal(true);
  };
   
   

   const handleDeleteWorkout = (workoutId) => {
     const deletedWorkout = workouts.find(
       (workout) => workout._id === workoutId
     );
     setWorkouts(workouts.filter((workout) => workout._id !== workoutId));

     const deleteWorkout = async () => {
       const response = await axios.delete(`/api/workout/${workoutId}`);
     };

     const timeoutId = setTimeout(() => {
       deleteWorkout();
     }, 5000); // Delay the deletion request by 5 seconds

     setDeletedTimeoutId(timeoutId);
     return { timeoutId, deletedWorkout };
   };
   const handleUndoDelete = (deletedWorkout) => {
     setWorkouts((prevWorkouts) => [...prevWorkouts, deletedWorkout]);
   };
   
  const handleUpdateWorkout = (updatedWorkout) => {
    
    
    const updatedWorkouts = workouts.map((workout) =>
      workout._id === updatedWorkout._id? updatedWorkout : workout
    );
    
    setWorkouts(updatedWorkouts);
  };
  

  return (
    <>
      <ToastContainer />
      <Router>
        <div className="flex">
          <Navbar setShowModal={openModal} />
          <Modal
            isOpen={showModal}
            onClose={closeModal}
            title={`Add/Edit Workout: ${formattedDate}`}
          >
            <WorkoutForm
              closeModal={closeModal}
              date={new Date()}
              workoutToEdit={workoutToEdit}
              isEditing={isEditing}
              onUpdateWorkout={handleUpdateWorkout}
            />
          </Modal>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onEditWorkout={handleEditWorkout}
                onUpdateWorkout={handleUpdateWorkout}
                totalWorkouts={totalWorkouts}
                weeklyAverage={weeklyAverage}
                workouts={workouts}
                onDeleteWorkout={handleDeleteWorkout}
                onUndoDelete={handleUndoDelete}
                deletedTimeoutId={deletedTimeoutId}
              />
            }
          />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/personal-bests" element={<PersonalBestsPage />} />
          <Route path="/goals" element={<GoalsPage />} />
          {/* <Route path = "/workout/:date" element={<WorkoutPage/>} */}
        </Routes>
      </Router>
    </>
  );
}

export default App
