import { useState, useContext } from "react";
import { BsCalendarPlusFill } from "react-icons/bs";
import { VscGraphLine } from "react-icons/vsc";
import { MdDarkMode } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";
import {GiWeightLiftingUp} from "react-icons/gi"
import { Link } from "react-router-dom";
import { IoIosHome } from 'react-icons/io'
import {FaCalendarAlt} from 'react-icons/fa'
import Modal from "./Modal";
import React from "react";
import WorkoutForm from "./WorkoutForm";
import useWorkouts from "../hooks/useWorkouts";
import moment from "moment";
import { WorkoutContext } from "../context/WorkoutContext";
const Navbar = ({setLogout}) => {
  const [showModal, setShowModal] = useState(false);
  const { workoutToEdit, isEditing } = useContext(WorkoutContext);

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
      <div
        className="fixed top-0 left-0 h-screen w-16
        flex flex-col justify-between
         bg-primary text-white"
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
            onClick={() => setShowModal(true)}
          />
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
            />
          </Modal>

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
            icon={<MdDarkMode size="28" />}
            text="Dark/Light mode"
            link="/calendar"
          />
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
}

const SideBarIcon = ({ icon, text, link = "#", onClick = () => {} }) => {
  return (
    <div className="sidebar-icon group">
      <Link to={link} onClick={onClick}>
        {icon}
      </Link>
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
};


export default Navbar;
