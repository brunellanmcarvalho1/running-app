import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import streetRunImage from "../../assets/streetRun.jpg";
import trailRunImage from "../../assets/trailRun.jpg";
import trackRunImage from "../../assets/trackRun.jpg";
import treadmillRunImage from "../../assets/treadmillRun.jpg";

const TrainingForm = ({
  initialData = {
    date: "",
    trainingType: "",
    runType: "",
    distance: 0,
    duration: 0,
    pace: "",
    effort: "",
    notes: "",
    isDone: false,
  },
  onSubmit,
  onCancel = () => {},
  isEditing = false,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [isDone, setIsDone] = useState(initialData.isDone || false);
  const [runTypeImage, setRunTypeImage] = useState("");

  // UseEffect to update the image according to the type of run
  useEffect(() => {
    if (formData.runType) {
      switch (formData.runType) {
        case "streetRun":
          setRunTypeImage(streetRunImage);
          break;
        case "trailRun":
          setRunTypeImage(trailRunImage);
          break;
        case "trackRun":
          setRunTypeImage(trackRunImage);
          break;
        case "treadmillRun":
          setRunTypeImage(treadmillRunImage);
          break;
        default:
          setRunTypeImage("");
      }
    }
  }, [formData.runType]);

  // Calculation of pace according to duration and distance
  useEffect(() => {
    if (formData.distance > 0 && formData.duration > 0) {
      const pace = (formData.duration / formData.distance).toFixed(2);
      setFormData((prevData) => ({ ...prevData, pace }));
    }
  }, [formData.distance, formData.duration]);

  // Function for handling changes to the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form submission function
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, isDone, runTypeImage });
  };

  return (
    <div className="training-form">
      <h2>
        {isEditing ? "Edit Training Session" : "Add a New Running Session"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Run Status:</label>
          <div className="status-container">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                name="isDone"
                checked={isDone}
                onChange={() => setIsDone(!isDone)}
              />
              <span className="checkmark"></span>
            </label>
            Completed
            <label className="custom-checkbox">
              <input
                type="checkbox"
                name="isDone"
                checked={!isDone}
                onChange={() => setIsDone(false)}
              />
              Scheduled
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
        <div>
          <label>Training Type:</label>
          <select
            name="trainingType"
            value={formData.trainingType}
            onChange={handleInputChange}
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
          <label>Run Type:</label>
          <select
            name="runType"
            value={formData.runType}
            onChange={handleInputChange}
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
          <label>Distance (km):</label>
          <input
            type="number"
            name="distance"
            value={formData.distance}
            onChange={handleInputChange}
            step="0.01"
            required
          />
        </div>
        <div>
          <label>Duration (min):</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Pace:</label>
          <input
            type="text"
            name="pace"
            value={formData.pace}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Effort:</label>
          <select
            name="effort"
            value={formData.effort}
            onChange={handleInputChange}
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
          <label>Notes:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

TrainingForm.propTypes = {
  initialData: PropTypes.shape({
    date: PropTypes.string.isRequired,
    trainingType: PropTypes.string.isRequired,
    runType: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    pace: PropTypes.string,
    effort: PropTypes.string.isRequired,
    notes: PropTypes.string,
    isDone: PropTypes.bool,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  isEditing: PropTypes.bool,
};

export default TrainingForm;
