import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import LoginHandler from "./LoginHandler";
import './index.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CalendarPage from './pages/CalendarPage'
import mockData from './data'
import moment from 'moment'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonalBestsPage from './pages/PersonalBestsPage'
import Modal from "./components/Modal";
import WorkoutForm from "./components/WorkoutForm";
import GoalsPage from "./pages/GoalsPage"
import { date } from 'yup'
import { DateLocalizer } from 'react-big-calendar'
import ShowPage from './pages/ShowPage'
function App() {
  const [showModal, setShowModal] = useState(false);
  const [workoutToEdit, setWorkoutToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [weeklyAverage, setWeeklyAverage] = useState(0);
  const [paginatedWorkouts, setPaginatedWorkouts] = useState([]);
  const [allWorkouts, setAllWorkouts] = useState([])
  const [deletedTimeoutId, setDeletedTimeoutId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mainGoals, setMainGoals] = useState([])




  const handleUserLogin = () => {
    setIsLoggedIn(true);
    ;
  }
  const handleUserLogout = async () => {
    try {
      const response = await axios.post(
        "/api/auth/logout",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        setIsLoggedIn(false);
      } else {
        console.error("Error logging out:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };


    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await axios.get("/api/auth/isAuthenticated");
          if (response.data.message === "Authenticated") {
            // The user is authenticated
            setIsLoggedIn(true);
          } else {
            // The user is not authenticated
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error("Error checking authentication:", error);
          setIsLoggedIn(false);
        }
      };

      checkAuth();
    }, []);
  
  const currDate = new Date();
  const formattedDate = moment(currDate).format("dddd, MMMM Do, YYYY");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/workout/");
      const data = response.data;
      console.log(data)
      setTotalWorkouts(data.dashboardData.totalWorkouts);
      setWeeklyAverage(data.dashboardData.weeklyAverageWorkouts);
      setAllWorkouts(data.dashboardData.allWorkouts);
      setMainGoals(data.dashboardData.topThreeGoals)
      setPaginatedWorkouts(data.dashboardData.paginatedWorkouts)
    };

    if(isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);
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
      workout._id === updatedWorkout._id ? updatedWorkout : workout
    );

    setWorkouts(updatedWorkouts);
  };


  return (
    <>
      <ToastContainer />
      <Router>
        <div className="flex">
          {isLoggedIn && (
            <Navbar setShowModal={openModal} setLogout={handleUserLogout} />
          )}
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
            element={<ShowPage onUserLogin={handleUserLogin} />}
          />
          {isLoggedIn && (
            <>
              <Route
                isLoggedIn={isLoggedIn}
                path="dashboard"
                element={
                  <HomePage
                    onEditWorkout={handleEditWorkout}
                    onUpdateWorkout={handleUpdateWorkout}
                    totalWorkouts={totalWorkouts}
                    weeklyAverage={weeklyAverage}
                    allWorkouts={allWorkouts}
                    
                    onDeleteWorkout={handleDeleteWorkout}
                    onUndoDelete={handleUndoDelete}
                    deletedTimeoutId={deletedTimeoutId}
                    mainGoals={mainGoals}
                  />
                }
              />
              <Route
                isLoggedIn={isLoggedIn}
                path="calendar"
                element={<CalendarPage />}
              />
              <Route
                isLoggedIn={isLoggedIn}
                path="personal-bests"
                element={<PersonalBestsPage />}
              />
              <Route
                isLoggedIn={isLoggedIn}
                path="goals"
                element={<GoalsPage />}
              />
            </>
          )}
      
        </Routes>

        
      </Router>
    </>
  );
}

export default App
