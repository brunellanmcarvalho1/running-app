import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import streetRunImage from "../../assets/streetRun.jpg";
import trailRunImage from "../../assets/trailRun.jpg";
import trackRunImage from "../../assets/trackRun.jpg";
import treadmillRunImage from "../../assets/treadmillRun.jpg";
import axios from "axios";
import TrainingForm from "../../components/TrainingForm/TrainingForm";

const getRunTypeImage = (runType) => {
  switch (runType) {
    case "streetRun":
      return streetRunImage;
    case "trailRun":
      return trailRunImage;
    case "trackRun":
      return trackRunImage;
    case "treadmillRun":
      return treadmillRunImage;
    default:
      return "";
  }
};

const TrainingDetails = () => {
  const { trainingId } = useParams();
  const [training, setTraining] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const response = await axios.get(
          `https://running-app-backend-zuaf.onrender.com/trainings/${trainingId}`
        );
        setTraining(response.data);
      } catch (err) {
        setError(`Error fetching training: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTraining();
  }, [trainingId]);

  const effortDescriptions = {
    1: "1. Very light – Almost no effort, you feel comfortable.",
    2: "2. Light – A smooth effort, like a light jog.",
    3: "3. Moderate – Medium intensity effort, you feel your body working but can still keep up the pace.",
    4: "4. Intense – Strong effort, you’re challenged but can still continue.",
    5: "5. Very intense – At your limit, very hard to maintain.",
  };

  const handleSaveEdit = async (formData) => {
    try {
      const response = await axios.put(
        `https://running-app-backend-zuaf.onrender.com/trainings/${trainingId}`,
        formData
      );
      setTraining(response.data);
      setIsEditing(false);
    } catch (error) {
      setError("Error updating training. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://running-app-backend-zuaf.onrender.com/trainings/${trainingId}`
      );
      alert("Training deleted successfully!");
      navigate("/");
    } catch (error) {
      setError("Failed to delete training. Please try again later.");
    }
  };

  if (isLoading)
    return <div className="text-center mt-20 text-white">Loading...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-500">Error: {error}</div>;
  if (!training)
    return (
      <div className="text-center mt-20 text-white">Training not found.</div>
    );

  const runTypeImage = getRunTypeImage(training.runType);

  return (
    <div className="max-w-5xl mx-auto mt-20 p-8 bg-gray-100 text-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-pink-500">
        Training Details
      </h2>

      {isEditing ? (
        <TrainingForm
          initialData={training}
          onSubmit={handleSaveEdit}
          onCancel={() => setIsEditing(false)}
          isEditing={true}
        />
      ) : (
        <div className="space-y-4 text-left">
          {runTypeImage && (
            <img
              src={runTypeImage}
              alt={training.runType}
              className="w-full max-w-xs mx-auto rounded-lg mb-4"
            />
          )}
          <p>
            <strong>Date:</strong> {training.date}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {training.isDone ? "Completed" : "Scheduled"}
          </p>
          <p>
            <strong>Type of training:</strong> {training.trainingType}
          </p>
          <p>
            <strong>Type of run:</strong> {training.runType}
          </p>
          <p>
            <strong>Distance:</strong> {training.distance} km
          </p>
          <p>
            <strong>Duration:</strong> {training.duration} min
          </p>
          <p>
            <strong>Pace:</strong> {training.pace}
          </p>
          <p>
            <strong>Effort:</strong>{" "}
            {effortDescriptions[training.effort] || "Not specified"}
          </p>
          <p>
            <strong>Notes:</strong> {training.notes}
          </p>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg shadow-md transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 hover:bg-pink-600 text-white font-semibold rounded-lg shadow-md transition"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default TrainingDetails;
