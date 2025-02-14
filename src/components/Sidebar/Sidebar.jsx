import { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaHome,
  FaPlus,
  FaRunning,
  FaRegCalendarAlt,
  FaInfoCircle,
} from "react-icons/fa";

import PropTypes from "prop-types";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`fixed left-0 top-16 h-full bg-[#333] text-white transition-all duration-300 z-50 ${
        isExpanded ? "w-64" : "w-16"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <ul className="mt-4">
        <li>
          <Link
            to="/"
            className="flex items-center p-4 hover:bg-[#ffbe59] transition-colors duration-200"
          >
            <FaHome className="text-2xl text-white" />
            {isExpanded && <span className="ml-2 text-white">Home</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/add-running"
            className="flex items-center p-4 hover:bg-[#ffbe59] transition-colors duration-200"
          >
            <FaPlus className="text-2xl text-white" />
            {isExpanded && <span className="ml-2 text-white">Add Training</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/training-log"
            className="flex items-center p-4 hover:bg-[#ffbe59] transition-colors duration-200"
          >
            <FaRunning className="text-2xl text-white" />
            {isExpanded && (
              <span className="ml-2 text-white">Training Log</span>
            )}
          </Link>
        </li>
        <li>
          <Link
            to="/calendar"
            className="flex items-center p-4 hover:bg-[#ffbe59] transition-colors duration-200"
          >
            <FaRegCalendarAlt className="text-2xl text-white" />
            {isExpanded && (
              <span className="ml-2 text-white">Training Calendar</span>
            )}
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="flex items-center p-4 hover:bg-[#ffbe59] transition-colors duration-200"
          >
            <FaInfoCircle className="text-2xl text-white" />
            {isExpanded && <span className="ml-2 text-white">About Us</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
