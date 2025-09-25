
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bg2 from "../assets/images/bg2.jpg"; // import background image

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
    <div
      style={{
        height: "100vh", // full viewport height
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bg2})`, // darker overlay for text clarity
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
        textAlign: "center",
        overflow: "hidden", // remove scroll
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "30px", fontSize: "28px", fontWeight: "bold", textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}>
        How are you feeling today?
      </h2>
      <input
        type="text"
        placeholder="enter mood (happy/excited/neutral/sad/angry)"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        style={{
          padding: "12px",
          width: "300px",
          maxWidth: "90%",
          marginBottom: "20px",
          borderRadius: "25px",
          border: "none",
          outline: "none",
          textAlign: "center",
          fontSize: "14px",
        }}
      />
      <button
        onClick={submitMood}
        style={{
          padding: "12px 25px",
          borderRadius: "25px",
          border: "none",
          background: "linear-gradient(135deg, #4169E1, #1E3C72)",
          color: "white",
          fontSize: "16px",
          cursor: "pointer",
          transition: "0.3s",
        }}
        onMouseOver={(e) =>
          (e.target.style.background = "linear-gradient(135deg, #1E3C72, #4169E1)")
        }
        onMouseOut={(e) =>
          (e.target.style.background = "linear-gradient(135deg, #4169E1, #1E3C72)")
        }
      >
        Submit
      </button>
    </div>
  );
}

export default MoodCheck;

/*import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bg2 from "../assets/images/bg2.jpg"; // ✅ import background image

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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bg2})`, // overlay for clarity
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "30px", fontSize: "28px", fontWeight: "bold" }}>
        How are you feeling today?
      </h2>
      <input
        type="text"
        placeholder="Enter your mood (e.g., Happy, Sad)"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        style={{
          padding: "12px",
          width: "300px",
          maxWidth: "90%",
          marginBottom: "20px",
          borderRadius: "25px",
          border: "none",
          outline: "none",
          textAlign: "center",
          fontSize: "14px",
        }}
      />
      <button
        onClick={submitMood}
        style={{
          padding: "12px 25px",
          borderRadius: "25px",
          border: "none",
          background: "linear-gradient(135deg, #4169E1, #1E3C72)",
          color: "white",
          fontSize: "16px",
          cursor: "pointer",
          transition: "0.3s",
        }}
        onMouseOver={(e) =>
          (e.target.style.background = "linear-gradient(135deg, #1E3C72, #4169E1)")
        }
        onMouseOut={(e) =>
          (e.target.style.background = "linear-gradient(135deg, #4169E1, #1E3C72)")
        }
      >
        Submit
      </button>
    </div>
  );
}

export default MoodCheck;
*/