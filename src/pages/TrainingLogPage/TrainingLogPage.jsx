import { useState, useEffect } from "react";
import axios from "axios";
import TrainingCard from "../../components/TrainingCard/TrainingCard";
import "./TrainingLogPage.css";

const TrainingLogPage = () => {
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
      <div className="training-log-container">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="training-log-container">
      <h1>Training Log</h1>
      <p>Your past and future training sessions.</p>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          {backendData && backendData.length > 0 ? (
            <div className="training-cards-container">
              {backendData.map((run) => (
                <TrainingCard key={run.id} run={run} />
              ))}
            </div>
          ) : (
            <p>No training data available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TrainingLogPage;
