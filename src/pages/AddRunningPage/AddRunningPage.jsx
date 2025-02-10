import { useState } from "react";
import TrainingForm from "../../components/TrainingForm/TrainingForm";
import "./AddRunningPage.css";

const AddRunningPage = () => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(
        "https://running-app-backend-zuaf.onrender.com/trainings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Error saving training");
      }
      const result = await response.json();
      console.log("Training Saved", result);
      setIsSaved(true);
      alert("Training saved successfully!");
    } catch (error) {
      console.error("Error saving training", error);
      alert("Failed to save training. Please try again.");
    }
  };

  return (
    <div className="add-running-container">
      <TrainingForm
        initialData={{
          date: "",
          trainingType: "",
          runType: "",
          distance: 0,
          duration: 0,
          pace: "",
          effort: "",
          notes: "",
          isDone: false,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddRunningPage;