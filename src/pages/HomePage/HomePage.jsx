import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import axios from "axios";
import Logo from "../../assets/logo.png";

const HomePage = () => {
  const [backendData, setBackendData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://running-app-backend-zuaf.onrender.com/trainings"
        );
        setBackendData(response.data);
      } catch (error) {
        setError("Failed to fetch data.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="home-container">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="header">
        <img src={Logo} alt="Logo" className="logo" />
        <h1>Welcome!</h1>
      </div>
      <div className="profile-section">
        <div className="profile-picture-placeholder"></div>
        <p>Total Kilometers Run: 0 km</p>
        <Link to="/training-log" className="training-log-button">
          Go to Training Log
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
