import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./TrainigCard.css";

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};

const formatType = (type) => {
  return type.replace(/([a-z])([A-Z])/g, "$1 $2");
};

const TrainingCard = ({ run }) => {
  return (
    <Link to={`/training/${run.id}`} className="training-card-link">
      <div className="training-card">
        <h3>{formatDate(run.date)}</h3>
        <p>
          <strong>{formatType(run.runType)}</strong>
        </p>
        <p>
          <strong>{formatType(run.trainingType)}</strong>
        </p>
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
