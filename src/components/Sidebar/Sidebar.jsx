
import { useState } from "react"; 
import { Link } from "react-router-dom";
import { FaHome, FaPlus } from "react-icons/fa";
import PropTypes from 'prop-types';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false); 

  return (
    <div
      className={`fixed left-0 top-16 h-full bg-[#333] text-white transition-all duration-300 ${
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
            <FaHome className="text-xl" />
            {isExpanded && <span className="ml-2">Home</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/add-running"
            className="flex items-center p-4 hover:bg-[#ffbe59] transition-colors duration-200"
          >
            <FaPlus className="text-xl" />
            {isExpanded && <span className="ml-2">Add Running</span>}
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