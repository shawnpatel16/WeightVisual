import { useState } from 'react'
import './App.css'
import './index.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
function App() {


  return (
    <>
      <div className="flex">
        <Navbar />
      </div>
      <HomePage />
    </>
  );
}

export default App
