import { useState, useEffect } from "react";
import axios from "axios";
import TrainingCard from "../../components/TrainingCard/TrainingCard";

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
        // Sort the data received from the backend before storing it
        const sortedData = response.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
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
      <div className="pt-20 flex justify-center items-center min-h-screen">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="pt-20 px-6">
      <h1 className="text-3xl font-bold text-center">Training Log</h1>
      <p className="text-center text-gray-600">
        Your past and future training sessions.
      </p>
      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div>
          {backendData && backendData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {backendData.map((run) => (
                <TrainingCard key={run.id} run={run} />
              ))}
            </div>
          ) : (
            <p className="text-center mt-4 text-gray-600">
              No training data available.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TrainingLogPage;
