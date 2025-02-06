import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
      
        <Link to="/" className="navbar-brand">
          <img src={Logo} alt="Logo" className="logo-image" />
        </Link>

        
        <h1 className="slogan">Faster and further!</h1>

       
        <Link to="/signin" className="sign-in-btn">
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
