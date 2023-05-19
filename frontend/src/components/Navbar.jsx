import { useState, useContext } from "react";
import { BsCalendarPlusFill } from "react-icons/bs";
import { VscGraphLine } from "react-icons/vsc";
import { MdDarkMode } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";
import { GiWeightLiftingUp } from "react-icons/gi";
import { Link } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import Modal from "./Modal";
import React from "react";
import WorkoutForm from "./WorkoutForm";
import useWorkouts from "../hooks/useWorkouts";
import moment from "moment";
import { WorkoutContext } from "../context/WorkoutContext";
const Navbar = ({ onWorkoutButtonClick, setLogout }) => {
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("light");
  const {
    workoutToEdit,
    isEditing,
    setWorkoutToEdit,
    setIsEditing,
  } = useContext(WorkoutContext);

  const openModal = () => {
    setWorkoutToEdit(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const currDate = new Date();
  const formattedDate = moment(currDate).format("dddd, MMMM Do, YYYY");

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 h-screen w-16
        flex flex-col justify-between
         bg-primary text-white z-10 pt-2"
      >
        <div>
          <SideBarIcon
            icon={<IoIosHome size="28" />}
            text="Home"
            link="/dashboard"
          />
          <SideBarIcon
            icon={<FaCalendarAlt size="28" />}
            text="Calendar View"
            link="/calendar"
          />
          <SideBarIcon
            icon={<BsCalendarPlusFill size="28" />}
            text="Add daily workout"
            onClick={onWorkoutButtonClick}
          />

          <SideBarIcon
            icon={<VscGraphLine size="28" />}
            text="View Progress"
            link="/personal-bests"
          />
          <SideBarIcon
            icon={<GiWeightLiftingUp size="28" />}
            text="Goals"
            link="/goals"
          />
        </div>
        <div className="pb-3">
          <SideBarIcon
            icon={<IoPersonCircleSharp size="28" />}
            text="Logout"
            link="/"
            onClick={setLogout}
          />
        </div>
      </div>
    </>
  );
};

const SideBarIcon = ({ icon, text, link = "#", onClick = () => {} }) => {
  return (
    <Link to={link} onClick={onClick}>
      <div className="sidebar-icon group z-10">
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100 z-10">
          {text}
        </span>
      </div>
    </Link>
  );
};

export default Navbar;
