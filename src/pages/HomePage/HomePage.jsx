import React, { useState, useEffect } from "react";
import "./HomePage.css";
import axios from "axios";

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
        setLoading(false); // Carregamento concluído
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
      <h1>Welcome to Your Running Tracker!</h1>
      <p>Here, you'll see all your past and future training sessions.</p>

      {error ? (
        <p>{error}</p> // Exibe a mensagem de erro caso ocorra
      ) : (
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
              {backendData && backendData.length > 0 ? (
                backendData.map((run, index) => (
                  <tr key={run.id || index}>
                    {" "}
                    {/* Use 'id' ou 'index' como chave */}
                    <td>{run.date}</td>
                    <td>{run.trainingType}</td>
                    <td>{run.runType}</td>
                    <td>{run.distance}</td>
                    <td>{run.duration}</td>
                    <td>{run.pace}</td>
                    <td>{run.effort}</td>
                    <td>{run.notes}</td>
                    <td>
                      <img
                        src={run.picture}
                        alt="Run"
                        width="100"
                        height="50"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No training data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HomePage;
