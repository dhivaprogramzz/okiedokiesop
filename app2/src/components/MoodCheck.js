import React, { useState } from "react";
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

/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MoodCheck() {
  const [selectedMoods, setSelectedMoods] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const moods = ["happy","neutral","sad","stressed","heavy-hearted"];

  const handleCheckboxChange = (mood) => {
    if (selectedMoods.includes(mood)) {
      // uncheck
      setSelectedMoods(selectedMoods.filter(m => m !== mood));
    } else {
      // check
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  const handleSubmit = async () => {
    if (selectedMoods.length === 0) return;

    // Save each selected mood
    for (let mood of selectedMoods) {
      await fetch("http://127.0.0.1:5000/submit_mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, mood }),
      });
    }

    navigate("/dashboard");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>How are you feeling today?</h2>
      {moods.map(m => (
        <label key={m} style={{ margin: "0 10px" }}>
          <input
            type="checkbox"
            value={m}
            checked={selectedMoods.includes(m)}
            onChange={() => handleCheckboxChange(m)}
          /> {m}
        </label>
      ))}
      <br/><br/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default MoodCheck;
*/