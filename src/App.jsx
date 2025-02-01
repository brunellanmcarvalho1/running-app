import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import AddRunningPage from "./pages/AddRunningPage/AddRunningPage";
import HomePage from "./pages/HomePage/HomePage";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer";
import About from "./pages/AboutPage/About";
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
            {/* <Route path="/add-running" element={<AddRunningPage />} /> */}
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <></>
    </Router>
  );
}

export default App;
