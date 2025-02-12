import "./HomePage.css"
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-container">
      <h2>Welcome to Running Tracker</h2>
      
      <div className="flex justify-center">
        <img src={Logo} alt="Running Tracker Logo" className="logo-image2" />
      </div>

      <p>
        Run.Ella is designed to help runners achieve their fitness goals.
        Track your runs, monitor your progress, and stay motivated with detailed analytics and training insights.
      </p>

      <div className="cta-buttons">
        <Link to="/training-log" className="cta-button">View Trainings</Link>
        <Link to="/add-running" className="cta-button">Log a Run</Link>
      </div>
    </div>
  );
};

export default HomePage;
