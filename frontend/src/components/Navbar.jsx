import { FaCalendarAlt } from "react-icons/fa";
import { BsCalendarPlusFill } from "react-icons/bs";
import { VscGraphLine } from "react-icons/vsc";
import { MdDarkMode } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";
import {GiWeightLiftingUp} from "react-icons/gi"


const Navbar = () => {
    
  return (
    <>
      <div
        className="fixed top-0 left-0 h-screen w-16 
        flex flex-col justify-between
         bg-primary text-white"
      >
        <div>
          <SideBarIcon
            icon={<FaCalendarAlt size="28" />}
            text="Calendar View"
          />
          <SideBarIcon
            icon={<BsCalendarPlusFill size="28" />}
            text="Add daily workout"
          />
          <SideBarIcon icon={<VscGraphLine size="28" />} text="View Progress" />
          <SideBarIcon
            icon={<GiWeightLiftingUp size="28" />}
            text="Personal Bests"
          />
        </div>
        <div className="pb-3">
          <SideBarIcon icon={<MdDarkMode size="28" />} text="Dark/Light mode" />
          <SideBarIcon icon={<IoPersonCircleSharp size="28" />} text="Profile" />
        </div>
      </div>
    </>
  );
}

const SideBarIcon = ({ icon, text }) => {
  return(
  <div className="sidebar-icon group">
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">
        {text}
      </span>
    </div>
  )
};


export default Navbar;
