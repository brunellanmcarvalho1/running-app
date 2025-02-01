import React from "react";
import "./HomePage.css";
import axios from "axios";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://running-app-backend-zuaf.onrender.com/trainings"
        );
        setBackendData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to Your Running Tracker!</h1>
      <p>Here, you'll see all your past and future training sessions.</p>

      {backendData && !backendData.error ? (
        <div>
          <h2>Training Log</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Training Type</th>
                <th>Run Type</th>
                <th>Distance (km)</th>
                <th>Duration (min)</th>
                <th>Pace</th>
                <th>Effort</th>
                <th>Notes</th>
                <th>Picture</th>
              </tr>
            </thead>
            <tbody>
              {backendData.map((run) => (
                <tr key={run.id}>
                  <td>{run.date}</td>
                  <td>{run.trainingType}</td>
                  <td>{run.runType}</td>
                  <td>{run.distance}</td>
                  <td>{run.duration}</td>
                  <td>{run.pace}</td>
                  <td>{run.effort}</td>
                  <td>{run.notes}</td>
                  <td>
                    <img src={run.picture} alt="Run" width="100" height="50" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Error: {backendData?.error || "Failed to fetch data."}</p>
      )}
    </div>
  );
};

export default HomePage;
