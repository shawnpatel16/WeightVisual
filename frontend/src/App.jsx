import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import axios from "axios";
import LoginHandler from "./LoginHandler";
import "./index.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CalendarPage from "./pages/CalendarPage";
import mockData from "./data";
import moment from "moment";
import { WorkoutProvider } from "./context/WorkoutContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonalBestsPage from "./pages/PersonalBestsPage";
import Modal from "./components/Modal";
import WorkoutForm from "./components/WorkoutForm";
import GoalsPage from "./pages/GoalsPage";
import { date } from "yup";
import { DateLocalizer } from "react-big-calendar";
import { WorkoutContext } from "./context/WorkoutContext";
import ShowPage from "./pages/ShowPage";
function App() {
  const [showModal, setShowModal] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUserLogin = () => {
    setIsLoggedIn(true);
  };
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

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <WorkoutProvider>
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
                  element={<HomePage />}
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
      </WorkoutProvider>
    </>
  );
}

export default App;
