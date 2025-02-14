import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import streetRunImage from "../../assets/streetRun.jpg";
import trailRunImage from "../../assets/trailRun.jpg";
import trackRunImage from "../../assets/trackRun.jpg";
import treadmillRunImage from "../../assets/treadmillRun.jpg";
import "react-calendar/dist/Calendar.css";
import "./CalendarPage.css";

const CalendarPage = () => {
  const [value, setValue] = useState(new Date());
  const [trainings, setTrainings] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {

    const fetchTrainings = async () => {
      try {
        const response = await fetch(
          "https://running-app-backend-zuaf.onrender.com/trainings"
        );
        const data = await response.json();
        setTrainings(data);
      } catch (error) {
        console.error("Erro ao buscar os treinos:", error);
      }
    };

    fetchTrainings();
  }, []);

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const training = trainings.find(
        (training) =>
          new Date(training.date).toDateString() === date.toDateString()
      );
      if (training) {
        const runTypeImage = getRunTypeImage(training.runType);
        return (
          <div className={`training ${training.isDone ? "done" : "scheduled"}`}>
            <img
              src={runTypeImage}
              alt={training.runType}
              className="training-image"
            />
          </div>
        );
      }
    }
    return null;
  };

  const handleDayClick = (date) => {
    const training = trainings.find(
      (training) =>
        new Date(training.date).toDateString() === date.toDateString()
    );
    if (training) {
      navigate(`/training/${training.id}`);
    }
  };

  return (
    <div className="calendar-page">
      <Calendar
        onChange={setValue}
        value={value}
        tileContent={tileContent}
        onClickDay={handleDayClick}
        formatMonthYear={(locale, date) =>
          date.toLocaleString("default", { month: "long", year: "numeric" })
        }
        formatShortWeekday={(locale, date) =>
          date.toLocaleString("default", { weekday: "short" })
        }
      />
    </div>
  );
};

export default CalendarPage;
