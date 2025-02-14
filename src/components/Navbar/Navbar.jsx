import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Logo from "../../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          <img src={Logo} alt="Logo" className="logo-image" />
        </Link>

        <h1 className="slogan">Faster and further!</h1>

        {isLoggedIn && (
          <>
            <span>Welcome {user.name}</span>
            <Link to="/">
              {" "}
              <button className="home-btn">Home Page</button>{" "}
            </Link>
            <button className="logout-btn" onClick={logOutUser}>
              Logout
            </button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/signup">
              {" "}
              <button className="sign-up-btn"> Sign Up </button>{" "}
            </Link>
            <Link to="/login">
              {" "}
              <button className="login-btn"> Login </button>{" "}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
