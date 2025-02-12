import { useState, useEffect } from "react";
import "./HomePage.css";
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [totalDistance, setTotalDistance] = useState(0);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch("https://running-app-backend-zuaf.onrender.com/trainings");
        const data = await response.json();
        const total = data
          .filter(training => training.isDone)
          .reduce((sum, training) => sum + parseFloat(training.distance), 0);
        setTotalDistance(total);
      } catch (error) {
        console.error("Error fetching trainings:", error);
      }
    };

    fetchTrainings();
  }, []);

  return (
    <div className="home-container">
      <h2>Welcome!</h2>
      
      <div className="flex justify-center">
        <img src={Logo} alt="Running Tracker Logo" className="logo-image2" style={{ width: "400px" }}/>
      </div>

      <p>
        Run.Ella is an app designed to help runners achieve their fitness goals.
      </p>
      <p className="total-distance">Total Kilometers Run: {totalDistance} km</p>

      <div className="cta-buttons">
        <Link to="/training-log" className="cta-button">View Trainings</Link>
        <Link to="/add-running" className="cta-button">Log a Run</Link>
      </div>
    </div>
  );
};

export default HomePage;
