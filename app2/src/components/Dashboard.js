import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ChatBot from "./ChatBot";
import Quote from "./Quote";
import MoodTracker from "./MoodTracker";
import Spotify from "./Spotify";
import Exercises from "./Exercises";
import TherapistCall from "./TherapistCall";
import "./Dashboard.css";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || localStorage.getItem("username");

  const refs = {
    quote: useRef(null),
    mood: useRef(null),
    spotify: useRef(null),
    exercises: useRef(null),
    chatbot: useRef(null),
    notes: useRef(null),
  };

  const scrollToRef = (ref) =>
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">🌈 Wellness Hub</h2>
        <div className="links">
          <button onClick={() => scrollToRef(refs.quote)}>Quote</button>
          <button onClick={() => scrollToRef(refs.mood)}>Mood Tracker</button>
          <button onClick={() => scrollToRef(refs.spotify)}>Spotify</button>
          <button onClick={() => scrollToRef(refs.exercises)}>Exercises</button>
          <button onClick={() => scrollToRef(refs.chatbot)}>ChatBot</button>
          <button onClick={() => scrollToRef(refs.notes)}>📁 Notes</button>
        </div>
      </nav>

      {/* Main content */}
      <main className="content">
        <div ref={refs.quote} className="cloud">
          <Quote />
        </div>

        <div ref={refs.quote} className="cloud">
          <TherapistCall />
        </div>

        <div ref={refs.mood} className="cloud">
          <MoodTracker username={username} />
        </div>

        <div ref={refs.spotify} className="cloud">
          <Spotify type="relax" />
        </div>

        <div ref={refs.exercises} className="cloud">
          <Exercises />
        </div>

        <div ref={refs.notes} className="cloud">
          <button
            onClick={() => navigate("/notes", { state: { username } })}
          >
            📁 Notes Folder
          </button>
        </div>

        <div ref={refs.chatbot} className="cloud">
          <ChatBot />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
