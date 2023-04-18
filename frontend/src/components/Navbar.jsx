import { FaCalendarAlt } from "react-icons/fa";
import { BsCalendarPlusFill } from "react-icons/bs";
import { VscGraphLine } from "react-icons/vsc";
import { MdDarkMode } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";
import {GiWeightLiftingUp} from "react-icons/gi"
import { Link } from "react-router-dom";
import {IoIosHome} from 'react-icons/io'
const Navbar = () => {
    
  return (
    <>
      <div
        className="fixed top-0 left-0 h-screen w-16 
        flex flex-col justify-between
         bg-primary text-white"
      >
        <div>
          <SideBarIcon icon = {<IoIosHome size = "28"/>} text = "Home" link = "/"/>
          <SideBarIcon
            icon={<FaCalendarAlt size="28" />}
            text="Calendar View"
            link="/calendar"
          />
          <SideBarIcon
            icon={<BsCalendarPlusFill size="28" />}
            text="Add daily workout"
            link="/calendar"
          />
          <SideBarIcon
            icon={<VscGraphLine size="28" />}
            text="View Progress"
            link="/calendar"
          />
          <SideBarIcon
            icon={<GiWeightLiftingUp size="28" />}
            text="Personal Bests"
            link="/calendar"
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
            text="Profile"
            link="/calendar"
          />
        </div>
      </div>
    </>
  );
}

const SideBarIcon = ({ icon, text, link }) => {
  return (
    <div className="sidebar-icon group">
      <Link to={link}>{icon}</Link>
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
};


export default Navbar;