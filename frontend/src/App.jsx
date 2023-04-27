import React, { useState } from 'react'
import './App.css'
import './index.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CalendarPage from './pages/CalendarPage'
import mockData from './data'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PersonalBestsPage from './pages/PersonalBestsPage'
import Modal from "./components/Modal";
import WorkoutForm from "./components/WorkoutForm";

function App() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <Router>
        <div className="flex">
          <Navbar setShowModal={openModal} />
          <Modal
            isOpen={showModal}
            onClose={closeModal}
            title="Add/Edit Workout"
          >
            <WorkoutForm onClose={closeModal} />
          </Modal>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/personal-bests" element={<PersonalBestsPage />} />
          {/* <Route path = "/workout/:date" element={<WorkoutPage/>} */}
        </Routes>
      </Router>
    </>
  );
}

export default App
