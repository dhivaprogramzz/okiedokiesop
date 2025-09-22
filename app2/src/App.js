import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import MoodCheck from "./components/MoodCheck";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ChatBot from "./components/ChatBot";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />    
        <Route path="/mood" element={<MoodCheck />} />
        <Route path="/dashboard" element={<Dashboard />} />
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
