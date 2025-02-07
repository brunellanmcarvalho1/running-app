import PropTypes from "prop-types";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};

const formatType = (type) => {
  return type.replace(/([a-z])([A-Z])/g, "$1 $2");
};

const TrainingCard = ({ run, onEdit, onDelete }) => {
  return (
    <Link to={`/training/${run.id}`} className="training-card-link">
    <div className="relative bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transform hover:-translate-y-1 transition-transform duration-200 transition-all mb-8">
      {run.runTypeImage && (
        <img
          src={run.runTypeImage}
          alt={formatType(run.runType)}
          className="w-full max-w-xs mx-auto rounded-lg mb-4" 
        />
      )}
      <h3 className="text-xl font-semibold mt-4 text-gray-900">{formatDate(run.date)}</h3>
      <p className="text-gray-700 font-medium">{formatType(run.runType)}</p>
      <p className="text-gray-700 font-medium">{formatType(run.trainingType)}</p>
      <div className="flex justify-center space-x-4 mt-4"> 
       
        <button
          onClick={() => onEdit(run)}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg shadow-md transition flex items-center space-x-2"
        >
          <Pencil size={20} /> 
          
        </button>
      
        <button
          onClick={() => onDelete(run.id)}
          className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg shadow-md transition flex items-center space-x-2"
        >
          <Trash2 size={20} /> 
          
        </button>
      </div>
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
    runTypeImage: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TrainingCard;