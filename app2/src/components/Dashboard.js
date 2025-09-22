import React from "react";
import { useLocation } from "react-router-dom";
import ChatBot from "./ChatBot";
import Quote from "./Quote";
import MoodTracker from "./MoodTracker";
import Spotify from "./Spotify";
import Exercises from "./Exercises";

function Dashboard() {
  const location = useLocation();
  const username = location.state?.username;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Dashboard</h2>
      <Quote />
      <MoodTracker username={username} />
      <Spotify type="relax" />
      <Exercises />
      <ChatBot />
    </div>
  );
}

export default Dashboard;


