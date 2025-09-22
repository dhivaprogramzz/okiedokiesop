import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function MoodCheck() {
  const [mood, setMood] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || localStorage.getItem("username");

  const submitMood = async () => {
    if (!mood) return alert("Please enter your mood");

    try {
      const res = await fetch("http://127.0.0.1:5000/submit_mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, mood }),
      });
      const data = await res.json();
      if (data.success) {
        navigate("/dashboard", { state: { username } });
      } else {
        alert(data.message || "Error submitting mood");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit mood");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>How are you feeling today?</h2>
      <input
        type="text"
        placeholder="Enter your mood (e.g., Happy, Sad)"
        value={mood}
        onChange={e => setMood(e.target.value)}
        style={{ padding: "10px", width: "100%", marginBottom: "20px" }}
      />
      <button onClick={submitMood} style={{ padding: "10px 20px" }}>Submit</button>
    </div>
  );
}

export default MoodCheck;



/*import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function MoodCheck() {
  const [mood, setMood] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username;

  const submitMood = async () => {
    if (!mood) return alert("Please enter your mood");

    try {
      const res = await fetch("http://127.0.0.1:5000/submit_mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, mood }),
      });
      const data = await res.json();
      if (data.success) {
        // Redirect to Dashboard
        navigate("/dashboard", { state: { username } });
      } else {
        alert(data.message || "Error submitting mood");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit mood");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>How are you feeling today?</h2>
      <input
        type="text"
        placeholder="Enter your mood (e.g., Happy, Sad)"
        value={mood}
        onChange={e => setMood(e.target.value)}
        style={{ padding: "10px", width: "100%", marginBottom: "20px" }}
      />
      <button onClick={submitMood} style={{ padding: "10px 20px" }}>Submit</button>
    </div>
  );
}

export default MoodCheck;

*/