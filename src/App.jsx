import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddRunningPage from "./pages/AddRunningPage/AddRunningPage";
import HomePage from "./pages/HomePage/HomePage";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
      <Navbar /> 
        <div className="main-content">
          <Sidebar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-running" element={<AddRunningPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <></>
    </Router>
  );
}

export default App;
