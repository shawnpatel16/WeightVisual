import React, { useState } from 'react'
import './App.css'
import './index.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CalendarPage from './pages/CalendarPage'
import mockData from './data'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {
  
const events = mockData.map((workout) => ({
  title: workout.split,
  start: new Date(workout.date),
  end: new Date(workout.date),
  allDay:true,
}));
  return (
    <>
      <Router>
        <div className="flex">
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          {/* <Route path = "/workout/:date" element={<WorkoutPage/>} */}
        </Routes>
      </Router>
    </>
  );
}

export default App
