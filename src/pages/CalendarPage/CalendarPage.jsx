import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarPage.css";

const CalendarPage = () => {
  const [value, setValue] = useState(new Date());
  const [trainings, setTrainings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch training from the API
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
        return (
          <div className={`training ${training.isDone ? "done" : "scheduled"}`}>
            <img
              src={training.runTypeImage}
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
