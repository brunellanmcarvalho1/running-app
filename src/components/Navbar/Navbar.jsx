import { Link } from "react-router-dom";
import './Navbar.css'; 
import Logo from '../../assets/logo.png'

const Navbar = () => {
  return (
    <nav className="navbar">
     <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          <img src={Logo} alt="Running Tracker Logo"className="logo-image"/> 
        </Link>
        <ul className="navbar-links">

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;