import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddRunningPage from "./pages/AddRunningPage/AddRunningPage";
import HomePage from "./pages/HomePage/HomePage";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="main-content">
          <Sidebar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-running" element={<AddRunningPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
