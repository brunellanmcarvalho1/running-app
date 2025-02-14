import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Trash2, Info } from "lucide-react"; 
import streetRunImage from "../../assets/streetRun.jpg";
import trailRunImage from "../../assets/trailRun.jpg";
import trackRunImage from "../../assets/trackRun.jpg";
import treadmillRunImage from "../../assets/treadmillRun.jpg";

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};

const formatType = (type) => {
  return type.replace(/([a-z])([A-Z])/g, "$1 $2");
};

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

const typeLabels = {
  longRun: "Long Run",
  intervalRun: "Interval Run",
  recoveryRun: "Recovery Run",
  tempoRun: "Tempo Run",
  streetRun: "Street",
  trailRun: "Trail",
  trackRun: "Track",
  treadmillRun: "Treadmill",
};
const getTypeLabel = (type) => typeLabels[type] || formatType(type);

const TrainingCard = ({ run }) => {
  const navigate = useNavigate();
  const runTypeImage = getRunTypeImage(run.runType);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://running-app-backend-zuaf.onrender.com/trainings/${run.id}`
      );
      alert("Training deleted successfully!");
      window.location.reload();
    } catch (error) {
      alert("Failed to delete training. Please try again later.");
    }
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transform hover:-translate-y-1 transition-transform duration-200 transition-all mb-8">
      {runTypeImage && (
        <img
          src={runTypeImage}
          alt={formatType(run.runType)}
          className="w-full max-w-xs mx-auto rounded-lg mb-4"
        />
      )}
      <h3 className="text-xl font-semibold mt-4 text-gray-900">
        {formatDate(run.date)}
      </h3>

      <p className="text-gray-700 font-medium">{getTypeLabel(run.runType)}</p>
      <p className="text-gray-700 font-medium">
        {getTypeLabel(run.trainingType)}
      </p>

      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={() => navigate(`/training/${run.id}`)}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transition flex items-center space-x-2"
        >
          <Info size={20} />
        </button>

        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg shadow-md transition flex items-center space-x-2"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

TrainingCard.propTypes = {
  run: PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    trainingType: PropTypes.string.isRequired,
    runType: PropTypes.string.isRequired,
  }).isRequired,
};

export default TrainingCard;