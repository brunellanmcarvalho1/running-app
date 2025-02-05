import TrainingForm from "../../components/TrainingForm/TrainingForm";
import "./AddRunningPage.css";

const AddRunningPage = () => {
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
    } catch (error) {
      console.error("Error saving training", error);
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
