import { Link } from "react-router-dom";
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">Running Tracker</Link>
        <ul className="navbar-links">

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;