import { useState } from "react";
import streetRunImage from "../../assets/street-run.jpg";
import trailRunImage from "../../assets/trail-run.jpg";
import trackRunImage from "../../assets/track-run.jpg";
import treadmillRunImage from "../../assets/treadmill-run.jpg";
import "./AddRunningPage.css";

const AddRunningPage = () => {
  const [trainingType, setTrainingType] = useState("");
  const [runType, setRunType] = useState("");
  const [date, setDate] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [pace, setPace] = useState("");
  const [notes, setNotes] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [effort, setEffort] = useState("");

  // Mapping between the run type and the corresponding image
  const runTypeImages = {
    streetRun: streetRunImage,
    trailRun: trailRunImage,
    trackRun: trackRunImage,
    treadmillRun: treadmillRunImage,
  };

  // Async function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      trainingType,
      runType,
      date,
      distance,
      duration,
      pace,
      notes,
      isDone,
      effort,
    };

    try {
      // Sends data to the backend
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
      console.log("Training Save", result);
    } catch (error) {
      console.error("Error saving training", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPicture(URL.createObjectURL(file));
  };

  return (
    <div className="add-running-container">
      <h2>Add a New Running Session</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Run Status:</label>
          <div className="status-container">
            <label className="custom-checkbox">
              <input
                type="radio"
                name="runStatus"
                value="completed"
                checked={isDone === true}
                onChange={() => setIsDone(true)}
              />
              Completed
              <span className="checkmark"></span>
            </label>

            <label className="custom-checkbox">
              <input
                type="radio"
                name="runStatus"
                value="scheduled"
                checked={isDone === false}
                onChange={() => setIsDone(false)}
              />
              Scheduling
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
        <div>
          <label>Type of Training:</label>
          <select
            value={trainingType}
            onChange={(e) => setTrainingType(e.target.value)}
            required
          >
            <option value="">Select a training type</option>
            <option value="longRun">Long Run</option>
            <option value="intervalRun">Interval Run</option>
            <option value="recoveryRun">Recovery Run</option>
            <option value="tempoRun">Tempo Run</option>
          </select>
        </div>

        <div>
          <label>Type of Run:</label>
          <select
            value={runType}
            onChange={(e) => setRunType(e.target.value)}
            required
          >
            <option value="">Select a run type</option>
            <option value="streetRun">Street Run</option>
            <option value="trailRun">Trail Run</option>
            <option value="trackRun">Track Run</option>
            <option value="treadmillRun">Treadmill Run</option>
          </select>
        </div>

        <div>
          <label>Distance (in km):</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Enter distance"
            required
          />
        </div>

        <div>
          <label>Duration (in minutes):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Enter duration"
            required
          />
        </div>

        <div>
          <label>Pace (min/km):</label>
          <input
            type="text"
            value={pace}
            onChange={(e) => setPace(e.target.value)}
            placeholder="Optional pace"
          />
        </div>

        <div>
          <label>Perceived Effort if completed (1 to 5):</label>
          <select
            value={effort}
            onChange={(e) => setEffort(e.target.value)}
            disabled={isDone === false}
            required
          >
            <option value="">Select Effort Level</option>
            <option value="1">
              1. Very light – Almost no effort, you feel comfortable.
            </option>
            <option value="2">
              2. Light – A smooth effort, like a light jog.
            </option>
            <option value="3">
              3. Moderate – Medium intensity effort, you feel your body working
              but can still keep up the pace.
            </option>
            <option value="4">
              4. Intense – Strong effort, you’re challenged but can still
              continue.
            </option>
            <option value="5">
              5. Very intense – At your limit, very hard to maintain.
            </option>
          </select>
        </div>


        <div>
          <button type="submit">Save Run</button>
        </div>
      </form>
    </div>
  );
};

export default AddRunningPage;
