import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddRunningPage from "./pages/AddRunningPage/AddRunningPage";
import HomePage from "./pages/HomePage/HomePage";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import About from "./pages/AboutPage/About";
import TrainingDetails from "./pages/Trainingdetails/TrainingDetails";
import TrainingLogPage from "./pages/TrainingLogPage/TrainingLogPage";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import IsAnon from "./components/isAnon";
import IsPrivate from "./components/IsPrivate";
import "./App.css";

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [trainings, setTrainings] = useState([]);

  const handleAddTraining = (newTraining) => {
    setTrainings([...trainings, newTraining]);
  };

  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar
          isExpanded={isSidebarExpanded}
          toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
        />
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarExpanded ? "ml-64" : "ml-16"
          }`}
        >
          <Navbar />
          <div className="p-4">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/training-log" element={<TrainingLogPage />} />
              <Route exact path="/add-running" element={<AddRunningPage />} />
              <Route path="/about" element={<About />} />
              <Route
                exact
                path="/training/:trainingId"
                element={<TrainingDetails />}
              />
              <Route
                exact
                path="/calendar"
                element={<CalendarPage trainings={trainings} />}
              />
              <Route
                exact
                path="/login"
                element={
                  <IsAnon>
                    <LoginPage />
                  </IsAnon>
                }
              />
              <Route
                exact
                path="/signup"
                element={
                  <IsAnon>
                    <SignUpPage />
                  </IsAnon>
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
