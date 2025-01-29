import { useState } from "react";
import "./AddRuningPage.css";

const AddRunningPage = () => {
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [pace, setPace] = useState("");
  const [notes, setNotes] = useState("");
  const [isDone, setIsDone] = useState(true);
  const [picture, setPicture] = useState(null);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      type,
      date,
      distance,
      duration,
      pace,
      notes,
      isDone,
      picture,
    };
    console.log("Form Data:", formData);
  };

  // Function to handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPicture(URL.createObjectURL(file)); // Image preview
  };

  return (
    <div className="add-running-container">
      <h2>Add a New Running Session</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Type of Run:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select a run type</option>
            <option value="longRun">Long Run</option>
            <option value="intervalRun">Interval Run</option>
            <option value="recoveryRun">Recovery Run</option>
            <option value="tempoRun">Tempo Run</option>
          </select>
        </div>

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
          <label>Notes (Optional):</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How did you feel?"
          />
        </div>

        <div>
          <label>Is the training completed?</label>
          <input
            type="checkbox"
            checked={isDone}
            onChange={() => setIsDone(!isDone)}
          />
        </div>

        <div>
          <label>Upload a Picture (Optional):</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {picture && <img src={picture} alt="Preview" />}
        </div>

        <div>
          <button type="submit">Save Run</button>
        </div>
      </form>
    </div>
  );
};

export default AddRunningPage;
