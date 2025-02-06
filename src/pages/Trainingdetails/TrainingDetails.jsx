import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TrainingForm from "../../components/TrainingForm/TrainingForm";
// import "./TrainingDetails.css";

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
        console.error("Error fetching training:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTraining();
  }, [trainingId]);

  const handleSaveEdit = async (formData) => {
    try {
      const response = await axios.put(
        `https://running-app-backend-zuaf.onrender.com/trainings/${trainingId}`,
        formData
      );
      setTraining(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating training:", error);
      setError("Error updating training. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://running-app-backend-zuaf.onrender.com/trainings/${trainingId}`
      );
      setTraining(null);
      alert("Training deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting training:", error);
      setError("Failed to delete training. Please try again later.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!training) {
    return <div>Training not found.</div>;
  }

  return (
    <div className="training-details mt-16"> {/* Add margin-top here */}
      <h2>Training Details</h2>
      {isEditing ? (
        <TrainingForm
          initialData={training}
          onSubmit={handleSaveEdit}
          onCancel={() => setIsEditing(false)}
          isEditing={true}
        />
      ) : (
        <div>
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
            <strong>Effort:</strong> {training.effort}
          </p>
          <p>
            <strong>Notes:</strong> {training.notes}
          </p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TrainingDetails;
