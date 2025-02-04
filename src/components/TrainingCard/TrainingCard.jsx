import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './TrainigCard.css'

const TrainingCard = ({ run }) => {
  return (
    <Link to={`/training/${run.id}`} className="training-card-link">
      <div className="training-card">
        <h3>{run.date}</h3>
        <p><strong>Training Type:</strong> {run.trainingType}</p>
        <p><strong>Run Type:</strong> {run.runType}</p>
        {/* {run.picture && (
          <img
            src={run.picture}
            alt="Run"
            className="training-card-image"
          />
        )} */}
      </div>
    </Link>
  );
};

TrainingCard.propTypes = {
  run: PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    trainingType: PropTypes.string.isRequired,
    runType: PropTypes.string.isRequired,
    picture: PropTypes.string,
  }).isRequired,
};

export default TrainingCard;