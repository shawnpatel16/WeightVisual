import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { WorkoutProvider } from "./context/WorkoutContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <WorkoutProvider>
    <App />
  </WorkoutProvider>
);
