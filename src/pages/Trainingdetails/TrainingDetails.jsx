import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import './TrainingDetails.css'; 

const TrainingDetails = () => {
  const { trainingId } = useParams();
  const [training, setTraining] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTraining, setEditedTraining] = useState({ 
    trainingType: '', 
    runType: '', 
    date: '', 
    distance: '', 
    duration: '', 
    pace: '', 
    notes: '', 
    effort: '' 
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const response = await axios.get(
          `https://running-app-backend-zuaf.onrender.com/trainings/${trainingId}`
        );
        setTraining(response.data);
        setEditedTraining({ 
          trainingType: response.data.trainingType, 
          runType: response.data.runType, 
          date: response.data.date, 
          distance: response.data.distance, 
          duration: response.data.duration, 
          pace: response.data.pace, 
          notes: response.data.notes, 
          effort: response.data.effort 
        });
      } catch (err) {
        setError(`Error fetching training: ${err.message}`);
        console.error('Error fetching training:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTraining();
  }, [trainingId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  
    setEditedTraining({ 
      trainingType: training.trainingType, 
      runType: training.runType, 
      date: training.date, 
      distance: training.distance, 
      duration: training.duration, 
      pace: training.pace, 
      notes: training.notes, 
      effort: training.effort 
    }); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTraining({ ...editedTraining, [name]: value });
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `https://running-app-backend-zuaf.onrender.com/trainings/${trainingId}`,
        editedTraining
      );
      setTraining(response.data); 
      setIsEditing(false); 
    } catch (error) {
      console.error('Error updating training:', error);
      setError('Error updating training. Please try again.'); 
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://running-app-backend-zuaf.onrender.com/trainings/${trainingId}`
      );
      setTraining(null); 
      alert('Training deleted successfully!');
      navigate("/"); 
    } catch (error) {
      console.error('Error deleting training:', error);
      setError('Failed to delete training. Please try again later.');
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
    <div className="training-details">
      <h2>Training Details</h2>
      {isEditing ? (
        <div>
          <form onSubmit={handleSaveEdit}> 
          <label>
              Date:
              <input 
                type="date" 
                value={editedTraining.date} 
                onChange={handleInputChange} 
                name="date" 
                required
              />
            </label>
            <label>
              Training Type:
              <select 
                value={editedTraining.trainingType} 
                onChange={handleInputChange} 
                name="trainingType"
                required
              >
                <option value="">Select a training type</option>
                <option value="longRun">Long Run</option>
                <option value="intervalRun">Interval Run</option>
                <option value="recoveryRun">Recovery Run</option>
                <option value="tempoRun">Tempo Run</option> 
              </select>
            </label>
            <label>
              Run Type:
              <select 
                value={editedTraining.runType} 
                onChange={handleInputChange} 
                name="runType"
                required
              >
                <option value="">Select a run type</option>
                <option value="streetRun">Street Run</option>
                <option value="trailRun">Trail Run</option>
                <option value="trackRun">Track Run</option> 
                <option value="treadmillRun">Treadmill Run</option> 
              </select>
            </label>
            <label>
              Distance (km):
              <input 
                type="number" 
                step="0.01" 
                value={editedTraining.distance} 
                onChange={handleInputChange} 
                name="distance" 
                required 
              />
            </label>
            <label>
              Duration (min):
              <input 
                type="number" 
                value={editedTraining.duration} 
                onChange={handleInputChange} 
                name="duration" 
                required 
              />
            </label>
            <label>
              Pace (min/km):
              <input 
                type="text" 
                value={editedTraining.pace} 
                onChange={handleInputChange} 
                name="pace" 
              />
            </label>
            <label>
              Effort:
              <select 
                value={editedTraining.effort} 
                onChange={handleInputChange} 
                name="effort"
                required
              >
                <option value="">Select Effort Level</option>
                <option value="1">1. Very light – Almost no effort, you feel comfortable.</option>
                <option value="2">2. Light – A smooth effort, like a light jog.</option>
                <option value="3">3. Moderate – Medium intensity effort, you feel your body working
                but can still keep up the pace.</option>
                <option value="4">4. Intense – Strong effort, you’re challenged but can still
                continue.</option>
                <option value="5">5. Very intense – At your limit, very hard to maintain.</option>
              </select>
            </label>
            <label>
              Notes:
              <textarea 
                value={editedTraining.notes} 
                onChange={handleInputChange} 
                name="notes" 
              />
            </label>
           
            <button onClick={handleSaveEdit}>Save</button>
          </form>
          <button onClick={handleCancelEdit}>Cancel</button> 
        </div>
      ) : (
        <div>
          <p><strong>Date:</strong> {training.date}</p>
          <p><strong>Type of training:</strong> {training.trainingType}</p>
          <p><strong>Type of run:</strong> {training.runType}</p>
          <p><strong>Distance:</strong> {training.distance} km</p>
          <p><strong>Duration:</strong> {training.duration} min</p>
          <p><strong>Pace:</strong> {training.pace}</p>
          <p><strong>Effort:</strong> {training.effort}</p>
          <p><strong>Notes:</strong> {training.notes}</p>
          {training.picture && (
            <img src={training.picture} alt="Run" />
          )}
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TrainingDetails;