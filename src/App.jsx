import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddRunningPage from "./pages/AddRunningPage/AddRunningPage";
import HomePage from "./pages/HomePage/HomePage";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import About from "./pages/AboutPage/About";
import TrainingDetails from "./pages/Trainingdetails/TrainingDetails";
import "./App.css";

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)} />
        <div className={`flex-1 transition-all duration-300 ${isSidebarExpanded ? "ml-64" : "ml-16"}`}>
          <Navbar />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/add-running" element={<AddRunningPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/training/:trainingId" element={<TrainingDetails />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;